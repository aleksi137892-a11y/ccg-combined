import type { InstitutionalContent } from '@/types/institutional';

export const investigationsContent: InstitutionalContent = {
  meta: {
    title: 'Investigations and Briefs',
    titleGe: 'გამოძიებები და მოხსენებები',
    lastUpdated: 'January 2026',
    lastUpdatedGe: 'იანვარი 2026',
    intro: 'In-depth investigations and analytical briefs on matters of public concern, conducted with rigorous methodology.',
    introGe: 'სიღრმისეული გამოძიებები და ანალიტიკური მოხსენებები საზოგადოებრივი შეშფოთების საკითხებზე, ჩატარებული მკაცრი მეთოდოლოგიით.',
  },
  jumpToItems: [
    { id: 'methodology', label: 'Investigative Standards', labelGe: 'საგამოძიებო სტანდარტები' },
    { id: 'active', label: 'Active Investigations', labelGe: 'მიმდინარე გამოძიებები' },
    { id: 'briefs', label: 'Analytical Briefs', labelGe: 'ანალიტიკური მოხსენებები' },
    { id: 'submit', label: 'Submit Evidence', labelGe: 'მტკიცებულების წარდგენა' },
  ],
  sections: [
    {
      id: 'methodology',
      heading: 'Investigative Standards',
      headingGe: 'საგამოძიებო სტანდარტები',
      body: [
        'All investigations conducted under the Forum for Justice adhere to rigorous methodological standards. We do not rely on testimony alone. Every claim must be corroborated through documentary evidence, open-source intelligence, or independent verification.',
        'Our investigative work aligns with recognized documentation guidance: the Istanbul Protocol for torture documentation, the Minnesota Protocol for unlawful deaths, and the Berkeley Protocol for open-source investigations.',
      ],
      bodyGe: [
        'სამართლიანობის ფორუმის ფარგლებში ჩატარებული ყველა გამოძიება იცავს მკაცრ მეთოდოლოგიურ სტანდარტებს. ჩვენ არ ვეყრდნობით მხოლოდ ჩვენებებს. ყველა პრეტენზია უნდა დადასტურდეს დოკუმენტური მტკიცებულებით, ღია წყაროს დაზვერვით ან დამოუკიდებელი გადამოწმებით.',
        'ჩვენი საგამოძიებო სამუშაო შეესაბამება აღიარებულ დოკუმენტაციის სახელმძღვანელოებს: სტამბულის პროტოკოლი წამების დოკუმენტაციისთვის, მინესოტას პროტოკოლი უკანონო სიკვდილისთვის და ბერკლის პროტოკოლი ღია წყაროს გამოძიებებისთვის.',
      ],
      bullets: [
        'Multi-source corroboration required for all factual claims',
        'Chain of custody documentation for all evidence',
        'Confidence labels assigned based on verification depth',
        'Right of reply offered to subjects before publication',
        'Correction and update protocols for published findings',
      ],
      bulletsGe: [
        'მრავალწყაროიანი დადასტურება საჭიროა ყველა ფაქტობრივი პრეტენზიისთვის',
        'მეურვეობის ჯაჭვის დოკუმენტაცია ყველა მტკიცებულებისთვის',
        'ნდობის ეტიკეტები მინიჭებული გადამოწმების სიღრმის მიხედვით',
        'პასუხის უფლება შეთავაზებული სუბიექტებს გამოქვეყნებამდე',
        'გამოსწორებისა და განახლების პროტოკოლები გამოქვეყნებული დასკვნებისთვის',
      ],
    },
    {
      id: 'active',
      heading: 'Active Investigations',
      headingGe: 'მიმდინარე გამოძიებები',
      body: [
        'The Forum for Justice maintains several active investigative tracks. We do not disclose investigation details until publication-ready, except where disclosure serves source protection or public safety.',
        'Active investigations are subject to ongoing review gates: standards check, legal and ethics review, security review, and right of reply workflow.',
      ],
      bodyGe: [
        'სამართლიანობის ფორუმი ინარჩუნებს რამდენიმე აქტიურ საგამოძიებო ტრეკს. ჩვენ არ ვამჟღავნებთ გამოძიების დეტალებს გამოქვეყნებისთვის მზადყოფნამდე, გარდა იმ შემთხვევისა, როდესაც გამჟღავნება ემსახურება წყაროს დაცვას ან საზოგადოებრივ უსაფრთხოებას.',
        'აქტიური გამოძიებები ექვემდებარება მიმდინარე განხილვის კარებს: სტანდარტების შემოწმება, იურიდიული და ეთიკური განხილვა, უსაფრთხოების განხილვა და პასუხის უფლების სამუშაო პროცესი.',
      ],
    },
    {
      id: 'briefs',
      heading: 'Analytical Briefs',
      headingGe: 'ანალიტიკური მოხსენებები',
      body: [
        'Analytical briefs are shorter-form publications that synthesize publicly available information on specific topics of institutional concern. Unlike full investigations, briefs aggregate and contextualize existing documentation rather than generating new evidence.',
        'Briefs carry their own confidence labels and are subject to the same correction protocols as investigations.',
      ],
      bodyGe: [
        'ანალიტიკური მოხსენებები არის მოკლე ფორმატის პუბლიკაციები, რომლებიც აჯამებენ საჯაროდ ხელმისაწვდომ ინფორმაციას ინსტიტუციური შეშფოთების კონკრეტულ თემებზე. სრული გამოძიებებისგან განსხვავებით, მოხსენებები აგრეგატებენ და აყალიბებენ კონტექსტს არსებული დოკუმენტაციისთვის, ვიდრე ქმნიან ახალ მტკიცებულებას.',
        'მოხსენებებს აქვთ საკუთარი ნდობის ეტიკეტები და ექვემდებარებიან იგივე გამოსწორების პროტოკოლებს, როგორც გამოძიებები.',
      ],
    },
    {
      id: 'submit',
      heading: 'Submit Evidence or Tips',
      headingGe: 'მტკიცებულების ან ინფორმაციის წარდგენა',
      body: [
        'The Forum for Justice welcomes submissions from individuals with relevant evidence or information. We accept submissions through multiple channels, including our Secure Channel for sensitive materials.',
        'All submissions are assessed against our intake criteria. Not every submission results in an investigation, but every credible submission is preserved in accordance with our evidence handling protocols.',
      ],
      bodyGe: [
        'სამართლიანობის ფორუმი მისალმებს წარდგენებს რელევანტური მტკიცებულებით ან ინფორმაციით მქონე პირებისგან. ჩვენ ვიღებთ წარდგენებს მრავალი არხით, მათ შორის ჩვენი უსაფრთხო არხით მგრძნობიარე მასალებისთვის.',
        'ყველა წარდგენა ფასდება ჩვენი მიღების კრიტერიუმების მიხედვით. ყველა წარდგენა არ იწვევს გამოძიებას, მაგრამ ყველა სანდო წარდგენა ინახება ჩვენი მტკიცებულების დამუშავების პროტოკოლების შესაბამისად.',
      ],
      links: [
        { label: 'Secure Channel', labelGe: 'უსაფრთხო არხი', href: '/secure' },
        { label: 'Report Violations', labelGe: 'დარღვევების შეტყობინება', href: '/report' },
      ],
    },
  ],
};
