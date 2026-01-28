// Evidence Page Content - Complete Bilingual Data
import { InstitutionalContent } from '@/types/institutional';

export const evidenceContent: InstitutionalContent = {
  meta: {
    title: 'Evidence Archive',
    titleGe: 'მტკიცებულებათა არქივი',
    lastUpdated: 'January 2026',
    lastUpdatedGe: '2026 წლის იანვარი',
    intro: 'The preserved evidentiary record of institutional capture, human rights violations, and democratic erosion in Georgia—maintained for present accountability and future justice.',
    introGe: 'ინსტიტუციური დაპყრობის, ადამიანის უფლებათა დარღვევებისა და დემოკრატიული ეროზიის შენახული მტკიცებულებითი ჩანაწერი საქართველოში—შენარჩუნებული მიმდინარე ანგარიშვალდებულებისა და მომავალი მართლმსაჯულებისთვის.',
  },

  jumpToItems: [
    { id: 'purpose', label: 'Purpose', labelGe: 'მიზანი' },
    { id: 'categories', label: 'Categories', labelGe: 'კატეგორიები' },
    { id: 'standards', label: 'Standards', labelGe: 'სტანდარტები' },
    { id: 'access', label: 'Access', labelGe: 'წვდომა' },
  ],

  sections: [
    {
      id: 'purpose',
      heading: 'Archival Purpose',
      headingGe: 'არქივის მიზანი',
      body: [
        'Evidence does not speak for itself. It requires preservation, organization, and context. The Evidence Archive exists to ensure that what has been documented cannot be undocumented—that the record of this period will survive attempts at erasure, denial, and historical revision.',
        'This is not passive storage. It is active curation in service of accountability. Every piece of evidence is preserved with the understanding that it may one day be needed in a courtroom, a truth commission, or a future democracy\'s reckoning with its past.',
      ],
      bodyGe: [
        'მტკიცებულება თავისთავად არ საუბრობს. ის მოითხოვს შენარჩუნებას, ორგანიზებას და კონტექსტს. მტკიცებულებათა არქივი არსებობს იმის უზრუნველსაყოფად, რომ რაც დადოკუმენტებულია, ვერ გაუდოკუმენტურდება—რომ ამ პერიოდის ჩანაწერი გადარჩება წაშლის, უარყოფისა და ისტორიული რევიზიის მცდელობებს.',
        'ეს არ არის პასიური შენახვა. ეს არის აქტიური კურატორობა ანგარიშვალდებულების სამსახურში. ყოველი მტკიცებულება შენარჩუნებულია იმ გაგებით, რომ ის ერთ დღეს შეიძლება დასჭირდეს სასამართლო დარბაზში, სიმართლის კომისიაში ან მომავალი დემოკრატიის ანგარიშსწორებაში თავის წარსულთან.',
      ],
    },
    {
      id: 'categories',
      heading: 'Evidence Categories',
      headingGe: 'მტკიცებულებათა კატეგორიები',
      body: [
        'The Archive organizes evidence across multiple thematic and temporal categories. This taxonomy enables efficient retrieval, cross-referencing, and pattern analysis while maintaining the integrity of individual evidentiary items.',
      ],
      bodyGe: [
        'არქივი აორგანიზებს მტკიცებულებებს მრავალ თემატურ და დროით კატეგორიაში. ეს ტაქსონომია უზრუნველყოფს ეფექტურ მოძიებას, ჯვარედინ მითითებას და ნიმუშების ანალიზს ინდივიდუალური მტკიცებულებითი ერთეულების მთლიანობის შენარჩუნებისას.',
      ],
      bullets: [
        'State violence documentation: Visual, testimonial, and forensic evidence of police and security force abuses',
        'Judicial capture records: Documented interference, politicized proceedings, and procedural violations',
        'Electoral manipulation evidence: Vote manipulation, voter intimidation, administrative fraud',
        'Corruption documentation: Financial flows, ownership structures, and illicit enrichment',
        'Cultural persecution records: Attacks on heritage, media, and civil society',
        'Institutional complicity documentation: Evidence of enabling conduct by officials and private actors',
      ],
      bulletsGe: [
        'სახელმწიფო ძალადობის დოკუმენტაცია: ვიზუალური, ჩვენებითი და სასამართლო-სამედიცინო მტკიცებულებები პოლიციისა და უსაფრთხოების ძალების ბოროტად გამოყენების შესახებ',
        'სასამართლოს დაპყრობის ჩანაწერები: დადოკუმენტებული ჩარევა, პოლიტიზებული სამართალწარმოება და პროცედურული დარღვევები',
        'საარჩევნო მანიპულაციის მტკიცებულებები: ხმების მანიპულაცია, ამომრჩეველთა დაშინება, ადმინისტრაციული გაყალბება',
        'კორუფციის დოკუმენტაცია: ფინანსური ნაკადები, საკუთრების სტრუქტურები და უკანონო გამდიდრება',
        'კულტურული დევნის ჩანაწერები: თავდასხმები მემკვიდრეობაზე, მედიაზე და სამოქალაქო საზოგადოებაზე',
        'ინსტიტუციური თანამონაწილეობის დოკუმენტაცია: მტკიცებულებები თანამდებობის პირებისა და კერძო მოქმედების ხელშემწყობი ქცევის შესახებ',
      ],
    },
    {
      id: 'standards',
      heading: 'Archival Standards',
      headingGe: 'არქივის სტანდარტები',
      body: [
        'The Archive adheres to international standards for human rights documentation, including the Berkeley Protocol on Digital Open Source Investigations, the Istanbul Protocol for medical evidence, and the Minnesota Protocol for death investigations.',
        'Chain of custody is maintained from intake through preservation. Metadata is captured, cryptographic hashes are generated, and multiple redundant copies are distributed across secure storage infrastructure.',
      ],
      bodyGe: [
        'არქივი იცავს ადამიანის უფლებათა დოკუმენტაციის საერთაშორისო სტანდარტებს, მათ შორის ბერკლის პროტოკოლს ციფრული ღია წყაროს გამოძიებებისთვის, ისტანბულის პროტოკოლს სამედიცინო მტკიცებულებებისთვის და მინესოტას პროტოკოლს სიკვდილის გამოძიებებისთვის.',
        'მეურვეობის ჯაჭვი ინარჩუნება მიღებიდან შენარჩუნებამდე. მეტადატა აღირიცხება, კრიპტოგრაფიული ჰეშები გენერირდება და მრავალი რეზერვის ასლი ნაწილდება უსაფრთხო შენახვის ინფრასტრუქტურაში.',
      ],
    },
    {
      id: 'access',
      heading: 'Access Policy',
      headingGe: 'წვდომის პოლიტიკა',
      body: [
        'Access to archived evidence is governed by principles of security, consent, and purpose. Source protection takes absolute precedence. Evidence is shared only when doing so serves accountability without endangering individuals.',
      ],
      bodyGe: [
        'არქივირებულ მტკიცებულებებზე წვდომა რეგულირდება უსაფრთხოების, თანხმობისა და მიზნის პრინციპებით. წყაროს დაცვას აქვს აბსოლუტური უპირატესობა. მტკიცებულება ზიარდება მხოლოდ მაშინ, როდესაც ამით ემსახურება ანგარიშვალდებულებას პირების საფრთხის შექმნის გარეშე.',
      ],
      bullets: [
        'Investigative access: Authorized researchers, journalists, and legal teams with demonstrated need',
        'Legal access: Courts, tribunals, and international mechanisms upon verified request',
        'Historical access: Controlled access for academic research with appropriate safeguards',
        'Public access: Selected materials published for transparency and public education',
      ],
      bulletsGe: [
        'საგამოძიებო წვდომა: ავტორიზებული მკვლევრები, ჟურნალისტები და სამართლებრივი გუნდები დემონსტრირებული საჭიროებით',
        'სამართლებრივი წვდომა: სასამართლოები, ტრიბუნალები და საერთაშორისო მექანიზმები დადასტურებული მოთხოვნის შემთხვევაში',
        'ისტორიული წვდომა: კონტროლირებადი წვდომა აკადემიური კვლევისთვის შესაბამისი დაცვით',
        'საჯარო წვდომა: შერჩეული მასალები გამოქვეყნებული გამჭვირვალობისა და საზოგადოების განათლებისთვის',
      ],
    },
  ],
};
