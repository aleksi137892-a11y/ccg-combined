import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import { fadeInUp, staggerContainer, settleIn, viewportOnce } from '@/lib/animations';

const Contact: React.FC = () => {
  const { isGeorgian } = useLanguage();

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.p
              variants={fadeInUp}
              className={`text-label text-muted-foreground mb-6 ${isGeorgian ? 'font-georgian' : ''}`}
            >
              {isGeorgian ? 'მონაწილეობა' : 'Participate'}
            </motion.p>
            <motion.h1
              variants={settleIn}
              className={`font-display text-display text-foreground mb-8 ${isGeorgian ? 'font-georgian' : ''}`}
            >
              {isGeorgian ? 'შემოგვიერთდით' : <><em>Join</em> Us</>}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className={`text-lead text-muted-foreground ${isGeorgian ? 'font-georgian' : ''}`}
            >
              {isGeorgian 
                ? 'საბჭო ღიაა ყველა საქართველოს მოქალაქისთვის, რომლებიც ერთგულნი არიან დემოკრატიული ანგარიშვალდებულებისა და კონსტიტუციური წესრიგის.'
                : 'The Council is open to all Georgian citizens committed to democratic accountability and constitutional order.'
              }
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Contact */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer}
            >
              {[
                { title: isGeorgian ? 'მისამართი' : 'Address', text: isGeorgian ? 'თბილისი, საქართველო' : 'Tbilisi, Georgia' },
                { title: isGeorgian ? 'ელ.ფოსტა' : 'Email', text: 'council@civic.ge' },
              ].map((item, index) => (
                <motion.div key={index} variants={fadeInUp} className="text-center">
                  <p className={`text-label text-muted-foreground mb-4 ${isGeorgian ? 'font-georgian' : ''}`}>
                    {item.title}
                  </p>
                  <p className={`font-display text-subhead text-foreground ${isGeorgian ? 'font-georgian' : ''}`}>
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="text-center"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer}
            >
              <motion.p
                variants={fadeInUp}
                className={`text-label text-muted-foreground mb-6 ${isGeorgian ? 'font-georgian' : ''}`}
              >
                {isGeorgian ? 'წევრობა' : 'Membership'}
              </motion.p>
              <motion.h2
                variants={settleIn}
                className={`font-display text-display-sm text-foreground mb-10 ${isGeorgian ? 'font-georgian' : ''}`}
              >
                {isGeorgian ? 'გახდი წევრი' : <><em>Become</em> a Member</>}
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className={`text-body text-muted-foreground mb-14 max-w-md mx-auto ${isGeorgian ? 'font-georgian' : ''}`}
              >
                {isGeorgian
                  ? 'წევრობა სამოქალაქო საბჭოში არის სამოქალაქო მოვალეობის აქტი. არ არის გადასახადი — მხოლოდ თავდადება.'
                  : 'Membership in the Civic Council is an act of civic duty. There are no dues — only dedication.'
                }
              </motion.p>
              <motion.div
                className="space-y-5 text-left max-w-xs mx-auto"
                variants={staggerContainer}
              >
                {[
                  isGeorgian ? 'დაესწარით საჯარო სხდომას' : 'Attend a public session',
                  isGeorgian ? 'დაადასტურეთ საბჭოს მანდატი' : 'Affirm the Council mandate',
                  isGeorgian ? 'დარეგისტრირდით კომიტეტში' : 'Register with the Committee',
                ].map((step, index) => (
                  <motion.div key={index} variants={fadeInUp} className="flex items-baseline gap-6">
                    <span className="text-numeral text-xl text-muted-foreground/40">
                      {index + 1}
                    </span>
                    <span className={`text-body text-foreground ${isGeorgian ? 'font-georgian' : ''}`}>
                      {step}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <motion.section
        className="py-28 md:py-36 bg-navy text-white"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.p
              variants={settleIn}
              className={`quote-large text-white/90 mb-10 ${isGeorgian ? 'font-georgian' : ''}`}
            >
              "{isGeorgian
                ? 'საბჭო ატარებს რეგულარულ საჯარო სხდომებს, სადაც მოქალაქეებს შეუძლიათ დაკვირვება, ჩვენების წარდგენა და მონაწილეობა.'
                : 'The Council holds regular public sessions where citizens may observe, submit testimony, and participate.'
              }"
            </motion.p>
            <motion.p variants={fadeInUp} className="text-label text-white/50 text-smallcaps">
              {isGeorgian ? 'გამჭვირვალობის შესახებ' : 'On Transparency'}
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Sessions & International */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            <motion.p
              variants={fadeInUp}
              className={`text-label text-muted-foreground mb-6 ${isGeorgian ? 'font-georgian' : ''}`}
            >
              {isGeorgian ? 'სხდომები' : 'Sessions'}
            </motion.p>
            <motion.h2
              variants={settleIn}
              className={`font-display text-display-sm text-foreground mb-8 ${isGeorgian ? 'font-georgian' : ''}`}
            >
              {isGeorgian ? 'საჯარო სხდომები' : <><em>Public</em> Proceedings</>}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className={`text-body text-muted-foreground mb-12 ${isGeorgian ? 'font-georgian' : ''}`}
            >
              {isGeorgian
                ? 'ყველა სხდომა ტარდება სრული გამჭვირვალობით და იწერება საჯარო ჩანაწერისთვის.'
                : 'All sessions are conducted with full transparency and recorded for public record.'
              }
            </motion.p>
            <motion.div variants={fadeInUp} className="inline-block border border-border px-12 py-8">
              <p className={`text-label text-muted-foreground mb-2 ${isGeorgian ? 'font-georgian' : ''}`}>
                {isGeorgian ? 'შემდეგი სხდომა' : 'Next Session'}
              </p>
              <p className={`font-display text-subhead text-foreground ${isGeorgian ? 'font-georgian' : ''}`}>
                {isGeorgian ? 'გამოცხადდება' : 'To Be Announced'}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* International */}
      <motion.section
        className="py-20 md:py-24 bg-secondary"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <motion.p
              variants={fadeInUp}
              className={`text-label text-muted-foreground mb-6 ${isGeorgian ? 'font-georgian' : ''}`}
            >
              {isGeorgian ? 'საერთაშორისო' : 'International'}
            </motion.p>
            <motion.h2
              variants={settleIn}
              className={`font-display text-headline text-foreground mb-6 ${isGeorgian ? 'font-georgian' : ''}`}
            >
              {isGeorgian ? 'გლობალური პარტნიორები' : 'Global Partners'}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className={`text-body text-muted-foreground mb-10 ${isGeorgian ? 'font-georgian' : ''}`}
            >
              {isGeorgian
                ? 'ჩვენ მივესალმებით საერთაშორისო დემოკრატიული ინსტიტუტებისა და ადამიანის უფლებათა ორგანიზაციების ჩართულობას.'
                : 'We welcome engagement from international democratic institutions and human rights organizations.'
              }
            </motion.p>
            <motion.a
              variants={fadeInUp}
              href="mailto:international@civic.ge"
              className={`inline-block px-10 py-4 bg-navy text-white text-label hover:opacity-90 transition-opacity ${isGeorgian ? 'font-georgian' : ''}`}
            >
              {isGeorgian ? 'საერთაშორისო საქმეები' : 'International Affairs'}
            </motion.a>
          </div>
        </div>
      </motion.section>
    </Layout>
  );
};

export default Contact;
