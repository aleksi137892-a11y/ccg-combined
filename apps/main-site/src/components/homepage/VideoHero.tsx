import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, MotionValue } from 'motion/react';
import { Volume2, VolumeX, RotateCcw, Play, Pause } from 'lucide-react';
import heroVideo from '@/assets/hero-video.mp4';

interface VideoHeroProps {
  opacity?: MotionValue<number> | number;
  scale?: MotionValue<number> | number;
  language: string;
  mode?: 'fullscreen' | 'split-right';
  onVideoEnd?: () => void;
  onSoundInvitationClick?: () => void;
  showScrollHint?: boolean;
  autoPlayWithAudio?: boolean;
  // For split-right mode: controls whether video loops or pauses on final frame
  initialState?: 'playing' | 'paused-on-final';
}

const VideoHero: React.FC<VideoHeroProps> = ({ 
  opacity = 1, 
  scale = 1, 
  language, 
  mode = 'fullscreen',
  onVideoEnd,
  onSoundInvitationClick,
  showScrollHint = false,
  autoPlayWithAudio = false,
  initialState = 'playing'
}) => {
  const [videoEnded, setVideoEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoRotated, setIsVideoRotated] = useState(false);
  const [showSoundInvitation, setShowSoundInvitation] = useState(true);
  const [isPlaying, setIsPlaying] = useState(initialState === 'playing');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle sound invitation click - unmutes, hides invitation, and notifies parent
  const handleSoundInvitationClick = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
    }
    setShowSoundInvitation(false);
    onSoundInvitationClick?.();
  };

  // Handle play/pause toggle for split-right mode
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Detect orientation on mobile for fullscreen mode
  useEffect(() => {
    // Always run the hook, but only set up listeners for fullscreen mode
    if (mode !== 'fullscreen') {
      // Still set default values for non-fullscreen mode
      setIsPortrait(false);
      setIsMobile(false);
      setIsVideoRotated(false);
      return;
    }

    const checkOrientation = () => {
      const portrait = window.innerHeight > window.innerWidth;
      const mobile = window.innerWidth < 768;
      setIsPortrait(portrait);
      setIsMobile(mobile);
      // Reset rotation if user physically rotates phone to landscape
      if (!portrait) {
        setIsVideoRotated(false);
      }
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, [mode]);

  // Handle paused-on-final state for split-right mode
  useEffect(() => {
    if (mode === 'split-right' && initialState === 'paused-on-final' && videoRef.current) {
      // Pause video at end when in paused-on-final state
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [mode, initialState]);

  const isMotionValue = (val: unknown): val is MotionValue => {
    return typeof val === 'object' && val !== null && 'get' in val;
  };

  const opacityStyle = isMotionValue(opacity) ? { opacity } : { opacity };
  const scaleStyle = isMotionValue(scale) ? { scale } : { scale };

  const handleVideoEnd = () => {
    if (onVideoEnd && !videoEnded) {
      setVideoEnded(true);
      onVideoEnd();
    }
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (videoRef.current) {
      videoRef.current.muted = newMutedState;
    }
    // Hide nav when unmuting (turning sound on)
    if (!newMutedState) {
      onSoundInvitationClick?.();
    }
  };

  // Split layout: video in right section
  if (mode === 'split-right') {
    const shouldLoop = initialState === 'playing';
    
    return (
      <motion.div 
        className="w-full h-full flex items-center justify-center bg-navy/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            src={heroVideo}
            autoPlay={shouldLoop}
            muted={isMuted}
            loop={shouldLoop}
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Cinematic still overlay - subtle vignette when paused */}
          <AnimatePresence>
            {!isPlaying && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-navy/15 via-transparent to-navy/10 pointer-events-none z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </AnimatePresence>
          
          {/* Control buttons row - bottom right */}
          <motion.div 
            className="absolute bottom-4 right-4 flex items-center gap-2 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            {/* Play/Pause button - always visible */}
            <motion.button
              className="p-2 text-background/60 hover:text-background transition-colors duration-300 bg-foreground/20 hover:bg-foreground/40 rounded-full backdrop-blur-sm"
              onClick={togglePlayPause}
              aria-label={isPlaying ? (language === 'ge' ? 'პაუზა' : 'Pause') : (language === 'ge' ? 'ჩართვა' : 'Play')}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" strokeWidth={1.5} />
              ) : (
                <Play className="w-4 h-4" strokeWidth={1.5} />
              )}
            </motion.button>
            
            {/* Mute/Unmute button */}
            <motion.button
              className="p-2 text-background/60 hover:text-background transition-colors duration-300 bg-foreground/20 hover:bg-foreground/40 rounded-full backdrop-blur-sm"
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" strokeWidth={1.5} />
              ) : (
                <Volume2 className="w-4 h-4" strokeWidth={1.5} />
              )}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Default fullscreen mode - true full-bleed
  return (
    <motion.section
      className="absolute inset-0 bg-white overflow-hidden"
      style={opacityStyle}
    >
      <motion.div 
        className="absolute inset-0"
        style={scaleStyle}
      >
        <video
          ref={videoRef}
          src={heroVideo}
          autoPlay
          muted={isMuted}
          playsInline
          className={
            isVideoRotated && isPortrait && isMobile
              ? "absolute left-1/2 top-1/2 w-[100vh] h-[100vw] -translate-x-1/2 -translate-y-1/2 rotate-90 object-cover"
              : "absolute inset-0 w-full h-full object-cover"
          }
          onEnded={handleVideoEnd}
        />
        
        {/* Rotate video option for mobile portrait */}
        {isPortrait && isMobile && !isVideoRotated && (
          <motion.button
            className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 text-background/80 hover:text-background transition-colors duration-300 bg-foreground/30 hover:bg-foreground/50 rounded-full backdrop-blur-sm z-20"
            onClick={() => setIsVideoRotated(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            aria-label={language === 'ge' ? 'ვიდეოს მობრუნება' : 'Rotate video'}
          >
            <RotateCcw className="w-4 h-4" strokeWidth={1.5} />
            <span className="text-[10px] tracking-widest uppercase font-ui">
              {language === 'ge' ? 'მობრუნება' : 'Rotate'}
            </span>
          </motion.button>
        )}
        
        {/* Rotate back button when video is rotated */}
        {isVideoRotated && isPortrait && isMobile && (
          <motion.button
            className="absolute top-4 left-4 p-2 text-background/60 hover:text-background transition-colors duration-300 bg-foreground/20 hover:bg-foreground/40 rounded-full backdrop-blur-sm z-20"
            onClick={() => setIsVideoRotated(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            aria-label={language === 'ge' ? 'უკან დაბრუნება' : 'Rotate back'}
          >
            <RotateCcw className="w-4 h-4 -rotate-90" strokeWidth={1.5} />
          </motion.button>
        )}
        
        {/* Pulsing sound invitation - rectangular box with all caps */}
        <AnimatePresence>
          {autoPlayWithAudio && isMuted && showSoundInvitation && (
            <motion.button
              className="absolute bottom-1/3 left-1/2 -translate-x-1/2 z-20 px-8 py-4 border border-background/50 backdrop-blur-sm bg-foreground/10"
              onClick={handleSoundInvitationClick}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                borderColor: ['rgba(255,255,255,0.4)', 'rgba(255,255,255,0.7)', 'rgba(255,255,255,0.4)']
              }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ 
                opacity: { delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                borderColor: { repeat: Infinity, duration: 2, ease: "easeInOut" }
              }}
              aria-label={language === 'ge' ? 'ხმის ჩართვა' : 'Tap for sound'}
            >
              <span className="text-sm md:text-base tracking-[0.3em] uppercase text-background/90 font-ui">
                {language === 'ge' ? 'ხმის ჩართვა' : 'TAP FOR SOUND'}
              </span>
            </motion.button>
          )}
        </AnimatePresence>
        
        {/* Mute/Unmute button - shows after user has interacted or if invitation dismissed */}
        <AnimatePresence>
          {(!showSoundInvitation || !autoPlayWithAudio) && (
            <motion.div 
              className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-10 lg:right-12 flex items-center gap-4 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.button
                className="p-2 text-background/60 hover:text-background transition-colors duration-300 bg-foreground/20 hover:bg-foreground/40 rounded-full backdrop-blur-sm"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                ) : (
                  <Volume2 className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};

export default VideoHero;
