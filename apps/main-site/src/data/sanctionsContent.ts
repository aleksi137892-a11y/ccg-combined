import { InstitutionalContent } from '@/types/institutional';

export const sanctionsContent: InstitutionalContent = {
  meta: {
    title: 'Sanctions Database',
    titleGe: 'სანქციების მონაცემთა ბაზა',
    lastUpdated: 'January 2026',
    lastUpdatedGe: 'იანვარი 2026',
    intro: 'A comprehensive registry of individuals subject to or recommended for targeted sanctions under international accountability frameworks.',
    introGe: 'ყოვლისმომცველი რეესტრი იმ პირებისა, რომლებიც ექვემდებარებიან ან რეკომენდებულია მიზნობრივი სანქციებისთვის საერთაშორისო ანგარიშვალდებულების ჩარჩოების მიხედვით.'
  },
  jumpToItems: [
    { id: 'framework', label: 'Legal Framework', labelGe: 'სამართლებრივი ჩარჩო' },
    { id: 'jurisdictions', label: 'Jurisdictions', labelGe: 'იურისდიქციები' },
    { id: 'criteria', label: 'Designation Criteria', labelGe: 'დანიშვნის კრიტერიუმები' },
    { id: 'submission', label: 'Submit Evidence', labelGe: 'მტკიცებულების წარდგენა' }
  ],
  sections: [
    {
      id: 'framework',
      heading: 'Legal Framework',
      headingGe: 'სამართლებრივი ჩარჩო',
      body: ['Targeted sanctions represent one of the most effective non-military tools available to the international community for holding perpetrators of serious human rights violations accountable.'],
      bodyGe: ['მიზნობრივი სანქციები წარმოადგენს ერთ-ერთ ყველაზე ეფექტურ არასამხედრო ინსტრუმენტს, რომელიც საერთაშორისო საზოგადოებას აქვს ადამიანის უფლებების სერიოზული დარღვევების ჩამდენ პირთა ანგარიშვალდებულებისთვის.'],
      bullets: ['Global Magnitsky Act and equivalent legislation', 'EU Human Rights Sanctions Regime', 'UK Sanctions and Anti-Money Laundering Act', 'Canadian Justice for Victims of Corrupt Foreign Officials Act'],
      bulletsGe: ['გლობალური მაგნიტსკის აქტი და ექვივალენტური კანონმდებლობა', 'ევროკავშირის ადამიანის უფლებების სანქციების რეჟიმი', 'დიდი ბრიტანეთის სანქციებისა და ფულის გათეთრების საწინააღმდეგო აქტი', 'კანადის კორუმპირებული უცხოელი თანამდებობის პირების მსხვერპლთა სამართლიანობის აქტი']
    },
    {
      id: 'jurisdictions',
      heading: 'Partner Jurisdictions',
      headingGe: 'პარტნიორი იურისდიქციები',
      body: ['We maintain working relationships with sanctions authorities across multiple jurisdictions to ensure that credible evidence reaches decision-makers.'],
      bodyGe: ['ჩვენ ვინარჩუნებთ სამუშაო ურთიერთობებს სანქციების ორგანოებთან მრავალ იურისდიქციაში, რათა უზრუნველვყოთ სანდო მტკიცებულების მიწვდომა გადაწყვეტილების მიმღებებთან.'],
      bullets: ['United States (OFAC, State Department)', 'European Union (European External Action Service)', 'United Kingdom (Foreign, Commonwealth & Development Office)', 'Canada (Global Affairs Canada)', 'Australia (Department of Foreign Affairs and Trade)'],
      bulletsGe: ['ამერიკის შეერთებული შტატები (OFAC, სახელმწიფო დეპარტამენტი)', 'ევროკავშირი (ევროპული საგარეო მოქმედების სამსახური)', 'გაერთიანებული სამეფო (საგარეო, თანამეგობრობისა და განვითარების ოფისი)', 'კანადა (გლობალური საქმეები კანადა)', 'ავსტრალია (საგარეო საქმეთა და ვაჭრობის დეპარტამენტი)']
    },
    {
      id: 'criteria',
      heading: 'Designation Criteria',
      headingGe: 'დანიშვნის კრიტერიუმები',
      body: ['Recommendation for sanctions designation requires evidence meeting specific thresholds established by each jurisdiction.'],
      bodyGe: ['სანქციების დანიშვნის რეკომენდაცია მოითხოვს მტკიცებულებას, რომელიც აკმაყოფილებს თითოეული იურისდიქციის მიერ დადგენილ კონკრეტულ ზღვრებს.'],
      bullets: ['Serious human rights violations or abuses', 'Significant corruption', 'Actions threatening democratic institutions', 'Responsibility for or complicity in serious harm', 'Benefit derived from corrupt or abusive conduct'],
      bulletsGe: ['ადამიანის უფლებების სერიოზული დარღვევები', 'მნიშვნელოვანი კორუფცია', 'დემოკრატიული ინსტიტუტების მუქარის მოქმედებები', 'პასუხისმგებლობა ან თანამონაწილეობა სერიოზულ ზიანში', 'კორუფციული ან ბოროტმოქმედი ქცევიდან მიღებული სარგებელი']
    },
    {
      id: 'submission',
      heading: 'Submit Evidence',
      headingGe: 'მტკიცებულების წარდგენა',
      body: ['If you possess evidence relevant to sanctions designation, we can facilitate its transmission to appropriate authorities through secure channels.'],
      bodyGe: ['თუ თქვენ გაგაჩნიათ მტკიცებულება, რომელიც შეესაბამება სანქციების დანიშვნას, ჩვენ შეგვიძლია ხელი შევუწყოთ მის გადაცემას შესაბამის ორგანოებს უსაფრთხო არხებით.'],
      links: [
        { label: 'Submit Evidence Securely', labelGe: 'მტკიცებულების უსაფრთხოდ წარდგენა', href: '/appeal/submit-petition' },
        { label: 'View Source Protection Protocols', labelGe: 'წყაროს დაცვის პროტოკოლების ნახვა', href: '/safety' }
      ]
    }
  ]
};
