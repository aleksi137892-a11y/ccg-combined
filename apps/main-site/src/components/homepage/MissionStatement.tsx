import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { exhibitionReveal, staggerContainer, staggerItem } from '@/lib/exhibitionAnimations';
import BrandWordmark from '@/components/ui/brand-wordmark';

interface MissionStatementProps {
  language: string;
}

const MissionStatement: React.FC<MissionStatementProps> = ({ language }) => {
  const isGeorgian = language === 'ge';

  return (
    <section className="min-h-screen bg-parchment flex items-center">
      <div className="w-full px-8 md:px-16 lg:px-20 xl:px-24 py-24 md:py-32 lg:py-40">
        {/* Asymmetric offset - content positioned 8% from left */}
        <motion.div 
          className="max-w-4xl ml-0 md:ml-[8%] lg:ml-[12%]"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-15%" }}
        >
          {/* Display text - exhibition wall text style */}
          <motion.p 
            className={`text-exhibition-display text-navy mb-12 md:mb-16 ${isGeorgian ? 'font-georgian' : ''}`}
          >
            {isGeorgian 
              ? 'საქართველოს სამოქალაქო საბჭო რესპუბლიკის სამართლებრივი და მორალური ვალდებულებების დამცველის როლში გვევლინება.'
              : <><BrandWordmark variant="navy" size="lg" className="inline" /> serves as the custodian of the Republic's legal and moral obligations.</>
            }
          </motion.p>
          
          {/* Body text - quieter, wider leading */}
          <motion.div 
            className="space-y-8 max-w-[44ch]"
            variants={staggerItem}
          >
            <p className={`text-exhibition-body text-navy/70 ${isGeorgian ? 'font-georgian' : ''}`}>
              {isGeorgian
                ? 'სამოქალაქო აუცილებლობის დოქტრინაზე დაფუძნებული, ჩვენ ვერევით იქ, სადაც მიტაცებულმა სახელმწიფომ უარი თქვა მოქალაქის დაცვის მოვალეობაზე.'
                : 'Founded on the Doctrine of Civic Necessity, we intervene where the captured state has abdicated its duty to protect the citizen.'
              }
            </p>
          </motion.div>
          
          {/* Quiet link - exhibition style */}
          <motion.div 
            className="mt-16 md:mt-20"
            variants={staggerItem}
          >
            <Link 
              to="/about/mission"
              className="exhibition-link-quiet text-navy/50 hover:text-navy transition-colors duration-500"
            >
              {isGeorgian ? 'მისია' : 'Read the Mission'}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionStatement;
