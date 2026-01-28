import { InstitutionalContent } from '@/types/institutional';

export const replyCorrectionsContent: InstitutionalContent = {
  meta: {
    title: 'Right of Reply',
    titleGe: 'პასუხის უფლება',
    lastUpdated: 'January 2026',
    lastUpdatedGe: 'იანვარი 2026',
    intro: 'Accountability requires fairness. Those named in our work have the right to respond.',
    introGe: 'ანგარიშვალდებულება მოითხოვს სამართლიანობას. ჩვენს ნაშრომში დასახელებულებს აქვთ პასუხის უფლება.'
  },
  jumpToItems: [
    { id: 'policy', label: 'Reply Policy', labelGe: 'პასუხის პოლიტიკა' },
    { id: 'submission', label: 'How to Submit', labelGe: 'როგორ წარადგინოთ' },
    { id: 'corrections', label: 'Corrections Policy', labelGe: 'გასწორებების პოლიტიკა' },
    { id: 'log', label: 'Corrections Log', labelGe: 'გასწორებების ჟურნალი' },
    { id: 'standards', label: 'Editorial Standards', labelGe: 'სარედაქციო სტანდარტები' }
  ],
  sections: [
    {
      id: 'policy',
      heading: 'Reply Policy',
      headingGe: 'პასუხის პოლიტიკა',
      body: ['We extend the right of reply to any individual or entity named in our published findings.'],
      bodyGe: ['ჩვენ ვაწვდით პასუხის უფლებას ნებისმიერ პირს ან სუბიექტს, რომელიც დასახელებულია ჩვენს დასკვნებში.'],
      bullets: ['Replies are published unedited alongside original findings', 'Substantive factual challenges prompt additional investigation', 'Legal threats do not substitute for substantive engagement', 'Replies must be received within 30 days of publication'],
      bulletsGe: ['პასუხები ქვეყნდება შეუცვლელად ორიგინალ დასკვნებთან ერთად', 'არსებითი ფაქტობრივი გასაჩივრებები იწვევს დამატებით გამოძიებას', 'სამართლებრივი მუქარა არ ცვლის არსებით ჩართულობას', 'პასუხები უნდა მიიღოს გამოქვეყნებიდან 30 დღის განმავლობაში']
    },
    {
      id: 'submission',
      heading: 'How to Submit a Reply',
      headingGe: 'როგორ წარადგინოთ პასუხი',
      body: ['Replies should be directed to our editorial team through official channels.'],
      bodyGe: ['პასუხები უნდა მიმართოთ ჩვენს სარედაქციო გუნდს ოფიციალური არხებით.'],
      bullets: ['Clear identification of the publication being addressed', 'Specific factual claims being disputed', 'Supporting evidence or documentation', 'Contact information for follow-up questions'],
      bulletsGe: ['მიმართული პუბლიკაციის მკაფიო იდენტიფიკაცია', 'კონკრეტული ფაქტობრივი მტკიცებები, რომლებიც სადავოა', 'დამხმარე მტკიცებულება ან დოკუმენტაცია', 'საკონტაქტო ინფორმაცია დამატებითი კითხვებისთვის']
    },
    {
      id: 'corrections',
      heading: 'Corrections Policy',
      headingGe: 'გასწორებების პოლიტიკა',
      body: ['We correct errors of fact promptly and transparently. When we get something wrong, we say so clearly.'],
      bodyGe: ['ჩვენ ვასწორებთ ფაქტობრივ შეცდომებს დროულად და გამჭვირვალედ.'],
      bullets: ['Factual errors corrected within 48 hours of verification', 'Corrections clearly marked at point of original error', 'Material corrections announced through official channels', 'Patterns of disputed claims trigger methodology review'],
      bulletsGe: ['ფაქტობრივი შეცდომები გასწორდება 48 საათის განმავლობაში', 'გასწორებები მკაფიოდ აღინიშნება ორიგინალი შეცდომის ადგილას', 'მატერიალური გასწორებები ცხადდება ოფიციალური არხებით', 'სადავო მტკიცებების ნიმუშები იწვევს მეთოდოლოგიის მიმოხილვას']
    },
    {
      id: 'log',
      heading: 'Corrections Log',
      headingGe: 'გასწორებების ჟურნალი',
      body: ['Transparency requires a public record of our corrections. This log documents all substantive corrections made to our published work.'],
      bodyGe: ['გამჭვირვალეობა მოითხოვს ჩვენი გასწორებების საჯარო ჩანაწერს.'],
      subSections: [{
        id: 'log-empty',
        heading: 'No corrections to date',
        headingGe: 'დღეისათვის გასწორებები არ არის',
        body: ['This log will be updated as corrections are issued.'],
        bodyGe: ['ეს ჟურნალი განახლდება გასწორებების გამოცემის მიხედვით.']
      }]
    },
    {
      id: 'standards',
      heading: 'Editorial Standards',
      headingGe: 'სარედაქციო სტანდარტები',
      body: ['Our commitment to accuracy is reflected in our verification methodology. All findings undergo multi-stage review before publication.'],
      bodyGe: ['ჩვენი ზუსტობის ერთგულება ასახულია ჩვენს ვერიფიკაციის მეთოდოლოგიაში.'],
      links: [
        { label: 'View Full Methodology', labelGe: 'სრული მეთოდოლოგიის ნახვა', href: '/methodology' },
        { label: 'Editorial Standards', labelGe: 'სარედაქციო სტანდარტები', href: '/standards' }
      ]
    }
  ]
};
