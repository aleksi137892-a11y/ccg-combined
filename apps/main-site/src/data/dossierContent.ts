import { InstitutionalContent } from '@/types/institutional';

export const dossierContent: InstitutionalContent = {
  meta: {
    title: 'Dossier Desk',
    titleGe: 'დოსიეების განყოფილება',
    lastUpdated: 'January 2026',
    lastUpdatedGe: 'იანვარი 2026',
    intro: 'Comprehensive documentation and evidence files on matters of public interest, maintained for accountability and research.',
    introGe: 'ყოვლისმომცველი დოკუმენტაცია და მტკიცებულების ფაილები საზოგადოებრივი ინტერესის საკითხებზე, რომელიც ინახება ანგარიშვალდებულებისა და კვლევისთვის.'
  },
  jumpToItems: [
    { id: 'methodology', label: 'Dossier Methodology', labelGe: 'დოსიეს მეთოდოლოგია' },
    { id: 'standards', label: 'Evidence Standards', labelGe: 'მტკიცებულების სტანდარტები' },
    { id: 'access', label: 'Access & Distribution', labelGe: 'წვდომა და განაწილება' },
    { id: 'partners', label: 'Partner Organizations', labelGe: 'პარტნიორი ორგანიზაციები' }
  ],
  sections: [
    {
      id: 'methodology',
      heading: 'Dossier Methodology',
      headingGe: 'დოსიეს მეთოდოლოგია',
      body: ['Each dossier represents a comprehensive compilation of evidence regarding a specific individual, institution, or pattern of conduct. Our methodology ensures that dossiers meet the evidentiary standards required by accountability mechanisms.'],
      bodyGe: ['თითოეული დოსიე წარმოადგენს მტკიცებულების ყოვლისმომცველ კომპილაციას კონკრეტული პირის, ინსტიტუტის ან ქცევის ნიმუშის შესახებ.'],
      bullets: ['Multi-source verification for all factual claims', 'Clear distinction between confirmed facts and allegations', 'Chronological documentation of events and patterns', 'Chain of custody protocols for physical evidence', 'Regular review and update cycles'],
      bulletsGe: ['მრავალწყაროიანი ვერიფიკაცია ყველა ფაქტობრივი მტკიცებისთვის', 'მკაფიო განსხვავება დადასტურებულ ფაქტებსა და ბრალდებებს შორის', 'მოვლენებისა და ნიმუშების ქრონოლოგიური დოკუმენტაცია', 'ფიზიკური მტკიცებულების მფლობელობის ჯაჭვის პროტოკოლები', 'რეგულარული განხილვისა და განახლების ციკლები']
    },
    {
      id: 'standards',
      heading: 'Evidence Standards',
      headingGe: 'მტკიცებულების სტანდარტები',
      body: ['Our evidence standards are informed by international investigative protocols and the requirements of the accountability mechanisms we support.'],
      bodyGe: ['ჩვენი მტკიცებულების სტანდარტები ინფორმირებულია საერთაშორისო საგამოძიებო პროტოკოლებით და ანგარიშვალდებულების მექანიზმების მოთხოვნებით.'],
      bullets: ['Istanbul Protocol for torture documentation', 'Minnesota Protocol for suspicious deaths', 'Berkeley Protocol for digital open-source investigations', 'International Criminal Court evidentiary standards', 'Journalist source protection principles'],
      bulletsGe: ['სტამბოლის პროტოკოლი წამების დოკუმენტირებისთვის', 'მინესოტას პროტოკოლი საეჭვო სიკვდილისთვის', 'ბერკლის პროტოკოლი ციფრული ღია წყაროს გამოძიებისთვის', 'საერთაშორისო სისხლის სამართლის სასამართლოს მტკიცებულების სტანდარტები', 'ჟურნალისტის წყაროს დაცვის პრინციპები']
    },
    {
      id: 'access',
      heading: 'Access & Distribution',
      headingGe: 'წვდომა და განაწილება',
      body: ['Dossiers are prepared for specific accountability purposes and distributed to authorized recipients only.'],
      bodyGe: ['დოსიეები მზადდება კონკრეტული ანგარიშვალდებულების მიზნებისთვის და ნაწილდება მხოლოდ უფლებამოსილ მიმღებებზე.'],
      bullets: ['Government sanctions authorities', 'International investigative bodies', 'Prosecutorial authorities with jurisdiction', 'Credentialed investigative journalists', 'Academic researchers under ethical protocols'],
      bulletsGe: ['სახელმწიფო სანქციების ორგანოები', 'საერთაშორისო საგამოძიებო ორგანოები', 'იურისდიქციის მქონე საპროკურორო ორგანოები', 'აკრედიტებული საგამოძიებო ჟურნალისტები', 'ეთიკური პროტოკოლების მქონე აკადემიური მკვლევარები']
    },
    {
      id: 'partners',
      heading: 'Partner Organizations',
      headingGe: 'პარტნიორი ორგანიზაციები',
      body: ['We collaborate with organizations that share our commitment to rigorous documentation and effective accountability.'],
      bodyGe: ['ჩვენ ვთანამშრომლობთ ორგანიზაციებთან, რომლებიც იზიარებენ ჩვენს ერთგულებას მკაცრი დოკუმენტაციისა და ეფექტური ანგარიშვალდებულების მიმართ.'],
      links: [
        { label: 'View Methodology', labelGe: 'მეთოდოლოგიის ნახვა', href: '/methodology' },
        { label: 'Evidence Standards', labelGe: 'მტკიცებულების სტანდარტები', href: '/standards' }
      ]
    }
  ]
};
