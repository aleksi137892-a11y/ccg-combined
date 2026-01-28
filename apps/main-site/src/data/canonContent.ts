// Canon Page Content - Complete Bilingual Data
import { InstitutionalContent } from '@/types/institutional';

export const canonContent: InstitutionalContent = {
  meta: {
    title: 'The Canon',
    titleGe: 'კანონი',
    lastUpdated: 'January 2026',
    lastUpdatedGe: '2026 წლის იანვარი',
    intro: 'The essential texts, documents, and sources that define Georgian civic identity and inform the work of the Civic Council of Georgia—a curated library of democratic thought.',
    introGe: 'ძირითადი ტექსტები, დოკუმენტები და წყაროები, რომლებიც განსაზღვრავენ ქართულ სამოქალაქო იდენტობას და აწვდიან ინფორმაციას საქართველოს სამოქალაქო საბჭოს მუშაობას—დემოკრატიული აზროვნების კურირებული ბიბლიოთეკა.',
  },

  jumpToItems: [
    { id: 'purpose', label: 'Purpose', labelGe: 'მიზანი' },
    { id: 'foundations', label: 'Foundations', labelGe: 'საფუძვლები' },
    { id: 'contemporary', label: 'Contemporary', labelGe: 'თანამედროვე' },
    { id: 'access', label: 'Access', labelGe: 'წვდომა' },
  ],

  sections: [
    {
      id: 'purpose',
      heading: 'Purpose of the Canon',
      headingGe: 'კანონის მიზანი',
      body: [
        'The Canon is not scripture; it is curriculum. These are the texts and sources that inform CCG\'s understanding of civic obligation, institutional accountability, and democratic governance. They represent the intellectual inheritance that shapes our work.',
        'A movement without intellectual foundations is merely a mood. The Canon provides the conceptual architecture that sustains our work beyond any single moment or crisis. It connects our present struggle to the longer history of democratic thought and human dignity.',
      ],
      bodyGe: [
        'კანონი არ არის წმინდა წერილი; ეს არის სასწავლო გეგმა. ეს არის ტექსტები და წყაროები, რომლებიც აწვდიან ინფორმაციას CCG-ის გაგებას სამოქალაქო ვალდებულების, ინსტიტუციური ანგარიშვალდებულებისა და დემოკრატიული მმართველობის შესახებ. ისინი წარმოადგენენ ინტელექტუალურ მემკვიდრეობას, რომელიც აყალიბებს ჩვენს მუშაობას.',
        'მოძრაობა ინტელექტუალური საფუძვლების გარეშე მხოლოდ განწყობაა. კანონი უზრუნველყოფს კონცეპტუალურ არქიტექტურას, რომელიც ინარჩუნებს ჩვენს მუშაობას ნებისმიერი ერთეული მომენტის ან კრიზისის მიღმა. ის აკავშირებს ჩვენს მიმდინარე ბრძოლას დემოკრატიული აზროვნებისა და ადამიანური ღირსების უფრო გრძელ ისტორიასთან.',
      ],
    },
    {
      id: 'foundations',
      heading: 'Foundational Texts',
      headingGe: 'საფუძვლიანი ტექსტები',
      body: [
        'The Canon begins with foundational texts that have shaped our understanding of human rights, democratic governance, and institutional accountability across cultures and centuries.',
      ],
      bodyGe: [
        'კანონი იწყება საფუძვლიანი ტექსტებით, რომლებმაც ჩამოაყალიბა ჩვენი გაგება ადამიანის უფლებების, დემოკრატიული მმართველობისა და ინსტიტუციური ანგარიშვალდებულების შესახებ კულტურებსა და საუკუნეებში.',
      ],
      bullets: [
        'The Universal Declaration of Human Rights (1948) and subsequent human rights instruments',
        'Georgian constitutional texts: the 1921 Constitution and its democratic foundations',
        'Classical Georgian literature: Rustaveli and the ethical tradition',
        'Key texts of the Georgian independence movement and 1991 restoration',
        'International humanitarian law and the Geneva Conventions',
      ],
      bulletsGe: [
        'ადამიანის უფლებათა საყოველთაო დეკლარაცია (1948) და შემდგომი ადამიანის უფლებათა ინსტრუმენტები',
        'ქართული კონსტიტუციური ტექსტები: 1921 წლის კონსტიტუცია და მისი დემოკრატიული საფუძვლები',
        'კლასიკური ქართული ლიტერატურა: რუსთაველი და ეთიკური ტრადიცია',
        'ქართული დამოუკიდებლობის მოძრაობისა და 1991 წლის აღდგენის ძირითადი ტექსტები',
        'საერთაშორისო ჰუმანიტარული სამართალი და ჟენევის კონვენციები',
      ],
    },
    {
      id: 'contemporary',
      heading: 'Contemporary Sources',
      headingGe: 'თანამედროვე წყაროები',
      body: [
        'The Canon is not frozen in the past. It includes contemporary scholarship and analysis that illuminates the current crisis and provides frameworks for understanding institutional capture, democratic backsliding, and pathways to restoration.',
      ],
      bodyGe: [
        'კანონი არ არის გაყინული წარსულში. ის მოიცავს თანამედროვე სტიპენდიას და ანალიზს, რომელიც ანათებს მიმდინარე კრიზისს და უზრუნველყოფს ჩარჩოებს ინსტიტუციური დაპყრობის, დემოკრატიული უკან დახევისა და აღდგენის გზების გასაგებად.',
      ],
      bullets: [
        'Scholarship on democratic transitions and consolidation',
        'Analysis of authoritarian capture and kleptocratic governance',
        'Human rights documentation methodology and standards',
        'Transitional justice frameworks and truth commission precedents',
        'Studies of successful democratic restoration movements',
      ],
      bulletsGe: [
        'სტიპენდია დემოკრატიულ გარდამავალ პერიოდებსა და კონსოლიდაციაზე',
        'ავტორიტარული დაპყრობისა და კლეპტოკრატიული მმართველობის ანალიზი',
        'ადამიანის უფლებათა დოკუმენტაციის მეთოდოლოგია და სტანდარტები',
        'გარდამავალი მართლმსაჯულების ჩარჩოები და სიმართლის კომისიის პრეცედენტები',
        'წარმატებული დემოკრატიული აღდგენის მოძრაობების კვლევები',
      ],
    },
    {
      id: 'access',
      heading: 'Access & Education',
      headingGe: 'წვდომა და განათლება',
      body: [
        'The Canon is not a closed collection for insiders. It is a resource for civic education. CCG works to make these texts accessible, translated where necessary, and contextualized for contemporary Georgian readers.',
        'Understanding the intellectual foundations of democratic governance is not a luxury; it is a necessity for citizenship. The Canon exists to support that understanding.',
      ],
      bodyGe: [
        'კანონი არ არის დახურული კოლექცია ინსაიდერებისთვის. ეს არის რესურსი სამოქალაქო განათლებისთვის. CCG მუშაობს ამ ტექსტების ხელმისაწვდომობისთვის, თარგმნილი საჭიროების შემთხვევაში და კონტექსტუალიზებული თანამედროვე ქართველი მკითხველებისთვის.',
        'დემოკრატიული მმართველობის ინტელექტუალური საფუძვლების გაგება არ არის ფუფუნება; ეს არის აუცილებლობა მოქალაქეობისთვის. კანონი არსებობს ამ გაგების მხარდასაჭერად.',
      ],
    },
  ],
};
