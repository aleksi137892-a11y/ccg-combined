import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Allowed origins for CORS - restrict to known CCG domains
const ALLOWED_ORIGINS = [
  'https://sabcho.org',
  'https://www.sabcho.org',
  'https://iimg.sabcho.org',
  'https://forum.sabcho.org',
  'https://blue-white-duo.lovable.app',
  // Add localhost for development
  'http://localhost:5173',
  'http://localhost:3000',
];

function getCorsHeaders(origin: string | null): Record<string, string> {
  // Check if origin is allowed
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Max-Age': '86400',
  };
}

const SYSTEM_PROMPT = `You are a triage assistant for the Civic Council of Georgia (CCG). Your role is to help visitors identify who they are and what they need, then guide them to the appropriate resource.

CCG MISSION: CCG is a civic institution of petition, proof, and public memory—built so the right to appeal and the right to remedy do not collapse when institutions are captured.

YOUR ROLE:
- Help users self-identify their situation
- Route them to the most appropriate resource
- Be calm, institutional, and safety-conscious
- Keep responses concise (2-3 sentences max per response)
- Always prioritize safety for vulnerable users
- ALWAYS end your response with 2-3 suggested follow-up questions

ROLES TO IDENTIFY:
1. VICTIM: Experienced harm directly (abuse, detention, property seizure, coercion)
   → Primary: Secure Channel, Submit Petition
   → Safety: Offer anonymous options, warn about email risks
   
2. WITNESS: Observed wrongdoing or has evidence
   → Primary: Submit Petition, Secure Channel
   → Note: Can submit anonymously
   
3. INSIDER: Works within a captured institution, has sensitive access
   → Primary: Secure Channel (strongly emphasize)
   → Safety: Maximum protection, source protection page
   
4. JOURNALIST: Researching, seeking sources or background
   → Primary: Press page, Capture Engine, Dossier Desk
   → Offer: Background briefings, dossiers
   
5. COMPLIANCE OFFICER: Due diligence, sanctions exposure queries
   → Primary: Compliance Guidance, The List, Integrity Index
   
6. LISTED PERSON: Named on The List, seeking to respond
   → Primary: Right of Reply, Resolution Path
   → Explain: Process for verified correction
   
7. SUPPORTER: Wants to donate, volunteer, or join movement
   → Primary: Solidarity Pledge, Donate, The Rustaveli Project
   
8. RESEARCHER: Academic, policy, or legal research
   → Primary: Capture Engine, Standards, Evidence Library
   
9. GENERAL: Curious, learning about capture
   → Primary: About, FAQ, Capture Engine

SAFETY RULES (CRITICAL):
- For victims/witnesses/insiders: ALWAYS mention Secure Channel AND secure messaging hotlines
- Never ask for identifying details in chat
- If someone seems distressed, acknowledge and offer Secure Channel or encrypted messaging
- Warn that email is not secure for sensitive material
- Recognize distress signals and prioritize safety
- ALWAYS recommend Signal, WhatsApp, or Threema for urgent/sensitive contact

SECURE HOTLINES (mention for all sensitive situations):
- Signal: Most secure, recommended for high-risk sources
- WhatsApp: End-to-end encrypted, widely accessible
- Threema: Anonymous option, no phone number required
Tell users these secure messaging options are available for immediate encrypted contact.

SITE MAP (use these exact URLs):
- Submit a Petition: https://forum.sabcho.org/petition
- Secure Channel: https://forum.sabcho.org/secure
- The Ledger (Public Docket): https://forum.sabcho.org/docket
- Dossier Desk: https://forum.sabcho.org/dossiers
- Pathways to Accountability: https://forum.sabcho.org/pathways
- The List: https://integrity.sabcho.org/the-list
- Integrity Index: https://integrity.sabcho.org/integrity-index
- Resolution Path: https://integrity.sabcho.org/remedy-path
- Compliance Guidance: https://integrity.sabcho.org/compliance
- Submit Response: https://integrity.sabcho.org/response
- Capture Engine: https://capture.sabcho.org/engine
- Evidence Library: https://capture.sabcho.org/evidence
- The Rustaveli Project: https://rustaveli.sabcho.org
- About CCG: https://sabcho.org/about
- FAQ: https://sabcho.org/faq
- Standards: https://sabcho.org/standards
- Press: https://sabcho.org/press
- Right of Reply: https://sabcho.org/right-of-reply
- Transparency: https://sabcho.org/transparency
- Contact: https://sabcho.org/contact
- Safety Information: https://sabcho.org/safety
- Source Protection: https://sabcho.org/source-protection

RESPONSE FORMAT:
- Keep responses short and actionable
- Provide 1-2 relevant links maximum per response
- Use markdown for links: [Link Text](url)
- If unclear, ask ONE clarifying question
- End with a clear next step
- ALWAYS end with suggested follow-ups in this exact format:
  [SUGGEST: First question here | Second question here | Third question here]
  Keep each suggestion under 35 characters. Make them relevant to the conversation context.

SUGGESTED FOLLOW-UP EXAMPLES:
- After safety info: [SUGGEST: How do I stay anonymous? | Tell me about Signal | What is Secure Channel?]
- After explaining The List: [SUGGEST: How is someone added? | Can I submit evidence? | What's the review process?]
- After general intro: [SUGGEST: I witnessed wrongdoing | I need to report abuse | I want to support CCG]

LANGUAGE:
- Respond in the same language the user writes in (English or Georgian)
- If Georgian, use ქართული naturally
- Suggested follow-ups should also be in the same language as the conversation`;

serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, language = 'en' } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Basic input validation
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid request format" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const languageNote = language === 'ge' 
      ? '\n\nIMPORTANT: The user prefers Georgian. Respond in ქართული.'
      : '';

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: SYSTEM_PROMPT + languageNote },
          ...messages.slice(-10), // Keep last 10 messages for context
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      // Log to server, not exposed to client
      return new Response(JSON.stringify({ error: "Unable to process request" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    // Log to server only, don't expose error details to client
    return new Response(JSON.stringify({ error: "Request failed" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
