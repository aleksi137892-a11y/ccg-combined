/**
 * Forum for Justice — Complete Operational Architecture
 * Canonical content for the /justice hub page
 * 
 * Language: Rights-focused, stewardship-oriented
 * No use of word "track" — use "pathway" instead
 */

export const forumArchitectureContent = {
  meta: {
    title: 'Forum for Justice',
    titleGe: 'სამართლიანობის ფორუმი',
    subtitle: 'Complete Operational Architecture',
    subtitleGe: 'სრული ოპერაციული არქიტექტურა',
    institution: 'Civic Council of Georgia',
    institutionGe: 'საქართველოს სამოქალაქო საბჭო',
    date: 'January 2026',
    dateGe: '2026 წლის იანვარი',
    intro: 'The Forum exists so that when someone is harmed by a captured state, they have a threshold to cross. Different paths. One destination: lawful consequence for unlawful acts.',
    introGe: 'ფორუმი არსებობს იმისთვის, რომ როდესაც ვინმეს ზიანს აყენებს ტყვეობაში მყოფი სახელმწიფო, მას ჰქონდეს ზღურბლი, რომელიც უნდა გადალახოს. განსხვავებული გზები. ერთი დანიშნულება: კანონიერი შედეგი უკანონო ქმედებებისთვის.'
  },

  foundations: {
    rightToRemedy: {
      title: 'The Right to Remedy',
      titleGe: 'გამოსწორების უფლება',
      lead: 'Every person who has been harmed has an inalienable right to remedy. This right does not depend on the willingness of domestic courts, the capacity of local prosecutors, or the courage of judges.',
      leadGe: 'ყველა ადამიანს, ვისაც ზიანი მიადგა, აქვს გამოსწორების განუყოფელი უფლება. ეს უფლება არ არის დამოკიდებული შიდა სასამართლოების მზადყოფნაზე, ადგილობრივი პროკურორების შესაძლებლობაზე ან მოსამართლეთა გამბედაობაზე.',
      secondary: 'When formal channels are blocked, the right persists—and the obligation to pursue it falls to those who can.',
      secondaryGe: 'როდესაც ფორმალური არხები დაბლოკილია, უფლება რჩება—და მისი განხორციელების ვალდებულება ეკისრება მათ, ვისაც შეუძლია.',
      declaration: 'The right is not conditional.\nIt exists because harm exists.',
      declarationGe: 'უფლება არ არის პირობითი.\nის არსებობს, რადგან ზიანი არსებობს.',
      href: '/about/right-to-remedy'
    },
    civicNecessity: {
      title: 'The Doctrine of Civic Necessity',
      titleGe: 'სამოქალაქო აუცილებლობის დოქტრინა',
      lead: 'When the state abdicates its constitutional obligation to uphold the law, the duty to preserve legal order falls to the citizenry itself. This is not vigilantism—it is the foundation of every republic that survives its own corruption.',
      leadGe: 'როდესაც სახელმწიფო უარს ამბობს კანონის დაცვის კონსტიტუციურ ვალდებულებაზე, სამართლებრივი წესრიგის შენარჩუნების მოვალეობა ეკისრება თავად მოქალაქეებს. ეს არ არის თვითსამართალი—ეს არის ყველა რესპუბლიკის საფუძველი, რომელიც გადარჩება საკუთარ კორუფციას.',
      secondary: 'Not as sentiment, but as procedure.\nNot as protest, but as infrastructure.',
      secondaryGe: 'არა როგორც სენტიმენტი, არამედ როგორც პროცედურა.\nარა როგორც პროტესტი, არამედ როგორც ინფრასტრუქტურა.',
      href: '/about/civic-necessity'
    }
  },

  architecture: {
    lead: 'The operational pipeline.',
    leadGe: 'ოპერაციული მილსადენი.',
    description: 'Evidence enters through Appeal. It is verified, contextualized, and preserved in the Record. From there, it is routed toward Remedy through every available lawful pathway.',
    descriptionGe: 'მტკიცებულება შემოდის აპელაციის გზით. იგი მოწმდება, კონტექსტუალიზდება და ინახება ჩანაწერში. იქიდან იგი მიემართება გამოსწორებისკენ ყველა ხელმისაწვდომი კანონიერი გზით.',
    declaration: 'The paths are different.\nThe destination is the same:\naccountability for those who would place themselves above the law.',
    declarationGe: 'გზები განსხვავებულია.\nდანიშნულება ერთია:\nპასუხისმგებლობა მათთვის, ვინც თავს კანონზე მაღლა აყენებს.'
  },

  appeal: {
    title: 'Appeal',
    titleGe: 'აპელაცია',
    lead: 'The threshold where testimony is received.',
    leadGe: 'ზღურბლი, სადაც ჩვენება მიიღება.',
    description: 'We shepherd every petition toward lawful consequence. Whether you are a victim seeking justice, a witness to wrongdoing, or an insider with knowledge—there is a path.',
    descriptionGe: 'ჩვენ ყველა პეტიციას მივყავართ კანონიერი შედეგისკენ. მიუხედავად იმისა, ხართ თქვენ მსხვერპლი, რომელიც სამართალს ეძებს, დანაშაულის მოწმე თუ ინსაიდერი ცოდნით—არსებობს გზა.',
    pathways: [
      {
        id: 'victim',
        title: 'I Have Been Harmed',
        titleGe: 'მე მიყენეს ზიანი',
        quote: 'For those who have suffered directly at the hands of a captured state.',
        quoteGe: 'მათთვის, ვინც უშუალოდ დაზარალდა ტყვეობაში მყოფი სახელმწიფოს ხელით.',
        lead: 'Victims of political persecution, violence, expropriation, or institutional abuse may file a formal Appeal documenting their harm.',
        leadGe: 'პოლიტიკური დევნის, ძალადობის, ექსპროპრიაციის ან ინსტიტუციური ძალადობის მსხვერპლებს შეუძლიათ შეიტანონ ფორმალური აპელაცია, სადაც დოკუმენტირებულია მათი ზიანი.',
        eligibility: [
          'Political persecution — arrest, prosecution, or detention without due process',
          'Violence, torture, or cruel, inhuman, or degrading treatment',
          'Expropriation — state seizure of assets, forced divestiture, nationalization without compensation',
          'Corporate destruction — forced sale, hostile takeover by state-linked actors, coordinated business elimination',
          'Contract interference — cancellation or denial of state contracts for political reasons',
          'Commercial exclusion — denial of permits, licenses, or participation in public tenders',
          'Tax and customs harassment — selective audits, punitive enforcement, asset freezes',
          'Regulatory targeting — selective enforcement, license revocation, inspectorate weaponization',
          'Unlawful deprivation of property or livelihood through state action',
          'Threats, intimidation, or coercion by state actors or their proxies',
          'Reputational attack — state-coordinated defamation campaigns, media targeting',
          'Employment retaliation — dismissal, demotion, or blacklisting for political activity or association',
          'Discrimination or exclusion based on political belief, expression, or association',
          'Families of political prisoners, the detained, or the disappeared'
        ],
        eligibilityGe: [
          'პოლიტიკური დევნა — დაკავება, სისხლისსამართლებრივი დევნა ან პატიმრობა სათანადო პროცედურის გარეშე',
          'ძალადობა, წამება ან სასტიკი, არაადამიანური ან დამამცირებელი მოპყრობა',
          'ექსპროპრიაცია — აქტივების სახელმწიფო ჩამორთმევა, იძულებითი გაყიდვა, ნაციონალიზაცია კომპენსაციის გარეშე',
          'კორპორატიული განადგურება — იძულებითი გაყიდვა, მტრული შთანთქმა სახელმწიფოსთან დაკავშირებული აქტორების მიერ',
          'კონტრაქტის ჩარევა — სახელმწიფო კონტრაქტების გაუქმება ან უარყოფა პოლიტიკური მიზეზებით',
          'კომერციული გამორიცხვა — ნებართვების, ლიცენზიების ან საჯარო ტენდერებში მონაწილეობის უარყოფა',
          'საგადასახადო და საბაჟო შევიწროება — შერჩევითი აუდიტები, დამსჯელობითი აღსრულება, აქტივების გაყინვა',
          'მარეგულირებელი მიზანმიმართვა — შერჩევითი აღსრულება, ლიცენზიის გაუქმება',
          'ქონების ან საარსებო წყაროს უკანონო ჩამორთმევა სახელმწიფო ქმედებით',
          'მუქარა, დაშინება ან იძულება სახელმწიფო აქტორების ან მათი მარიონეტების მიერ',
          'რეპუტაციული თავდასხმა — სახელმწიფოს მიერ კოორდინირებული ცილისწამების კამპანიები',
          'დასაქმების შურისძიება — გათავისუფლება, დაქვეითება ან შავ სიაში შეყვანა პოლიტიკური აქტივობისთვის',
          'დისკრიმინაცია ან გამორიცხვა პოლიტიკური მრწამსის, გამოხატვის ან ასოციაციის გამო',
          'პოლიტიკური პატიმრების, დაკავებულთა ან გაუჩინარებულთა ოჯახები'
        ],
        href: '/appeal/harmed'
      },
      {
        id: 'witness',
        title: 'I Witnessed Wrongdoing',
        titleGe: 'მე ვიყავი დანაშაულის მოწმე',
        quote: 'For those who saw what was not meant to be seen.',
        quoteGe: 'მათთვის, ვინც იხილა ის, რაც არ უნდა ენახა.',
        lead: 'Witnesses to abuse, corruption, or institutional failure may submit testimony even without personal harm.',
        leadGe: 'ძალადობის, კორუფციის ან ინსტიტუციური მარცხის მოწმეებს შეუძლიათ ჩვენების წარდგენა პირადი ზიანის გარეშეც.',
        eligibility: [
          'Election fraud or manipulation — falsification, intimidation, vote-buying',
          'Judicial corruption or case-fixing — interference with judicial independence',
          'Procurement fraud or rigged tenders — state contract manipulation',
          'Police brutality or unlawful use of force',
          'Institutional complicity in persecution — coordinated state action against individuals',
          'Corporate capture — forced acquisition of private businesses by state-linked entities',
          'Financial system abuse — coordinated bank account closures, credit denial for political reasons',
          'Regulatory weaponization — selective enforcement targeting opposition-aligned businesses',
          'Documentary evidence — orders, communications, or coordination proving wrongdoing'
        ],
        eligibilityGe: [
          'საარჩევნო გაყალბება ან მანიპულაცია — ფალსიფიკაცია, დაშინება, ხმების ყიდვა',
          'სასამართლო კორუფცია ან საქმეების გაყალბება — სასამართლო დამოუკიდებლობაში ჩარევა',
          'შესყიდვების თაღლითობა ან გაყალბებული ტენდერები — სახელმწიფო კონტრაქტების მანიპულაცია',
          'პოლიციის სისასტიკე ან ძალის უკანონო გამოყენება',
          'ინსტიტუციური თანამონაწილეობა დევნაში — კოორდინირებული სახელმწიფო მოქმედება პირების წინააღმდეგ',
          'კორპორატიული ტყვეობა — კერძო ბიზნესების იძულებითი შეძენა სახელმწიფოსთან დაკავშირებული სუბიექტების მიერ',
          'ფინანსური სისტემის ბოროტად გამოყენება — საბანკო ანგარიშების კოორდინირებული დახურვა პოლიტიკური მიზეზებით',
          'მარეგულირებელი გამოყენება იარაღად — შერჩევითი აღსრულება ოპოზიციასთან დაკავშირებული ბიზნესების წინააღმდეგ',
          'დოკუმენტური მტკიცებულება — ბრძანებები, კომუნიკაციები ან კოორდინაცია, რომელიც ამტკიცებს დარღვევას'
        ],
        href: '/appeal/witnessed'
      },
      {
        id: 'insider',
        title: 'I Am Inside the System',
        titleGe: 'მე სისტემის შიგნით ვარ',
        quote: 'For those who carry evidence from within.',
        quoteGe: 'მათთვის, ვინც შიგნიდან ატარებს მტკიცებულებას.',
        lead: 'Insiders with knowledge of wrongdoing receive the highest protection protocols. Your testimony may be the documentation that makes accountability possible.',
        leadGe: 'ინსაიდერები დარღვევის ცოდნით იღებენ უმაღლესი დაცვის პროტოკოლებს. თქვენი ჩვენება შეიძლება იყოს დოკუმენტაცია, რომელიც პასუხისმგებლობას შესაძლებელს ხდის.',
        eligibility: [
          'Civil servants aware of unlawful orders or practices',
          'Law enforcement officers witnessing abuse of authority',
          'Judges or prosecutors aware of case manipulation or interference',
          'Private sector actors with knowledge of state-linked corruption',
          'Financial sector professionals aware of illicit flows or politically-motivated actions',
          'Corporate executives with knowledge of state-coerced transactions or forced sales',
          'Bankers aware of politically-motivated account closures or credit denial',
          'Tax and customs officials aware of selective enforcement or targeting',
          'Regulatory officials aware of weaponized enforcement',
          'Anyone with documentary evidence from within institutions of capture'
        ],
        eligibilityGe: [
          'საჯარო მოხელეები, რომლებმაც იციან უკანონო ბრძანებების ან პრაქტიკის შესახებ',
          'სამართალდამცავი ოფიცრები, რომლებიც მოწმენი არიან უფლებამოსილების ბოროტად გამოყენების',
          'მოსამართლეები ან პროკურორები, რომლებმაც იციან საქმეების მანიპულაციის ან ჩარევის შესახებ',
          'კერძო სექტორის აქტორები სახელმწიფოსთან დაკავშირებული კორუფციის ცოდნით',
          'ფინანსური სექტორის პროფესიონალები, რომლებმაც იციან უკანონო ნაკადების ან პოლიტიკურად მოტივირებული ქმედებების შესახებ',
          'კორპორატიული აღმასრულებლები სახელმწიფოს მიერ იძულებითი ტრანზაქციების ცოდნით',
          'ბანკირები, რომლებმაც იციან პოლიტიკურად მოტივირებული ანგარიშების დახურვის შესახებ',
          'საგადასახადო და საბაჟო თანამდებობის პირები, რომლებმაც იციან შერჩევითი აღსრულების შესახებ',
          'მარეგულირებელი თანამდებობის პირები, რომლებმაც იციან იარაღად გამოყენებული აღსრულების შესახებ',
          'ნებისმიერი პირი დოკუმენტური მტკიცებულებით ტყვეობის ინსტიტუტებიდან'
        ],
        href: '/appeal/insider'
      }
    ],
    security: {
      title: 'Security & Source Protection',
      titleGe: 'უსაფრთხოება და წყაროს დაცვა',
      content: 'All communications are end-to-end encrypted. Submissions can be made anonymously. We maintain air-gapped systems for sensitive materials. Source protection is absolute—we would rather close a case than compromise a source.',
      contentGe: 'ყველა კომუნიკაცია დაშიფრულია ბოლოდან ბოლომდე. წარდგენა შეიძლება ანონიმურად. ჩვენ ვინარჩუნებთ იზოლირებულ სისტემებს მგრძნობიარე მასალებისთვის. წყაროს დაცვა აბსოლუტურია—ჩვენ უფრო დავხურავთ საქმეს, ვიდრე კომპრომისზე წავიდეთ წყაროსთან.',
      href: '/about/source-protection'
    },
    verification: {
      title: 'Verification & Processing',
      titleGe: 'ვერიფიკაცია და დამუშავება',
      content: 'Every submission undergoes rigorous verification against the Berkeley Protocol standards. Evidence is assessed, corroborated where possible, and assigned a confidence level before entering the Record.',
      contentGe: 'ყველა წარდგენა გადის მკაცრ ვერიფიკაციას ბერკლის პროტოკოლის სტანდარტების მიხედვით. მტკიცებულება ფასდება, დასტურდება სადაც შესაძლებელია და ენიჭება ნდობის დონე ჩანაწერში შეყვანამდე.',
      confidenceLevels: [
        { label: 'Verified', labelGe: 'ვერიფიცირებული', description: 'Corroborated by multiple independent sources', descriptionGe: 'დადასტურებული მრავალი დამოუკიდებელი წყაროთი' },
        { label: 'Documented', labelGe: 'დოკუმენტირებული', description: 'Supported by primary documentation', descriptionGe: 'მხარდაჭერილი პირველადი დოკუმენტაციით' },
        { label: 'Credible Reporting', labelGe: 'სანდო რეპორტინგი', description: 'Consistent with established patterns', descriptionGe: 'თანმიმდევრული დადგენილ პატერნებთან' },
        { label: 'Allegation', labelGe: 'ბრალდება', description: 'Unverified claim under investigation', descriptionGe: 'დაუდასტურებელი მოთხოვნა გამოძიების ქვეშ' },
        { label: 'Disputed', labelGe: 'სადავო', description: 'Subject has contested the claim', descriptionGe: 'სუბიექტმა გააპროტესტა მოთხოვნა' }
      ],
      href: '/methodology'
    }
  },

  record: {
    title: 'Record',
    titleGe: 'ჩანაწერი',
    lead: 'The instrument of interim accountability.',
    leadGe: 'დროებითი ანგარიშვალდებულების ინსტრუმენტი.',
    description: 'Those who dismantle the rule of law for their own enrichment should not enjoy impunity while we pursue recourse. The Record is the infrastructure of transitional justice: documentation that enables adjudication, restitution, and—when the moment comes—prosecution.',
    descriptionGe: 'მათ, ვინც თავისი გამდიდრებისთვის ანგრევს კანონის უზენაესობას, არ უნდა ისარგებლონ დაუსჯელობით, სანამ ჩვენ რეგრესს ვეძებთ. ჩანაწერი არის გარდამავალი მართლმსაჯულების ინფრასტრუქტურა: დოკუმენტაცია, რომელიც შესაძლებელს ხდის განსჯას, რესტიტუციას და—როდესაც მომენტი დადგება—სისხლისსამართლებრივ დევნას.',
    declaration: 'Responsibility is assigned.\nComplicity is mapped.\nHarm is preserved for consequence.',
    declarationGe: 'პასუხისმგებლობა განსაზღვრულია.\nთანამონაწილეობა დახატულია.\nზიანი შენახულია შედეგისთვის.',
    databases: [
      {
        id: 'ledger',
        title: 'The Ledger of Harm',
        titleGe: 'ზიანის რეესტრი',
        lead: 'The master record of documented harm. Every verified case of abuse, persecution, or institutional failure—preserved with evidentiary rigor for future proceedings.',
        leadGe: 'დოკუმენტირებული ზიანის მთავარი ჩანაწერი. ყველა ვერიფიცირებული ძალადობის, დევნის ან ინსტიტუციური მარცხის შემთხვევა—შენახული მტკიცებულებითი სიმკაცრით მომავალი სამართალწარმოებისთვის.',
        href: '/record/ledger',
        subcollections: [
          { label: 'Individual Cases', labelGe: 'ინდივიდუალური საქმეები', href: '/record/ledger#individual' },
          { label: 'Pattern Documentation', labelGe: 'პატერნების დოკუმენტაცია', href: '/record/ledger#patterns' },
          { label: 'Institutional Findings', labelGe: 'ინსტიტუციური დასკვნები', href: '/record/ledger#institutional' }
        ]
      },
      {
        id: 'list',
        title: 'The List',
        titleGe: 'სია',
        lead: 'The registry of individual responsibility. Named individuals whose conduct has enabled or perpetrated state capture.',
        leadGe: 'ინდივიდუალური პასუხისმგებლობის რეესტრი. დასახელებული პირები, რომელთა ქცევამ ხელი შეუწყო ან განახორციელა სახელმწიფოს ტყვეობა.',
        secondary: 'The Ledger documents harm.\nThe List assigns responsibility.',
        secondaryGe: 'რეესტრი აფიქსირებს ზიანს.\nსია ანაწილებს პასუხისმგებლობას.',
        href: '/record/list'
      },
      {
        id: 'index',
        title: 'The Complicity Index',
        titleGe: 'თანამონაწილეობის ინდექსი',
        lead: 'The registry of institutional and corporate complicity. Organizations that benefit from or contribute to state capture.',
        leadGe: 'ინსტიტუციური და კორპორატიული თანამონაწილეობის რეესტრი. ორგანიზაციები, რომლებიც სარგებლობენ სახელმწიფოს ტყვეობით ან ხელს უწყობენ მას.',
        href: '/record/index',
        subcollections: [
          { label: 'State Contractors', labelGe: 'სახელმწიფო კონტრაქტორები', href: '/record/index#contractors' },
          { label: 'Financial Sector', labelGe: 'ფინანსური სექტორი', href: '/record/index#financial' },
          { label: 'Media Entities', labelGe: 'მედია სუბიექტები', href: '/record/index#media' }
        ]
      },
      {
        id: 'corrections',
        title: 'Corrections Log',
        titleGe: 'შესწორებების ჟურნალი',
        lead: 'Public record of our errors and their correction. An institution that never corrects itself is either infallible or dishonest. We are neither.',
        leadGe: 'ჩვენი შეცდომებისა და მათი გასწორების საჯარო ჩანაწერი. ინსტიტუცია, რომელიც არასოდეს ასწორებს თავს, ან უშეცდომოა, ან არაკეთილსინდისიერი. ჩვენ არც ერთი ვართ.',
        href: '/record/corrections'
      }
    ]
  },

  remedy: {
    title: 'Remedy',
    titleGe: 'გამოსწორება',
    lead: 'Justice is always possible.',
    leadGe: 'სამართლიანობა ყოველთვის შესაძლებელია.',
    description: 'When we learn of wrongdoing or harm, we do not wait. We exhaust every lawful channel. We pursue consequence through every available pathway. Documentation is necessary but not sufficient—the right to remedy demands action.',
    descriptionGe: 'როდესაც ვიგებთ დარღვევის ან ზიანის შესახებ, ჩვენ არ ველოდებით. ჩვენ ამოვწურავთ ყველა კანონიერ არხს. ჩვენ ვეძებთ შედეგს ყველა ხელმისაწვდომი გზით. დოკუმენტაცია აუცილებელია, მაგრამ არასაკმარისი—გამოსწორების უფლება მოითხოვს მოქმედებას.',
    declaration: 'The paths are different.\nThe destination is the same:\naccountability for those who would place themselves above the law.',
    declarationGe: 'გზები განსხვავებულია.\nდანიშნულება ერთია:\nპასუხისმგებლობა მათთვის, ვინც თავს კანონზე მაღლა აყენებს.',
    pathways: [
      {
        id: 'sanctions',
        title: 'Sanctions',
        titleGe: 'სანქციები',
        lead: 'Targeted measures against human rights violators and their enablers.',
        leadGe: 'მიზანმიმართული ზომები ადამიანის უფლებების დამრღვევთა და მათი ხელშემწყობთა წინააღმდეგ.',
        secondary: 'Magnitsky-style designations across US, UK, EU, Canada, Australia. Visa restrictions. Asset freezes. Unexplained Wealth Orders.',
        secondaryGe: 'მაგნიტსკის ტიპის აღნიშვნები აშშ-ს, გაერთიანებული სამეფოს, ევროკავშირის, კანადისა და ავსტრალიის მასშტაბით. სავიზო შეზღუდვები. აქტივების გაყინვა.',
        activeJurisdictions: ['United States', 'United Kingdom', 'European Union', 'Canada', 'Australia'],
        href: '/remedy/sanctions'
      },
      {
        id: 'litigation',
        title: 'Litigation',
        titleGe: 'სასამართლო დავა',
        lead: 'Civil and criminal proceedings in foreign jurisdictions.',
        leadGe: 'სამოქალაქო და სისხლის სამართლის საქმეები უცხოურ იურისდიქციებში.',
        secondary: 'Tort claims, property claims, asset recovery. Private prosecution where law allows.',
        secondaryGe: 'დელიქტური სარჩელები, ქონებრივი სარჩელები, აქტივების აღდგენა. კერძო სისხლისსამართლებრივი დევნა, სადაც კანონი ნებას იძლევა.',
        activeJurisdictions: ['United Kingdom', 'United States', 'France', 'Germany', 'Switzerland'],
        href: '/remedy/litigation'
      },
      {
        id: 'criminal',
        title: 'Criminal Referral',
        titleGe: 'სისხლისსამართლებრივი მიმართვა',
        lead: 'Prosecution referrals to competent authorities.',
        leadGe: 'სისხლისსამართლებრივი დევნის მიმართვები კომპეტენტურ ორგანოებში.',
        secondary: 'Universal jurisdiction for torture, enforced disappearance, crimes against humanity.',
        secondaryGe: 'უნივერსალური იურისდიქცია წამებაზე, იძულებით გაუჩინარებაზე, კაცობრიობის წინააღმდეგ ჩადენილ დანაშაულებზე.',
        activeJurisdictions: ['Germany', 'France', 'Sweden', 'Netherlands', 'Switzerland'],
        href: '/remedy/criminal'
      },
      {
        id: 'international',
        title: 'International Mechanisms',
        titleGe: 'საერთაშორისო მექანიზმები',
        lead: 'UN bodies, regional courts, treaty mechanisms.',
        leadGe: 'გაეროს ორგანოები, რეგიონული სასამართლოები, ხელშეკრულების მექანიზმები.',
        secondary: 'ECHR applications. UN Special Procedures. Treaty body complaints. Council of Europe mechanisms.',
        secondaryGe: 'ევროპის ადამიანის უფლებათა სასამართლოში განცხადებები. გაეროს სპეციალური პროცედურები. საჩივრები ხელშეკრულების ორგანოებში.',
        activeJurisdictions: ['European Court of Human Rights', 'UN Human Rights Council', 'UN Special Rapporteurs', 'Council of Europe'],
        href: '/remedy/international'
      },
      {
        id: 'regulatory',
        title: 'Regulatory & Compliance',
        titleGe: 'მარეგულირებელი და შესაბამისობა',
        lead: 'Notices to gatekeepers, regulators, professional bodies.',
        leadGe: 'შეტყობინებები მეკარეებისთვის, მარეგულირებლებისთვის, პროფესიულ ორგანოებისთვის.',
        secondary: 'Financial sector de-risking. Corporate due diligence triggers. Professional body complaints. Regulatory notifications.',
        secondaryGe: 'ფინანსური სექტორის რისკების შემცირება. კორპორატიული სათანადო შემოწმების ტრიგერები. საჩივრები პროფესიულ ორგანოებში.',
        activeJurisdictions: ['Financial regulators', 'Bar associations', 'Accounting bodies', 'Corporate registries'],
        href: '/remedy/regulatory'
      }
    ]
  },

  triage: {
    title: 'Triage',
    titleGe: 'ტრიაჟი',
    lead: 'The discipline of limited capacity.',
    leadGe: 'შეზღუდული შესაძლებლობების დისციპლინა.',
    description: 'We cannot pursue every case. Resources are finite. We apply triage to maximize impact—prioritizing cases that establish precedent, protect the vulnerable, and advance systemic accountability.',
    descriptionGe: 'ჩვენ არ შეგვიძლია ყველა საქმის განხილვა. რესურსები სასრულია. ჩვენ ვიყენებთ ტრიაჟს ზემოქმედების მაქსიმიზაციისთვის—პრიორიტეტს ვანიჭებთ საქმეებს, რომლებიც ადგენენ პრეცედენტს, იცავენ მოწყვლადებს და ხელს უწყობენ სისტემურ ანგარიშვალდებულებას.',
    acknowledgment: 'Every submission is reviewed. Every case is preserved. But not every case can be actively pursued. This is an acknowledgment of limitation, not indifference.',
    acknowledgmentGe: 'ყველა წარდგენა განიხილება. ყველა საქმე ინახება. მაგრამ ყველა საქმე არ შეიძლება აქტიურად განხორციელდეს. ეს არის შეზღუდვის აღიარება, არა გულგრილობა.',
    criteria: [
      { 
        label: 'Severity of Harm', 
        labelGe: 'ზიანის სიმძიმე', 
        description: 'Physical violence, torture, unlawful detention receive highest priority', 
        descriptionGe: 'ფიზიკური ძალადობა, წამება, უკანონო დაკავება იღებს უმაღლეს პრიორიტეტს' 
      },
      { 
        label: 'Evidentiary Strength', 
        labelGe: 'მტკიცებულების სიძლიერე', 
        description: 'Cases with strong documentation are more actionable', 
        descriptionGe: 'ძლიერი დოკუმენტაციის მქონე საქმეები უფრო ქმედითია' 
      },
      { 
        label: 'Vulnerability', 
        labelGe: 'მოწყვლადობა', 
        description: 'Protection of those at continued risk', 
        descriptionGe: 'იმ პირების დაცვა, რომლებიც მუდმივი რისკის ქვეშ არიან' 
      },
      { 
        label: 'Systemic Impact', 
        labelGe: 'სისტემური ზემოქმედება', 
        description: 'Cases that reveal patterns or enable broader accountability', 
        descriptionGe: 'საქმეები, რომლებიც ავლენენ პატერნებს ან იძლევა უფრო ფართო ანგარიშვალდებულების საშუალებას' 
      },
      { 
        label: 'Precedent Value', 
        labelGe: 'პრეცედენტის ღირებულება', 
        description: 'Potential to establish legal or procedural precedents', 
        descriptionGe: 'სამართლებრივი ან პროცედურული პრეცედენტების დადგენის პოტენციალი' 
      },
      { 
        label: 'Actionability', 
        labelGe: 'ქმედითობა', 
        description: 'Availability of remedy pathways in current circumstances', 
        descriptionGe: 'გამოსწორების გზების ხელმისაწვდომობა მიმდინარე გარემოებებში' 
      }
    ]
  },

  commitments: {
    title: 'Commitments',
    titleGe: 'ვალდებულებები',
    lead: 'The disciplines that authorize us.',
    leadGe: 'დისციპლინები, რომლებიც გვაძლევენ უფლებამოსილებას.',
    items: [
      {
        id: 'preservation',
        title: 'Preservation',
        titleGe: 'შენარჩუნება',
        content: 'Evidence is maintained with cryptographic integrity and chain of custody documentation. Not every case is immediately actionable, but every case is preserved for the moment when circumstances change—whether in a foreign court, a restored Georgian judiciary, or the processes of transitional justice.',
        contentGe: 'მტკიცებულება ინახება კრიპტოგრაფიული მთლიანობით და მფლობელობის ჯაჭვის დოკუმენტაციით. ყველა საქმე არ არის დაუყოვნებლივ ქმედითი, მაგრამ ყველა საქმე ინახება იმ მომენტისთვის, როდესაც გარემოებები შეიცვლება.'
      },
      {
        id: 'reply',
        title: 'Right of Reply',
        titleGe: 'პასუხის უფლება',
        content: 'Before any individual or entity is named publicly, they receive written notice and a minimum of fourteen days to respond. Their response is included in the record, unedited. This is not courtesy—it is a requirement of legitimacy.',
        contentGe: 'სანამ რომელიმე პირი ან სუბიექტი საჯაროდ დასახელდება, ისინი იღებენ წერილობით შეტყობინებას და მინიმუმ თოთხმეტი დღის ვადას პასუხის გასაცემად. მათი პასუხი შეტანილია ჩანაწერში, რედაქტირების გარეშე.',
        href: '/about/right-of-reply'
      },
      {
        id: 'methodology',
        title: 'Methodology',
        titleGe: 'მეთოდოლოგია',
        content: 'We meet evidentiary standards at least as rigorous as the institutions we parallel. Evidence is verified. Sources are protected. Errors are corrected publicly. The record is built to survive legal scrutiny.',
        contentGe: 'ჩვენ ვაკმაყოფილებთ მტკიცებულების სტანდარტებს, რომლებიც მინიმუმ ისევე მკაცრია, როგორც იმ ინსტიტუტებისა, რომლებსაც ვპარალელობთ. მტკიცებულება ვერიფიცირებულია. წყაროები დაცულია. შეცდომები საჯაროდ სწორდება.',
        href: '/methodology'
      },
      {
        id: 'judges',
        title: 'To Judges Who Stand for Rule of Law',
        titleGe: 'მოსამართლეებს, რომლებიც იცავენ კანონის უზენაესობას',
        content: 'We recognize that within captured systems, there are judges, prosecutors, and civil servants who continue to uphold their oaths. The Forum welcomes those who stand for the rule of law even when the system around them facilitates capture. Your courage is noted. Your integrity matters.',
        contentGe: 'ჩვენ აღვიარებთ, რომ ტყვეობაში მყოფ სისტემებში არიან მოსამართლეები, პროკურორები და საჯარო მოხელეები, რომლებიც აგრძელებენ თავიანთი ფიცის შესრულებას. ფორუმი მიესალმება მათ, ვინც იცავს კანონის უზენაესობას მაშინაც კი, როდესაც მათ გარშემო სისტემა ხელს უწყობს ტყვეობას.'
      },
      {
        id: 'international',
        title: 'To the International Community',
        titleGe: 'საერთაშორისო საზოგადოებას',
        content: 'We call upon democratic governments, international institutions, and civil society to recognize that Georgia\'s crisis is not a domestic matter. When a state persecutes its own citizens, the international legal order exists precisely to respond. We ask for your engagement—through sanctions, through diplomatic pressure, through the activation of every mechanism designed to protect human rights when domestic protections fail.',
        contentGe: 'ჩვენ მოვუწოდებთ დემოკრატიულ მთავრობებს, საერთაშორისო ინსტიტუტებს და სამოქალაქო საზოგადოებას აღიარონ, რომ საქართველოს კრიზისი არ არის შიდა საქმე. როდესაც სახელმწიფო დევნის საკუთარ მოქალაქეებს, საერთაშორისო სამართლებრივი წესრიგი არსებობს სწორედ პასუხის გასაცემად.'
      },
      {
        id: 'principle',
        title: 'The Fundamental Principle',
        titleGe: 'ფუნდამენტური პრინციპი',
        content: 'No one is above the law. Everyone should enjoy its protection. These are not aspirations—they are the constitutional obligations of every republic. When the state fails to uphold them, the duty falls to the citizenry. When the citizenry cannot act safely, the duty falls to those beyond the state\'s reach.',
        contentGe: 'არავინ არის კანონზე მაღლა. ყველამ უნდა ისარგებლოს მისი დაცვით. ეს არ არის მისწრაფებები—ეს არის ყველა რესპუბლიკის კონსტიტუციური ვალდებულებები. როდესაც სახელმწიფო ვერ იცავს მათ, მოვალეობა ეკისრება მოქალაქეობას.',
        declaration: 'This is the architecture of civic necessity.\nThis is the Forum for Justice.',
        declarationGe: 'ეს არის სამოქალაქო აუცილებლობის არქიტექტურა.\nეს არის სამართლიანობის ფორუმი.'
      }
    ]
  },

  closing: {
    content: 'The Forum exists so that when someone is harmed by a captured state, they have a threshold to cross. So that their testimony is received with gravity and protected with care. So that when the moment comes—whether in a foreign court, a sanctions office, an international mechanism, or a restored Georgian judiciary—the files are ready.',
    contentGe: 'ფორუმი არსებობს იმისთვის, რომ როდესაც ვინმეს ზიანს აყენებს ტყვეობაში მყოფი სახელმწიფო, მას ჰქონდეს ზღურბლი, რომელიც უნდა გადალახოს. რომ მათი ჩვენება მიიღება სერიოზულობით და დაცული იყოს ზრუნვით.',
    declaration: 'We do not wait for domestic permission\nto keep the Republic\'s obligations alive.',
    declarationGe: 'ჩვენ არ ველოდებით შიდა ნებართვას\nრესპუბლიკის ვალდებულებების ცოცხლად შესანარჩუნებლად.'
  }
};

export type ForumArchitectureContent = typeof forumArchitectureContent;
