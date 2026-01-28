import { WifiOff, CloudOff, Loader2, RefreshCw } from 'lucide-react';
import { useOfflineQueue } from '@/hooks/use-offline-queue';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function OfflineIndicator() {
  const { isOnline, queueLength, isSyncing, processQueue } = useOfflineQueue();

  const handleRetry = () => {
    if (!isSyncing && isOnline && queueLength > 0) {
      processQueue();
    }
  };

  return (
    <AnimatePresence>
      {(!isOnline || queueLength > 0) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-3 py-2 px-4 text-sm font-medium"
          style={{
            backgroundColor: isOnline ? 'hsl(var(--primary))' : 'hsl(var(--destructive))',
            color: isOnline ? 'hsl(var(--primary-foreground))' : 'hsl(var(--destructive-foreground))',
          }}
        >
          {!isOnline ? (
            <>
              <WifiOff className="h-4 w-4" />
              <span>You're offline — submissions will be saved locally</span>
            </>
          ) : isSyncing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Syncing {queueLength} queued submission{queueLength !== 1 ? 's' : ''}...</span>
            </>
          ) : queueLength > 0 ? (
            <>
              <CloudOff className="h-4 w-4" />
              <span>{queueLength} submission{queueLength !== 1 ? 's' : ''} pending</span>
              <Button
                size="sm"
                variant="secondary"
                onClick={handleRetry}
                className="h-6 px-2 text-xs gap-1"
              >
                <RefreshCw className="h-3 w-3" />
                Retry now
              </Button>
            </>
          ) : null}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
