import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Search, Send, ExternalLink, Loader2, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { triageContent } from '@/data/triageContent';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useAnimatedPlaceholder } from '@/hooks/useAnimatedPlaceholder';

type Message = { role: 'user' | 'assistant'; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/triage-assistant`;
const ANALYTICS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/triage-analytics`;

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialQuery?: string;
}

const generateSessionId = () => `triage_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onOpenChange, initialQuery = '' }) => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [sessionId] = useState(generateSessionId);
  const [focusedRoleIndex, setFocusedRoleIndex] = useState(-1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const roleChipsRef = useRef<HTMLDivElement>(null);

  // Only show extras after user interacts
  const showExtras = input.length > 0 || messages.length > 0;

  // Get animated placeholder
  const placeholders = language === 'en' 
    ? triageContent.animatedPlaceholders.en 
    : triageContent.animatedPlaceholders.ge;
  const { text: animatedText, isTyping } = useAnimatedPlaceholder({
    placeholders,
    typingSpeed: 50,
    deletingSpeed: 25,
    pauseDuration: 2000,
    enabled: open && messages.length === 0 && !input,
  });

  const t = useCallback((key: keyof typeof triageContent) => {
    const value = triageContent[key];
    if (typeof value === 'object' && value !== null && 'en' in value && 'ge' in value) {
      const typedValue = value as { en: string; ge: string };
      return language === 'en' ? typedValue.en : typedValue.ge;
    }
    return '';
  }, [language]);

  const trackEvent = useCallback(async (eventType: string, data: Record<string, unknown> = {}) => {
    try {
      await fetch(ANALYTICS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          event_type: eventType,
          language,
          ...data
        }),
      });
    } catch (err) {
      console.error('Analytics error:', err);
    }
  }, [sessionId, language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle initialQuery when modal opens
  useEffect(() => {
    if (open && initialQuery) {
      setInput(initialQuery);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, initialQuery]);

  useEffect(() => {
    if (open) {
      trackEvent('session_start');
      setTimeout(() => inputRef.current?.focus(), 100);
    } else if (messages.length > 0) {
      trackEvent('session_end', { conversation_length: messages.length });
    }
    if (!open) {
      setMessages([]);
      setInput('');
      setError(null);
      setSuggestions([]);
    }
  }, [open, trackEvent, messages.length]);

  // Parse suggestions from assistant content
  const parseSuggestions = (content: string): { cleanContent: string; suggestions: string[] } => {
    const suggestRegex = /\[SUGGEST:\s*([^\]]+)\]/gi;
    const match = suggestRegex.exec(content);
    
    if (match) {
      const suggestionsStr = match[1];
      const suggestions = suggestionsStr.split('|').map(s => s.trim()).filter(s => s.length > 0);
      const cleanContent = content.replace(suggestRegex, '').trim();
      return { cleanContent, suggestions };
    }
    
    return { cleanContent: content, suggestions: [] };
  };

  const streamChat = async (userMessages: Message[]) => {
    setIsLoading(true);
    setError(null);
    setSuggestions([]);
    let assistantContent = '';

    try {
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: userMessages, language }),
      });

      if (!resp.ok) {
        if (resp.status === 429) {
          setError(language === 'en' ? 'Too many requests. Please wait a moment.' : 'ძალიან ბევრი მოთხოვნა. გთხოვთ, დაელოდეთ.');
          return;
        }
        throw new Error('Failed to connect');
      }

      if (!resp.body) throw new Error('No response body');

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';

      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === 'assistant') {
                  return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantContent } : m);
                }
                return prev;
              });
            }
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // After streaming is complete, parse suggestions and clean content
      const { cleanContent, suggestions: parsedSuggestions } = parseSuggestions(assistantContent);
      
      if (parsedSuggestions.length > 0) {
        setSuggestions(parsedSuggestions);
        // Update the message with cleaned content (without suggestion markup)
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.role === 'assistant') {
            return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: cleanContent } : m);
          }
          return prev;
        });
      }
    } catch (err) {
      console.error('Triage error:', err);
      setError(t('error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');

    trackEvent('message_sent', { conversation_length: newMessages.length });
    await streamChat(newMessages);
  };

  const handleRoleClick = (role: typeof triageContent.roles[0]) => {
    const prompt = language === 'en' ? role.prompt.en : role.prompt.ge;
    trackEvent('role_selected', { role_selected: role.id });
    handleSend(prompt);
  };

  const handleHotlineClick = (channelId: string) => {
    trackEvent('hotline_clicked', { hotline_clicked: channelId });
  };

  const handleLinkClick = (href: string) => {
    trackEvent('link_clicked', { routed_to: href });
  };

  const renderMessageContent = (content: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.slice(lastIndex, match.index));
      }
      parts.push(
        <a
          key={match.index}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleLinkClick(match[2])}
          className="text-white underline underline-offset-2 hover:text-white/80 inline-flex items-center gap-1"
        >
          {match[1]}
          <ExternalLink className="w-3 h-3" />
        </a>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }

    return parts.length > 0 ? parts : content;
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Custom semi-transparent overlay */}
        <DialogPrimitive.Overlay 
          className={cn(
            "fixed inset-0 z-50",
            "bg-navy/60 backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )}
        />
        
        {/* Content */}
        <DialogPrimitive.Content 
          className={cn(
            "fixed left-[50%] z-50 w-[calc(100%-2rem)] max-w-xl translate-x-[-50%]",
            "top-[15%] sm:top-[20%]",
            "bg-navy rounded-xl border border-white/20",
            "shadow-[0_25px_80px_-15px_rgba(0,0,0,0.6)]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-top-4 data-[state=open]:slide-in-from-top-4",
            "duration-200"
          )}
        >
          <VisuallyHidden>
            <DialogPrimitive.Title>
              {language === 'en' ? 'Search' : 'ძებნა'}
            </DialogPrimitive.Title>
          </VisuallyHidden>
          
          {/* Close button */}
          <DialogPrimitive.Close 
            className="absolute right-3 top-3 p-1 rounded-md text-white/50 hover:text-white/70 hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </DialogPrimitive.Close>
          
          {/* Clean search input with animated placeholder */}
          <div className="p-5 pb-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <div className="relative flex items-center">
                <Search className="absolute left-0 w-5 h-5 text-white/50" />
                
                {/* Animated placeholder with cursor */}
                {!input && messages.length === 0 && (
                  <div 
                    className={cn(
                      "absolute left-8 flex items-center pointer-events-none",
                      "text-lg text-white/50",
                      language === 'ge' && 'font-georgian'
                    )}
                  >
                    <span>{animatedText}</span>
                    <span 
                      className={cn(
                        "w-[2px] h-5 bg-white ml-px",
                        isTyping ? "animate-[blink_1s_step-end_infinite]" : "opacity-0"
                      )}
                    />
                  </div>
                )}
                
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className={cn(
                    "w-full pl-8 pr-10 py-1 text-lg bg-transparent",
                    "text-white caret-white",
                    "focus:outline-none",
                    "disabled:opacity-50",
                    language === 'ge' && 'font-georgian'
                  )}
                  placeholder=""
                />
                
                {(input.trim() || isLoading) && (
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="absolute right-0 p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white disabled:opacity-50 transition-colors"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>
            </form>
            
            {/* Keyboard hints - only show initially */}
            {!showExtras && (
              <div className="flex items-center justify-center gap-4 mt-4 text-[11px] text-white/30">
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 font-mono">↵</kbd>
                  <span>{language === 'en' ? 'search' : 'ძებნა'}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 font-mono">esc</kbd>
                  <span>{language === 'en' ? 'close' : 'დახურვა'}</span>
                </span>
              </div>
            )}
          </div>

          {/* Expandable content - only after interaction */}
          {showExtras && (
            <div className="animate-fade-in">
              {/* Divider */}
              <div className="h-px bg-white/10 mx-5" />
              
              {/* Role chips (hidden when chatting) */}
              {messages.length === 0 && (
                <div className="p-4 pt-3">
                  <p className={cn(
                    "text-[10px] text-white/50 uppercase tracking-widest mb-2.5",
                    language === 'ge' && 'font-georgian'
                  )}>
                    {language === 'en' ? 'Quick select' : 'სწრაფი არჩევანი'}
                  </p>
                  <div 
                    ref={roleChipsRef}
                    className="flex flex-wrap gap-1.5"
                    role="listbox"
                    aria-label={language === 'en' ? 'Quick select options' : 'სწრაფი არჩევანის ვარიანტები'}
                    onKeyDown={(e) => {
                      const roles = triageContent.roles;
                      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                        e.preventDefault();
                        const nextIndex = focusedRoleIndex < roles.length - 1 ? focusedRoleIndex + 1 : 0;
                        setFocusedRoleIndex(nextIndex);
                        const buttons = roleChipsRef.current?.querySelectorAll('button');
                        buttons?.[nextIndex]?.focus();
                      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                        e.preventDefault();
                        const prevIndex = focusedRoleIndex > 0 ? focusedRoleIndex - 1 : roles.length - 1;
                        setFocusedRoleIndex(prevIndex);
                        const buttons = roleChipsRef.current?.querySelectorAll('button');
                        buttons?.[prevIndex]?.focus();
                      } else if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (focusedRoleIndex >= 0 && focusedRoleIndex < roles.length) {
                          handleRoleClick(roles[focusedRoleIndex]);
                        }
                      }
                    }}
                  >
                    {triageContent.roles.map((role, index) => (
                      <button
                        key={role.id}
                        role="option"
                        aria-selected={focusedRoleIndex === index}
                        tabIndex={focusedRoleIndex === index || (focusedRoleIndex === -1 && index === 0) ? 0 : -1}
                        onClick={() => handleRoleClick(role)}
                        onFocus={() => setFocusedRoleIndex(index)}
                        className={cn(
                          "px-3 py-1.5 text-[13px] rounded-md",
                          "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25",
                          "text-white/70 hover:text-white",
                          "transition-all duration-150",
                          "focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30",
                          language === 'ge' && 'font-georgian'
                        )}
                      >
                        {language === 'en' ? role.label.en : role.label.ge}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages area */}
              {messages.length > 0 && (
                <div className="overflow-y-auto p-4 max-h-[50vh] space-y-3">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "flex",
                        msg.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm whitespace-pre-wrap",
                          msg.role === 'user'
                            ? 'bg-white/15 text-white'
                            : 'bg-white/5 text-white/90',
                          language === 'ge' && 'font-georgian'
                        )}
                      >
                        {msg.role === 'assistant' && msg.content === '' && isLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin text-white/60" />
                        ) : (
                          renderMessageContent(msg.content)
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* Suggested follow-up questions */}
                  {suggestions.length > 0 && !isLoading && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSuggestions([]);
                            handleSend(suggestion);
                          }}
                          className={cn(
                            "px-3 py-1.5 text-xs rounded-full",
                            "bg-white/10 hover:bg-white/20 border border-white/15 hover:border-white/30",
                            "text-white/70 hover:text-white",
                            "transition-all duration-150",
                            language === 'ge' && 'font-georgian'
                          )}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {error && (
                    <div className={cn(
                      "text-center text-sm text-red-400",
                      language === 'ge' && 'font-georgian'
                    )}>
                      {error}
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}

              {/* Contact us option */}
              <div className="px-4 py-3 border-t border-white/10 bg-white/[0.02] rounded-b-xl">
                <a
                  href="/contact"
                  onClick={() => {
                    handleLinkClick('/contact');
                    onOpenChange(false);
                  }}
                  className={cn(
                    "group flex items-center justify-center w-full py-2 text-sm",
                    "text-white/60 hover:text-white transition-colors",
                    language === 'ge' && 'font-georgian'
                  )}
                >
                  <span className="relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-white/60 after:origin-center after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                    {language === 'en' ? 'Contact us directly' : 'დაგვიკავშირდით პირდაპირ'}
                  </span>
                </a>
              </div>
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
      
      {/* Custom CSS for blinking cursor */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </DialogPrimitive.Root>
  );
};

export default CommandPalette;
