import type { InstitutionalContent } from '@/types/institutional';

export const litigationContent: InstitutionalContent = {
  meta: {
    title: 'Strategic Litigation',
    titleGe: 'სტრატეგიული სამართალწარმოება',
    lastUpdated: 'January 2026',
    lastUpdatedGe: 'იანვარი 2026',
    intro: 'We support strategic litigation before international and domestic courts, providing evidence, documentation, and coordination with legal partners pursuing accountability.',
    introGe: 'ჩვენ ვუჭერთ მხარს სტრატეგიულ სამართალწარმოებას საერთაშორისო და შიდა სასამართლოებში, მტკიცებულებების, დოკუმენტაციისა და ანგარიშვალდებულების მაძიებელ იურიდიულ პარტნიორებთან კოორდინაციის უზრუნველყოფით.',
  },
  jumpToItems: [
    { id: 'approach', label: 'Approach', labelGe: 'მიდგომა' },
    { id: 'echr', label: 'ECHR Cases', labelGe: 'ადამიანის უფლებათა ევროპული სასამართლო' },
    { id: 'civil', label: 'Civil Litigation', labelGe: 'სამოქალაქო სამართალწარმოება' },
    { id: 'support', label: 'How We Support', labelGe: 'როგორ ვუჭერთ მხარს' },
    { id: 'boundaries', label: 'Boundaries', labelGe: 'საზღვრები' },
  ],
  sections: [
    {
      id: 'approach',
      heading: 'Our Approach to Litigation',
      headingGe: 'ჩვენი მიდგომა სამართალწარმოებისადმი',
      body: [
        'Strategic litigation uses the courts not merely to win individual cases, but to establish precedent, expose systemic abuse, and create deterrence. We identify cases with transformative potential and support legal partners in pursuing them.',
        'We do not litigate ourselves. The Forum for Justice serves as an evidentiary and coordination hub, providing documentation, expert connections, and strategic analysis to qualified legal counsel.',
      ],
      bodyGe: [
        'სტრატეგიული სამართალწარმოება იყენებს სასამართლოებს არა მხოლოდ ინდივიდუალური საქმეების მოგებისთვის, არამედ პრეცედენტის დასადგენად, სისტემური ბოროტად გამოყენების გამოსავლენად და პრევენციის შესაქმნელად.',
        'ჩვენ თვითონ არ ვაწარმოებთ სამართალწარმოებას. სამართლიანობის ფორუმი ემსახურება როგორც მტკიცებულებითი და საკოორდინაციო ცენტრი, უზრუნველყოფს დოკუმენტაციას, ექსპერტთა კავშირებს და სტრატეგიულ ანალიზს კვალიფიციური იურიდიული მრჩეველებისთვის.',
      ],
    },
    {
      id: 'echr',
      heading: 'European Court of Human Rights',
      headingGe: 'ადამიანის უფლებათა ევროპული სასამართლო',
      body: [
        'The European Court of Human Rights (ECtHR) in Strasbourg is a primary venue for cases arising from state capture. Georgia, as a Council of Europe member, is bound by its judgments.',
        'ECHR cases require exhaustion of domestic remedies, making early documentation critical. We support applicants by preserving evidence of rights violations and connecting them with experienced ECHR practitioners.',
      ],
      bodyGe: [
        'ადამიანის უფლებათა ევროპული სასამართლო (ECtHR) სტრასბურგში არის ძირითადი ადგილი სახელმწიფოს ხელში ჩაგდებასთან დაკავშირებული საქმეებისთვის. საქართველო, როგორც ევროპის საბჭოს წევრი, შებოჭილია მისი გადაწყვეტილებებით.',
        'ECHR საქმეები მოითხოვს შიდა საშუალებების ამოწურვას, რაც ადრეულ დოკუმენტირებას კრიტიკულს ხდის. ჩვენ ვუჭერთ მხარს განმცხადებლებს უფლებათა დარღვევის მტკიცებულებების შენახვით და მათ გამოცდილ ECHR პრაქტიკოსებთან დაკავშირებით.',
      ],
      bullets: [
        'Article 3: Prohibition of torture and inhuman treatment',
        'Article 5: Right to liberty and security',
        'Article 6: Right to a fair trial',
        'Article 10: Freedom of expression',
        'Article 11: Freedom of assembly and association',
        'Protocol 1, Article 3: Right to free elections',
      ],
      bulletsGe: [
        'მუხლი 3: წამების და არაადამიანური მოპყრობის აკრძალვა',
        'მუხლი 5: თავისუფლებისა და უსაფრთხოების უფლება',
        'მუხლი 6: სამართლიანი სასამართლოს უფლება',
        'მუხლი 10: გამოხატვის თავისუფლება',
        'მუხლი 11: შეკრების და გაერთიანების თავისუფლება',
        'ოქმი 1, მუხლი 3: თავისუფალი არჩევნების უფლება',
      ],
    },
    {
      id: 'civil',
      heading: 'Civil Litigation & Asset Recovery',
      headingGe: 'სამოქალაქო სამართალწარმოება და აქტივების აღდგენა',
      body: [
        'Civil courts in key financial centers—London, New York, Geneva—offer pathways for freezing and recovering assets, challenging corrupt transactions, and holding enablers accountable.',
        'Unexplained Wealth Orders (UWOs) in the UK, civil forfeiture in the US, and mutual legal assistance treaties create opportunities to pursue the proceeds of kleptocracy across borders.',
      ],
      bodyGe: [
        'სამოქალაქო სასამართლოები მთავარ ფინანსურ ცენტრებში—ლონდონი, ნიუ-იორკი, ჟენევა—გვთავაზობენ გზებს აქტივების გაყინვისა და აღდგენისთვის, კორუმპირებული ტრანზაქციების გასაჩივრებისა და ხელმწყობთა ანგარიშვალდებულებისთვის.',
        'აუხსნელი სიმდიდრის ბრძანებები (UWO) გაერთიანებულ სამეფოში, სამოქალაქო კონფისკაცია აშშ-ში და ურთიერთსამართლებრივი დახმარების ხელშეკრულებები ქმნიან შესაძლებლობებს კლეპტოკრატიის შემოსავლების დევნისთვის საზღვრებს მიღმა.',
      ],
    },
    {
      id: 'support',
      heading: 'How We Support Legal Partners',
      headingGe: 'როგორ ვუჭერთ მხარს იურიდიულ პარტნიორებს',
      body: [
        'We provide structured evidence packages, expert testimony coordination, and strategic analysis to legal teams pursuing accountability. Our documentation meets the evidentiary standards required by international and domestic courts.',
      ],
      bodyGe: [
        'ჩვენ ვუზრუნველყოფთ სტრუქტურირებულ მტკიცებულებათა პაკეტებს, ექსპერტთა ჩვენების კოორდინაციას და სტრატეგიულ ანალიზს იურიდიულ გუნდებს, რომლებიც ანგარიშვალდებულებას მისდევენ. ჩვენი დოკუმენტაცია აკმაყოფილებს საერთაშორისო და შიდა სასამართლოების მოთხოვნილ მტკიცებულებით სტანდარტებს.',
      ],
      bullets: [
        'Structured dossiers with chain-of-custody documentation',
        'Expert witness coordination for forensic, medical, and financial testimony',
        'Timeline and network analysis mapping command structures',
        'Secure communication channels for sensitive case materials',
        'Translation and interpretation support for Georgian-language evidence',
      ],
      bulletsGe: [
        'სტრუქტურირებული დოსიეები მფლობელობის ჯაჭვის დოკუმენტაციით',
        'ექსპერტ-მოწმეთა კოორდინაცია ფორენზიკული, სამედიცინო და ფინანსური ჩვენებისთვის',
        'ქრონოლოგიისა და ქსელის ანალიზი ბრძანებათა სტრუქტურების მაპინგისთვის',
        'უსაფრთხო კომუნიკაციის არხები მგრძნობიარე საქმის მასალებისთვის',
        'თარგმანისა და ინტერპრეტაციის მხარდაჭერა ქართულენოვანი მტკიცებულებებისთვის',
      ],
    },
    {
      id: 'boundaries',
      heading: 'What We Do Not Do',
      headingGe: 'რას არ ვაკეთებთ',
      body: [
        'The Forum for Justice does not provide legal advice, does not represent individuals in court, and does not guarantee outcomes. We are a documentation and coordination organization, not a law firm.',
        'Individuals seeking legal representation should consult qualified counsel in the relevant jurisdiction. We can facilitate introductions to experienced practitioners but cannot serve as legal counsel ourselves.',
      ],
      bodyGe: [
        'სამართლიანობის ფორუმი არ იძლევა იურიდიულ რჩევას, არ წარმოადგენს ინდივიდებს სასამართლოში და არ გარანტირებს შედეგებს. ჩვენ ვართ დოკუმენტაციისა და კოორდინაციის ორგანიზაცია, არა იურიდიული ფირმა.',
        'იურიდიული წარმომადგენლობის მსურველმა პირებმა უნდა მიმართონ კვალიფიციურ მრჩეველს შესაბამის იურისდიქციაში. ჩვენ შეგვიძლია გავაადვილოთ გაცნობა გამოცდილ პრაქტიკოსებთან, მაგრამ თვითონ ვერ ვიმოქმედებთ იურიდიულ მრჩეველად.',
      ],
    },
  ],
};
