import { motion } from 'motion/react';
import Layout from '@/components/layout/Layout';
import { InstitutionalPageHeader } from '@/components/institutional';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Shield, Lock, Scale, FileText } from 'lucide-react';

interface LeadershipPrinciple {
  icon: React.ElementType;
  title: string;
  titleGe: string;
  description: string;
  descriptionGe: string;
}

const principles: LeadershipPrinciple[] = [
  {
    icon: Lock,
    title: 'Protected Identity',
    titleGe: 'დაცული ვინაობა',
    description: 'Much of our professional capacity—retired judges, former public defenders, civil servants who served with integrity—cannot be publicly identified without credible danger to themselves and their families.',
    descriptionGe: 'ჩვენი პროფესიული შესაძლებლობების დიდი ნაწილი—პენსიაში გასული მოსამართლეები, ყოფილი საზოგადოებრივი დამცველები, კეთილსინდისიერად მომსახურე საჯარო მოხელეები—საჯაროდ ვერ იდენტიფიცირდებიან საკუთარი თავისა და მათი ოჯახებისთვის სარწმუნო საფრთხის გარეშე.',
  },
  {
    icon: Scale,
    title: 'Method Over Personality',
    titleGe: 'მეთოდი პიროვნებაზე მაღლა',
    description: 'Our institutional legitimacy rests on published standards, transparent confidence labels, corrections logs visible to all, and the right of reply—not on the reputation of any individual.',
    descriptionGe: 'ჩვენი ინსტიტუციური ლეგიტიმაცია ეფუძნება გამოქვეყნებულ სტანდარტებს, გამჭვირვალე სანდოობის ეტიკეტებს, ყველასთვის ხილულ შესწორებების ჟურნალს და პასუხის უფლებას—და არა რომელიმე პიროვნების რეპუტაციას.',
  },
  {
    icon: Shield,
    title: 'Operational Security',
    titleGe: 'ოპერაციული უსაფრთხოება',
    description: 'The institution\'s public leadership operates from outside Georgia because certain forms of civic accountability work become impossible within a captured environment without accepting unacceptable personal risk.',
    descriptionGe: 'ინსტიტუციის საჯარო ხელმძღვანელობა მოქმედებს საქართველოს გარეთ, რადგან სამოქალაქო ანგარიშვალდებულების მუშაობის გარკვეული ფორმები შეუძლებელი ხდება დაპყრობილ გარემოში მიუღებელი პირადი რისკის მიღების გარეშე.',
  },
  {
    icon: FileText,
    title: 'Credibility Through Discipline',
    titleGe: 'სანდოობა დისციპლინით',
    description: 'The Council is democratic by design—an institution meant to belong to the public it serves and to earn credibility through discipline, not assertion.',
    descriptionGe: 'საბჭო დიზაინით დემოკრატიულია—ინსტიტუცია, რომელიც განკუთვნილია იმ საზოგადოების საკუთრებად, რომელსაც ემსახურება და სანდოობის მოსაპოვებლად დისციპლინით, არა განცხადებით.',
  },
];

interface CredentialCategory {
  title: string;
  titleGe: string;
  roles: string[];
  rolesGe: string[];
}

const credentialCategories: CredentialCategory[] = [
  {
    title: 'Legal & Judicial',
    titleGe: 'სამართლებრივი და სასამართლო',
    roles: [
      'Former judges with decades of bench experience',
      'Public defenders who served under multiple administrations',
      'International law specialists with treaty body experience',
      'Human rights lawyers with ECHR case experience',
    ],
    rolesGe: [
      'ყოფილი მოსამართლეები ათწლეულების გამოცდილებით',
      'საზოგადოებრივი დამცველები, რომლებიც მრავალ ადმინისტრაციას ემსახურებოდნენ',
      'საერთაშორისო სამართლის სპეციალისტები ხელშეკრულების ორგანოების გამოცდილებით',
      'ადამიანის უფლებების დამცველი ადვოკატები ევროსასამართლოს საქმეების გამოცდილებით',
    ],
  },
  {
    title: 'Investigation & Documentation',
    titleGe: 'გამოძიება და დოკუმენტირება',
    roles: [
      'Former prosecutors and investigators',
      'Open-source intelligence specialists',
      'Financial crimes analysts',
      'Digital forensics experts',
    ],
    rolesGe: [
      'ყოფილი პროკურორები და გამომძიებლები',
      'ღია წყაროების დაზვერვის სპეციალისტები',
      'ფინანსური დანაშაულების ანალიტიკოსები',
      'ციფრული კრიმინალისტიკის ექსპერტები',
    ],
  },
  {
    title: 'Civil Society & Governance',
    titleGe: 'სამოქალაქო საზოგადოება და მმართველობა',
    roles: [
      'Former ministry officials who departed captured institutions',
      'NGO professionals with decades of experience',
      'Election monitoring specialists',
      'Anti-corruption practitioners',
    ],
    rolesGe: [
      'ყოფილი სამინისტროს თანამდებობის პირები, რომლებმაც დატოვეს დაპყრობილი ინსტიტუციები',
      'არასამთავრობო პროფესიონალები ათწლეულების გამოცდილებით',
      'საარჩევნო მონიტორინგის სპეციალისტები',
      'ანტიკორუფციული პრაქტიკოსები',
    ],
  },
  {
    title: 'International Engagement',
    titleGe: 'საერთაშორისო ჩართულობა',
    roles: [
      'Former diplomats and international organization staff',
      'Sanctions policy specialists',
      'Treaty body and UN mechanism experts',
      'Cross-border legal coordination professionals',
    ],
    rolesGe: [
      'ყოფილი დიპლომატები და საერთაშორისო ორგანიზაციების თანამშრომლები',
      'სანქციების პოლიტიკის სპეციალისტები',
      'ხელშეკრულების ორგანოებისა და გაეროს მექანიზმების ექსპერტები',
      'ტრანსსასაზღვრო სამართლებრივი კოორდინაციის პროფესიონალები',
    ],
  },
];

