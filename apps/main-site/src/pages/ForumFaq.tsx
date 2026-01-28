import { useState } from 'react';
import { motion } from 'motion/react';
import Layout from '@/components/layout/Layout';
import { InstitutionalPageHeader } from '@/components/institutional';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface FaqItem {
  id: string;
  question: string;
  questionGe: string;
  answer: string[];
  answerGe: string[];
}

interface FaqCategory {
  id: string;
  title: string;
  titleGe: string;
  items: FaqItem[];
}

const faqCategories: FaqCategory[] = [
  {
    id: 'general',
    title: 'General Questions',
    titleGe: 'ზოგადი კითხვები',
    items: [
      {
        id: 'what-is-forum',
        question: 'What is the Forum for Justice?',
        questionGe: 'რა არის სამართლიანობის ფორუმი?',
        answer: [
          'The Forum for Justice is CCG\'s operational infrastructure for the right to remedy. It is a secure place to appeal harm when domestic courts are compromised.',
          'We receive petitions from victims, witnesses, and insiders; protect identity and safety; and triage submissions into lawful pathways to remedy outside capture.',
        ],
        answerGe: [
          'სამართლიანობის ფორუმი არის CCG-ის ოპერაციული ინფრასტრუქტურა გამოსწორების უფლებისთვის. ეს არის უსაფრთხო ადგილი ზიანის გასაჩივრებისთვის, როდესაც შიდა სასამართლოები კომპრომეტირებულია.',
          'ჩვენ ვიღებთ პეტიციებს მსხვერპლებისგან, მოწმეებისა და ინსაიდერებისგან; ვიცავთ ვინაობას და უსაფრთხოებას; და ვანაწილებთ წარდგინებებს კანონიერ გზებზე გამოსწორებისთვის დაპყრობის გარეთ.',
        ],
      },
      {
        id: 'who-can-appeal',
        question: 'Who can submit an appeal?',
        questionGe: 'ვის შეუძლია აპელაციის წარდგენა?',
        answer: [
          'Anyone who has been directly harmed by state actors or state-enabled actors (victims), anyone who has witnessed systematic abuse and has evidence (witnesses), or anyone inside the system with knowledge of wrongdoing (insiders).',
          'This includes victims of political persecution, violence, property expropriation, judicial abuse, and their families.',
        ],
        answerGe: [
          'ყველას, ვინც უშუალოდ დაზარალდა სახელმწიფო აქტორების ან სახელმწიფოს მიერ მხარდაჭერილი აქტორების მიერ (მსხვერპლები), ყველას ვინც იყო სისტემატური ძალადობის მოწმე და აქვს მტკიცებულება (მოწმეები), ან ყველას სისტემის შიგნიდან, ვისაც აქვს ცოდნა დარღვევების შესახებ (ინსაიდერები).',
          'ეს მოიცავს პოლიტიკური დევნის, ძალადობის, ქონების ექსპროპრიაციის, სასამართლო ძალადობის მსხვერპლებს და მათ ოჯახებს.',
        ],
      },
      {
        id: 'is-free',
        question: 'Is there a cost to submit an appeal?',
        questionGe: 'აპელაციის წარდგენა ფასიანია?',
        answer: [
          'No. The Forum for Justice does not charge any fees for receiving, processing, or triaging petitions.',
          'Our work is funded through institutional grants and private donations, none of which can influence case handling or outcomes.',
        ],
        answerGe: [
          'არა. სამართლიანობის ფორუმი არ იხდის საფასურს პეტიციების მიღებაზე, დამუშავებაზე ან გადანაწილებაზე.',
          'ჩვენი მუშაობა ფინანსდება ინსტიტუციური გრანტებით და კერძო შემოწირულობებით, რომელთაგან არცერთს არ შეუძლია გავლენა მოახდინოს საქმის განხილვაზე ან შედეგებზე.',
        ],
      },
    ],
  },
  {
    id: 'process',
    title: 'The Process',
    titleGe: 'პროცესი',
    items: [
      {
        id: 'what-happens',
        question: 'What happens after I submit an appeal?',
        questionGe: 'რა ხდება აპელაციის წარდგენის შემდეგ?',
        answer: [
          'Your submission enters our secure intake system. An analyst reviews the petition within 72 hours to assess completeness and safety considerations.',
          'If additional information is needed, we will contact you through the secure channel you provided. Complete submissions proceed to substantive review and triage.',
        ],
        answerGe: [
          'თქვენი წარდგინება შედის ჩვენს უსაფრთხო მიღების სისტემაში. ანალიტიკოსი განიხილავს პეტიციას 72 საათის განმავლობაში სისრულისა და უსაფრთხოების მოსაზრებების შესაფასებლად.',
          'თუ დამატებითი ინფორმაციაა საჭირო, დაგიკავშირდებით თქვენს მიერ მოწოდებული უსაფრთხო არხით. სრული წარდგინებები გადადის არსებით განხილვაზე და გადანაწილებაზე.',
        ],
      },
      {
        id: 'how-long',
        question: 'How long does the process take?',
        questionGe: 'რამდენი ხანი სჭირდება პროცესს?',
        answer: [
          'Initial review: 72 hours. Substantive assessment: 2-4 weeks depending on complexity. Pathway routing varies significantly based on the specific mechanism.',
          'Some international mechanisms have their own timelines measured in months or years. We provide realistic expectations during the triage conversation.',
        ],
        answerGe: [
          'საწყისი განხილვა: 72 საათი. არსებითი შეფასება: 2-4 კვირა სირთულის მიხედვით. გზის მარშრუტირება მნიშვნელოვნად განსხვავდება კონკრეტული მექანიზმის მიხედვით.',
          'ზოგიერთ საერთაშორისო მექანიზმს აქვს საკუთარი ვადები, რომლებიც იზომება თვეებით ან წლებით. ჩვენ რეალისტურ მოლოდინებს ვაწვდით ტრიაჟის საუბრისას.',
        ],
      },
      {
        id: 'remedy-pathways',
        question: 'What are the remedy pathways?',
        questionGe: 'რა არის გამოსწორების გზები?',
        answer: [
          'The Forum routes cases to six primary tracks: Sanctions (Magnitsky-style designations), Litigation (civil and criminal in foreign courts), Criminal Referral (universal jurisdiction prosecutions), International Mechanisms (ECHR, UN bodies), Regulatory & Compliance (notices to gatekeepers), and Preservation (for future proceedings).',
          'Not every case qualifies for every pathway. Triage determines which mechanisms are viable based on evidence, jurisdiction, and the specific harm documented.',
        ],
        answerGe: [
          'ფორუმი მარშრუტირებს საქმეებს ექვს ძირითად ტრეკზე: სანქციები (მაგნიტსკის ტიპის აღნიშვნები), სამართალწარმოება (სამოქალაქო და სისხლის სამართლის უცხოურ სასამართლოებში), სისხლისსამართლებრივი მიმართვა (უნივერსალური იურისდიქციის სისხლისსამართლებრივი დევნა), საერთაშორისო მექანიზმები (ევროსასამართლო, გაეროს ორგანოები), მარეგულირებელი და შესაბამისობა (შეტყობინებები მეკარეებისთვის) და შენარჩუნება (მომავალი საქმისწარმოებისთვის).',
          'ყველა საქმე არ კვალიფიცირდება ყველა გზაზე. ტრიაჟი განსაზღვრავს რომელი მექანიზმებია სიცოცხლისუნარიანი მტკიცებულების, იურისდიქციის და დოკუმენტირებული კონკრეტული ზიანის საფუძველზე.',
        ],
      },
    ],
  },
  {
    id: 'safety',
    title: 'Safety & Security',
    titleGe: 'უსაფრთხოება და დაცვა',
    items: [
      {
        id: 'how-protected',
        question: 'How is my identity protected?',
        questionGe: 'როგორ არის დაცული ჩემი ვინაობა?',
        answer: [
          'We use end-to-end encrypted communication channels. Your submission is stored on secure servers with access controls. We do not retain unnecessary identifying information.',
          'You may submit anonymously, though this may limit our ability to follow up or route your case. We never share source information without explicit consent.',
        ],
        answerGe: [
          'ჩვენ ვიყენებთ ბოლოდან ბოლომდე დაშიფრულ საკომუნიკაციო არხებს. თქვენი წარდგინება ინახება უსაფრთხო სერვერებზე წვდომის კონტროლით. ჩვენ არ ვინარჩუნებთ ზედმეტ იდენტიფიცირებულ ინფორმაციას.',
          'შეგიძლიათ ანონიმურად წარადგინოთ, თუმცა ეს შეიძლება შეზღუდოს ჩვენი შესაძლებლობა დაგიკავშირდეთ ან თქვენი საქმის მარშრუტირება. ჩვენ არასოდეს ვაზიარებთ წყაროს ინფორმაციას მკაფიო თანხმობის გარეშე.',
        ],
      },
      {
        id: 'safe-to-submit',
        question: 'Is it safe to submit from inside Georgia?',
        questionGe: 'უსაფრთხოა თუ არა საქართველოდან წარდგენა?',
        answer: [
          'We recommend using secure tools: VPN, Tor browser, or Signal for communications. Do not use government or employer networks or devices.',
          'Our secure submission system is designed for adversarial environments, but digital security also depends on your practices. We provide guidance on safe submission during the process.',
        ],
        answerGe: [
          'გირჩევთ გამოიყენოთ უსაფრთხო ინსტრუმენტები: VPN, Tor ბრაუზერი ან Signal კომუნიკაციისთვის. არ გამოიყენოთ სამთავრობო ან დამსაქმებლის ქსელები ან მოწყობილობები.',
          'ჩვენი უსაფრთხო წარდგენის სისტემა შექმნილია მტრული გარემოსთვის, მაგრამ ციფრული უსაფრთხოება ასევე დამოკიდებულია თქვენს პრაქტიკაზე. ჩვენ ვაწვდით მითითებებს უსაფრთხო წარდგენის შესახებ პროცესის დროს.',
        ],
      },
    ],
  },
  {
    id: 'outcomes',
    title: 'Outcomes & Expectations',
    titleGe: 'შედეგები და მოლოდინები',
    items: [
      {
        id: 'guarantee',
        question: 'Can you guarantee a specific outcome?',
        questionGe: 'შეგიძლიათ კონკრეტული შედეგის გარანტირება?',
        answer: [
          'No. We cannot guarantee sanctions designations, court judgments, or prosecutions. These decisions rest with sovereign governments, courts, and international bodies.',
          'What we can guarantee is procedural rigor: proper documentation, compliant submissions, and pursuit of every viable pathway.',
        ],
        answerGe: [
          'არა. ჩვენ ვერ გარანტირებთ სანქციების აღნიშვნებს, სასამართლო გადაწყვეტილებებს ან სისხლისსამართლებრივ დევნას. ეს გადაწყვეტილებები სუვერენულ მთავრობებს, სასამართლოებს და საერთაშორისო ორგანოებს ეკუთვნის.',
          'რისი გარანტირებაც შეგვიძლია არის პროცედურული სიმკაცრე: სათანადო დოკუმენტაცია, შესაბამისი წარდგინებები და ყველა სიცოცხლისუნარიანი გზის დევნა.',
        ],
      },
      {
        id: 'not-court',
        question: 'Is the Forum a court?',
        questionGe: 'ფორუმი სასამართლოა?',
        answer: [
          'No. CCG is not a court and does not issue convictions—we publish findings. We are not a law firm and do not provide legal advice or representation—we prepare case files.',
          'The distinction matters. We illuminate; we do not adjudicate.',
        ],
        answerGe: [
          'არა. CCG სასამართლო არ არის და მსჯავრდებას არ გამოსცემს—ჩვენ ვაქვეყნებთ დასკვნებს. ჩვენ იურიდიული ფირმა არ ვართ და არ ვაწვდით იურიდიულ რჩევას ან წარმომადგენლობას—ჩვენ ვამზადებთ საქმის ფაილებს.',
          'განსხვავებას მნიშვნელობა აქვს. ჩვენ ვანათებთ; არ ვმსჯავრდებით.',
        ],
      },
    ],
  },
];

