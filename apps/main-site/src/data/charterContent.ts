// Charter Page Content - Complete Bilingual Data

export interface CharterArticle {
  id: string;
  numeral: string;
  title: string;
  titleGe: string;
  content: string[];
  contentGe: string[];
}

export const charterContent = {
  meta: {
    title: 'The Charter',
    titleGe: 'ქარტია',
    subtitle: 'Founding Document',
    subtitleGe: 'დამფუძნებელი დოკუმენტი',
    description: 'The constitutional framework establishing CCG\'s doctrine, mandate, instruments, and standards of operation.',
    descriptionGe: 'კონსტიტუციური ჩარჩო, რომელიც ადგენს CCG-ის დოქტრინას, მანდატს, ინსტრუმენტებს და საქმიანობის სტანდარტებს.',
  },

  epigraph: {
    en: 'This Charter exists to keep CCG larger than any one person and to keep the institution grounded in method, not mood. It is a covenant with the future—a promise that the work will outlast its founders and remain faithful to its purpose.',
    ge: 'ეს ქარტია არსებობს იმისთვის, რომ CCG უფრო დიდი იყოს ვიდრე ნებისმიერი ერთი პიროვნება და რომ ინსტიტუცია დაფუძნებული იყოს მეთოდზე, არა განწყობაზე. ეს არის აღთქმა მომავალთან—დაპირება, რომ საქმე გადარჩება მის დამფუძნებლებს და დარჩება ერთგული მიზნისადმი.',
  },

  jumpToItems: [
    { id: 'preamble', label: 'Preamble', labelGe: 'პრეამბულა' },
    { id: 'mandate', label: 'Mandate', labelGe: 'მანდატი' },
    { id: 'instruments', label: 'Instruments', labelGe: 'ინსტრუმენტები' },
    { id: 'governance', label: 'Governance', labelGe: 'მმართველობა' },
  ],

  articles: [
    {
      id: 'preamble',
      numeral: '§',
      title: 'Preamble',
      titleGe: 'პრეამბულა',
      content: [
        'When public institutions are captured, justice does not vanish—it relocates. The courtrooms may be silenced, the prosecutors may be compromised, and the archives may be sealed. But the obligation to truth persists. It finds new vessels.',
        'The Republic\'s obligations do not dissolve because they have become inconvenient to power. They remain owed to the citizen, owed to truth, and owed to the future. No cabinet decree can extinguish them; no captured judiciary can nullify them. They exist because the Republic exists, and they endure as long as memory does.',
        'CCG exists to preserve the right of appeal when appeals have been foreclosed, to maintain the discipline of proof when proof has been corrupted, and to safeguard the continuity of civic dignity until institutions can be trusted again. We are not a replacement for the state. We are a bridge—built for the crossing, meant to be dismantled when the destination is reached.',
      ],
      contentGe: [
        'როდესაც საჯარო ინსტიტუციები დაპყრობილია, მართლმსაჯულება არ ქრება—ის გადაადგილდება. სასამართლო დარბაზები შეიძლება გაჩუმდეს, პროკურორები შეიძლება კომპრომეტირებულნი იყვნენ, არქივები შეიძლება დალუქული იყოს. მაგრამ ვალდებულება ჭეშმარიტების წინაშე გრძელდება. ის პოულობს ახალ ჭურჭლებს.',
        'რესპუბლიკის ვალდებულებები არ იხსნება იმიტომ, რომ ისინი ძალაუფლებისთვის მოუხერხებელი გახდა. ისინი რჩება ვალი მოქალაქის წინაშე, ვალი ჭეშმარიტების წინაშე და ვალი მომავლის წინაშე. ვერანაირი კაბინეტის დადგენილება ვერ ჩააქრობს მათ; ვერანაირი დაპყრობილი სასამართლო ვერ გააუქმებს მათ.',
        'CCG არსებობს გასაჩივრების უფლების შესანარჩუნებლად, როდესაც გასაჩივრებები დაკეტილია, მტკიცებულების დისციპლინის შესანარჩუნებლად, როდესაც მტკიცებულება კორუმპირებულია, და სამოქალაქო ღირსების უწყვეტობის დასაცავად, სანამ ინსტიტუციებს კვლავ ენდობიან. ჩვენ არ ვართ სახელმწიფოს შემცვლელი. ჩვენ ვართ ხიდი—აშენებული გადასასვლელად, განკუთვნილი დემონტაჟისთვის, როდესაც დანიშნულების ადგილს მიაღწევს.',
      ],
    },
    {
      id: 'article-1',
      numeral: 'I',
      title: 'Mandate',
      titleGe: 'მანდატი',
      content: [
        'CCG receives petitions from citizens, professionals, and witnesses who have been harmed or silenced by captured institutions, and preserves their evidence against erasure. Every petition is a civic claim—not a private grievance—and is treated with the procedural seriousness it deserves.',
        'CCG advances lawful accountability through domestic, international, and transnational pathways. Where Georgian courts are compromised, we document for the future. Where international mechanisms exist, we prepare compliant submissions. Where transnational enforcement applies, we coordinate with competent authorities.',
        'CCG builds collective accountability through integrity: clean lines of reasoning, corporate transparency, verifiable correction protocols, and public version control. Accountability is not vengeance; it is the restoration of consequence to action.',
        'CCG safeguards civic inheritance through the Rustaveli Project, ensuring that the cultural, linguistic, and ethical foundations of Georgian identity survive the current crisis and remain available to future generations.',
      ],
      contentGe: [
        'CCG იღებს პეტიციებს მოქალაქეებისგან, პროფესიონალებისგან და მოწმეებისგან, რომლებიც დაზარალდნენ ან გაჩუმდნენ დაპყრობილი ინსტიტუციების მიერ, და ინახავს მათ მტკიცებულებებს წაშლისგან. ყოველი პეტიცია არის სამოქალაქო მოთხოვნა—არა კერძო საჩივარი—და განიხილება შესაბამისი პროცედურული სერიოზულობით.',
        'CCG ავითარებს კანონიერ ანგარიშვალდებულებას შიდა, საერთაშორისო და ტრანსნაციონალური გზებით. სადაც ქართული სასამართლოები კომპრომეტირებულია, ჩვენ ვადოკუმენტებთ მომავლისთვის. სადაც საერთაშორისო მექანიზმები არსებობს, ჩვენ ვამზადებთ შესაბამის წარდგინებებს.',
        'CCG აშენებს კოლექტიურ ანგარიშვალდებულებას მთლიანობით: მსჯელობის სუფთა ხაზებით, კორპორატიული გამჭვირვალობით, დამოწმებადი გამოსწორების პროტოკოლებით და საჯარო ვერსიის კონტროლით. ანგარიშვალდებულება არ არის შურისძიება; ეს არის შედეგის აღდგენა მოქმედებისთვის.',
        'CCG იცავს სამოქალაქო მემკვიდრეობას რუსთაველის პროექტით, უზრუნველყოფს, რომ ქართული იდენტობის კულტურული, ენობრივი და ეთიკური საფუძვლები გადარჩეს მიმდინარე კრიზისს და ხელმისაწვდომი დარჩეს მომავალი თაობებისთვის.',
      ],
    },
    {
      id: 'article-2',
      numeral: 'II',
      title: 'Limits',
      titleGe: 'შეზღუდვები',
      content: [
        'CCG does not endorse political parties or candidates and does not use its resources for campaign intervention. We document conduct, not allegiance. Our work must survive any election and serve any citizen.',
        'CCG is nonviolent and rejects harassment, intimidation, and vigilantism in all forms. Justice pursued through unjust means is not justice. The discipline that constrains us is the same discipline that legitimizes us.',
        'CCG is not a court and does not issue convictions—we publish findings. CCG is not a law firm and does not provide legal advice or representation—we prepare case files. The distinction matters. We illuminate; we do not adjudicate.',
        'CCG does not dox. We do not publish private personal data as punishment. Home addresses, family members, and medical records remain beyond our reach, regardless of the subject\'s conduct. Accountability operates through institutions, not through exposure of the vulnerable.',
        'Funding cannot buy findings, listings, removals, timing, or silence. This principle is absolute and admits no exception. Donors support the mission; they do not direct it.',
      ],
      contentGe: [
        'CCG არ უჭერს მხარს პოლიტიკურ პარტიებს ან კანდიდატებს და არ იყენებს თავის რესურსებს საარჩევნო ჩარევისთვის. ჩვენ ვადოკუმენტებთ ქცევას, არა ერთგულებას. ჩვენი საქმე უნდა გადარჩეს ნებისმიერ არჩევნებს და ემსახუროს ნებისმიერ მოქალაქეს.',
        'CCG არაძალადობრივია და უარყოფს შევიწროებას, დაშინებას და ვიგილანტიზმს ყველა ფორმით. სამართლიანობა, რომელსაც უსამართლო საშუალებებით მისდევენ, არ არის სამართლიანობა. დისციპლინა, რომელიც გვზღუდავს, იგივე დისციპლინაა, რომელიც გვალეგიტიმებს.',
        'CCG არ არის სასამართლო და არ გამოაქვს განაჩენები—ჩვენ ვაქვეყნებთ დასკვნებს. CCG არ არის იურიდიული ფირმა და არ აწვდის სამართლებრივ რჩევებს ან წარმომადგენლობას—ჩვენ ვამზადებთ საქმის ფაილებს. განსხვავებას მნიშვნელობა აქვს.',
        'CCG არ აკეთებს დოქსინგს. ჩვენ არ ვაქვეყნებთ კერძო პერსონალურ მონაცემებს სასჯელის სახით. სახლის მისამართები, ოჯახის წევრები და სამედიცინო ჩანაწერები რჩება ჩვენი მისაწვდომობის მიღმა, მიუხედავად სუბიექტის ქცევისა.',
        'დაფინანსება ვერ იყიდის დასკვნებს, ჩანაწერებს, წაშლებს, დროს ან სიჩუმეს. ეს პრინციპი აბსოლუტურია და არ იშვებს გამონაკლისს. დონორები მხარს უჭერენ მისიას; ისინი არ მართავენ მას.',
      ],
    },
    {
      id: 'article-3',
      numeral: 'III',
      title: 'The Forum for Justice',
      titleGe: 'სამართლიანობის ფორუმი',
      content: [
        'The Forum for Justice is CCG\'s primary intake mechanism. It receives petitions safely and treats each submission as a civic claim rather than a private tragedy. Every person who comes forward is exercising a right that the state has failed to honor.',
        'Submissions are triaged into preservation, referral, or publication lanes based on evidentiary strength, safety considerations, and strategic value. Not every petition becomes a public finding, but every petition is treated with care.',
        'CCG partners with independent lawyers and organizations to ensure that petitioners have access to representation. With consent and where evidentiary thresholds are met, CCG may help prepare structured case files suitable for international mechanisms, foreign courts, or future domestic proceedings.',
      ],
      contentGe: [
        'სამართლიანობის ფორუმი არის CCG-ის ძირითადი მიღების მექანიზმი. ის იღებს პეტიციებს უსაფრთხოდ და განიხილავს თითოეულ წარდგინებას როგორც სამოქალაქო მოთხოვნას და არა კერძო ტრაგედიას. ყოველი ადამიანი, ვინც წინ გამოდის, ახორციელებს უფლებას, რომელსაც სახელმწიფო ვერ პატივს სცემს.',
        'წარდგინებები ნაწილდება შენარჩუნების, გადამისამართების ან გამოქვეყნების ხაზებში მტკიცებულებების სიძლიერის, უსაფრთხოების მოსაზრებების და სტრატეგიული ღირებულების საფუძველზე. ყველა პეტიცია არ ხდება საჯარო დასკვნა, მაგრამ ყველა პეტიციას ზრუნვით ეპყრობიან.',
        'CCG თანამშრომლობს დამოუკიდებელ ადვოკატებთან და ორგანიზაციებთან, რათა უზრუნველყოს პეტიციონერთა წვდომა წარმომადგენლობაზე. თანხმობით და სადაც მტკიცებულებების ზღვრები დაკმაყოფილებულია, CCG შეიძლება დაეხმაროს სტრუქტურირებული საქმის ფაილების მომზადებას.',
      ],
    },
    {
      id: 'article-4',
      numeral: 'IV',
      title: 'Integrity',
      titleGe: 'მთლიანობა',
      content: [
        'CCG maintains The List (the Enablers Registry) and the Complicity Index to make enabling conduct legible, traceable, and correctable. These are not blacklists; they are accountability ledgers. They exist not to punish but to document, and not to shame but to create the conditions for genuine correction.',
        'Right of reply is a rule, not an exception. Every named or scored entity receives formal notification and opportunity to respond before publication. Their response is incorporated into the record.',
        'Corrections are public and versioned. When we err, we say so. The correction itself becomes part of the permanent record, visible to all who access the file.',
        'The Off-Ramp defines how correction becomes real: disclosure of past conduct, severance of enabling relationships, remediation where appropriate, cooperation with lawful processes, and verifiable compliance commitments. The path to de-listing is clear, demanding, and open to anyone willing to walk it.',
      ],
      contentGe: [
        'CCG ინახავს სიას (ხელშემწყობთა რეესტრი) და თანამონაწილეობის ინდექსს, რათა ხელშეწყობის ქცევა გახადოს წაკითხვადი, მიკვლევადი და გამოსწორებადი. ეს არ არის შავი სიები; ეს არის ანგარიშვალდებულების რეგისტრები. ისინი არსებობს არა დასასჯელად, არამედ დასადოკუმენტებლად.',
        'პასუხის უფლება არის წესი, არა გამონაკლისი. ყველა დასახელებული ან შეფასებული სუბიექტი იღებს ფორმალურ შეტყობინებას და შესაძლებლობას უპასუხოს გამოქვეყნებამდე.',
        'გამოსწორებები საჯარო და ვერსიონირებულია. როდესაც ვცდებით, ვამბობთ ამას. გამოსწორება თავად ხდება მუდმივი ჩანაწერის ნაწილი.',
        'Off-Ramp განსაზღვრავს, თუ როგორ ხდება გამოსწორება რეალურად: წარსული ქცევის გამჟღავნება, ხელშემწყობი ურთიერთობების გაწყვეტა, გამოსწორება სადაც შესაბამისია, კანონიერ პროცესებთან თანამშრომლობა და დამოწმებადი შესაბამისობის ვალდებულებები.',
      ],
    },
    {
      id: 'article-5',
      numeral: 'V',
      title: 'The Capture Map',
      titleGe: 'დაპყრობის რუკა',
      content: [
        'CCG publishes the Capture Map to explain capture as a system, not a mystery. When citizens understand how capture works—its incentives, its dependencies, its vulnerabilities—they become harder to deceive and easier to organize.',
        'Authoritarian capture is not magic. It depends on specific mechanisms: engineered incentives, manufactured impunity, systematic intimidation, narrative control, and external cover. Each mechanism leaves traces. Each trace can be documented. Each document can be used—if not today, then tomorrow.',
        'The Capture Map is educational infrastructure. It is designed to survive the current crisis and inform the reconstruction that follows.',
      ],
      contentGe: [
        'CCG აქვეყნებს დაპყრობის რუკას, რათა ახსნას დაპყრობა როგორც სისტემა, არა საიდუმლო. როდესაც მოქალაქეები ესმით, როგორ მუშაობს დაპყრობა—მისი სტიმულები, მისი დამოკიდებულებები, მისი სისუსტეები—ისინი უფრო რთულნი ხდებიან მოსატყუებლად და უფრო ადვილნი ორგანიზებისთვის.',
        'ავტორიტარული დაპყრობა არ არის მაგია. ის დამოკიდებულია კონკრეტულ მექანიზმებზე: ინჟინერულ სტიმულებზე, წარმოებულ უდანაშაულობაზე, სისტემატურ დაშინებაზე, ნარატივის კონტროლზე და გარე საფარველზე. თითოეული მექანიზმი ტოვებს კვალს. თითოეული კვალი შეიძლება დადოკუმენტირდეს.',
        'დაპყრობის რუკა არის საგანმანათლებლო ინფრასტრუქტურა. ის შექმნილია მიმდინარე კრიზისის გადარჩენისთვის და მას მოჰყვება რეკონსტრუქციის ინფორმირებისთვის.',
      ],
    },
    {
      id: 'article-6',
      numeral: 'VI',
      title: 'The Rustaveli Project',
      titleGe: 'რუსთაველის პროექტი',
      content: [
        'A nation is more than its captors. Georgia existed before Georgian Dream, and Georgia will exist after. The question is not whether the nation survives, but whether its civic inheritance survives intact.',
        'The Rustaveli Project sustains the civic canon: the texts, traditions, and ethical commitments that define Georgian identity independent of any regime. It preserves collective memory against official amnesia. It protects the Georgian language as a vessel of thought, not merely communication. And it nourishes ethical refusal—the capacity to say no when compliance would mean complicity.',
        'This is not nostalgia. It is national resilience. A people who remember who they are cannot be easily remade into something else.',
      ],
      contentGe: [
        'ერი მეტია ვიდრე მისი დამპყრობლები. საქართველო არსებობდა ქართული ოცნების წინ და საქართველო იარსებებს მის შემდეგაც. საკითხი არ არის გადარჩება თუ არა ერი, არამედ გადარჩება თუ არა მისი სამოქალაქო მემკვიდრეობა უნარ.',
        'რუსთაველის პროექტი ინარჩუნებს სამოქალაქო კანონს: ტექსტებს, ტრადიციებს და ეთიკურ ვალდებულებებს, რომლებიც განსაზღვრავენ ქართულ იდენტობას ნებისმიერი რეჟიმისგან დამოუკიდებლად. ის იცავს კოლექტიურ მეხსიერებას ოფიციალური ამნეზიისგან. ის იცავს ქართულ ენას როგორც აზროვნების ჭურჭელს.',
        'ეს არ არის ნოსტალგია. ეს არის ეროვნული გამძლეობა. ხალხი, რომელსაც ახსოვს ვინ არის, ვერ გადაკეთდება ადვილად სხვა რამად.',
      ],
    },
    {
      id: 'article-7',
      numeral: 'VII',
      title: 'Standards of Proof',
      titleGe: 'მტკიცებულების სტანდარტები',
      content: [
        'CCG labels confidence consistently across all published findings, using a four-tier system (Confirmed, Likely, Possible, Alleged) that makes our certainty explicit and our uncertainty honest. For complete definitions and requirements, see our Research Methodology.',
        'CCG combines petitioner testimony with open-source intelligence (OSINT), corporate registries, sanctions databases, and compliance-style tracking. No single source is sufficient; corroboration is required. The standard is not perfection—it is transparency about what we know and how we know it.',
        'Corrections are public and versioned. Every change to a published finding is logged, dated, and explained. Right of reply is mandatory for any named or scored entity—not as a courtesy, but as a procedural requirement that strengthens rather than weakens our work.',
      ],
      contentGe: [
        'CCG თანმიმდევრულად ანიშნავს ნდობას ყველა გამოქვეყნებულ დასკვნაზე, ოთხსაფეხურიანი სისტემის გამოყენებით (დადასტურებული, სავარაუდო, შესაძლო, ნაგულვები), რომელიც ჩვენს დარწმუნებულობას ცხადს ხდის და ჩვენს გაურკვევლობას—გულწრფელს. სრული განმარტებებისა და მოთხოვნებისთვის იხილეთ ჩვენი კვლევის მეთოდოლოგია.',
        'CCG აერთიანებს პეტიციონერთა ჩვენებას ღია წყაროს დაზვერვასთან (OSINT), კორპორატიულ რეესტრებთან, სანქციების მონაცემთა ბაზებთან და შესაბამისობის სტილის თვალყურის დევნებასთან. ვერანაირი ერთი წყარო არ არის საკმარისი; კორობორაცია საჭიროა.',
        'გამოსწორებები საჯარო და ვერსიონირებულია. გამოქვეყნებულ დასკვნაში ყოველი ცვლილება ჩაწერილია, თარიღდადებული და ახსნილი. პასუხის უფლება სავალდებულოა ნებისმიერი დასახელებული ან შეფასებული სუბიექტისთვის.',
      ],
      reference: {
        link: '/methodology#confidence-labels',
        linkLabel: 'View Confidence Labels',
        linkLabelGe: 'სანდოობის ეტიკეტების ნახვა',
      },
    },
    {
      id: 'article-8',
      numeral: 'VIII',
      title: 'Safety and Source Protection',
      titleGe: 'უსაფრთხოება და წყაროს დაცვა',
      content: [
        'Do-no-harm is not aspirational—it is operational. We minimize data collection to what is strictly necessary. We separate identifying information from substantive content where feasible. We use secure channels for all sensitive communications. We delay publication when safety requires it, and we decline to publish when the risk to sources outweighs the public interest.',
        'We do not publish operational details that would expose sources, methods, or safe locations. This discipline is not negotiable. The trust of those who come forward is the foundation of everything we do; we will not spend it carelessly.',
        'Safety extends to our own team. Many of those who work for CCG cannot be publicly identified. This is not secrecy for its own sake—it is the price of operating in an environment where the state surveils, harasses, and retaliates against its critics.',
      ],
      contentGe: [
        'ზიანის არ მიყენება არ არის ასპირაციული—ის ოპერაციულია. ჩვენ ვამცირებთ მონაცემთა შეგროვებას მხოლოდ აუცილებელზე. ჩვენ ვყოფთ მაიდენტიფიცირებელ ინფორმაციას შინაარსობრივი კონტენტისგან სადაც შესაძლებელია. ჩვენ ვიყენებთ უსაფრთხო არხებს ყველა მგრძნობიარე კომუნიკაციისთვის.',
        'ჩვენ არ ვაქვეყნებთ ოპერაციულ დეტალებს, რომლებიც გამოავლენს წყაროებს, მეთოდებს ან უსაფრთხო ადგილებს. ეს დისციპლინა არ არის მოლაპარაკებადი. იმ ადამიანების ნდობა, ვინც წინ გამოდის, არის ყველაფრის საფუძველი, რასაც ვაკეთებთ.',
        'უსაფრთხოება ვრცელდება ჩვენს გუნდზეც. ბევრი მათგანი, ვინც CCG-სთვის მუშაობს, ვერ იდენტიფიცირდება საჯაროდ. ეს არ არის საიდუმლოება თავისთავად—ეს არის იმ გარემოში მუშაობის ფასი, სადაც სახელმწიფო თვალყურს ადევნებს, ავიწროებს და აწყობს შურისძიებას თავის კრიტიკოსებზე.',
      ],
    },
    {
      id: 'article-9',
      numeral: 'IX',
      title: 'The Institution and Its Legal Entities',
      titleGe: 'ინსტიტუცია და მისი იურიდიული პირები',
      content: [
        'CCG is the civic institution: its Charter, its standards, and its public work. The institution exists in the minds of those who contribute to it and in the record it creates. It cannot be dissolved by any government, captured by any party, or sold to any interest.',
        'CCG also operates through administrative legal entities that handle compliance, contracting, and donor stewardship in various jurisdictions. Those entities are infrastructure—necessary for operating in the world of law and finance—but they do not define the institution. They support the civic mission; they are not the mission itself.',
        'This distinction matters. If any legal entity is compromised, dissolved, or captured, the institution continues. The Charter persists. The work goes on.',
      ],
      contentGe: [
        'CCG არის სამოქალაქო ინსტიტუცია: მისი ქარტია, მისი სტანდარტები და მისი საჯარო საქმიანობა. ინსტიტუცია არსებობს იმ ადამიანების გონებაში, ვინც წვლილს შეაქვს მასში და ჩანაწერში, რომელსაც ის ქმნის. მას ვერანაირი მთავრობა ვერ დაშლის, ვერანაირი პარტია ვერ დაიპყრობს, ვერანაირ ინტერესს ვერ გაიყიდება.',
        'CCG ასევე მოქმედებს ადმინისტრაციული იურიდიული პირების მეშვეობით, რომლებიც ასრულებენ შესაბამისობას, კონტრაქტირებას და დონორთა სტიუარდშიპს სხვადასხვა იურისდიქციაში. ეს ერთეულები არის ინფრასტრუქტურა—აუცილებელი სამართლისა და ფინანსების სამყაროში ოპერირებისთვის—მაგრამ ისინი არ განსაზღვრავენ ინსტიტუციას.',
        'ეს განსხვავება მნიშვნელოვანია. თუ რომელიმე იურიდიული პირი კომპრომეტირდება, დაიშლება ან დაიპყრობა, ინსტიტუცია გრძელდება. ქარტია გრძელდება. საქმე გრძელდება.',
      ],
    },
    {
      id: 'article-10',
      numeral: 'X',
      title: 'Governance and Amendment',
      titleGe: 'მმართველობა და შესწორება',
      content: [
        'The Board of Directors oversees fiduciary duty, compliance, conflicts of interest, and institutional independence. The Board ensures that CCG operates within the law, honors its commitments to donors, and maintains the separation between governance and editorial judgment. The Board does not dictate investigative findings.',
        'The International Advisory Council strengthens rigor across CCG\'s core competencies: rule of law and constitutional order, sanctions and compliance, investigations and OSINT, finance and anti-money laundering, human rights documentation, and transitional justice. Advisors provide expertise; they do not direct operations.',
        'The Protected Georgian Civic Panel provides contextual judgment from jurists, investigators, and civic professionals inside Georgia who cannot be publicly named. Their knowledge of local conditions, institutional dynamics, and individual actors ensures that CCG\'s work is grounded in reality, not assumption.',
        'This Charter may be amended by a process that prioritizes continuity, transparency, and civic necessity. No amendment may contradict the core principles established in the Preamble and Limits. The Charter is meant to evolve—but slowly, carefully, and always in the direction of greater integrity.',
      ],
      contentGe: [
        'დირექტორთა საბჭო ზედამხედველობს ფიდუციარულ მოვალეობას, შესაბამისობას, ინტერესთა კონფლიქტებს და ინსტიტუციურ დამოუკიდებლობას. საბჭო უზრუნველყოფს, რომ CCG მოქმედებს კანონის ფარგლებში, პატივს სცემს დონორებისადმი ვალდებულებებს და ინარჩუნებს გამყოფი ხაზს მმართველობასა და სარედაქციო განსჯას შორის.',
        'საერთაშორისო საკონსულტაციო საბჭო აძლიერებს სიზუსტეს CCG-ის ძირითად კომპეტენციებში: კანონის უზენაესობა და კონსტიტუციური წესრიგი, სანქციები და შესაბამისობა, გამოძიებები და OSINT, ფინანსები და ფულის გათეთრების წინააღმდეგ ბრძოლა, ადამიანის უფლებების დოკუმენტირება და გარდამავალი მართლმსაჯულება.',
        'დაცული ქართული სამოქალაქო პანელი უზრუნველყოფს კონტექსტუალურ განსჯას იურისტებისგან, გამომძიებლებისგან და სამოქალაქო პროფესიონალებისგან საქართველოში, რომლებიც ვერ იქნებიან საჯაროდ დასახელებული. მათი ცოდნა ადგილობრივი პირობების, ინსტიტუციური დინამიკის და ინდივიდუალური აქტორების შესახებ უზრუნველყოფს, რომ CCG-ის საქმე დაფუძნებულია რეალობაზე.',
        'ეს ქარტია შეიძლება შეიცვალოს პროცესით, რომელიც პრიორიტეტს ანიჭებს უწყვეტობას, გამჭვირვალობას და სამოქალაქო აუცილებლობას. ვერანაირი შესწორება ვერ ეწინააღმდეგება პრეამბულაში და შეზღუდვებში დადგენილ ძირითად პრინციპებს.',
      ],
    },
  ] as CharterArticle[],

  footerLinks: [
    { path: '/standards', label: 'Standards', labelGe: 'სტანდარტები' },
    { path: '/governance', label: 'Governance', labelGe: 'მმართველობა' },
    { path: '/justice', label: 'Forum for Justice', labelGe: 'სამართლიანობის ფორუმი' },
  ],
};
