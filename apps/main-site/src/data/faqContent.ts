// ============================================================================
// FAQ CONTENT - Consolidated from all institutional pages
// Bilingual (EN/GE) comprehensive FAQ dataset
// ============================================================================

export interface FaqItem {
  id: string;
  category: string;
  categoryGe: string;
  question: string;
  questionGe: string;
  answer: string;
  answerGe: string;
}

export interface FaqContent {
  meta: {
    title: string;
    titleGe: string;
    description: string;
    descriptionGe: string;
    lastUpdated: string;
    lastUpdatedGe: string;
  };
  categories: Array<{
    id: string;
    label: string;
    labelGe: string;
  }>;
  items: FaqItem[];
}

export const faqContent: FaqContent = {
  meta: {
    title: 'Frequently Asked Questions',
    titleGe: 'ხშირად დასმული კითხვები',
    description: 'Answers to common questions about the Civic Council of Georgia, our mission, methods, and how we work.',
    descriptionGe: 'პასუხები ხშირად დასმულ კითხვებზე საქართველოს სამოქალაქო საბჭოს, ჩვენი მისიის, მეთოდებისა და მუშაობის შესახებ.',
    lastUpdated: 'January 2026',
    lastUpdatedGe: 'იანვარი 2026',
  },
  categories: [
    { id: 'mission', label: 'Mission', labelGe: 'მისია' },
    { id: 'nonpartisanship', label: 'Nonpartisanship', labelGe: 'მიუკერძოებლობა' },
    { id: 'funding', label: 'Funding', labelGe: 'დაფინანსება' },
    { id: 'safety', label: 'Safety', labelGe: 'უსაფრთხოება' },
    { id: 'methods', label: 'Methods', labelGe: 'მეთოდები' },
    { id: 'integrity', label: 'Integrity', labelGe: 'მთლიანობა' },
    { id: 'programs', label: 'Programs', labelGe: 'პროგრამები' },
    { id: 'petitions', label: 'Petitions', labelGe: 'პეტიციები' },
    { id: 'legal', label: 'Legal', labelGe: 'იურიდიული' },
    { id: 'press', label: 'Press', labelGe: 'პრესა' },
  ],
  items: [
    // ========================================================================
    // MISSION
    // ========================================================================
    {
      id: 'what-is-ccg',
      category: 'mission',
      categoryGe: 'მისია',
      question: 'What is the Civic Council of Georgia?',
      questionGe: 'რა არის საქართველოს სამოქალაქო საბჭო?',
      answer: 'CCG is an independent, nonpartisan institution that documents abuses of power, verifies claims of harm, and builds accountability pathways when formal institutions fail. We operate as a civic archive—collecting evidence, publishing findings, and supporting international accountability mechanisms. We are not a political party, advocacy group, or legal service provider.',
      answerGe: 'CCG არის დამოუკიდებელი, არაპარტიული ინსტიტუცია, რომელიც აფიქსირებს ძალაუფლების ბოროტად გამოყენებას, ამოწმებს ზიანის შესახებ პრეტენზიებს და ქმნის ანგარიშვალდებულების გზებს, როდესაც ფორმალური ინსტიტუციები ვერ ასრულებენ ფუნქციას. ჩვენ ვმოქმედებთ როგორც სამოქალაქო არქივი—ვაგროვებთ მტკიცებულებებს, ვაქვეყნებთ დასკვნებს და ვმხარს ვუჭერთ საერთაშორისო ანგარიშვალდებულების მექანიზმებს.',
    },
    {
      id: 'why-does-ccg-exist',
      category: 'mission',
      categoryGe: 'მისია',
      question: 'Why does CCG exist?',
      questionGe: 'რატომ არსებობს CCG?',
      answer: 'When courts are compromised, prosecutors are captured, and parliamentary oversight fails, citizens lose access to remedy. CCG exists to preserve the possibility of accountability—documenting what institutions refuse to investigate, so that future courts, historians, and international bodies have a verified record. We are the archive that power would prefer not to exist.',
      answerGe: 'როდესაც სასამართლოები კომპრომეტირებულია, პროკურორები ხელში ჩაგდებული და საპარლამენტო ზედამხედველობა ჩავარდნილი, მოქალაქეები კარგავენ წვდომას გამოსწორებაზე. CCG არსებობს ანგარიშვალდებულების შესაძლებლობის შესანარჩუნებლად—ვაფიქსირებთ იმას, რისი გამოძიებაზეც ინსტიტუციები უარს ამბობენ.',
    },
    {
      id: 'what-does-ccg-do',
      category: 'mission',
      categoryGe: 'მისია',
      question: 'What does CCG actually do?',
      questionGe: 'რას აკეთებს CCG რეალურად?',
      answer: 'We receive petitions from citizens who have experienced or witnessed abuses. We verify claims through open-source investigation, document analysis, and corroboration. We publish findings in structured formats—The List, the Ledger of Harm, investigation reports. We support international accountability pathways including sanctions submissions, strategic litigation referrals, and criminal dossier preparation.',
      answerGe: 'ჩვენ ვიღებთ პეტიციებს მოქალაქეებისგან, რომლებმაც განიცადეს ან იყვნენ ძალადობის მოწმეები. ვამოწმებთ პრეტენზიებს ღია წყაროების გამოძიებით, დოკუმენტების ანალიზითა და დადასტურებით. ვაქვეყნებთ დასკვნებს სტრუქტურირებული ფორმატით—სია, ზიანის რეესტრი, გამოძიების ანგარიშები.',
    },
    {
      id: 'civic-necessity-doctrine',
      category: 'mission',
      categoryGe: 'მისია',
      question: 'What is the Doctrine of Civic Necessity?',
      questionGe: 'რა არის სამოქალაქო აუცილებლობის დოქტრინა?',
      answer: 'The Doctrine of Civic Necessity holds that when institutions designed to protect citizens become instruments of harm, citizens have both the right and the duty to create parallel accountability structures. This is not rebellion—it is the preservation of civic order when formal institutions have abdicated their function. The doctrine provides the philosophical foundation for CCG\'s existence.',
      answerGe: 'სამოქალაქო აუცილებლობის დოქტრინა ადგენს, რომ როდესაც მოქალაქეთა დასაცავად შექმნილი ინსტიტუტები ზიანის ინსტრუმენტებად იქცევა, მოქალაქეებს აქვთ როგორც უფლება, ისე მოვალეობა შექმნან პარალელური ანგარიშვალდებულების სტრუქტურები.',
    },
    {
      id: 'state-capture-meaning',
      category: 'mission',
      categoryGe: 'მისია',
      question: 'What does "state capture" mean?',
      questionGe: 'რას ნიშნავს "სახელმწიფოს ხელში ჩაგდება"?',
      answer: 'State capture occurs when private interests—oligarchs, foreign powers, or political networks—gain control over public institutions, redirecting them from serving citizens to serving private agendas. Captured courts protect the powerful. Captured prosecutors ignore crimes. Captured media manufactures consent. The result is a state that looks democratic but functions as an extraction machine.',
      answerGe: 'სახელმწიფოს ხელში ჩაგდება ხდება, როდესაც კერძო ინტერესები—ოლიგარქები, უცხო ძალები ან პოლიტიკური ქსელები—აღწევენ კონტროლს საჯარო ინსტიტუციებზე, მათ მოქალაქეთა მსახურებიდან კერძო ინტერესების მსახურებისკენ გადამისამართებით.',
    },
    {
      id: 'why-outside-georgia',
      category: 'mission',
      categoryGe: 'მისია',
      question: 'Why does CCG operate from outside Georgia?',
      questionGe: 'რატომ მოქმედებს CCG საქართველოს გარეთ?',
      answer: 'Institutions documenting state capture from within captured states face existential risks—asset seizure, prosecution, violence against staff. Operating from democratic jurisdictions allows us to maintain independence, protect sources, and continue documentation regardless of domestic political pressure. This is not exile; it is strategic positioning for durability.',
      answerGe: 'ინსტიტუციები, რომლებიც აფიქსირებენ სახელმწიფოს ხელში ჩაგდებას ხელში ჩაგდებული სახელმწიფოების შიგნიდან, ექსისტენციალური რისკების წინაშე დგანან. დემოკრატიული იურისდიქციებიდან მოქმედება გვაძლევს საშუალებას შევინარჩუნოთ დამოუკიდებლობა.',
    },
    {
      id: 'who-leads-ccg',
      category: 'mission',
      categoryGe: 'მისია',
      question: 'Who leads CCG and why are they anonymous?',
      questionGe: 'ვინ ხელმძღვანელობს CCG-ს და რატომ არიან ანონიმურები?',
      answer: 'CCG\'s operational leadership maintains protected identities for security reasons. This is standard practice for accountability institutions working in hostile environments. Our Advisory Council members are public. Our methodology is transparent. Our findings are verifiable. The institution\'s credibility rests on its work, not on personality.',
      answerGe: 'CCG-ის ოპერაციული ხელმძღვანელობა ინარჩუნებს დაცულ ვინაობას უსაფრთხოების მიზეზების გამო. ეს სტანდარტული პრაქტიკაა ანგარიშვალდებულების ინსტიტუტებისთვის, რომლებიც მუშაობენ მტრულ გარემოში.',
    },

    // ========================================================================
    // NONPARTISANSHIP
    // ========================================================================
    {
      id: 'political-party',
      category: 'nonpartisanship',
      categoryGe: 'მიუკერძოებლობა',
      question: 'Are you a political party or opposition movement?',
      questionGe: 'თქვენ პოლიტიკური პარტია ხართ თუ ოპოზიციური მოძრაობა?',
      answer: 'No. CCG is institutionally independent from all political parties, movements, and campaigns. We do not endorse candidates, coordinate with party structures, or pursue electoral objectives. Our work is methodological—we apply the same evidentiary standards regardless of who holds power. Accountability is not opposition; it is the baseline requirement of governance.',
      answerGe: 'არა. CCG ინსტიტუციურად დამოუკიდებელია ყველა პოლიტიკური პარტიისგან, მოძრაობისა და კამპანიისგან. ჩვენ არ ვუჭერთ მხარს კანდიდატებს, არ ვკოორდინირებთ პარტიულ სტრუქტურებთან და არ ვმისწრაფით საარჩევნო მიზნებისკენ. ჩვენი მუშაობა მეთოდოლოგიურია.',
    },
    {
      id: 'endorsements',
      category: 'nonpartisanship',
      categoryGe: 'მიუკერძოებლობა',
      question: 'Can people associated with CCG endorse political parties or candidates?',
      questionGe: 'შეუძლიათ თუ არა CCG-სთან დაკავშირებულ პირებს პოლიტიკური პარტიების ან კანდიდატების მხარდაჭერა?',
      answer: 'CCG staff, advisors, and official representatives may not make public political endorsements while serving in their CCG capacity. Personal political views are private matters, but public endorsement activity would compromise institutional independence. This policy ensures that CCG\'s findings cannot be dismissed as partisan advocacy.',
      answerGe: 'CCG-ის თანამშრომლებს, მრჩევლებსა და ოფიციალურ წარმომადგენლებს არ შეუძლიათ საჯარო პოლიტიკური მხარდაჭერის გამოხატვა CCG-ის სახელით მოქმედებისას. პირადი პოლიტიკური შეხედულებები კერძო საკითხია, მაგრამ საჯარო მხარდაჭერა დააზიანებს ინსტიტუციურ დამოუკიდებლობას.',
    },
    {
      id: 'bias-accusations',
      category: 'nonpartisanship',
      categoryGe: 'მიუკერძოებლობა',
      question: 'How do you respond to accusations of political bias?',
      questionGe: 'როგორ პასუხობთ პოლიტიკური მიკერძოებულობის ბრალდებებს?',
      answer: 'Our methodology is public. Our sources are cited. Our standards are published. Anyone who believes our findings are biased can examine our evidence, challenge our methods, and submit corrections through our Right of Reply process. Accountability work will always be characterized as "political" by those who prefer impunity—this is expected. The question is whether our documentation is accurate, not whether it is convenient.',
      answerGe: 'ჩვენი მეთოდოლოგია საჯაროა. ჩვენი წყაროები მითითებულია. ჩვენი სტანდარტები გამოქვეყნებულია. ვინც თვლის, რომ ჩვენი დასკვნები მიკერძოებულია, შეუძლია შეამოწმოს ჩვენი მტკიცებულებები, გააპროტესტოს მეთოდები და წარმოადგინოს შესწორებები პასუხის უფლების პროცესით.',
    },

    // ========================================================================
    // FUNDING
    // ========================================================================
    {
      id: 'foreign-government-funding',
      category: 'funding',
      categoryGe: 'დაფინანსება',
      question: 'Do you accept funding from foreign governments?',
      questionGe: 'იღებთ თუ არა დაფინანსებას უცხო მთავრობებისგან?',
      answer: 'No. CCG does not accept funding from any foreign government, government-controlled entity, or quasi-governmental organization. This is a foundational policy, not a tactical choice. Government funding—even from allied democracies—creates real or perceived dependencies that compromise institutional credibility. Our work must be beyond reproach in this regard.',
      answerGe: 'არა. CCG არ იღებს დაფინანსებას არცერთი უცხო მთავრობისგან, მთავრობის მიერ კონტროლირებული ორგანიზაციისგან ან კვაზი-სამთავრობო ორგანიზაციისგან. ეს ფუნდამენტური პოლიტიკაა, არა ტაქტიკური არჩევანი.',
    },
    {
      id: 'funding-sources',
      category: 'funding',
      categoryGe: 'დაფინანსება',
      question: 'How is CCG funded?',
      questionGe: 'როგორ ფინანსდება CCG?',
      answer: 'CCG is funded by private philanthropy, individual donations, and foundation grants from organizations that share our commitment to accountability, transparency, and the rule of law. All donors above threshold amounts are disclosed in our annual transparency reports. Donors have no influence over our findings, publications, or operational decisions.',
      answerGe: 'CCG ფინანსდება კერძო ფილანთროპიით, ინდივიდუალური შემოწირულობებით და ფონდების გრანტებით იმ ორგანიზაციებისგან, რომლებიც იზიარებენ ჩვენს ერთგულებას ანგარიშვალდებულების, გამჭვირვალობისა და კანონის უზენაესობის მიმართ.',
    },
    {
      id: 'donor-influence',
      category: 'funding',
      categoryGe: 'დაფინანსება',
      question: 'Can donors influence what you publish or investigate?',
      questionGe: 'შეუძლიათ თუ არა დონორებს გავლენა მოახდინონ იმაზე, რასაც აქვეყნებთ ან იძიებთ?',
      answer: 'No. Editorial independence is non-negotiable. Donors fund our mission; they do not purchase editorial control. No donor has veto power over investigations, publications, or findings. Any attempt to condition funding on editorial outcomes results in immediate termination of the relationship. This firewall is structural, not aspirational.',
      answerGe: 'არა. სარედაქციო დამოუკიდებლობა შეუვალია. დონორები აფინანსებენ ჩვენს მისიას; ისინი არ ყიდულობენ სარედაქციო კონტროლს. არცერთ დონორს არ აქვს ვეტოს უფლება გამოძიებებზე, პუბლიკაციებსა თუ დასკვნებზე.',
    },
    {
      id: 'anonymous-donors',
      category: 'funding',
      categoryGe: 'დაფინანსება',
      question: 'Why don\'t you publish every donor\'s name?',
      questionGe: 'რატომ არ აქვეყნებთ ყველა დონორის სახელს?',
      answer: 'Small donors (below published thresholds) are not individually disclosed to protect their privacy and safety—particularly those in Georgia who may face retaliation. Major donors above threshold are disclosed in annual transparency reports. We believe this balance protects both accountability and the safety of supporters.',
      answerGe: 'მცირე დონორები (გამოქვეყნებულ ზღვარს ქვემოთ) ინდივიდუალურად არ იხსნებიან მათი კონფიდენციალურობისა და უსაფრთხოების დასაცავად—განსაკუთრებით საქართველოში მყოფები, რომლებსაც შესაძლოა შურისძიება ემუქრებოდეთ.',
    },
    {
      id: 'corporate-funding',
      category: 'funding',
      categoryGe: 'დაფინანსება',
      question: 'Do you accept corporate funding?',
      questionGe: 'იღებთ თუ არა კორპორატიულ დაფინანსებას?',
      answer: 'CCG may accept corporate contributions subject to enhanced due diligence. Companies with significant operations in Georgia, those subject to our investigations, or those with potential conflicts of interest are excluded. Corporate donors receive no special access, information, or consideration. The same editorial firewall applies.',
      answerGe: 'CCG-მ შესაძლოა მიიღოს კორპორატიული შემოწირულობები გაძლიერებული ჯეროვანი შემოწმების პირობით. კომპანიები, რომლებსაც აქვთ მნიშვნელოვანი ოპერაციები საქართველოში, ისინი ვინც ჩვენი გამოძიების ობიექტია, ან ვისაც პოტენციური ინტერესთა კონფლიქტი აქვს, გამორიცხულია.',
    },
    {
      id: 'tax-deductible',
      category: 'funding',
      categoryGe: 'დაფინანსება',
      question: 'Are donations to CCG tax-deductible?',
      questionGe: 'არის თუ არა CCG-ისთვის შემოწირულობები გადასახადისგან გამოქვითვადი?',
      answer: 'CCG is administered by Civic Council of Georgia, Inc., a U.S. 501(c)(3) public charity. Donations from U.S. taxpayers are generally tax-deductible to the extent permitted by law. Consult your tax advisor for specific guidance. Non-U.S. donors should consult local tax regulations.',
      answerGe: 'CCG-ს ადმინისტრირებას ახდენს Civic Council of Georgia, Inc., აშშ-ის 501(c)(3) საზოგადოებრივი საქველმოქმედო ორგანიზაცია. აშშ-ის გადასახადის გადამხდელების შემოწირულობები ზოგადად გამოქვითვადია კანონით ნებადართულ ფარგლებში.',
    },
    {
      id: 'why-publish-funding',
      category: 'funding',
      categoryGe: 'დაფინანსება',
      question: 'Why do you publish funding policies?',
      questionGe: 'რატომ აქვეყნებთ დაფინანსების პოლიტიკას?',
      answer: 'An institution that can be captured through its purse is no institution at all. We publish our funding policies so that anyone—supporters, critics, subjects of our reports—can assess whether our work is compromised by financial dependencies. Transparency is not virtue signaling; it is structural protection against capture.',
      answerGe: 'ინსტიტუცია, რომლის ხელში ჩაგდებაც შესაძლებელია საფულის მეშვეობით, საერთოდ არ არის ინსტიტუცია. ჩვენ ვაქვეყნებთ ჩვენს დაფინანსების პოლიტიკას, რათა ნებისმიერმა შეაფასოს, არის თუ არა ჩვენი მუშაობა კომპრომეტირებული ფინანსური დამოკიდებულებებით.',
    },
    {
      id: 'what-we-refuse',
      category: 'funding',
      categoryGe: 'დაფინანსება',
      question: 'What funding do you refuse?',
      questionGe: 'რა დაფინანსებაზე უარს ამბობთ?',
      answer: 'We refuse all funding from foreign governments and government-controlled entities, funding with editorial conditions attached, anonymous contributions above disclosure thresholds, and support from entities under investigation or with conflicts of interest. These are not preferences—they are firewalls.',
      answerGe: 'უარს ვამბობთ უცხო მთავრობებისა და მთავრობის მიერ კონტროლირებული ორგანიზაციებისგან დაფინანსებაზე, სარედაქციო პირობებიანი დაფინანსებაზე, ანონიმურ კონტრიბუციებზე ზღვარს ზემოთ და გამოძიების ქვეშ მყოფი ორგანიზაციებისგან მხარდაჭერაზე.',
    },
    {
      id: 'no-pay-to-delist',
      category: 'funding',
      categoryGe: 'დაფინანსება',
      question: 'What is the "no pay-to-de-list" policy?',
      questionGe: 'რა არის "არ გადაიხადო ამოსაშლელად" პოლიტიკა?',
      answer: 'No financial contribution—of any size, from any source—will influence whether an individual or entity appears in our publications. Our findings are based on evidence, not on who funds us. Anyone who attempts to condition a donation on editorial outcomes is immediately and permanently excluded from our donor community.',
      answerGe: 'არანაირი ფინანსური შემოწირულობა—არანაირი ზომის, არანაირი წყაროდან—არ იმოქმედებს იმაზე, გამოჩნდება თუ არა პირი ან ორგანიზაცია ჩვენს პუბლიკაციებში. ჩვენი დასკვნები ეფუძნება მტკიცებულებებს, არა იმას ვინ გვაფინანსებს.',
    },
    {
      id: 'independence-firewalls',
      category: 'funding',
      categoryGe: 'დაფინანსება',
      question: 'How do you protect editorial independence?',
      questionGe: 'როგორ იცავთ სარედაქციო დამოუკიდებლობას?',
      answer: 'Editorial and fundraising functions are structurally separated. Donors have no access to editorial decisions, investigation targets, or publication timing. All donor communications are reviewed for any hint of editorial expectation—which results in immediate relationship termination. Independence is not aspirational; it is architectural.',
      answerGe: 'სარედაქციო და ფონდების მოზიდვის ფუნქციები სტრუქტურულად გამიჯნულია. დონორებს არ აქვთ წვდომა სარედაქციო გადაწყვეტილებებზე, გამოძიების სამიზნეებზე ან გამოქვეყნების დროზე.',
    },
    {
      id: 'donor-due-diligence',
      category: 'funding',
      categoryGe: 'დაფინანსება',
      question: 'How do you vet donors?',
      questionGe: 'როგორ ამოწმებთ დონორებს?',
      answer: 'All donors above threshold amounts undergo due diligence screening for conflicts of interest, reputational risks, and potential capture vectors. We verify that accepting support will not compromise our independence or credibility. Some offers are declined. We would rather operate with less than operate compromised.',
      answerGe: 'ყველა დონორი ზღვარს ზემოთ გადის ჯეროვანი შემოწმების სკრინინგს ინტერესთა კონფლიქტის, რეპუტაციული რისკებისა და პოტენციური ხელში ჩაგდების ვექტორებისთვის.',
    },

    // ========================================================================
    // SAFETY
    // ========================================================================
    {
      id: 'petition-safety',
      category: 'safety',
      categoryGe: 'უსაფრთხოება',
      question: 'Is it safe to submit a petition to CCG?',
      questionGe: 'უსაფრთხოა თუ არა CCG-ისთვის პეტიციის წარდგენა?',
      answer: 'We maintain rigorous security protocols to protect petitioners. Submissions can be made anonymously. We never publish petitioner identities without explicit consent. We use encrypted communications and secure document handling. However, we cannot guarantee absolute safety—particularly for those already under surveillance. If you are at immediate risk, contact us through our Secure Channel before submitting sensitive materials.',
      answerGe: 'ჩვენ ვინარჩუნებთ მკაცრ უსაფრთხოების პროტოკოლებს პეტიციონერების დასაცავად. შეტყობინებები შეიძლება გაკეთდეს ანონიმურად. ჩვენ არასოდეს ვაქვეყნებთ პეტიციონერების ვინაობას მკაფიო თანხმობის გარეშე.',
    },
    {
      id: 'source-protection',
      category: 'safety',
      categoryGe: 'უსაფრთხოება',
      question: 'How do you protect sources?',
      questionGe: 'როგორ იცავთ წყაროებს?',
      answer: 'Source protection is a core institutional commitment. We use end-to-end encrypted communications. Source identities are compartmentalized—most staff never know who provided specific information. We do not comply with requests from governments or courts to reveal source identities. We would rather not publish than compromise a source.',
      answerGe: 'წყაროს დაცვა ინსტიტუციური ვალდებულებაა. ჩვენ ვიყენებთ ბოლოდან ბოლომდე დაშიფრულ კომუნიკაციებს. წყაროების ვინაობა კომპარტმენტალიზებულია—პერსონალის უმეტესობამ არ იცის ვინ მოგვაწოდა კონკრეტული ინფორმაცია.',
    },
    {
      id: 'retaliation-risk',
      category: 'safety',
      categoryGe: 'უსაფრთხოება',
      question: 'What if I face retaliation after submitting a petition?',
      questionGe: 'რა მოხდება თუ შურისძიების წინაშე აღმოვჩნდები პეტიციის წარდგენის შემდეგ?',
      answer: 'If you experience retaliation, document it and contact us immediately through secure channels. Retaliation itself becomes part of the record—it demonstrates the very capture we document. We work with international protection networks and can provide referrals to organizations that offer legal assistance, emergency relocation, and other protective measures.',
      answerGe: 'თუ თქვენ განიცდით შურისძიებას, დააფიქსირეთ ის და დაგვიკავშირდით დაუყოვნებლივ უსაფრთხო არხებით. შურისძიება თავად ხდება ჩანაწერის ნაწილი—ის აჩვენებს სწორედ იმ ხელში ჩაგდებას, რასაც ჩვენ ვაფიქსირებთ.',
    },

    // ========================================================================
    // METHODS
    // ========================================================================
    {
      id: 'investigation-process',
      category: 'methods',
      categoryGe: 'მეთოდები',
      question: 'Do you investigate claims, or just publish petitions?',
      questionGe: 'თქვენ იძიებთ პრეტენზიებს თუ უბრალოდ აქვეყნებთ პეტიციებს?',
      answer: 'We investigate. Every substantive claim undergoes verification before publication. We use open-source intelligence, document forensics, witness corroboration, and expert consultation. Claims that cannot be verified are not published as findings. The distinction between allegation and verified finding is fundamental to our methodology.',
      answerGe: 'ჩვენ ვიძიებთ. ყოველი არსებითი პრეტენზია გადის ვერიფიკაციას გამოქვეყნებამდე. ჩვენ ვიყენებთ ღია წყაროების დაზვერვას, დოკუმენტების ფორენზიკას, მოწმეთა დადასტურებას და ექსპერტულ კონსულტაციას.',
    },
    {
      id: 'evidence-standards',
      category: 'methods',
      categoryGe: 'მეთოდები',
      question: 'What evidence standards do you use?',
      questionGe: 'რა მტკიცებულების სტანდარტებს იყენებთ?',
      answer: 'We use graduated confidence levels: "Confirmed" (multiple independent sources, documentary evidence), "Highly Likely" (strong corroboration, pattern evidence), "Likely" (credible sources, contextual support), and "Reported" (single credible source, awaiting corroboration). These labels are always published with our findings so readers can assess evidentiary weight.',
      answerGe: 'ჩვენ ვიყენებთ გრადუირებულ სანდოობის დონეებს: "დადასტურებული", "მაღალი ალბათობით", "სავარაუდოდ" და "მოხსენებული". ეს ეტიკეტები ყოველთვის ქვეყნდება ჩვენს დასკვნებთან ერთად.',
    },
    {
      id: 'right-of-reply',
      category: 'methods',
      categoryGe: 'მეთოდები',
      question: 'Do subjects of your reports get to respond before publication?',
      questionGe: 'აქვთ თუ არა თქვენი ანგარიშების სუბიექტებს პასუხის უფლება გამოქვეყნებამდე?',
      answer: 'Yes. Before publishing findings about named individuals or entities, we provide opportunity for response. Subjects receive notice of intended publication and specific allegations. They may submit responses which are reviewed and, where appropriate, incorporated or published alongside our findings. This is not a courtesy—it is a methodological requirement.',
      answerGe: 'დიახ. დასახელებულ პირებზე ან ორგანიზაციებზე დასკვნების გამოქვეყნებამდე ჩვენ ვაძლევთ პასუხის შესაძლებლობას. სუბიექტები იღებენ შეტყობინებას დაგეგმილი გამოქვეყნებისა და კონკრეტული ბრალდებების შესახებ.',
    },
    {
      id: 'corrections',
      category: 'methods',
      categoryGe: 'მეთოდები',
      question: 'What happens if you make a mistake?',
      questionGe: 'რა ხდება თუ შეცდომას დაუშვებთ?',
      answer: 'We correct errors transparently. Corrections are published with the same prominence as original findings. Our Corrections Log is public and permanent. We do not delete—we amend with clear notation of what was changed and why. Making mistakes is inevitable; how we handle them defines our integrity.',
      answerGe: 'ჩვენ ვასწორებთ შეცდომებს გამჭვირვალედ. შესწორებები ქვეყნდება იგივე პრომინენტობით, როგორც თავდაპირველი დასკვნები. ჩვენი შესწორებების ჟურნალი საჯაროა და მუდმივი.',
    },
    {
      id: 'ledger-of-harm',
      category: 'methods',
      categoryGe: 'მეთოდები',
      question: 'What is the Ledger of Harm?',
      questionGe: 'რა არის ზიანის რეესტრი?',
      answer: 'The Ledger of Harm is a systematic record of verified abuses—documenting incidents, perpetrators, patterns, and evidence. It serves as both a historical archive and an evidentiary foundation for accountability processes. Each entry follows standardized documentation protocols suitable for international legal proceedings.',
      answerGe: 'ზიანის რეესტრი არის დადასტურებული ძალადობის სისტემატური ჩანაწერი—აფიქსირებს ინციდენტებს, დამნაშავეებს, შაბლონებს და მტკიცებულებებს. ის ემსახურება როგორც ისტორიულ არქივს, ისე საფუძველს ანგარიშვალდებულების პროცესებისთვის.',
    },
    {
      id: 'accountability-packets',
      category: 'methods',
      categoryGe: 'მეთოდები',
      question: 'What are accountability packets?',
      questionGe: 'რა არის ანგარიშვალდებულების პაკეტები?',
      answer: 'Accountability packets are structured evidentiary submissions prepared for specific accountability mechanisms—sanctions authorities, international prosecutors, or strategic litigation teams. Each packet is tailored to the receiving body\'s requirements and includes verified findings, supporting documentation, and legal analysis.',
      answerGe: 'ანგარიშვალდებულების პაკეტები არის სტრუქტურირებული მტკიცებულებითი წარდგინებები, მომზადებული კონკრეტული ანგარიშვალდებულების მექანიზმებისთვის—სანქციების ორგანოები, საერთაშორისო პროკურორები ან სტრატეგიული სამართალწარმოების გუნდები.',
    },
    {
      id: 'international-recipients',
      category: 'methods',
      categoryGe: 'მეთოდები',
      question: 'What international bodies receive your documentation?',
      questionGe: 'რა საერთაშორისო ორგანოები იღებენ თქვენს დოკუმენტაციას?',
      answer: 'Our documentation supports multiple accountability pathways: Magnitsky sanctions submissions to the US, UK, EU, and Canada; strategic litigation through universal jurisdiction; referrals to the ICC Office of the Prosecutor; submissions to UN human rights mechanisms; and briefings for the European Parliament and Congressional committees.',
      answerGe: 'ჩვენი დოკუმენტაცია მხარს უჭერს მრავალ ანგარიშვალდებულების გზას: მაგნიტსკის სანქციების წარდგინებები აშშ-ში, დიდ ბრიტანეთში, ევროკავშირში და კანადაში; სტრატეგიული სამართალწარმოება უნივერსალური იურისდიქციის მეშვეობით.',
    },

    // ========================================================================
    // INTEGRITY
    // ========================================================================
    {
      id: 'the-list',
      category: 'integrity',
      categoryGe: 'მთლიანობა',
      question: 'What is The List?',
      questionGe: 'რა არის სია?',
      answer: 'The List is a registry of individuals whose actions—verified through our methodology—have contributed to state capture, institutional corruption, or systematic abuse of power in Georgia. Inclusion requires documented evidence meeting our publication standards. It is not a "blacklist" but a factual record. Individuals may contest inclusion through our Right of Reply process.',
      answerGe: 'სია არის იმ პირების რეესტრი, რომელთა ქმედებებმა—დადასტურებული ჩვენი მეთოდოლოგიით—შეუწყო ხელი სახელმწიფოს ხელში ჩაგდებას, ინსტიტუციურ კორუფციას ან ძალაუფლების სისტემატურ ბოროტად გამოყენებას საქართველოში.',
    },
    {
      id: 'list-removal',
      category: 'integrity',
      categoryGe: 'მთლიანობა',
      question: 'Can someone be removed from The List?',
      questionGe: 'შეიძლება თუ არა ვინმეს სიიდან ამოშლა?',
      answer: 'The historical record is permanent—we do not delete verified findings. However, The List includes notation of subsequent developments: if someone cooperates with accountability processes, provides testimony, makes restitution, or if new evidence emerges, this is documented. The record evolves; it does not erase.',
      answerGe: 'ისტორიული ჩანაწერი მუდმივია—ჩვენ არ ვშლით დადასტურებულ დასკვნებს. თუმცა, სია მოიცავს შემდგომი მოვლენების ნოტაციას: თუ ვინმე თანამშრომლობს ანგარიშვალდებულების პროცესებთან ან ახალი მტკიცებულება ჩნდება, ეს ფიქსირდება.',
    },
    {
      id: 'integrity-index',
      category: 'integrity',
      categoryGe: 'მთლიანობა',
      question: 'What is the Integrity Index?',
      questionGe: 'რა არის მთლიანობის ინდექსი?',
      answer: 'The Integrity Index tracks institutional health across Georgian government, judiciary, and key democratic institutions. It measures indicators like judicial independence, prosecutorial capture, media freedom, and electoral integrity. The Index provides longitudinal data on democratic backsliding and institutional degradation.',
      answerGe: 'მთლიანობის ინდექსი აკვირდება ინსტიტუციურ ჯანმრთელობას ქართულ მთავრობაში, სასამართლო სისტემასა და ძირითად დემოკრატიულ ინსტიტუტებში.',
    },
    {
      id: 'integrity-as-justice',
      category: 'integrity',
      categoryGe: 'მთლიანობა',
      question: 'What is "Integrity as Justice"?',
      questionGe: 'რა არის "მთლიანობა როგორც სამართლიანობა"?',
      answer: 'Integrity as Justice is the principle that documentation itself is a form of accountability. When courts are captured, preserving an accurate record—one that cannot be erased or falsified—becomes an act of justice. Future courts, historians, and restoration governments will need verified records. We build them now.',
      answerGe: '"მთლიანობა როგორც სამართლიანობა" არის პრინციპი, რომ დოკუმენტაცია თავად არის ანგარიშვალდებულების ფორმა. როდესაც სასამართლოები ხელში ჩაგდებულია, ზუსტი ჩანაწერის შენარჩუნება—რომლის წაშლა ან გაყალბება შეუძლებელია—ხდება სამართლიანობის აქტი.',
    },
    {
      id: 'confidence-labels-work',
      category: 'integrity',
      categoryGe: 'მთლიანობა',
      question: 'How do confidence labels work?',
      questionGe: 'როგორ მუშაობს სანდოობის ეტიკეტები?',
      answer: 'Every finding is published with a confidence label indicating evidentiary strength: Confirmed (highest standard, multiple independent verification), Highly Likely (strong corroboration), Likely (credible but limited sources), or Reported (single source, awaiting additional verification). Labels can be upgraded as new evidence emerges.',
      answerGe: 'ყველა დასკვნა ქვეყნდება სანდოობის ეტიკეტით, რომელიც მიუთითებს მტკიცებულებების სიძლიერეზე: დადასტურებული (უმაღლესი სტანდარტი), მაღალი ალბათობით (ძლიერი დადასტურება), სავარაუდოდ (სანდო, მაგრამ შეზღუდული წყაროები), ან მოხსენებული (ერთი წყარო).',
    },

    // ========================================================================
    // PROGRAMS
    // ========================================================================
    {
      id: 'iim-georgia',
      category: 'programs',
      categoryGe: 'პროგრამები',
      question: 'What is IIM-Georgia?',
      questionGe: 'რა არის IIM-საქართველო?',
      answer: 'The Independent Investigative Mechanism for Georgia (IIM-Georgia) is CCG\'s initiative to establish a comprehensive accountability architecture modeled on international investigative mechanisms (like those for Syria, Myanmar, and Ukraine). IIM-Georgia prepares case files, criminal dossiers, and evidentiary packages suitable for international courts, foreign prosecutors, and sanctions authorities.',
      answerGe: 'საქართველოს დამოუკიდებელი საგამოძიებო მექანიზმი (IIM-საქართველო) არის CCG-ის ინიციატივა ყოვლისმომცველი ანგარიშვალდებულების არქიტექტურის შესაქმნელად საერთაშორისო საგამოძიებო მექანიზმების მოდელით.',
    },
    {
      id: 'capture-map',
      category: 'programs',
      categoryGe: 'პროგრამები',
      question: 'What is the Capture Map?',
      questionGe: 'რა არის ხელში ჩაგდების რუკა?',
      answer: 'The Capture Map is a dynamic visualization of how Georgian institutions have been systematically captured—showing the networks, personnel movements, and decision patterns that reveal coordinated institutional degradation. It maps relationships between political figures, oligarchic interests, captured institutions, and foreign influence operations.',
      answerGe: 'ხელში ჩაგდების რუკა არის დინამიური ვიზუალიზაცია იმისა, როგორ მოხდა ქართული ინსტიტუტების სისტემატური ხელში ჩაგდება—აჩვენებს ქსელებს, პერსონალის გადაადგილებებს და გადაწყვეტილების მიღების შაბლონებს.',
    },
    {
      id: 'rustaveli-project',
      category: 'programs',
      categoryGe: 'პროგრამები',
      question: 'What is the Rustaveli Project?',
      questionGe: 'რა არის რუსთაველის პროექტი?',
      answer: 'The Rustaveli Project is CCG\'s cultural and civic identity initiative, drawing on Georgia\'s rich literary and philosophical heritage to articulate values of dignity, justice, and civic responsibility. It connects contemporary accountability work to Georgia\'s long tradition of resistance to tyranny and commitment to human dignity.',
      answerGe: 'რუსთაველის პროექტი არის CCG-ის კულტურული და სამოქალაქო იდენტობის ინიციატივა, რომელიც ეყრდნობა საქართველოს მდიდარ ლიტერატურულ და ფილოსოფიურ მემკვიდრეობას.',
    },
    {
      id: 'forum-for-justice',
      category: 'programs',
      categoryGe: 'პროგრამები',
      question: 'What is the Forum for Justice?',
      questionGe: 'რა არის სამართლიანობის ფორუმი?',
      answer: 'The Forum for Justice is CCG\'s central hub for citizen engagement with accountability processes. It provides pathways for victims to file appeals, witnesses to document wrongdoing, and insiders to safely report corruption. The Forum connects individual harm to systemic accountability through structured intake and verification.',
      answerGe: 'სამართლიანობის ფორუმი არის CCG-ის ცენტრალური ჰაბი მოქალაქეთა ჩართულობისთვის ანგარიშვალდებულების პროცესებში. ის უზრუნველყოფს გზებს მსხვერპლებისთვის საჩივრების წარსადგენად, მოწმეებისთვის დარღვევების დასაფიქსირებლად.',
    },
    {
      id: 'dossier-desk',
      category: 'programs',
      categoryGe: 'პროგრამები',
      question: 'What is the Dossier Desk?',
      questionGe: 'რა არის დოსიეების სამაგიდო?',
      answer: 'The Dossier Desk is our criminal documentation unit, preparing case files suitable for international prosecutors and universal jurisdiction proceedings. It develops detailed profiles of individuals involved in state capture, linking verified evidence to specific acts of corruption, abuse, or complicity.',
      answerGe: 'დოსიეების სამაგიდო არის ჩვენი სისხლის სამართლის დოკუმენტაციის განყოფილება, რომელიც ამზადებს საქმის ფაილებს საერთაშორისო პროკურორებისა და უნივერსალური იურისდიქციის საქმეებისთვის.',
    },
    {
      id: 'dignity-programme',
      category: 'programs',
      categoryGe: 'პროგრამები',
      question: 'What is the Dignity Programme?',
      questionGe: 'რა არის ღირსების პროგრამა?',
      answer: 'The Dignity Programme works to restore the dignity of those harmed by state capture—not just through documentation, but through recognition, memorialization, and support for healing. It acknowledges that accountability is not only about punishment but about affirming the humanity and worth of those who suffered.',
      answerGe: 'ღირსების პროგრამა მუშაობს სახელმწიფოს ხელში ჩაგდებით დაზარალებულთა ღირსების აღდგენაზე—არა მხოლოდ დოკუმენტაციით, არამედ აღიარებით, ხსოვნით და განკურნების მხარდაჭერით.',
    },

    // ========================================================================
    // PETITIONS
    // ========================================================================
    {
      id: 'how-to-submit',
      category: 'petitions',
      categoryGe: 'პეტიციები',
      question: 'How do I submit a petition to CCG?',
      questionGe: 'როგორ წარვადგინო პეტიცია CCG-ში?',
      answer: 'You can submit a petition through our Appeal portal. We accept submissions describing harm you experienced, wrongdoing you witnessed, or information you have from inside captured institutions. You can submit anonymously or with your identity protected. Provide as much detail and documentation as safely possible.',
      answerGe: 'შეგიძლიათ პეტიციის წარდგენა ჩვენი მიმართვის პორტალით. ჩვენ ვიღებთ შეტყობინებებს, რომლებიც აღწერს თქვენ მიერ განცდილ ზიანს, მოწმობილ დარღვევას ან ინფორმაციას ხელში ჩაგდებული ინსტიტუტების შიგნიდან.',
    },
    {
      id: 'petition-process',
      category: 'petitions',
      categoryGe: 'პეტიციები',
      question: 'What happens after I submit a petition?',
      questionGe: 'რა ხდება პეტიციის წარდგენის შემდეგ?',
      answer: 'Your submission is reviewed by our triage team. We assess the claims, evaluate available evidence, and determine next steps. This may include: requesting additional information, initiating investigation, referring to partner organizations, or—if claims cannot be verified—explaining why we cannot proceed. We aim to acknowledge receipt within 72 hours.',
      answerGe: 'თქვენს შეტყობინებას განიხილავს ჩვენი ტრიაჟის გუნდი. ჩვენ ვაფასებთ პრეტენზიებს, ვაფასებთ ხელმისაწვდომ მტკიცებულებებს და ვადგენთ შემდეგ ნაბიჯებს.',
    },
    {
      id: 'petition-types',
      category: 'petitions',
      categoryGe: 'პეტიციები',
      question: 'What kinds of petitions does CCG accept?',
      questionGe: 'რა ტიპის პეტიციებს იღებს CCG?',
      answer: 'We accept petitions in three categories: "I Have Been Harmed" (direct victims of abuse of power), "I Witnessed Wrongdoing" (witnesses to corruption, capture, or abuse), and "I Am Inside the System" (whistleblowers with insider knowledge). Each category has specific intake processes designed for that situation.',
      answerGe: 'ჩვენ ვიღებთ პეტიციებს სამ კატეგორიაში: "მე დაზარალდი" (ძალაუფლების ბოროტად გამოყენების პირდაპირი მსხვერპლები), "მე ვიყავი დარღვევის მოწმე" (კორუფციის ან ძალადობის მოწმეები) და "მე სისტემის შიგნით ვარ" (მამხილებლები).',
    },

    // ========================================================================
    // LEGAL
    // ========================================================================
    {
      id: 'legal-advice',
      category: 'legal',
      categoryGe: 'იურიდიული',
      question: 'Do you provide legal advice or representation?',
      questionGe: 'იძლევით თუ არა იურიდიულ კონსულტაციას ან წარმომადგენლობას?',
      answer: 'No. CCG is not a law firm and does not provide legal advice or representation. We document abuses and support accountability mechanisms, but we are not your lawyers. If you need legal assistance, we can provide referrals to appropriate legal aid organizations, but any such referral does not create an attorney-client relationship with CCG.',
      answerGe: 'არა. CCG არ არის იურიდიული ფირმა და არ იძლევა იურიდიულ კონსულტაციას ან წარმომადგენლობას. ჩვენ ვაფიქსირებთ ძალადობას და ვმხარს ვუჭერთ ანგარიშვალდებულების მექანიზმებს.',
    },
    {
      id: 'international-pathways',
      category: 'legal',
      categoryGe: 'იურიდიული',
      question: 'What international legal pathways does CCG support?',
      questionGe: 'რა საერთაშორისო სამართლებრივ გზებს მხარს უჭერს CCG?',
      answer: 'We support multiple accountability pathways: Magnitsky-style sanctions submissions to the US, UK, EU, and Canada; strategic litigation referrals for universal jurisdiction cases; criminal dossier preparation for international prosecutors; and documentation for international bodies including the ICC, ECHR, and UN mechanisms.',
      answerGe: 'ჩვენ ვმხარს ვუჭერთ მრავალ ანგარიშვალდებულების გზას: მაგნიტსკის ტიპის სანქციების წარდგენა აშშ-ში, დიდ ბრიტანეთში, ევროკავშირში და კანადაში; სტრატეგიული სამართალწარმოების მიმართვები; სისხლის სამართლის დოსიეების მომზადება.',
    },
    {
      id: '501c3-status',
      category: 'legal',
      categoryGe: 'იურიდიული',
      question: 'Is CCG a U.S. 501(c)(3) organization?',
      questionGe: 'არის თუ არა CCG აშშ-ის 501(c)(3) ორგანიზაცია?',
      answer: 'Yes. Civic Council of Georgia, Inc. is registered as a 501(c)(3) public charity under U.S. law. This tax-exempt status allows us to receive tax-deductible donations from U.S. taxpayers and operate as a charitable organization focused on accountability, transparency, and civic education.',
      answerGe: 'დიახ. Civic Council of Georgia, Inc. რეგისტრირებულია როგორც 501(c)(3) საზოგადოებრივი საქველმოქმედო ორგანიზაცია აშშ-ის კანონმდებლობით.',
    },

    // ========================================================================
    // PRESS
    // ========================================================================
    {
      id: 'press-inquiries',
      category: 'press',
      categoryGe: 'პრესა',
      question: 'How can journalists contact CCG?',
      questionGe: 'როგორ შეუძლიათ ჟურნალისტებს CCG-სთან დაკავშირება?',
      answer: 'Press inquiries should be directed to press@sabcho.org. We respond to legitimate press inquiries from verified journalists. We provide background briefings, expert commentary on Georgian affairs, and access to our published research. We do not share source materials or unpublished findings with press.',
      answerGe: 'პრესის მოთხოვნები უნდა გაიგზავნოს press@sabcho.org-ზე. ჩვენ ვპასუხობთ ლეგიტიმურ პრესის მოთხოვნებს დადასტურებული ჟურნალისტებისგან.',
    },
    {
      id: 'source-sharing',
      category: 'press',
      categoryGe: 'პრესა',
      question: 'Can you share sources and documents with journalists?',
      questionGe: 'შეგიძლიათ თუ არა წყაროებისა და დოკუმენტების გაზიარება ჟურნალისტებთან?',
      answer: 'We do not share confidential sources or unpublished materials. Journalists may cite our published findings, access our public evidence library, and request background briefings. We protect source confidentiality absolutely—even from partner journalists. Our role is to document, not to serve as a source clearinghouse.',
      answerGe: 'ჩვენ არ ვაზიარებთ კონფიდენციალურ წყაროებს ან გამოუქვეყნებელ მასალებს. ჟურნალისტებს შეუძლიათ ჩვენი გამოქვეყნებული დასკვნების ციტირება და საჯარო მტკიცებულებების ბიბლიოთეკაზე წვდომა.',
    },
    {
      id: 'press-deadlines',
      category: 'press',
      categoryGe: 'პრესა',
      question: 'How do you handle press deadlines?',
      questionGe: 'როგორ ეპყრობით პრესის ვადებს?',
      answer: 'We understand journalistic deadlines and make reasonable efforts to respond promptly. However, accuracy takes precedence over speed. We will not rush verification to meet a deadline, and we will not confirm or deny ongoing investigations. If we cannot meet your deadline with verified information, we will say so.',
      answerGe: 'ჩვენ გვესმის ჟურნალისტური ვადები და ვცდილობთ დროულად ვუპასუხოთ. თუმცა, სიზუსტეს უპირატესობა აქვს სისწრაფეზე.',
    },
  ],
};
