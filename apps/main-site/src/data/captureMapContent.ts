import type { InstitutionalContent } from '@/types/institutional';

export const captureMapContent: InstitutionalContent = {
  meta: {
    title: 'Capture Map',
    titleGe: 'ხელში ჩაგდების რუკა',
    lastUpdated: 'January 2026',
    lastUpdatedGe: 'იანვარი 2026',
    intro: 'Visualizing the networks of institutional capture and influence across key sectors of governance and civil society.',
    introGe: 'ინსტიტუციური ხელში ჩაგდებისა და გავლენის ქსელების ვიზუალიზაცია მმართველობისა და სამოქალაქო საზოგადოების ძირითად სექტორებში.',
  },
  jumpToItems: [
    { id: 'anatomy', label: 'Anatomy of Capture', labelGe: 'ხელში ჩაგდების ანატომია' },
    { id: 'network', label: 'Network Methodology', labelGe: 'ქსელის მეთოდოლოგია' },
    { id: 'layers', label: 'Capture Layers', labelGe: 'ხელში ჩაგდების ფენები' },
    { id: 'indicators', label: 'Warning Indicators', labelGe: 'გაფრთხილების ინდიკატორები' },
    { id: 'timeline', label: 'Chronology', labelGe: 'ქრონოლოგია' },
  ],
  sections: [
    {
      id: 'anatomy',
      heading: 'Anatomy of Capture',
      headingGe: 'ხელში ჩაგდების ანატომია',
      body: [
        'Capture is not conspiracy. It is structure. When one political-economic cluster controls the judiciary, the prosecutor, the central bank, the major media outlets, and the security services, the formal appearance of democracy persists while its substance evaporates.',
        'The Capture Map explains capture as a system, not a mystery. Systems depend on incentives, impunity, fear, narrative control, and external cover. Systems leave traces. Traces can be documented.',
      ],
      bodyGe: [
        'ხელში ჩაგდება არ არის შეთქმულება. ეს არის სტრუქტურა. როდესაც ერთი პოლიტიკურ-ეკონომიკური კლასტერი აკონტროლებს სასამართლოს, პროკურატურას, ცენტრალურ ბანკს, ძირითად მედიასაშუალებებს და უსაფრთხოების სამსახურებს, დემოკრატიის ფორმალური გარეგნობა რჩება, მაგრამ მისი არსი ქრება.',
        'ხელში ჩაგდების რუკა ხსნის ხელში ჩაგდებას როგორც სისტემას, არა საიდუმლოს. სისტემები დამოკიდებულია სტიმულებზე, დაუსჯელობაზე, შიშზე, ნარატივის კონტროლზე და გარე დაფარვაზე. სისტემები ტოვებენ კვალს. კვალი შეიძლება დოკუმენტირდეს.',
      ],
    },
    {
      id: 'network',
      heading: 'Network Visualization Methodology',
      headingGe: 'ქსელის ვიზუალიზაციის მეთოდოლოგია',
      body: [
        'The Capture Map uses open-source intelligence, corporate registry data, court filings, and procurement records to visualize relationships between individuals, entities, and institutions.',
        'Each node represents a documented entity. Each edge represents a verified relationship: ownership, employment, familial tie, or financial flow. We do not infer relationships; we document them.',
      ],
      bodyGe: [
        'ხელში ჩაგდების რუკა იყენებს ღია წყაროს დაზვერვას, კორპორატიულ რეესტრის მონაცემებს, სასამართლო საქმეებს და შესყიდვების ჩანაწერებს ინდივიდებს, ერთეულებსა და ინსტიტუტებს შორის ურთიერთობების ვიზუალიზაციისთვის.',
        'თითოეული კვანძი წარმოადგენს დოკუმენტირებულ ერთეულს. თითოეული ხაზი წარმოადგენს დადასტურებულ ურთიერთობას: საკუთრება, დასაქმება, ოჯახური კავშირი ან ფინანსური ნაკადი. ჩვენ არ ვვარაუდობთ ურთიერთობებს; ჩვენ მათ ვადასტურებთ.',
      ],
      bullets: [
        'Corporate beneficial ownership chains',
        'Political finance flows and donor networks',
        'Judicial appointment patterns and case outcomes',
        'Media ownership and editorial control',
        'Procurement contract clustering',
      ],
      bulletsGe: [
        'კორპორატიული ბენეფიციარული საკუთრების ჯაჭვები',
        'პოლიტიკური ფინანსური ნაკადები და დონორთა ქსელები',
        'სასამართლო დანიშვნების შაბლონები და საქმეთა შედეგები',
        'მედიის საკუთრება და სარედაქციო კონტროლი',
        'შესყიდვების კონტრაქტების კლასტერირება',
      ],
    },
    {
      id: 'layers',
      heading: 'Capture Layers',
      headingGe: 'ხელში ჩაგდების ფენები',
      body: [
        'The Map organizes capture across institutional layers, each representing a distinct vector of democratic erosion:',
      ],
      bodyGe: [
        'რუკა აორგანიზებს ხელში ჩაგდებას ინსტიტუციური ფენების მიხედვით, თითოეული წარმოადგენს დემოკრატიული ეროზიის განსხვავებულ ვექტორს:',
      ],
      bullets: [
        'Judiciary: Constitutional Court, Supreme Court, prosecutorial independence',
        'Security: Interior Ministry, State Security, intelligence oversight',
        'Media: Broadcasting licenses, advertising market control, editorial capture',
        'Economy: Central Bank, procurement systems, regulatory capture',
        'Civil Society: NGO funding restrictions, SLAPP litigation, registration barriers',
      ],
      bulletsGe: [
        'სასამართლო: საკონსტიტუციო სასამართლო, უზენაესი სასამართლო, საპროკურორო დამოუკიდებლობა',
        'უსაფრთხოება: შინაგან საქმეთა სამინისტრო, სახელმწიფო უსაფრთხოება, დაზვერვის ზედამხედველობა',
        'მედია: მაუწყებლობის ლიცენზიები, სარეკლამო ბაზრის კონტროლი, სარედაქციო ხელში ჩაგდება',
        'ეკონომიკა: ცენტრალური ბანკი, შესყიდვების სისტემები, მარეგულირებელი ხელში ჩაგდება',
        'სამოქალაქო საზოგადოება: არასამთავრობო დაფინანსების შეზღუდვები, SLAPP სამართალწარმოება, რეგისტრაციის ბარიერები',
      ],
    },
    {
      id: 'indicators',
      heading: 'Warning Indicators',
      headingGe: 'გაფრთხილების ინდიკატორები',
      body: [
        'The Capture Map tracks institutional warning signs—patterns that historically precede democratic breakdown. These are not predictions; they are documented observations of structural vulnerability.',
      ],
      bodyGe: [
        'ხელში ჩაგდების რუკა აკვირდება ინსტიტუციურ გაფრთხილების ნიშნებს—შაბლონებს, რომლებიც ისტორიულად წინ უსწრებენ დემოკრატიულ რღვევას. ეს არ არის პროგნოზები; ეს არის სტრუქტურული მოწყვლადობის დოკუმენტირებული დაკვირვებები.',
      ],
      bullets: [
        'Judicial appointment concentration in single-party nominations',
        'Prosecutorial inaction on politically significant cases',
        'Media ownership consolidation under regime-aligned entities',
        'NGO registration denials or funding restrictions',
        'Election administration appointments bypassing opposition input',
      ],
      bulletsGe: [
        'სასამართლო დანიშვნების კონცენტრაცია ერთპარტიული ნომინაციებით',
        'საპროკურორო უმოქმედობა პოლიტიკურად მნიშვნელოვან საქმეებზე',
        'მედია საკუთრების კონსოლიდაცია რეჟიმთან დაკავშირებული ერთეულების ქვეშ',
        'არასამთავრობო რეგისტრაციის უარყოფა ან დაფინანსების შეზღუდვები',
        'საარჩევნო ადმინისტრაციის დანიშვნები ოპოზიციის ჩართვის გარეშე',
      ],
    },
    {
      id: 'timeline',
      heading: 'Chronology of Capture',
      headingGe: 'ხელში ჩაგდების ქრონოლოგია',
      body: [
        'The Capture Map includes a timeline view that documents the sequence of institutional changes—when key appointments were made, when legislation was passed, when enforcement patterns shifted.',
        'Understanding capture requires understanding sequence. Each step enables the next. The timeline reveals not just what happened, but how the system was assembled.',
      ],
      bodyGe: [
        'ხელში ჩაგდების რუკა მოიცავს დროის ხაზის ხედს, რომელიც ადასტურებს ინსტიტუციური ცვლილებების თანმიმდევრობას—როდის გაკეთდა ძირითადი დანიშვნები, როდის იქნა მიღებული კანონმდებლობა, როდის შეიცვალა აღსრულების შაბლონები.',
        'ხელში ჩაგდების გაგება მოითხოვს თანმიმდევრობის გაგებას. თითოეული ნაბიჯი შესაძლებელს ხდის შემდეგს. დროის ხაზი ავლენს არა მხოლოდ რა მოხდა, არამედ როგორ იქნა აწყობილი სისტემა.',
      ],
    },
  ],
};
