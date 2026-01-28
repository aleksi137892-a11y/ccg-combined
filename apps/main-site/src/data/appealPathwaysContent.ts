import { InstitutionalContent } from '@/types/institutional';

export const appealPathwaysContent: InstitutionalContent = {
  meta: {
    title: 'Submit a Petition',
    titleGe: 'პეტიციის წარდგენა',
    lastUpdated: 'January 2026',
    lastUpdatedGe: 'იანვარი 2026',
    intro: 'The Forum for Justice exists to receive, document, and act upon credible accounts of wrongdoing by those who have betrayed their public trust.',
    introGe: 'სამართლიანობის ფორუმი არსებობს იმისთვის, რომ მიიღოს და დააფიქსიროს სანდო ანგარიშები დარღვევების შესახებ.'
  },
  jumpToItems: [
    { id: 'pathways', label: 'Intake Pathways', labelGe: 'მიღების გზები' },
    { id: 'process', label: 'What Happens Next', labelGe: 'რა ხდება შემდეგ' },
    { id: 'protections', label: 'Your Protections', labelGe: 'თქვენი დაცვა' },
    { id: 'prepare', label: 'How to Prepare', labelGe: 'როგორ მოემზადოთ' }
  ],
  sections: [
    {
      id: 'pathways',
      heading: 'Intake Pathways',
      headingGe: 'მიღების გზები',
      body: ['We recognize that those with information come from different circumstances and face different risks. Select the pathway that best describes your situation.'],
      bodyGe: ['ჩვენ ვაღიარებთ, რომ ინფორმაციის მქონე ადამიანები სხვადასხვა გარემოებებიდან მოდიან და სხვადასხვა რისკებს აწყდებიან.']
    },
    {
      id: 'process',
      heading: 'What Happens Next',
      headingGe: 'რა ხდება შემდეგ',
      body: ['Every submission is treated with the gravity it deserves. Our process is designed to be thorough without being burdensome.'],
      bodyGe: ['ყოველი წარდგენა განიხილება იმ სერიოზულობით, რომელსაც იმსახურებს.'],
      bullets: ['Initial review within 72 hours of submission', 'Preliminary assessment of evidentiary value and scope', 'Assignment to appropriate investigative or documentation track', 'Regular status updates through your preferred secure channel', 'Final disposition notification with explanation of outcome'],
      bulletsGe: ['საწყისი განხილვა წარდგენიდან 72 საათის განმავლობაში', 'მტკიცებულებითი ღირებულების წინასწარი შეფასება', 'შესაბამის საგამოძიებო ტრაქზე მინიჭება', 'რეგულარული სტატუსის განახლებები', 'საბოლოო გადაწყვეტილების შეტყობინება']
    },
    {
      id: 'protections',
      heading: 'Your Protections',
      headingGe: 'თქვენი დაცვა',
      body: ['We take source protection seriously. Your safety is paramount, and our protocols reflect that priority.'],
      bodyGe: ['ჩვენ სერიოზულად ვუდგებით წყაროს დაცვას. თქვენი უსაფრთხოება უმთავრესია.'],
      bullets: ['Anonymity preserved unless you choose otherwise', 'End-to-end encrypted communication', 'No cooperation with hostile state actors', 'Access to legal consultation where needed', 'Physical protection resources for high-risk contributors'],
      bulletsGe: ['ანონიმურობა დაცულია', 'ბოლოდან ბოლომდე დაშიფრული კომუნიკაცია', 'მტრულ სახელმწიფო აქტორებთან თანამშრომლობის გარეშე', 'წვდომა იურიდიულ კონსულტაციაზე', 'ფიზიკური დაცვის რესურსები']
    },
    {
      id: 'prepare',
      heading: 'How to Prepare',
      headingGe: 'როგორ მოემზადოთ',
      body: ['The strength of your submission depends on the quality and specificity of the information you provide.'],
      bodyGe: ['თქვენი წარდგენის სიძლიერე დამოკიდებულია თქვენ მიერ მოწოდებული ინფორმაციის ხარისხზე.'],
      bullets: ['Chronology: When did the events occur?', 'Actors: Who was involved? What were their positions?', 'Evidence: What documentation exists?', 'Corroboration: Who else has knowledge of these events?', 'Risk: What are the potential consequences of disclosure?'],
      bulletsGe: ['ქრონოლოგია: როდის მოხდა მოვლენები?', 'მოქმედი პირები: ვინ იყო ჩართული?', 'მტკიცებულება: რა დოკუმენტაცია არსებობს?', 'დადასტურება: ვის აქვს ცოდნა ამ მოვლენების შესახებ?', 'რისკი: რა არის გამჟღავნების პოტენციური შედეგები?']
    }
  ]
};
