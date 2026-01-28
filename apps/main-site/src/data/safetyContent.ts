import { InstitutionalContent } from '@/types/institutional';

export const safetyContent: InstitutionalContent = {
  meta: {
    title: 'Victim & Witness Safety',
    titleGe: 'მსხვერპლისა და მოწმის უსაფრთხოება',
    lastUpdated: 'January 2026',
    lastUpdatedGe: 'იანვარი 2026',
    intro: 'The safety of those who come forward is not a procedural afterthought—it is the foundation upon which all accountability work rests.',
    introGe: 'მათი უსაფრთხოება, ვინც წინ გამოდის, არ არის პროცედურული შემდგომი აზრი — ეს არის საფუძველი, რომელზეც ანგარიშვალდებულების მთელი სამუშაო დგას.'
  },
  jumpToItems: [
    { id: 'protocols', label: 'Security Protocols', labelGe: 'უსაფრთხოების პროტოკოლები' },
    { id: 'digital', label: 'Digital Safety', labelGe: 'ციფრული უსაფრთხოება' },
    { id: 'physical', label: 'Physical Protection', labelGe: 'ფიზიკური დაცვა' },
    { id: 'legal', label: 'Legal Safeguards', labelGe: 'სამართლებრივი გარანტიები' },
    { id: 'emergency', label: 'Emergency Resources', labelGe: 'საგანგებო რესურსები' }
  ],
  sections: [
    {
      id: 'protocols',
      heading: 'Security Protocols',
      headingGe: 'უსაფრთხოების პროტოკოლები',
      body: ['Our security framework operates on the principle of minimum necessary exposure. Every interaction is designed to limit the information footprint while maximizing the evidentiary value of contributions.'],
      bodyGe: ['ჩვენი უსაფრთხოების ჩარჩო მოქმედებს მინიმალური აუცილებელი ექსპოზიციის პრინციპზე.'],
      bullets: ['End-to-end encrypted communication channels', 'Compartmentalized information access', 'Regular security audits by independent experts', 'No retention of identifying metadata'],
      bulletsGe: ['ბოლოდან ბოლომდე დაშიფრული საკომუნიკაციო არხები', 'ინფორმაციაზე კომპარტმენტალიზებული წვდომა', 'რეგულარული უსაფრთხოების აუდიტი დამოუკიდებელი ექსპერტების მიერ', 'იდენტიფიცირებადი მეტადატის შენახვის გარეშე']
    },
    {
      id: 'digital',
      heading: 'Digital Safety',
      headingGe: 'ციფრული უსაფრთხოება',
      body: ['In an era of sophisticated surveillance, digital hygiene is not optional—it is essential.'],
      bodyGe: ['დახვეწილი მეთვალყურეობის ეპოქაში ციფრული ჰიგიენა არჩევითი არ არის — ის აუცილებელია.'],
      bullets: ['Secure submission portals using Tor-accessible infrastructure', 'Guidance on device security and operational security', 'Encrypted document handling protocols', 'Metadata stripping for all submitted materials'],
      bulletsGe: ['უსაფრთხო წარდგენის პორტალები Tor-ით ხელმისაწვდომი ინფრასტრუქტურით', 'მითითებები მოწყობილობის უსაფრთხოებაზე', 'დაშიფრული დოკუმენტების დამუშავების პროტოკოლები', 'მეტადატის მოცილება ყველა წარდგენილი მასალისთვის']
    },
    {
      id: 'physical',
      heading: 'Physical Protection',
      headingGe: 'ფიზიკური დაცვა',
      body: ['For those facing immediate physical threats, we maintain partnerships with organizations specializing in protection and relocation.'],
      bodyGe: ['მათთვის, ვინც უშუალო ფიზიკურ საფრთხეს აწყდება, ჩვენ ვინარჩუნებთ პარტნიორობას დაცვაში სპეციალიზებულ ორგანიზაციებთან.'],
      bullets: ['Risk assessment for high-profile contributors', 'Coordination with international protection networks', 'Emergency relocation assistance where warranted', 'Secure meeting protocols for sensitive interviews'],
      bulletsGe: ['რისკის შეფასება მაღალი პროფილის კონტრიბუტორებისთვის', 'კოორდინაცია საერთაშორისო დაცვის ქსელებთან', 'საგანგებო გადაადგილების დახმარება', 'უსაფრთხო შეხვედრის პროტოკოლები']
    },
    {
      id: 'legal',
      heading: 'Legal Safeguards',
      headingGe: 'სამართლებრივი გარანტიები',
      body: ['We operate within a framework designed to maximize legal protections for sources and witnesses.'],
      bodyGe: ['ჩვენ ვმოქმედებთ ჩარჩოში, რომელიც შექმნილია წყაროებისა და მოწმეებისთვის სამართლებრივი დაცვის მაქსიმალურად გაზრდისთვის.'],
      bullets: ['Pro bono legal consultation network', 'Whistleblower protection guidance', 'Coordination with press freedom organizations', 'Documentation for potential asylum proceedings'],
      bulletsGe: ['პრო ბონო იურიდიული კონსულტაციის ქსელი', 'მამხილებელთა დაცვის მითითებები', 'კოორდინაცია პრესის თავისუფლების ორგანიზაციებთან', 'დოკუმენტაცია თავშესაფრის პროცედურებისთვის']
    },
    {
      id: 'emergency',
      heading: 'Emergency Resources',
      headingGe: 'საგანგებო რესურსები',
      body: ['In situations of immediate danger, time is critical. We maintain emergency protocols and can facilitate rapid connection to protective resources.'],
      bodyGe: ['უშუალო საფრთხის სიტუაციებში დრო კრიტიკულია. ჩვენ ვინარჩუნებთ საგანგებო პროტოკოლებს.'],
      bullets: ['Direct lines to partner protection organizations', 'Emergency contact protocols available 24/7', 'Coordination with diplomatic missions where appropriate', 'Rapid response assessment for imminent threats'],
      bulletsGe: ['პირდაპირი ხაზები პარტნიორ დაცვის ორგანიზაციებთან', 'საგანგებო კონტაქტის პროტოკოლები 24/7', 'კოორდინაცია დიპლომატიურ მისიებთან', 'სწრაფი რეაგირების შეფასება']
    }
  ]
};