export default function Leadership() {
  const { isGeorgian } = useLanguage();

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <div className="border-t-2 border-navy" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <InstitutionalPageHeader
            title="Leadership & Credentials"
            titleGe="ხელმძღვანელობა და კვალიფიკაცია"
            subtitle="Legitimacy through method, not personality"
            subtitleGe="ლეგიტიმაცია მეთოდით, არა პიროვნებით"
            breadcrumbs={[
              { label: 'About', labelGe: 'შესახებ', href: '/about' },
              { label: 'Leadership', labelGe: 'ხელმძღვანელობა', href: '/about/leadership' },
            ]}
          />

          {/* Founder Section */}
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={cn(
              "font-serif text-2xl text-navy mb-6",
              isGeorgian && "font-georgian"
            )}>
              {isGeorgian ? 'დამფუძნებელი' : 'Founder'}
            </h2>
            <div className="border-l-2 border-navy pl-6">
              <p className={cn(
                "font-serif text-lg text-navy/80 mb-4",
                isGeorgian && "font-georgian"
              )}>
                {isGeorgian 
                  ? 'ჩვენი დამფუძნებელი ყოფილი სამინისტროს თანამდებობის პირია, რომელმაც დატოვა დაპყრობილი სახელმწიფო აპარატი და აირჩია საჯარო პასუხისმგებლობის სიმძიმე სიჩუმის უსაფრთხოების ნაცვლად.'
                  : 'Our founder is a former ministry official who departed a captured state apparatus and chose the weight of public responsibility over the safety of silence.'}
              </p>
              <p className={cn(
                "font-ui text-sm text-navy/60",
                isGeorgian && "font-georgian"
              )}>
                {isGeorgian
                  ? 'დამატებითი ბიოგრაფიული დეტალები არ არის გამოქვეყნებული უსაფრთხოების მოსაზრებებით.'
                  : 'Additional biographical details are not published for security reasons.'}
              </p>
            </div>
          </motion.section>

          {/* Principles Section */}
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className={cn(
              "font-serif text-2xl text-navy mb-8",
              isGeorgian && "font-georgian"
            )}>
              {isGeorgian ? 'რატომ ანონიმურობა' : 'Why Anonymity'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {principles.map((principle, idx) => (
                <div 
                  key={idx}
                  className="border border-navy/10 p-6 bg-navy/[0.01]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center shrink-0">
                      <principle.icon className="w-5 h-5 text-navy/60" />
                    </div>
                    <div>
                      <h3 className={cn(
                        "font-serif text-lg text-navy mb-2",
                        isGeorgian && "font-georgian"
                      )}>
                        {isGeorgian ? principle.titleGe : principle.title}
                      </h3>
                      <p className={cn(
                        "font-ui text-sm text-navy/70 leading-relaxed",
                        isGeorgian && "font-georgian"
                      )}>
                        {isGeorgian ? principle.descriptionGe : principle.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Credentials Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className={cn(
              "font-serif text-2xl text-navy mb-4",
              isGeorgian && "font-georgian"
            )}>
              {isGeorgian ? 'კოლექტიური კვალიფიკაცია' : 'Collective Credentials'}
            </h2>
            <p className={cn(
              "font-ui text-sm text-navy/60 mb-8",
              isGeorgian && "font-georgian"
            )}>
              {isGeorgian 
                ? 'ჩვენი გუნდი მოიცავს პროფესიონალებს შემდეგი სფეროებიდან, რომელთა ინდივიდუალური ვინაობა დაცულია:'
                : 'Our team includes professionals from the following domains, whose individual identities are protected:'}
            </p>

            <div className="space-y-8">
              {credentialCategories.map((category, idx) => (
                <div key={idx} className="border-l-2 border-navy/20 pl-6">
                  <h3 className={cn(
                    "font-sans text-xs uppercase tracking-[0.15em] text-navy/50 mb-3",
                    isGeorgian && "font-georgian"
                  )}>
                    {isGeorgian ? category.titleGe : category.title}
                  </h3>
                  <ul className="space-y-2">
                    {(isGeorgian ? category.rolesGe : category.roles).map((role, roleIdx) => (
                      <li 
                        key={roleIdx}
                        className={cn(
                          "font-ui text-sm text-navy/70",
                          isGeorgian && "font-georgian"
                        )}
                      >
                        • {role}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Verification Note */}
          <motion.section 
            className="mt-16 pt-8 border-t border-navy/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className={cn(
              "font-ui text-xs text-navy/50 leading-relaxed",
              isGeorgian && "font-georgian"
            )}>
              {isGeorgian 
                ? 'შენიშვნა: ანონიმურობა თეატრალური ჟესტი არ არის. ის ფაქტობრივი კონტექსტია და ზუსტად ხსნის რატომ უნდა ეფუძნებოდეს ჩვენი ინსტიტუციური ლეგიტიმაცია მეთოდს და არა პიროვნებას. ჩვენი მუშაობის ხარისხი დადასტურებულია გამომავალი პროდუქტით—გამოქვეყნებული სტანდარტებით, დოკუმენტირებული მეთოდოლოგიით და შესწორებების საჯარო ჟურნალით.'
                : 'Note: This anonymity is not theatrical gesture. It is factual context, and it explains precisely why our institutional legitimacy must rest on method rather than personality. The quality of our work is verified by output—published standards, documented methodology, and a public corrections log.'}
            </p>
          </motion.section>
        </div>
      </div>
    </Layout>
  );
}
