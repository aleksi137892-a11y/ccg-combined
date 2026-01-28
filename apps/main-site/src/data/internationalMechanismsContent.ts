import type { InstitutionalContent } from '@/types/institutional';

export const internationalMechanismsContent: InstitutionalContent = {
  meta: {
    title: 'International Mechanisms',
    titleGe: 'საერთაშორისო მექანიზმები',
    lastUpdated: 'January 2026',
    lastUpdatedGe: 'იანვარი 2026',
    intro: 'We engage with UN bodies, treaty organizations, and multilateral institutions to ensure documented violations reach appropriate forums for review and action.',
    introGe: 'ჩვენ ვთანამშრომლობთ გაეროს ორგანოებთან, ხელშეკრულების ორგანიზაციებთან და მრავალმხრივ ინსტიტუციებთან, რათა დოკუმენტირებული დარღვევები მიაღწიოს შესაბამის ფორუმებს განხილვისა და მოქმედებისთვის.',
  },
  jumpToItems: [
    { id: 'un-human-rights', label: 'UN Human Rights', labelGe: 'გაეროს ადამიანის უფლებები' },
    { id: 'icc', label: 'ICC', labelGe: 'საერთაშორისო სისხლის სამართლის სასამართლო' },
    { id: 'coe', label: 'Council of Europe', labelGe: 'ევროპის საბჭო' },
    { id: 'osce', label: 'OSCE', labelGe: 'ეუთო' },
    { id: 'special-procedures', label: 'Special Procedures', labelGe: 'სპეციალური პროცედურები' },
  ],
  sections: [
    {
      id: 'un-human-rights',
      heading: 'UN Human Rights System',
      headingGe: 'გაეროს ადამიანის უფლებათა სისტემა',
      body: [
        'The United Nations human rights system provides multiple avenues for addressing systematic violations. The Human Rights Council, treaty bodies, and special procedures each offer distinct mechanisms for documentation, review, and pressure.',
        'Georgia has ratified the major human rights treaties and is subject to periodic review by treaty bodies. We submit shadow reports and documentation to inform these reviews.',
      ],
      bodyGe: [
        'გაერთიანებული ერების ადამიანის უფლებათა სისტემა უზრუნველყოფს მრავალ გზას სისტემატური დარღვევების მოსაგვარებლად. ადამიანის უფლებათა საბჭო, ხელშეკრულების ორგანოები და სპეციალური პროცედურები თითოეული გთავაზობთ განსხვავებულ მექანიზმებს დოკუმენტირების, განხილვისა და ზეწოლისთვის.',
        'საქართველომ რატიფიცირებულია ძირითადი ადამიანის უფლებათა ხელშეკრულებები და ექვემდებარება ხელშეკრულების ორგანოების პერიოდულ განხილვას. ჩვენ წარვადგენთ ჩრდილოვან ანგარიშებს და დოკუმენტაციას ამ განხილვების ინფორმირებისთვის.',
      ],
      bullets: [
        'Universal Periodic Review (UPR): Comprehensive peer review every 4-5 years',
        'Treaty Bodies: CCPR, CAT, CERD, CEDAW, and others',
        'Human Rights Council: Special sessions for urgent situations',
        'Office of the High Commissioner: Technical assistance and monitoring',
      ],
      bulletsGe: [
        'უნივერსალური პერიოდული განხილვა (UPR): ყოვლისმომცველი თანატოლთა განხილვა ყოველ 4-5 წელს',
        'ხელშეკრულების ორგანოები: CCPR, CAT, CERD, CEDAW და სხვა',
        'ადამიანის უფლებათა საბჭო: სპეციალური სესიები გადაუდებელი სიტუაციებისთვის',
        'უმაღლესი კომისრის ოფისი: ტექნიკური დახმარება და მონიტორინგი',
      ],
    },
    {
      id: 'icc',
      heading: 'International Criminal Court',
      headingGe: 'საერთაშორისო სისხლის სამართლის სასამართლო',
      body: [
        'The International Criminal Court (ICC) in The Hague has jurisdiction over genocide, crimes against humanity, war crimes, and the crime of aggression. Georgia is a state party to the Rome Statute.',
        'The ICC operates on the principle of complementarity—it acts only when national courts are unwilling or unable to genuinely prosecute. This makes documentation of domestic judicial failures as important as documentation of the crimes themselves.',
      ],
      bodyGe: [
        'საერთაშორისო სისხლის სამართლის სასამართლოს (ICC) ჰააგაში აქვს იურისდიქცია გენოციდზე, კაცობრიობის წინააღმდეგ ჩადენილ დანაშაულებზე, ომის დანაშაულებზე და აგრესიის დანაშაულზე. საქართველო არის რომის სტატუტის მონაწილე სახელმწიფო.',
        'ICC მოქმედებს კომპლემენტარულობის პრინციპით—ის მოქმედებს მხოლოდ მაშინ, როდესაც ეროვნული სასამართლოები არ სურთ ან არ შეუძლიათ რეალურად სისხლისსამართლებრივი დევნა. ეს შიდა სასამართლო წარუმატებლობების დოკუმენტირებას ისეთივე მნიშვნელოვანს ხდის, როგორც თვით დანაშაულების დოკუმენტირებას.',
      ],
    },
    {
      id: 'coe',
      heading: 'Council of Europe Mechanisms',
      headingGe: 'ევროპის საბჭოს მექანიზმები',
      body: [
        'Beyond the European Court of Human Rights, the Council of Europe provides monitoring and pressure mechanisms through the Parliamentary Assembly, Venice Commission, and Commissioner for Human Rights.',
        'The Venice Commission issues opinions on constitutional and legislative matters. PACE resolutions and monitoring reports create political pressure on member states. These mechanisms are particularly relevant during democratic backsliding.',
      ],
      bodyGe: [
        'ადამიანის უფლებათა ევროპული სასამართლოს მიღმა, ევროპის საბჭო უზრუნველყოფს მონიტორინგისა და ზეწოლის მექანიზმებს საპარლამენტო ასამბლეის, ვენეციის კომისიისა და ადამიანის უფლებათა კომისრის მეშვეობით.',
        'ვენეციის კომისია გასცემს დასკვნებს კონსტიტუციურ და საკანონმდებლო საკითხებზე. PACE-ის რეზოლუციები და მონიტორინგის ანგარიშები ქმნიან პოლიტიკურ ზეწოლას წევრ სახელმწიფოებზე. ეს მექანიზმები განსაკუთრებით აქტუალურია დემოკრატიული უკან დახევის დროს.',
      ],
      bullets: [
        'Venice Commission: Constitutional and legislative opinions',
        'PACE Monitoring Committee: Country-specific oversight',
        'Commissioner for Human Rights: Country visits and reports',
        'GRECO: Anti-corruption monitoring',
      ],
      bulletsGe: [
        'ვენეციის კომისია: კონსტიტუციური და საკანონმდებლო დასკვნები',
        'PACE მონიტორინგის კომიტეტი: ქვეყნის სპეციფიკური ზედამხედველობა',
        'ადამიანის უფლებათა კომისარი: ქვეყნის ვიზიტები და ანგარიშები',
        'GRECO: ანტიკორუფციული მონიტორინგი',
      ],
    },
    {
      id: 'osce',
      heading: 'OSCE and Election Monitoring',
      headingGe: 'ეუთო და არჩევნების მონიტორინგი',
      body: [
        'The Organization for Security and Co-operation in Europe (OSCE) provides election monitoring through ODIHR and supports democratic institutions through its field operations.',
        'ODIHR election observation reports carry significant political weight. We provide documentation to complement official monitoring and ensure that post-election assessments reflect the full picture of electoral integrity.',
      ],
      bodyGe: [
        'ევროპაში უსაფრთხოებისა და თანამშრომლობის ორგანიზაცია (ეუთო) უზრუნველყოფს არჩევნების მონიტორინგს ODIHR-ის მეშვეობით და მხარს უჭერს დემოკრატიულ ინსტიტუტებს თავისი საველე ოპერაციების მეშვეობით.',
        'ODIHR-ის არჩევნების დაკვირვების ანგარიშებს მნიშვნელოვანი პოლიტიკური წონა აქვთ. ჩვენ ვუზრუნველყოფთ დოკუმენტაციას ოფიციალური მონიტორინგის შესავსებად და უზრუნველვყოფთ, რომ არჩევნების შემდგომი შეფასებები ასახავდეს საარჩევნო მთლიანობის სრულ სურათს.',
      ],
    },
    {
      id: 'special-procedures',
      heading: 'UN Special Procedures',
      headingGe: 'გაეროს სპეციალური პროცედურები',
      body: [
        'UN Special Rapporteurs and Working Groups can address individual cases and systemic patterns through communications, country visits, and thematic reports. We submit documentation to relevant mandate holders.',
        'Communications from Special Procedures, while not legally binding, create public records and political pressure. Country visit requests and reports draw international attention to specific situations.',
      ],
      bodyGe: [
        'გაეროს სპეციალურ მომხსენებლებს და სამუშაო ჯგუფებს შეუძლიათ მიმართონ ინდივიდუალურ საქმეებსა და სისტემურ ნიმუშებს კომუნიკაციების, ქვეყნის ვიზიტებისა და თემატური ანგარიშების მეშვეობით. ჩვენ წარვადგენთ დოკუმენტაციას შესაბამისი მანდატის მფლობელებისთვის.',
        'სპეციალური პროცედურების კომუნიკაციები, მიუხედავად იმისა, რომ იურიდიულად სავალდებულო არ არის, ქმნიან საჯარო ჩანაწერებს და პოლიტიკურ ზეწოლას. ქვეყნის ვიზიტის მოთხოვნები და ანგარიშები იზიდავენ საერთაშორისო ყურადღებას კონკრეტულ სიტუაციებზე.',
      ],
      bullets: [
        'Special Rapporteur on Torture',
        'Special Rapporteur on Human Rights Defenders',
        'Special Rapporteur on Freedom of Assembly',
        'Working Group on Arbitrary Detention',
        'Special Rapporteur on Independence of Judges and Lawyers',
      ],
      bulletsGe: [
        'სპეციალური მომხსენებელი წამებაზე',
        'სპეციალური მომხსენებელი ადამიანის უფლებათა დამცველებზე',
        'სპეციალური მომხსენებელი შეკრების თავისუფლებაზე',
        'სამუშაო ჯგუფი თვითნებურ დაკავებაზე',
        'სპეციალური მომხსენებელი მოსამართლეებისა და იურისტების დამოუკიდებლობაზე',
      ],
    },
  ],
};
