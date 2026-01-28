// Report Page Content - Complete Bilingual Data
import { InstitutionalContent } from '@/types/institutional';

export const reportContent: InstitutionalContent = {
  meta: {
    title: 'Report Misconduct',
    titleGe: 'მოხსენება',
    lastUpdated: 'January 2026',
    lastUpdatedGe: '2026 წლის იანვარი',
    intro: 'A secure pathway for witnesses, professionals, and citizens to report institutional misconduct, corruption, and human rights violations to the Civic Council of Georgia.',
    introGe: 'უსაფრთხო გზა მოწმეებისთვის, პროფესიონალებისთვის და მოქალაქეებისთვის ინსტიტუციური გადაცდომების, კორუფციისა და ადამიანის უფლებათა დარღვევების შესახებ მოსახსენებლად საქართველოს სამოქალაქო საბჭოსთვის.',
  },

  jumpToItems: [
    { id: 'channels', label: 'Channels', labelGe: 'არხები' },
    { id: 'protection', label: 'Protection', labelGe: 'დაცვა' },
    { id: 'process', label: 'Process', labelGe: 'პროცესი' },
    { id: 'types', label: 'Report Types', labelGe: 'მოხსენებათა ტიპები' },
  ],

  sections: [
    {
      id: 'channels',
      heading: 'Reporting Channels',
      headingGe: 'მოხსენების არხები',
      body: [
        'CCG maintains multiple secure channels for receiving reports. The choice of channel depends on your situation, the sensitivity of the information, and your assessment of risk. All channels lead to the same intake process; the difference is in how you reach us.',
      ],
      bodyGe: [
        'CCG ინახავს მრავალ უსაფრთხო არხს მოხსენებების მისაღებად. არხის არჩევანი დამოკიდებულია თქვენს სიტუაციაზე, ინფორმაციის მგრძნობელობაზე და რისკის თქვენს შეფასებაზე. ყველა არხი მიდის იმავე მიღების პროცესზე; განსხვავება იმაშია, თუ როგორ მიგვიწვდებით.',
      ],
      bullets: [
        'Forum for Justice: Primary intake mechanism for formal petitions and documented complaints',
        'Secure Channel: End-to-end encrypted submission system for high-risk communications',
        'Direct Contact: Verified secure communication with designated intake officers',
        'Partner Referral: Submissions through vetted civil society partners and legal organizations',
      ],
      bulletsGe: [
        'სამართლიანობის ფორუმი: ძირითადი მიღების მექანიზმი ფორმალური პეტიციებისა და დოკუმენტირებული საჩივრებისთვის',
        'უსაფრთხო არხი: ბოლო-ბოლომდე დაშიფრული წარდგენის სისტემა მაღალი რისკის კომუნიკაციებისთვის',
        'პირდაპირი კონტაქტი: დადასტურებული უსაფრთხო კომუნიკაცია დანიშნულ მიღების ოფიცრებთან',
        'პარტნიორის რეფერალი: წარდგინებები შემოწმებული სამოქალაქო საზოგადოების პარტნიორებისა და სამართლებრივი ორგანიზაციების მეშვეობით',
      ],
    },
    {
      id: 'protection',
      heading: 'Source Protection',
      headingGe: 'წყაროს დაცვა',
      body: [
        'Source protection is not a policy preference; it is an absolute commitment. We do not reveal sources. We do not confirm or deny the existence of sources. We design our systems assuming that state-level adversaries will attempt to identify those who speak to us.',
        'Your safety is not subordinate to our investigations. If circumstances change and continuing poses unacceptable risk to you, we will pause or terminate our work rather than expose you to harm.',
      ],
      bodyGe: [
        'წყაროს დაცვა არ არის პოლიტიკის უპირატესობა; ეს არის აბსოლუტური ვალდებულება. ჩვენ არ ვამჟღავნებთ წყაროებს. ჩვენ არ ვადასტურებთ ან არ ვუარყოფთ წყაროების არსებობას. ჩვენ ვაპროექტებთ ჩვენს სისტემებს იმ ვარაუდით, რომ სახელმწიფო დონის მოწინააღმდეგეები შეეცდებიან იმათი იდენტიფიცირებას, ვინც ჩვენთან საუბრობს.',
        'თქვენი უსაფრთხოება არ ექვემდებარება ჩვენს გამოძიებებს. თუ გარემოებები შეიცვლება და გაგრძელება თქვენთვის მიუღებელ რისკს წარმოადგენს, ჩვენ შევაჩერებთ ან დავასრულებთ ჩვენს სამუშაოს, ვიდრე დაგექვემდებარებთ ზიანს.',
      ],
    },
    {
      id: 'process',
      heading: 'Intake Process',
      headingGe: 'მიღების პროცესი',
      body: [
        'Every submission is treated as a civic claim deserving of serious attention. The intake process is designed to be thorough without being burdensome, secure without being intimidating.',
      ],
      bodyGe: [
        'ყოველი წარდგინება განიხილება როგორც სამოქალაქო მოთხოვნა, რომელიც იმსახურებს სერიოზულ ყურადღებას. მიღების პროცესი შექმნილია იმისთვის, რომ იყოს საფუძვლიანი მძიმე ტვირთის გარეშე, უსაფრთხო დაშინების გარეშე.',
      ],
      bullets: [
        'Initial acknowledgment within 48 hours of receipt',
        'Preliminary assessment and triage classification',
        'Secure follow-up communication for clarification if needed',
        'Assignment to appropriate investigative or preservation track',
        'Regular status updates through secure channels',
      ],
      bulletsGe: [
        'საწყისი აღიარება მიღებიდან 48 საათის განმავლობაში',
        'წინასწარი შეფასება და ტრიაჟის კლასიფიკაცია',
        'უსაფრთხო შემდგომი კომუნიკაცია გარკვევისთვის საჭიროების შემთხვევაში',
        'მინიჭება შესაბამის საგამოძიებო ან შენარჩუნების ტრეკზე',
        'რეგულარული სტატუსის განახლებები უსაფრთხო არხებით',
      ],
    },
    {
      id: 'types',
      heading: 'What to Report',
      headingGe: 'რა უნდა მოახსენოთ',
      body: [
        'CCG receives reports across a broad spectrum of institutional misconduct. The common thread is conduct that the current system cannot or will not address—either because institutions are captured, because political will is absent, or because legal pathways have been exhausted.',
      ],
      bodyGe: [
        'CCG იღებს მოხსენებებს ინსტიტუციური გადაცდომის ფართო სპექტრში. საერთო ძაფი არის ქცევა, რომელსაც მიმდინარე სისტემა ვერ ან არ მიმართავს—ან იმიტომ, რომ ინსტიტუციები დაპყრობილია, ან იმიტომ, რომ პოლიტიკური ნება არ არსებობს, ან იმიტომ, რომ სამართლებრივი გზები ამოწურულია.',
      ],
      bullets: [
        'Violence by state actors: Police brutality, detention abuse, torture',
        'Judicial capture: Politically motivated prosecutions, corrupted proceedings',
        'Electoral fraud: Manipulation, coercion, administrative interference',
        'Corruption: Bribery, embezzlement, abuse of public office',
        'Institutional persecution: Retaliation against whistleblowers, journalists, activists',
        'Cultural erasure: Destruction of heritage, suppression of language, historical falsification',
      ],
      bulletsGe: [
        'ძალადობა სახელმწიფო მოქმედების მხრიდან: პოლიციის ბრუტალურობა, დაკავების ბოროტად გამოყენება, წამება',
        'სასამართლოს დაპყრობა: პოლიტიკურად მოტივირებული პროკურატურა, კორუმპირებული სამართალწარმოება',
        'საარჩევნო გაყალბება: მანიპულაცია, იძულება, ადმინისტრაციული ჩარევა',
        'კორუფცია: მოსყიდვა, მითვისება, საჯარო თანამდებობის ბოროტად გამოყენება',
        'ინსტიტუციური დევნა: შურისძიება მამხილებლების, ჟურნალისტების, აქტივისტების წინააღმდეგ',
        'კულტურული წაშლა: მემკვიდრეობის განადგურება, ენის ჩახშობა, ისტორიული გაყალბება',
      ],
    },
  ],
};
