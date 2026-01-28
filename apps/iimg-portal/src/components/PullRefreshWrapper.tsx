import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Loader2 } from "lucide-react";
import { usePullRefresh } from "@/hooks/use-pull-refresh";
import { useHaptic } from "@/hooks/use-haptic";

interface PullRefreshWrapperProps {
  children: ReactNode;
  onRefresh: () => Promise<void> | void;
  className?: string;
}

export const PullRefreshWrapper = ({
  children,
  onRefresh,
  className = "",
}: PullRefreshWrapperProps) => {
  const haptic = useHaptic();
  
  const handleRefresh = async () => {
    haptic.medium();
    await onRefresh();
  };

  const { pullDistance, isRefreshing, handlers } = usePullRefresh({
    onRefresh: handleRefresh,
    threshold: 80,
    maxPull: 120,
  });

  const progress = Math.min(pullDistance / 80, 1);
  const shouldTrigger = pullDistance >= 80;

  return (
    <div className={`relative ${className}`} {...handlers}>
      {/* Pull indicator */}
      <motion.div
        className="absolute left-0 right-0 flex justify-center items-center pointer-events-none z-50"
        style={{
          top: pullDistance > 0 ? pullDistance - 50 : -50,
          opacity: pullDistance > 10 ? 1 : 0,
        }}
        animate={{
          opacity: pullDistance > 10 ? 1 : 0,
        }}
        transition={{ duration: 0.1 }}
      >
        <div className="bg-background/95 backdrop-blur-sm rounded-full p-3 shadow-lg border border-border/50">
          {isRefreshing ? (
            <Loader2 className="h-5 w-5 text-foreground animate-spin" />
          ) : (
            <motion.div
              animate={{
                rotate: shouldTrigger ? 180 : progress * 180,
              }}
              transition={{ duration: 0.15 }}
            >
              <ArrowDown 
                className={`h-5 w-5 transition-colors ${
                  shouldTrigger ? "text-primary" : "text-muted-foreground"
                }`} 
              />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Content with pull transform */}
      <motion.div
        style={{
          transform: `translateY(${pullDistance}px)`,
        }}
        transition={{ duration: 0 }}
      >
        {children}
      </motion.div>
    </div>
  );
};
