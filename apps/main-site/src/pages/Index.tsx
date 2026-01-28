import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import IIMGModal from '@/components/IIMGModal';
import { motion, AnimatePresence } from 'motion/react';
import { VideoHero, MissionStatement, ProgramBlock, VisualBreath, ClosingSection } from '@/components/homepage';
import { IIMGFeatureBlock } from '@/components/homepage/IIMGFeatureBlock';
import { useAutoDissolve } from '@/hooks/useAutoDissolve';

// Import images
import forumJusticeImg from '@/assets/forum-justice.jpg';
import stateCaptureImg from '@/assets/exposition-state-capture.jpg';
import rustaweliImg from '@/assets/rustaveli-night-protest.jpg';

import { WordmarkMasthead } from '@/components/homepage/WordmarkMasthead';

const Index: React.FC = () => {
  const { language } = useLanguage();
  const isGeorgian = language === 'ge';

  // Three-phase cinematic experience
  const { phase, showNav, navInteractive, splitTrigger, triggerSplitPhase, hideNav } = useAutoDissolve({
    delay: 3000, // 3 seconds before auto-dissolve to video
  });

  // Determine transition duration based on trigger
  const navyVeilDuration = splitTrigger === 'video-end' ? 4.0 : 2.0;

  // Light header during quote/video phases, navy header in split phase
  const isLightHeader = phase !== 'split';

  return (
    <Layout 
      hideNav={phase === 'quote' && !showNav} 
      animateNavIn={phase === 'video' || (phase === 'quote' && showNav)} 
      navInteractive={navInteractive}
      lightHeader={isLightHeader}
      logoMode={phase === 'split' ? 'wordmark' : 'none'}
    >
      <IIMGModal />

      <AnimatePresence mode="sync">
        {/* Phase 2: Full-screen Video - renders behind quote for cross-dissolve */}
        {phase !== 'split' && (
          <motion.div
            key="video-phase"
            className="fixed inset-0 bg-white z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ pointerEvents: phase === 'video' ? 'auto' : 'none' }}
          >
            {/* Full-bleed video with small header clearance */}
            <div className="absolute inset-0 pt-14 lg:pt-16">
            <VideoHero 
              language={language}
              mode="fullscreen"
              onVideoEnd={() => triggerSplitPhase('video-end')}
              onSoundInvitationClick={hideNav}
              autoPlayWithAudio={phase === 'video'}
            />
            </div>
          </motion.div>
        )}

        {/* Phase 1: Full-screen Navy Quote - renders on top, fades out to reveal video */}
        {(phase === 'quote' || phase === 'video') && (
          <motion.div
            key="quote-phase"
            className="fixed inset-0 bg-navy flex items-center z-40"
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === 'quote' ? 1 : 0 }}
            transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ pointerEvents: phase === 'quote' ? 'auto' : 'none' }}
          >
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
              <div className="max-w-5xl ml-0 md:ml-[8%] lg:ml-[10%]">
                {/* Subtle vertical accent */}
                <motion.div 
                  className="hidden lg:block w-px bg-parchment/15 absolute -left-12 top-1/2 -translate-y-1/2"
                  initial={{ height: 0 }}
                  animate={{ height: 140 }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                />
                
                <motion.h1 
                  className={`font-narrative leading-[1.05] tracking-tight text-parchment ${
                    isGeorgian 
                      ? 'font-georgian text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem]' 
                      : 'text-[2.2rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[7rem]'
                  }`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                >
                  {isGeorgian ? (
                    'ჩვენი ვალი ერთმანეთისა და ჩვენი შვილების წინაშე მიტაცებულ სახელმწიფოს არ ეპუება.'
                  ) : (
                    <>Our <strong className="font-semibold">duty</strong> to each other — and to <em className="italic">our children</em> — does not surrender to a captured state.</>
                  )}
                </motion.h1>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navy Transition Veil - the "breath" moment between video and split */}
        <motion.div
          key="navy-veil"
          className="fixed inset-0 bg-navy z-35 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: phase === 'split' ? [0, 1, 0] : 0 
          }}
          transition={{ 
            duration: navyVeilDuration, 
            times: [0, 0.35, 1], 
            ease: [0.22, 1, 0.36, 1] 
          }}
        />

        {/* Phase 3: Split Layout (Permanent) */}
        {phase === 'split' && (
          <motion.div
            key="split-phase"
            className="min-h-screen"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: splitTrigger === 'video-end' ? 3.0 : 2.2, 
              ease: [0.22, 1, 0.36, 1], 
              delay: splitTrigger === 'video-end' ? 1.0 : 0.6 
            }}
          >
            {/* Split Hero Section - Responsive: stacked on mobile, horizontal on desktop */}
            <div className="pt-7 md:pt-8 lg:pt-10 pb-3 bg-white relative">
              <div className="flex flex-col md:flex-row md:items-end">
                
                {/* Horizontal line - full bleed from left edge */}
                <motion.div 
                  className="absolute left-0 bottom-0 h-px bg-navy"
                  style={{ width: '10rem' }}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
                />
                
                {/* Mobile: Video first (top), Desktop: Quote first (left ~40%) */}
                <motion.div 
                  className="order-2 md:order-1 w-full md:w-[38%] flex items-end p-6 pb-6 md:p-0 md:pl-8 lg:pl-12 xl:pl-16 md:pb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                >
                  <div>
                    <h1 
                      className={`font-narrative leading-[1.15] tracking-tight text-navy ${
                        isGeorgian 
                          ? 'font-georgian text-[1.4rem] sm:text-[1.6rem] md:text-[1.5rem] lg:text-[1.8rem] xl:text-[2.2rem]' 
                          : 'text-[1.5rem] sm:text-[1.8rem] md:text-[1.6rem] lg:text-[1.9rem] xl:text-[2.3rem]'
                      }`}
                    >
                      {isGeorgian ? (
                        'ჩვენი ვალი ერთმანეთისა და ჩვენი შვილების წინაშე მიტაცებულ სახელმწიფოს არ ეპუება.'
                      ) : (
                        <>
                          Our <strong className="font-semibold">duty</strong> to each other<br />
                          — and to <em className="italic">our children</em> —<br />
                          does not surrender to<br />
                          a captured state.
                        </>
                      )}
                    </h1>
                  </div>
                </motion.div>
                
                {/* Vertical divider - right of text, same length as horizontal */}
                <motion.div 
                  className="hidden md:flex md:order-1 w-px bg-navy self-end ml-6 lg:ml-8 xl:ml-10 mr-6 lg:mr-8 xl:mr-10"
                  style={{ height: '10rem' }}
                  initial={{ scaleY: 0, originY: 1 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                />
                
                {/* Video - maintains 16:9 aspect ratio on all screens */}
                <motion.div 
                  className="order-1 md:order-2 w-full md:w-[55%] md:pr-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                >
                  <div className="w-full aspect-video">
                    <VideoHero 
                      language={language}
                      mode="split-right"
                      initialState={splitTrigger === 'video-end' ? 'paused-on-final' : 'playing'}
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Mission Statement Strip - Typographic Monument */}
            <motion.section 
              className="w-full bg-white pt-8 md:pt-12 lg:pt-16 pb-20 md:pb-28 lg:pb-36"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="max-w-[88%] lg:max-w-[80%] xl:max-w-[72%] mx-auto">
                {/* Single unified typographic statement */}
                <p className={`font-serif leading-[1.15] tracking-[-0.02em] text-navy ${
                  isGeorgian 
                    ? 'font-georgian text-[1.6rem] sm:text-[2rem] md:text-[2.8rem] lg:text-[3.6rem] xl:text-[4.4rem]' 
                    : 'text-[1.8rem] sm:text-[2.4rem] md:text-[3.2rem] lg:text-[4rem] xl:text-[5rem]'
                }`}>
                  {isGeorgian 
                    ? <>ჩვენ ვაშენებთ სამართლიანობის ინფრასტრუქტურას<br/><span className="italic inline-block pl-[6%] md:pl-[8%]">და ვქმნით სოლიდარობის ახალ აღთქმას.</span></>
                    : <>We are building the infrastructure for justice<br/><span className="italic inline-block pl-[6%] md:pl-[8%]">and forging a new covenant of solidarity.</span></>
                  }
                </p>
              </div>
            </motion.section>

            {/* ═══════════════════════════════════════════════════════════
                EXHIBITION ROOMS - Each with distinct spatial character
                ═══════════════════════════════════════════════════════════ */}
            
            {/* Room 1: The Institution (Monument Typography) */}
            <MissionStatement language={language} />
            
            {/* Visual Breath */}
            <VisualBreath type="rule" background="white" />
            
            {/* Room 2: Forum for Justice (80vh Takeover with gradient) */}
            <ProgramBlock
              layout="takeover"
              background="navy"
              imageSrc={forumJusticeImg}
              imageAlt="Forum for Justice - documentation of civic resistance"
              eyebrow={isGeorgian ? 'პროგრამა' : 'Program'}
              title={isGeorgian ? 'სამართლიანობის ფორუმი' : 'Forum for Justice'}
              subtitle={isGeorgian ? 'ანგარიშვალდებულების არქიტექტურა' : 'The architecture of accountability'}
              link={{ 
                href: '/justice', 
                label: isGeorgian ? 'ფორუმის შესწავლა' : 'Enter the Forum' 
              }}
              language={language}
              height="85vh"
            />
            
            {/* Visual Breath - vast white space */}
            <VisualBreath type="space" background="white" />
            
            {/* Room 3: State of Capture (Reverent Artifact) */}
            <ProgramBlock
              layout="artifact"
              background="white"
              imageSrc={stateCaptureImg}
              imageAlt="State of Capture - mapping institutional control"
              eyebrow={isGeorgian ? 'გამოძიება' : 'Investigation'}
              title={isGeorgian ? 'მიტაცების მდგომარეობა' : 'State of Capture'}
              subtitle={isGeorgian ? 'კონტროლის არქიტექტურის რუკა' : 'Mapping the architecture of control'}
              link={{ 
                href: '/state-of-capture', 
                label: isGeorgian ? 'ანგარიშის ნახვა' : 'View the Report' 
              }}
              language={language}
            />
            
            {/* Visual Breath */}
            <VisualBreath type="rule" background="white" />
            
            {/* Room 4: IIM-Georgia Feature (Asymmetric, more vertical space) */}
            <div className="py-8 md:py-12 lg:py-16">
              <IIMGFeatureBlock language={language} />
            </div>
            
            {/* Visual Breath - vast space before cinematic finale */}
            <VisualBreath type="space" background="white" />
            
            {/* Room 5: Rustaveli Project (100vh Cinematic Takeover) */}
            <ProgramBlock
              layout="takeover"
              background="black"
              imageSrc={rustaweliImg}
              imageAlt="The Rustaveli Project - civic heritage preservation"
              eyebrow={isGeorgian ? 'მემკვიდრეობა' : 'Heritage'}
              title={isGeorgian ? 'რუსთაველის პროექტი' : 'The Rustaveli Project'}
              subtitle={isGeorgian 
                ? 'სამოქალაქო მემკვიდრეობის დაცვა — მეხსიერება, ენა, ღირსება.'
                : 'Safeguarding civic inheritance — memory, language, dignity.'
              }
              link={{ 
                href: '/rustaveli', 
                label: isGeorgian ? 'პროექტის შესწავლა' : 'Enter the Project' 
              }}
              language={language}
              imageStyle="cinematic"
              imageObjectPosition="44% 20%"
              imageScale={1.12}
              height="100vh"
            />
            
            {/* Coda: Quiet Institutional Close */}
            <ClosingSection />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Index;
