import { useEffect } from "react";
import { motion } from "motion/react";
import Layout from "@/components/layout/Layout";
import { viewportOnce } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { ProgramNav } from "@/components/layout/ProgramNav";
import JumpToNav from "@/components/institutional/JumpToNav";
import { ExpandableSection } from "@/components/ui/expandable-section";
import { 
  ForumPipelineDiagram,
  SanctionsWorldMap,
  UniversalJurisdictionMap,
  PathwayTabs,
  FloatingCardStack,
  RemedyGallery,
  TriageMatrix,
  CommitmentsAccordion,
  FloatingIIMGBlock
} from "@/components/forum";
import { forumArchitectureContent } from "@/data/forumArchitectureContent";
import iimgPhoto from '@/assets/forum-user-photo-alt.jpg';

const Justice = () => {
  const { language, isGeorgian } = useLanguage();
  const content = forumArchitectureContent;

  useEffect(() => {
    document.title = isGeorgian 
      ? "სამართლიანობის ფორუმი | საბჭო" 
      : "Forum for Justice | Sabcho";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", 
        isGeorgian ? content.meta.introGe : content.meta.intro
      );
    }
  }, [isGeorgian, content.meta]);

  const jumpToItems = [
    { id: 'foundations', label: 'Foundations', labelGe: 'საფუძვლები' },
    { id: 'architecture', label: 'Architecture', labelGe: 'არქიტექტურა' },
    { id: 'appeal', label: 'Appeal', labelGe: 'აპელაცია' },
    { id: 'iimg', label: 'IIMG', labelGe: 'IIMG' },
    { id: 'record', label: 'Record', labelGe: 'ჩანაწერი' },
    { id: 'remedy', label: 'Remedy', labelGe: 'გამოსწორება' },
    { id: 'triage', label: 'Triage', labelGe: 'ტრიაჟი' },
    { id: 'commitments', label: 'Commitments', labelGe: 'ვალდებულებები' }
  ];

  return (
    <Layout>
      <article className="min-h-screen">
        {/* Hero */}
        <header className="bg-navy text-white border-b border-white/10">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="font-sans text-xs uppercase tracking-[0.2em] text-white/50 mb-6"
              >
                {isGeorgian ? content.meta.institutionGe : content.meta.institution} — {isGeorgian ? content.meta.dateGe : content.meta.date}
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={cn(
                  "font-narrative text-4xl md:text-5xl lg:text-6xl text-white mb-4",
                  isGeorgian && "font-georgian"
                )}
              >
                {isGeorgian ? content.meta.titleGe : content.meta.title}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={cn(
                  "font-serif text-xl text-white/80 leading-relaxed max-w-3xl",
                  isGeorgian && "font-georgian"
                )}
              >
                {isGeorgian ? content.meta.introGe : content.meta.intro}
              </motion.p>
            </div>
          </div>
        </header>

        <JumpToNav items={jumpToItems} sticky />

        {/* FOUNDATIONS */}
        <section id="foundations" className="py-section-generous bg-navy text-white border-b border-white/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportOnce}
                className="font-sans text-xs uppercase tracking-[0.18em] text-white/50 mb-12">
                {isGeorgian ? 'საფუძვლები' : 'Foundations'}
              </motion.h2>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} className="mb-12 pb-12 border-b border-white/10">
                <h3 className={cn("font-narrative text-2xl md:text-3xl text-white mb-6", isGeorgian && "font-georgian")}>
                  {isGeorgian ? content.foundations.rightToRemedy.titleGe : content.foundations.rightToRemedy.title}
                </h3>
                <p className={cn("font-serif text-lg text-white/70 leading-[1.85] mb-6 max-w-[55ch]", isGeorgian && "font-georgian")}>
                  {isGeorgian ? content.foundations.rightToRemedy.leadGe : content.foundations.rightToRemedy.lead}
                </p>
                <p className={cn("font-serif text-sm text-white/50 italic whitespace-pre-line pl-4 border-l border-white/20", isGeorgian && "font-georgian")}>
                  {isGeorgian ? content.foundations.rightToRemedy.declarationGe : content.foundations.rightToRemedy.declaration}
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}>
                <h3 className={cn("font-narrative text-2xl md:text-3xl text-white mb-6", isGeorgian && "font-georgian")}>
                  {isGeorgian ? content.foundations.civicNecessity.titleGe : content.foundations.civicNecessity.title}
                </h3>
                <p className={cn("font-serif text-lg text-white/70 leading-[1.85] mb-6 max-w-[55ch]", isGeorgian && "font-georgian")}>
                  {isGeorgian ? content.foundations.civicNecessity.leadGe : content.foundations.civicNecessity.lead}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ARCHITECTURE - Interactive Pipeline */}
        <section id="architecture" className="py-section-intimate bg-navy text-white border-b border-white/10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto mb-10">
              <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportOnce}
                className="font-sans text-xs uppercase tracking-[0.18em] text-white/50 mb-4 text-center">
                {isGeorgian ? 'არქიტექტურა' : 'The Architecture'}
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}
                className={cn("font-serif text-base text-white/60 leading-relaxed max-w-[50ch] mx-auto text-center mb-10", isGeorgian && "font-georgian")}>
                {isGeorgian ? content.architecture.descriptionGe : content.architecture.description}
              </motion.p>
            </div>
            <ForumPipelineDiagram className="max-w-6xl mx-auto" />
          </div>
        </section>

        {/* APPEAL - Tabbed Pathways */}
        <section id="appeal" className="py-section-generous bg-navy text-white border-b border-white/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportOnce}
                className="font-sans text-xs uppercase tracking-[0.18em] text-white/50 mb-4">
                {isGeorgian ? content.appeal.titleGe : content.appeal.title}
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}
                className={cn("font-narrative text-2xl md:text-3xl text-white mb-12", isGeorgian && "font-georgian")}>
                {isGeorgian ? content.appeal.leadGe : content.appeal.lead}
              </motion.p>
              <PathwayTabs className="mb-12" />
              <div className="space-y-4 pt-8 border-t border-white/10">
                <ExpandableSection summary={content.appeal.security.title} summaryGe={content.appeal.security.titleGe}>
                  <p className={cn("font-serif text-base text-white/60 leading-relaxed", isGeorgian && "font-georgian")}>
                    {isGeorgian ? content.appeal.security.contentGe : content.appeal.security.content}
                  </p>
                </ExpandableSection>
              </div>
            </div>
          </div>
        </section>

        {/* IIMG - Floating Block */}
        <section id="iimg" className="bg-navy border-b border-white/10">
          <div className="container mx-auto px-4 py-section-generous">
            <FloatingIIMGBlock imageSrc={iimgPhoto} />
          </div>
        </section>

        {/* RECORD - Floating Card Stack */}
        <section id="record" className="py-section-generous bg-navy text-white border-b border-white/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mb-12">
              <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportOnce}
                className="font-sans text-xs uppercase tracking-[0.18em] text-white/50 mb-4">
                {isGeorgian ? content.record.titleGe : content.record.title}
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}
                className={cn("font-narrative text-2xl md:text-3xl text-white mb-6", isGeorgian && "font-georgian")}>
                {isGeorgian ? content.record.leadGe : content.record.lead}
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}
                className={cn("font-serif text-lg text-white/70 leading-[1.85] max-w-[55ch]", isGeorgian && "font-georgian")}>
                {isGeorgian ? content.record.descriptionGe : content.record.description}
              </motion.p>
            </div>
            <FloatingCardStack className="max-w-3xl" />
          </div>
        </section>

        {/* REMEDY - Horizontal Gallery + Map */}
        <section id="remedy" className="py-section-intimate bg-navy text-white border-b border-white/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mb-10">
              <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportOnce}
                className="font-sans text-xs uppercase tracking-[0.18em] text-white/50 mb-4">
                {isGeorgian ? content.remedy.titleGe : content.remedy.title}
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}
                className={cn("font-narrative text-2xl md:text-3xl text-white mb-4", isGeorgian && "font-georgian")}>
                {isGeorgian ? content.remedy.leadGe : content.remedy.lead}
              </motion.p>
            </div>
            <div className="space-y-12">
              <div>
                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={viewportOnce}
                  className={cn(
                    "font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4",
                    isGeorgian && "font-georgian"
                  )}
                >
                  {isGeorgian ? "სანქციების გზები" : "Sanctions Pathways"}
                </motion.h3>
                <SanctionsWorldMap className="max-w-5xl" />
              </div>
              <div>
                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={viewportOnce}
                  className={cn(
                    "font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4",
                    isGeorgian && "font-georgian"
                  )}
                >
                  {isGeorgian ? "უნივერსალური იურისდიქცია" : "Universal Jurisdiction"}
                </motion.h3>
                <UniversalJurisdictionMap className="max-w-5xl" />
              </div>
              <RemedyGallery className="max-w-5xl" />
            </div>
          </div>
        </section>

        {/* TRIAGE - Interactive Matrix */}
        <section id="triage" className="py-section-generous bg-parchment border-b border-navy/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mb-10">
              <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportOnce}
                className="font-sans text-xs uppercase tracking-[0.18em] text-navy/40 mb-4">
                {isGeorgian ? content.triage.titleGe : content.triage.title}
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}
                className={cn("font-narrative text-2xl md:text-3xl text-navy mb-6", isGeorgian && "font-georgian")}>
                {isGeorgian ? content.triage.leadGe : content.triage.lead}
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}
                className={cn("font-serif text-sm text-navy/50 italic", isGeorgian && "font-georgian")}>
                {isGeorgian ? content.triage.acknowledgmentGe : content.triage.acknowledgment}
              </motion.p>
            </div>
            <TriageMatrix className="max-w-5xl" />
          </div>
        </section>

        {/* COMMITMENTS - Accordion */}
        <section id="commitments" className="py-section-generous bg-navy text-white border-b border-white/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportOnce}
                className="font-sans text-xs uppercase tracking-[0.18em] text-white/50 mb-4">
                {isGeorgian ? content.commitments.titleGe : content.commitments.title}
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}
                className={cn("font-narrative text-2xl md:text-3xl text-white mb-12", isGeorgian && "font-georgian")}>
                {isGeorgian ? content.commitments.leadGe : content.commitments.lead}
              </motion.p>
              <CommitmentsAccordion />
            </div>
          </div>
        </section>

        {/* CLOSING */}
        <section className="py-section-vast bg-navy">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}
                className={cn("font-serif text-lg text-white/70 leading-[1.85] mb-10", isGeorgian && "font-georgian")}>
                {isGeorgian ? content.closing.contentGe : content.closing.content}
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}
                transition={{ delay: 0.1 }}
                className={cn("font-serif text-xl text-white italic whitespace-pre-line", isGeorgian && "font-georgian")}>
                {isGeorgian ? content.closing.declarationGe : content.closing.declaration}
              </motion.p>
            </div>
          </div>
        </section>

        <ProgramNav current="justice" />
      </article>
    </Layout>
  );
};

export default Justice;
