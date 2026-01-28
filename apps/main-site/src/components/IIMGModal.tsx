import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import iimgPhoto from "@/assets/forum-user-photo-alt.jpg";
import BrandWordmark from "@/components/ui/brand-wordmark";

export interface IIMGModalRef {
  open: () => void;
}

const IIMGModal = forwardRef<IIMGModalRef>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isGeorgian, getAlternateLanguagePath } = useLanguage();

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true)
  }));

  useEffect(() => {
    const hasSeenIIMG = localStorage.getItem("ccg-iimg-seen");
    
    if (!hasSeenIIMG) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleEnterSite = (lang: 'en' | 'ge') => {
    localStorage.setItem("ccg-iimg-seen", "true");
    // Navigate to appropriate language version
    window.location.href = lang === 'ge' ? '/ge' : '/';
  };

  const handleGoToIIMG = () => {
    localStorage.setItem("ccg-iimg-seen", "true");
    window.open("https://iimg.sabcho.org/en", "_blank");
    setIsOpen(false);
  };

  const handleClose = () => {
    localStorage.setItem("ccg-iimg-seen", "true");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (!open ? handleClose() : undefined)}>
      <DialogContent className="fixed inset-3 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-[calc(100vw-1.5rem)] sm:w-[92vw] md:w-[88vw] sm:max-w-5xl p-0 overflow-hidden border-0 bg-foreground text-background [&>button]:hidden h-[calc(100vh-1.5rem)] sm:h-[85vh] flex flex-col">
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label={isGeorgian ? "დახურვა" : "Close"}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 z-20 text-background/60 hover:text-background transition-colors font-serif leading-none text-xl sm:text-2xl"
        >
          ×
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="flex flex-col md:flex-row h-full min-h-0 flex-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              {/* Mobile Header Image */}
              <motion.div
                className="md:hidden w-full h-20 sm:h-28 relative overflow-hidden flex-shrink-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <img
                  src={iimgPhoto}
                  alt="IIMG"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/30 to-foreground" />
              </motion.div>

              {/* Tablet/Desktop Image Section */}
              <motion.div
                className="hidden md:flex md:w-[38%] lg:w-[45%] relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <img
                  src={iimgPhoto}
                  alt="IIMG"
                  className="w-full h-full object-cover absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/20 to-transparent" />
              </motion.div>

              {/* Content + Actions wrapper for mobile */}
              <div className="w-full md:w-[62%] lg:w-[55%] flex flex-col flex-1 min-h-0">
                
                {/* Scrollable Content Section */}
                <div className="p-4 sm:p-6 md:p-8 lg:p-10 pb-4 md:pb-8 flex flex-col gap-4 sm:gap-5 md:gap-6 overflow-y-auto overscroll-contain flex-1 min-h-0">
                  
                  {/* Header */}
                  <motion.div 
                    className="space-y-4 sm:space-y-6"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <motion.div 
                        className="w-6 sm:w-10 h-px bg-background/30"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      />
                      <BrandWordmark variant="cream" size="sm" />
                    </div>
                    
                    {/* Title */}
                    <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 md:gap-8">
                      <motion.h1 
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display leading-none tracking-tight"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      >
                        IIMG
                      </motion.h1>
                      <motion.div 
                        className="hidden sm:block w-px h-10 md:h-14 lg:h-18 bg-gradient-to-b from-background/40 via-background/20 to-transparent flex-shrink-0"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                      />
                      <div className="sm:pt-1">
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-background font-light leading-tight tracking-wide">
                          Independent Investigative<br />Mechanism for Georgia
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 md:gap-8 mt-2 sm:mt-4">
                      <p className="font-georgian text-[11px] sm:text-xs md:text-sm lg:text-base text-background/50 leading-relaxed sm:flex-1">
                        სახელმწიფო დანაშაულების, სისტემური ძალადობისა და ქიმიური აგენტების გამოყენების სპეციალური მანდატი
                      </p>
                      <motion.div 
                        className="hidden sm:block w-px bg-gradient-to-b from-background/20 via-background/10 to-transparent flex-shrink-0"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                      />
                      <p className="text-[11px] sm:text-xs md:text-sm lg:text-base text-background/70 leading-relaxed font-light sm:flex-1">
                        Special Mandate on State Crimes, Systemic Violence, and the Use of Chemical Agents
                      </p>
                    </div>
                  </motion.div>

                  {/* Desktop/Tablet CTA - hidden on mobile */}
                  <motion.div 
                    className="hidden md:block py-4 lg:py-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <button 
                      onClick={handleGoToIIMG}
                      className="group w-full py-3 lg:py-5 px-5 lg:px-8 bg-background text-foreground hover:bg-background/90 transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3 lg:gap-4 text-left">
                        <span className="font-georgian text-sm lg:text-base">მტკიცებულების წარდგენა</span>
                        <span className="w-px h-4 lg:h-5 bg-foreground/20" />
                        <span className="text-sm lg:text-base">Submit Evidence</span>
                      </div>
                      <ExternalLink className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </motion.div>

                  {/* Horizontal divider - desktop only */}
                  <motion.div 
                    className="hidden md:block h-px bg-background/10"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  />

                  {/* Desktop/Tablet Enter Site - hidden on mobile */}
                  <motion.div 
                    className="hidden md:block pt-4 lg:pt-6 space-y-3 lg:space-y-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <p className="text-[10px] lg:text-xs tracking-[0.15em] lg:tracking-[0.2em] uppercase text-background/40 text-center">
                      <span className="font-georgian">საიტზე შესვლა</span>
                      <span className="mx-2 lg:mx-3">·</span>
                      <span>Enter Website</span>
                    </p>
                    
                    <div className="flex gap-3 lg:gap-4">
                      <motion.button
                        onClick={() => handleEnterSite('ge')}
                        className="flex-1 group py-2.5 lg:py-4 px-4 lg:px-6 border border-background/20 hover:border-background hover:bg-background hover:text-foreground transition-all flex items-center justify-center gap-2 lg:gap-3"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-base lg:text-lg font-georgian">ქართული</span>
                        <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.button>
                      
                      <div className="w-px bg-background/10" />
                      
                      <motion.button
                        onClick={() => handleEnterSite('en')}
                        className="flex-1 group py-2.5 lg:py-4 px-4 lg:px-6 border border-background/20 hover:border-background hover:bg-background hover:text-foreground transition-all flex items-center justify-center gap-2 lg:gap-3"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-base lg:text-lg">English</span>
                        <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.button>
                    </div>
                  </motion.div>

                </div>

                {/* Mobile Sticky Bottom Action Bar */}
                <motion.div 
                  className="md:hidden flex-shrink-0 border-t border-background/10 bg-foreground p-3 sm:p-4 space-y-3"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {/* Submit Evidence Button */}
                  <button 
                    onClick={handleGoToIIMG}
                    className="group w-full py-3 px-4 bg-background text-foreground hover:bg-background/90 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2 text-left">
                      <span className="font-georgian text-xs sm:text-sm">მტკიცებულების წარდგენა</span>
                      <span className="w-px h-3 bg-foreground/20" />
                      <span className="text-xs sm:text-sm">Submit Evidence</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                  </button>

                  {/* Enter Website Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEnterSite('ge')}
                      className="flex-1 py-2.5 px-3 border border-background/30 hover:border-background hover:bg-background hover:text-foreground transition-all flex items-center justify-center gap-1.5"
                    >
                      <span className="text-sm font-georgian">ქართული</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    
                    <button
                      onClick={() => handleEnterSite('en')}
                      className="flex-1 py-2.5 px-3 border border-background/30 hover:border-background hover:bg-background hover:text-foreground transition-all flex items-center justify-center gap-1.5"
                    >
                      <span className="text-sm">English</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
});

IIMGModal.displayName = 'IIMGModal';

export default IIMGModal;