export default function ForumFaq() {
  const { isGeorgian } = useLanguage();
  const [openItems, setOpenItems] = useState<string[]>([]);

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <div className="border-t-2 border-navy" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <InstitutionalPageHeader
            title="Forum for Justice FAQ"
            titleGe="სამართლიანობის ფორუმის ხშირად დასმული კითხვები"
            subtitle="Common questions about appeals, process, and outcomes"
            subtitleGe="ხშირი კითხვები აპელაციების, პროცესისა და შედეგების შესახებ"
            breadcrumbs={[
              { label: 'Forum for Justice', labelGe: 'სამართლიანობის ფორუმი', href: '/justice' },
              { label: 'FAQ', labelGe: 'ხშირად დასმული კითხვები', href: '/justice/faq' },
            ]}
          />

          <div className="space-y-12">
            {faqCategories.map((category, categoryIdx) => (
              <motion.section
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIdx * 0.1 }}
              >
                <h2 className={cn(
                  "font-serif text-xl text-navy mb-6 pb-2 border-b border-navy/10",
                  isGeorgian && "font-georgian"
                )}>
                  {isGeorgian ? category.titleGe : category.title}
                </h2>

                <Accordion 
                  type="multiple" 
                  value={openItems}
                  onValueChange={setOpenItems}
                  className="space-y-2"
                >
                  {category.items.map((item) => (
                    <AccordionItem 
                      key={item.id} 
                      value={item.id}
                      className="border border-navy/10 bg-navy/[0.01] px-0"
                    >
                      <AccordionTrigger className={cn(
                        "px-6 py-4 text-left hover:no-underline hover:bg-navy/[0.02]",
                        isGeorgian && "font-georgian"
                      )}>
                        <span className="font-serif text-navy">
                          {isGeorgian ? item.questionGe : item.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6">
                        <div className="space-y-3">
                          {(isGeorgian ? item.answerGe : item.answer).map((paragraph, pIdx) => (
                            <p 
                              key={pIdx}
                              className={cn(
                                "font-ui text-sm text-navy/70 leading-relaxed",
                                isGeorgian && "font-georgian"
                              )}
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.section>
            ))}
          </div>

          {/* Contact Note */}
          <motion.section 
            className="mt-16 pt-8 border-t border-navy/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className={cn(
              "font-ui text-sm text-navy/60",
              isGeorgian && "font-georgian"
            )}>
              {isGeorgian 
                ? 'დამატებითი კითხვებისთვის დაგვიკავშირდით უსაფრთხო არხებით. ჩვენი კონტაქტის გვერდზე ნახავთ დაშიფრული კომუნიკაციის ვარიანტებს.'
                : 'For additional questions, contact us through secure channels. Our contact page provides encrypted communication options.'}
            </p>
          </motion.section>
        </div>
      </div>
    </Layout>
  );
}
