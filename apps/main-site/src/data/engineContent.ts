// Engine Page Content - Complete Bilingual Data
import { InstitutionalContent } from '@/types/institutional';

export const engineContent: InstitutionalContent = {
  meta: {
    title: 'The Engine',
    titleGe: 'ძრავა',
    lastUpdated: 'January 2026',
    lastUpdatedGe: '2026 წლის იანვარი',
    intro: 'The investigative and verification infrastructure that powers CCG\'s accountability mission—a unified system for evidence processing, source validation, and institutional research.',
    introGe: 'საგამოძიებო და ვერიფიკაციის ინფრასტრუქტურა, რომელიც უზრუნველყოფს CCG-ის ანგარიშვალდებულების მისიას—ერთიანი სისტემა მტკიცებულებების დამუშავებისთვის, წყაროების ვალიდაციისთვის და ინსტიტუციური კვლევისთვის.',
  },

  jumpToItems: [
    { id: 'architecture', label: 'Architecture', labelGe: 'არქიტექტურა' },
    { id: 'verification', label: 'Verification', labelGe: 'ვერიფიკაცია' },
    { id: 'processing', label: 'Processing', labelGe: 'დამუშავება' },
    { id: 'security', label: 'Security', labelGe: 'უსაფრთხოება' },
  ],

  sections: [
    {
      id: 'architecture',
      heading: 'System Architecture',
      headingGe: 'სისტემის არქიტექტურა',
      body: [
        'The Engine is CCG\'s operational backbone—a distributed system designed to receive, process, verify, and preserve evidence at institutional scale. It transforms raw submissions into actionable intelligence while maintaining cryptographic integrity and chain-of-custody documentation.',
        'Built on principles of resilience and redundancy, the Engine operates across multiple jurisdictions to ensure that no single point of failure can compromise the evidentiary record. Geographic distribution is not a feature; it is a requirement of the work.',
      ],
      bodyGe: [
        'ძრავა არის CCG-ის ოპერაციული ხერხემალი—განაწილებული სისტემა, შექმნილი მტკიცებულებების მისაღებად, დასამუშავებლად, ვერიფიცირებისთვის და შესანარჩუნებლად ინსტიტუციურ მასშტაბზე. ის გარდაქმნის ნედლ წარდგინებებს მოქმედ ინფორმაციად კრიპტოგრაფიული მთლიანობისა და მეურვეობის ჯაჭვის დოკუმენტაციის შენარჩუნებით.',
        'რეზილენტურობისა და რეზერვირების პრინციპებზე აშენებული, ძრავა მუშაობს მრავალ იურისდიქციაში, რათა უზრუნველყოს, რომ არცერთმა ერთეულმა წარუმატებლობამ ვერ დააზიანოს მტკიცებულებათა ჩანაწერი.',
      ],
    },
    {
      id: 'verification',
      heading: 'Verification Protocol',
      headingGe: 'ვერიფიკაციის პროტოკოლი',
      body: [
        'Every piece of evidence processed by the Engine undergoes a multi-stage verification protocol. This is not bureaucracy; it is discipline. The credibility of our findings depends entirely on the rigor of our verification.',
      ],
      bodyGe: [
        'ძრავის მიერ დამუშავებული ყოველი მტკიცებულება გადის მრავალსაფეხურიან ვერიფიკაციის პროტოკოლს. ეს არ არის ბიუროკრატია; ეს არის დისციპლინა. ჩვენი დასკვნების სანდოობა მთლიანად დამოკიდებულია ჩვენი ვერიფიკაციის მკაცრობაზე.',
      ],
      bullets: [
        'Intake validation: Source authentication, metadata extraction, preliminary classification',
        'Cross-referencing: Comparison against existing databases, public records, and partner intelligence',
        'Expert review: Domain specialists assess technical accuracy and evidentiary weight',
        'Confidence assignment: Final classification using the standardized Confidence Label system',
      ],
      bulletsGe: [
        'მიღების ვალიდაცია: წყაროს ავთენტიფიკაცია, მეტადატის ამოღება, წინასწარი კლასიფიკაცია',
        'ჯვარედინი მითითება: შედარება არსებულ მონაცემთა ბაზებთან, საჯარო ჩანაწერებთან და პარტნიორულ დაზვერვასთან',
        'ექსპერტთა მიმოხილვა: დომენის სპეციალისტები აფასებენ ტექნიკურ სიზუსტეს და მტკიცებულებით წონას',
        'ნდობის მინიჭება: საბოლოო კლასიფიკაცია სტანდარტიზებული ნდობის ლეიბლის სისტემის გამოყენებით',
      ],
    },
    {
      id: 'processing',
      heading: 'Evidence Processing',
      headingGe: 'მტკიცებულებათა დამუშავება',
      body: [
        'The Engine processes diverse evidence types: documents, photographs, video footage, audio recordings, digital communications, and witness testimony. Each type requires specialized handling, and the Engine adapts accordingly.',
        'Processing is not passive archival. It is active intelligence work—identifying patterns, establishing connections, and building the evidentiary foundations for accountability across all available pathways.',
      ],
      bodyGe: [
        'ძრავა ამუშავებს მრავალფეროვან მტკიცებულების ტიპებს: დოკუმენტებს, ფოტოგრაფიებს, ვიდეო მასალას, აუდიო ჩანაწერებს, ციფრულ კომუნიკაციებს და მოწმეთა ჩვენებებს. თითოეული ტიპი მოითხოვს სპეციალიზებულ მოპყრობას და ძრავა შესაბამისად ადაპტირდება.',
        'დამუშავება არ არის პასიური არქივირება. ეს არის აქტიური დაზვერვის სამუშაო—ნიმუშების იდენტიფიცირება, კავშირების დადგენა და მტკიცებულებითი საფუძვლების შექმნა ანგარიშვალდებულებისთვის ყველა ხელმისაწვდომ გზაზე.',
      ],
    },
    {
      id: 'security',
      heading: 'Security & Integrity',
      headingGe: 'უსაფრთხოება და მთლიანობა',
      body: [
        'Security is not a feature of the Engine; it is the premise on which the Engine is built. Source protection is non-negotiable. Evidence integrity is paramount. System resilience against state-level adversaries is assumed.',
      ],
      bodyGe: [
        'უსაფრთხოება არ არის ძრავის ფუნქცია; ეს არის პრემისა, რომელზეც ძრავა აშენებულია. წყაროს დაცვა არ ექვემდებარება მოლაპარაკებას. მტკიცებულების მთლიანობა უპირველესია. სისტემის რეზილენტურობა სახელმწიფო დონის მოწინააღმდეგეების წინააღმდეგ ვარაუდობს.',
      ],
      bullets: [
        'End-to-end encryption for all communications and submissions',
        'Air-gapped systems for the most sensitive processing operations',
        'Cryptographic timestamping for chain-of-custody verification',
        'Distributed backup architecture across multiple legal jurisdictions',
      ],
      bulletsGe: [
        'ბოლო-ბოლომდე დაშიფვრა ყველა კომუნიკაციისა და წარდგინებისთვის',
        'იზოლირებული სისტემები ყველაზე მგრძნობიარე დამუშავების ოპერაციებისთვის',
        'კრიპტოგრაფიული დროის ბეჭედი მეურვეობის ჯაჭვის ვერიფიკაციისთვის',
        'განაწილებული სარეზერვო არქიტექტურა მრავალ სამართლებრივ იურისდიქციაში',
      ],
    },
  ],
};
