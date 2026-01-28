import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface QueuedSubmission {
  id: string;
  type: 'testimony' | 'evidence';
  data: Record<string, unknown>;
  timestamp: string;
  retryCount: number;
}

const QUEUE_KEY = 'offline_submission_queue';
const MAX_RETRIES = 3;

export function useOfflineQueue() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [queue, setQueue] = useState<QueuedSubmission[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();

  // Load queue from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(QUEUE_KEY);
    if (stored) {
      try {
        setQueue(JSON.parse(stored));
      } catch {
        localStorage.removeItem(QUEUE_KEY);
      }
    }
  }, []);

  // Save queue to localStorage whenever it changes
  useEffect(() => {
    if (queue.length > 0) {
      localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
    } else {
      localStorage.removeItem(QUEUE_KEY);
    }
  }, [queue]);

  // Listen for online/offline events
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "Connection restored",
        description: "Syncing queued submissions...",
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "You're offline",
        description: "Submissions will be saved and sent when you're back online.",
        variant: "destructive",
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  // Process queue when coming back online
  useEffect(() => {
    if (isOnline && queue.length > 0 && !isSyncing) {
      processQueue();
    }
  }, [isOnline, queue.length]);

  const addToQueue = useCallback((
    type: 'testimony' | 'evidence',
    data: Record<string, unknown>
  ): string => {
    const id = crypto.randomUUID();
    const submission: QueuedSubmission = {
      id,
      type,
      data,
      timestamp: new Date().toISOString(),
      retryCount: 0,
    };
    setQueue(prev => [...prev, submission]);
    return id;
  }, []);

  const removeFromQueue = useCallback((id: string) => {
    setQueue(prev => prev.filter(item => item.id !== id));
  }, []);

  const processQueue = useCallback(async () => {
    if (isSyncing || queue.length === 0) return;
    
    setIsSyncing(true);
    const failedItems: QueuedSubmission[] = [];

    for (const item of queue) {
      try {
        if (item.type === 'testimony') {
          const { error } = await supabase
            .from('submissions')
            .insert(item.data as any);
          
          if (error) throw error;
          
          toast({
            title: "Submission synced",
            description: `Queued testimony from ${new Date(item.timestamp).toLocaleString()} has been submitted.`,
          });
        }
        // Add evidence type handling here if needed
      } catch (error) {
        console.error('Failed to sync submission:', error);
        if (item.retryCount < MAX_RETRIES) {
          failedItems.push({ ...item, retryCount: item.retryCount + 1 });
        } else {
          toast({
            title: "Submission failed",
            description: "A queued submission could not be sent after multiple attempts.",
            variant: "destructive",
          });
        }
      }
    }

    setQueue(failedItems);
    setIsSyncing(false);
  }, [queue, isSyncing, toast]);

  return {
    isOnline,
    queueLength: queue.length,
    isSyncing,
    addToQueue,
    removeFromQueue,
    processQueue,
  };
}
