import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Package, Droplet, Sun, Camera, Shield, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface AccordionItemProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
  delay?: number;
}

const AccordionItem = ({ icon, title, content, isOpen, onToggle, delay = 0 }: AccordionItemProps) => {
  return (
    <motion.div 
      className="border-b border-border/50 last:border-b-0"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left hover:bg-muted/30 transition-colors px-3 -mx-3 rounded-sm"
      >
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground">{icon}</span>
          <span className="font-medium text-foreground text-sm sm:text-base">{title}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-sm text-muted-foreground pb-4 pl-9 pr-3 leading-relaxed">
              {content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const PreservationAccordion = () => {
  const { t } = useLanguage();
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const items = [
    {
      id: "dry",
      icon: <Package className="h-4 w-4" />,
      title: t.intake?.dryEvidence || "Dry Items (Clothing, Soil, Fragments)",
      content: t.intake?.dryEvidenceDesc || "Place in a clean glass jar or heavy-duty sealable bag. Do not wash, clean, or shake off debris. Label with date, time, and location where found. Use a permanent marker on tape—do not write directly on evidence. If clothing, fold inward to preserve any residue on exterior surfaces."
    },
    {
      id: "liquid",
      icon: <Droplet className="h-4 w-4" />,
      title: t.intake?.liquidEvidence || "Liquid Samples",
      content: t.intake?.liquidEvidenceDesc || "Use a glass container with a secure, airtight lid. Avoid plastic if possible—certain compounds react with plastic. Store upright in a cool, dark place. Do not refrigerate unless specifically instructed. Label clearly: date, time, location, and what the liquid is (water from area, residue, etc.)."
    },
    {
      id: "environmental",
      icon: <Sun className="h-4 w-4" />,
      title: t.intake?.avoidSunlight || "Environmental Conditions",
      content: t.intake?.avoidSunlightDesc || "Store all evidence away from direct sunlight, heat sources, and humidity. UV light and heat can degrade chemical residue and biological material. A cool, dark closet or drawer is preferable. Do not store near food, cleaning products, or strong-smelling substances that could contaminate samples."
    },
    {
      id: "documentation",
      icon: <Camera className="h-4 w-4" />,
      title: t.intake?.shadowPhoto || "On-Site Documentation",
      content: t.intake?.shadowPhotoDesc || "Before moving any item, photograph it in place from multiple angles. Use the Save app if available—it captures GPS coordinates and timestamps automatically. Include a reference object for scale (coin, ruler, pen). Document the surrounding area. Note weather conditions if outdoors. Record any unusual smells or observations in writing."
    },
    {
      id: "safety",
      icon: <AlertTriangle className="h-4 w-4" />,
      title: t.intake?.safetyFirst || "Safety & Personal Protection",
      content: t.intake?.safetyFirstDesc || "Your safety is paramount. Wear disposable gloves if available—latex or nitrile, not fabric. If you suspect chemical contamination, use a mask and work in a ventilated area. Do not smell or taste any substance. Store items away from living and sleeping areas. If you experience symptoms (burning, nausea, headache), distance yourself and seek medical attention. Wash hands thoroughly after handling."
    },
    {
      id: "general",
      icon: <Shield className="h-4 w-4" />,
      title: "General Guidance",
      content: "Do not attempt to clean, wash, or alter any evidence. Do not transport materials yourself or send via conventional mail. Keep items in your personal possession until a retrieval plan is established with our team. Contact us through secure channels before taking any action. Chain of custody begins the moment evidence is collected—every handling must be documented."
    }
  ];

  return (
    <motion.div 
      className="mt-6 bg-muted/20 rounded-lg border border-border/50 px-4 py-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <motion.h3 
        className="text-xs uppercase tracking-widest text-muted-foreground font-medium py-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Preservation Protocol
      </motion.h3>
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          icon={item.icon}
          title={item.title}
          content={item.content}
          isOpen={openItems.has(item.id)}
          onToggle={() => toggleItem(item.id)}
          delay={0.1 * (index + 1)}
        />
      ))}
    </motion.div>
  );
};