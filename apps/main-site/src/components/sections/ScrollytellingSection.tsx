import React, { useState } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import protestorImage from '@/assets/protestor-chemical-attack.jpg';

const ScrollytellingSection: React.FC = () => {
  const { language } = useLanguage();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 5 frames reordered: IIMG first, then void, vision, call to action
  // Frame 1: 0-0.22 (IIMG - The Inaugural Project)
  // Frame 2: 0.22-0.42 (The Void)
  // Frame 3: 0.42-0.62 (The Vision)
  // Frame 4: 0.62-0.82 (The Call)
  // Frame 5: 0.82-1.0 (Landing/CTA)

  // Frame 1: IIMG
  const opacity1 = useTransform(scrollYProgress, [0, 0.05, 0.18, 0.24], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.05, 0.24], [80, 0, -60]);
  const scale1 = useTransform(scrollYProgress, [0, 0.05, 0.24], [0.95, 1, 0.98]);
  const imgScale1 = useTransform(scrollYProgress, [0, 0.24], [1, 1.15]);
  
  // Frame 2: The Void
  const opacity2 = useTransform(scrollYProgress, [0.20, 0.28, 0.38, 0.44], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.20, 0.28, 0.44], [100, 0, -80]);
  const blur2 = useTransform(scrollYProgress, [0.20, 0.28], [10, 0]);
  
  // Frame 3: The Vision
  const opacity3 = useTransform(scrollYProgress, [0.40, 0.48, 0.58, 0.64], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.40, 0.48, 0.64], [100, 0, -80]);
  const rotateX3 = useTransform(scrollYProgress, [0.40, 0.48], [15, 0]);
  
  // Frame 4: The Stand
  const opacity4 = useTransform(scrollYProgress, [0.60, 0.68, 0.78, 0.84], [0, 1, 1, 0]);
  const y4 = useTransform(scrollYProgress, [0.60, 0.68, 0.84], [100, 0, -80]);
  
  // Frame 5: Landing
  const opacity5 = useTransform(scrollYProgress, [0.80, 0.90, 1], [0, 1, 1]);
  const y5 = useTransform(scrollYProgress, [0.80, 0.90], [120, 0]);
  const scale5 = useTransform(scrollYProgress, [0.80, 0.90], [0.9, 1]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success(language === 'ge' ? 'გმადლობთ. თქვენ რეესტრში ხართ.' : 'Thank you. You are on the registry.');
      setEmail('');
    }
  };

  return (
    <div ref={containerRef} className="relative bg-foreground text-background" style={{ height: '500vh' }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* Frame 1: The Inaugural Project - IIMG */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{ opacity: opacity1, y: y1, scale: scale1 }}
        >
          <div className="max-w-6xl w-full">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Left: Image with forensic overlay */}
              <motion.div 
                className="relative aspect-[4/3] overflow-hidden order-2 lg:order-1"
                style={{ scale: imgScale1 }}
              >
                <img 
                  src={protestorImage}
                  alt="IIMG Project"
                  className="w-full h-full object-cover"
                />
                {/* Forensic frame overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-background/60" />
                  <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-background/60" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-background/60" />
                  <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-background/60" />
                  {/* Center crosshair */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-px bg-background/40" />
                    <div className="w-px h-8 bg-background/40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                </div>
                {/* Simple gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
              </motion.div>
              
              {/* Right: Text */}
              <div className="space-y-8 order-1 lg:order-2">
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-px w-12 bg-background/40" />
                    <p className={`text-background/50 text-xs tracking-[0.25em] uppercase ${language === 'ge' ? 'font-georgian tracking-[0.15em]' : 'font-sans'}`}>
                      {language === 'ge' ? 'პირველი პროექტი' : 'Inaugural Project'}
                    </p>
                  </div>
                  
                  <h2 className={`font-display leading-[1.1] ${language === 'ge' ? 'font-georgian text-2xl md:text-3xl lg:text-4xl' : 'text-3xl md:text-4xl lg:text-5xl'}`}>
                    {language === 'ge' 
                      ? 'დამოუკიდებელი საგამოძიებო მექანიზმი საქართველოსთვის'
                      : <>The Independent<br />Investigative Mechanism<br />for Georgia</>}
                  </h2>
                </motion.div>
                
                <motion.div 
                  className="w-24 h-px bg-gradient-to-r from-background/50 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
                
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <p className={`text-lg md:text-xl text-background/70 leading-relaxed ${language === 'ge' ? 'font-georgian' : ''}`}>
                    {language === 'ge' 
                      ? 'ჩვენი ფორენზიკული ხერხემალი. მტკიცებულებების შეგროვება, დაცვა და შენახვა — რათა სამართლიანობა შესაძლებელი გახდეს.'
                      : 'Our forensic backbone. Collecting, protecting, and preserving evidence — so that justice becomes possible.'}
                  </p>
                  <p className={`text-base text-background/40 ${language === 'ge' ? 'font-georgian' : ''}`}>
                    {language === 'ge' 
                      ? 'პროექტი მალე ამოქმედდება.'
                      : 'Project launching soon.'}
                  </p>
                </motion.div>
                
                <motion.a
                  href="https://iimg.sabcho.org/en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-background/60 hover:text-background transition-colors group"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <span className={`text-sm tracking-[0.1em] uppercase ${language === 'ge' ? 'font-georgian' : 'font-sans'}`}>
                    {language === 'ge' ? 'შესვლა პორტალში' : 'Enter Portal'}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Frame 2: The Void */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{ 
            opacity: opacity2, 
            y: y2,
            filter: useTransform(blur2, (v) => `blur(${v}px)`)
          }}
        >
          <div className="max-w-4xl text-center space-y-10">
            <motion.div className="space-y-8">
              <div className="flex items-center justify-center gap-6">
                <div className="h-px w-16 bg-background/30" />
                <div className="w-1 h-1 bg-background/30" />
                <div className="h-px w-16 bg-background/30" />
              </div>
              
              <h2 className={`font-display leading-[1.15] text-background/90 ${language === 'ge' ? 'font-georgian text-2xl md:text-4xl lg:text-5xl' : 'text-3xl md:text-5xl lg:text-6xl'}`}>
                {language === 'ge' 
                  ? 'როცა ინსტიტუციები, რომლებმაც უნდა დაგვიცვან, დუმან...'
                  : 'When the institutions meant to protect us fall silent...'}
              </h2>
            </motion.div>
            
            <div className="h-px w-24 bg-background/20 mx-auto" />
            
            <p className={`text-xl md:text-2xl lg:text-3xl text-background/50 max-w-3xl mx-auto italic ${language === 'ge' ? 'font-georgian' : 'font-display'}`}>
              {language === 'ge' 
                ? '...პასუხისმგებლობა ხალხს უბრუნდება.'
                : '...the responsibility returns to the people.'}
            </p>
          </div>
        </motion.div>

        {/* Frame 3: The Vision */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{ 
            opacity: opacity3, 
            y: y3,
            rotateX: rotateX3,
            transformPerspective: 1000
          }}
        >
          <div className="max-w-5xl text-center space-y-10">
            <div className="relative">
              <h2 className={`font-display leading-[1.2] text-background relative z-10 ${language === 'ge' ? 'font-georgian text-2xl md:text-4xl lg:text-5xl' : 'text-3xl md:text-5xl lg:text-6xl'}`}>
                {language === 'ge' 
                  ? <>რაღაც ახალი იბადება.<br /><span className="text-background/60">პარალელური არქიტექტურა ჭეშმარიტებისთვის.</span><br /><span className="text-background/40">თავშესაფარი სამართლიანობისთვის.</span></>
                  : <>Something new is rising.<br /><span className="text-background/60">A parallel architecture for truth.</span><br /><span className="text-background/40">A sanctuary for justice.</span></>}
              </h2>
            </div>
            
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-background/20" />
              <motion.div 
                className="w-3 h-3 rounded-full border border-background/40"
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="h-px w-16 bg-background/20" />
            </div>
            
            <p className={`text-lg md:text-xl text-background/40 max-w-2xl mx-auto ${language === 'ge' ? 'font-georgian' : ''}`}>
              {language === 'ge' 
                ? 'სრული ხედვა მალე გამოჩნდება. მაგრამ მუშაობა ვერ დაელოდება.'
                : 'The full vision is forthcoming. But the work cannot wait.'}
            </p>
          </div>
        </motion.div>

        {/* Frame 4: The Stand */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{ opacity: opacity4, y: y4 }}
        >
          <div className="max-w-4xl text-center space-y-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className={`font-display leading-[1.1] ${language === 'ge' ? 'font-georgian text-3xl md:text-5xl lg:text-6xl' : 'text-4xl md:text-6xl lg:text-7xl'}`}>
                {language === 'ge' 
                  ? 'იდექით ჩვენთან ერთად ჩრდილში.'
                  : 'Stand with us in the shadows.'}
              </h2>
            </motion.div>
            
            <motion.div 
              className="w-32 h-px bg-gradient-to-r from-transparent via-background/40 to-transparent mx-auto"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
            
            <p className={`text-lg md:text-xl text-background/50 max-w-2xl mx-auto ${language === 'ge' ? 'font-georgian' : ''}`}>
              {language === 'ge' 
                ? 'ანგარიშვალდებულება ღირსებისკენ პირველი ნაბიჯია.'
                : 'Accountability is the first step toward dignity.'}
            </p>
          </div>
        </motion.div>

        {/* Frame 5: The Call to Action (Landing) */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{ opacity: opacity5, y: y5, scale: scale5 }}
        >
          <div className="max-w-3xl w-full space-y-14">
            {/* CTA Buttons - Center */}
            <div className="flex flex-col items-center gap-5">
              <motion.a
                href="mailto:info@sabcho.org?subject=Donation%20Inquiry"
                className="group relative overflow-hidden bg-background text-foreground px-12 py-6 text-center transition-all hover:bg-background/90 w-full max-w-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className={`text-sm tracking-[0.15em] uppercase font-sans font-medium ${language === 'ge' ? 'font-georgian tracking-[0.08em]' : ''}`}>
                  {language === 'ge' ? 'გამოძიების მხარდაჭერა' : 'Support the Investigation'}
                </span>
              </motion.a>
              
              <motion.a
                href="https://iimg.sabcho.org/en"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative border border-background/40 px-12 py-6 text-center transition-all hover:border-background hover:bg-background/5 w-full max-w-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className={`text-sm tracking-[0.15em] uppercase font-sans font-medium text-background/80 group-hover:text-background ${language === 'ge' ? 'font-georgian tracking-[0.08em]' : ''}`}>
                  {language === 'ge' ? 'IIMG პორტალში შესვლა' : 'Enter the IIMG Portal'}
                </span>
                <ArrowRight className="inline-block ml-3 w-4 h-4 text-background/60 group-hover:text-background group-hover:translate-x-1 transition-all" />
              </motion.a>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-6">
              <div className="h-px w-full max-w-[100px] bg-gradient-to-r from-transparent to-background/20" />
              <div className="w-1 h-1 rounded-full bg-background/30" />
              <div className="h-px w-full max-w-[100px] bg-gradient-to-l from-transparent to-background/20" />
            </div>

            {/* Email opt-in */}
            <div className="text-center space-y-6">
              <p className={`text-background/40 text-sm ${language === 'ge' ? 'font-georgian' : ''}`}>
                {language === 'ge' 
                  ? 'იყავით პირველი, ვინც ნახავს სრული მოძრაობის გაჩენას.'
                  : 'Be the first to see the full movement emerge.'}
              </p>
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <div className="relative flex-1 w-full">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-background/30" />
                  <Input
                    type="email"
                    placeholder={language === 'ge' ? 'ელ. ფოსტა' : 'Email Address'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent border-background/30 text-background placeholder:text-background/30 pl-11 py-5 focus:border-background/60 w-full"
                  />
                </div>
                <Button 
                  type="submit"
                  variant="outline"
                  className="border-background/40 text-background hover:bg-background hover:text-foreground px-6 py-5"
                >
                  <span className={`text-xs tracking-[0.1em] uppercase font-sans ${language === 'ge' ? 'font-georgian' : ''}`}>
                    {language === 'ge' ? 'შესვლა' : 'Join'}
                  </span>
                </Button>
              </form>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default ScrollytellingSection;