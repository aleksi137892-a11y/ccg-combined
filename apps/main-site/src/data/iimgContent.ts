import { InstitutionalContent } from '@/types/institutional';

export const iimgContent: InstitutionalContent = {
  meta: {
    title: 'IIM-Georgia',
    titleGe: 'IIM-საქართველო',
    lastUpdated: 'January 2026',
    lastUpdatedGe: 'იანვარი 2026',
    intro: 'The Independent Investigative Mechanism for Georgia documents and preserves evidence of serious violations for future accountability.',
    introGe: 'საქართველოს დამოუკიდებელი საგამოძიებო მექანიზმი აფიქსირებს და ინახავს სერიოზული დარღვევების მტკიცებულებებს მომავალი ანგარიშვალდებულებისთვის.',
    mandateTitle: 'Special Mandate: State Crimes, Systemic Violence, and Chemical Agents',
    mandateTitleGe: 'სპეციალური მანდატი: სახელმწიფო დანაშაულები, სისტემური ძალადობა და ქიმიური აგენტები',
    mandateDescription: 'A specialized intake protocol for systemic state violations and crimes of collective harm—documented to international evidentiary standards.',
    mandateDescriptionGe: 'სპეციალიზებული მიღების პროტოკოლი სისტემური სახელმწიფო დარღვევებისა და კოლექტიური ზიანის დანაშაულებისთვის—დოკუმენტირებული საერთაშორისო მტკიცებულებითი სტანდარტებით.'
  },
  jumpToItems: [
    { id: 'mandate', label: 'Mandate', labelGe: 'მანდატი' },
    { id: 'scope', label: 'Scope of Work', labelGe: 'სამუშაოს მოცულობა' },
    { id: 'methodology', label: 'Methodology', labelGe: 'მეთოდოლოგია' },
    { id: 'submit', label: 'How to Submit', labelGe: 'როგორ წარადგინოთ' },
    { id: 'partners', label: 'Partners', labelGe: 'პარტნიორები' }
  ],
  sections: [
    {
      id: 'mandate',
      heading: 'Mandate',
      headingGe: 'მანდატი',
      body: ['The Independent Investigative Mechanism for Georgia (IIM-Georgia) operates to collect, consolidate, preserve, and analyze evidence of serious violations of international humanitarian law and human rights law.'],
      bodyGe: ['საქართველოს დამოუკიდებელი საგამოძიებო მექანიზმი (IIM-საქართველო) მოქმედებს საერთაშორისო ჰუმანიტარული სამართლისა და ადამიანის უფლებების სამართლის სერიოზული დარღვევების მტკიცებულებების შეგროვების, კონსოლიდაციის, შენახვისა და ანალიზისთვის.'],
      bullets: ['Evidence collection and preservation', 'Witness statement documentation', 'Digital evidence verification', 'Preparation of files for accountability mechanisms', 'Coordination with international bodies'],
      bulletsGe: ['მტკიცებულებების შეგროვება და შენახვა', 'მოწმეთა ჩვენებების დოკუმენტირება', 'ციფრული მტკიცებულების ვერიფიკაცია', 'ფაილების მომზადება ანგარიშვალდებულების მექანიზმებისთვის', 'კოორდინაცია საერთაშორისო ორგანოებთან']
    },
    {
      id: 'scope',
      heading: 'Scope of Work',
      headingGe: 'სამუშაოს მოცულობა',
      body: ['Our investigative scope encompasses serious violations occurring within and affecting Georgia, with particular focus on systemic patterns of abuse.'],
      bodyGe: ['ჩვენი საგამოძიებო მოცულობა მოიცავს საქართველოში მომხდარ და მასზე მოქმედ სერიოზულ დარღვევებს, განსაკუთრებული ფოკუსით ძალადობის სისტემურ ნიმუშებზე.'],
      bullets: ['Violations of fundamental rights and freedoms', 'Abuse of state power against civilians', 'Systematic corruption affecting justice systems', 'Electoral interference and democratic subversion', 'Persecution of civil society and media'],
      bulletsGe: ['ფუნდამენტური უფლებებისა და თავისუფლებების დარღვევები', 'სახელმწიფო ძალაუფლების ბოროტად გამოყენება მოქალაქეების წინააღმდეგ', 'სისტემური კორუფცია, რომელიც აზიანებს მართლმსაჯულების სისტემებს', 'საარჩევნო ჩარევა და დემოკრატიული სუბვერსია', 'სამოქალაქო საზოგადოებისა და მედიის დევნა']
    },
    {
      id: 'methodology',
      heading: 'Investigative Methodology',
      headingGe: 'საგამოძიებო მეთოდოლოგია',
      body: ['Our methodology adheres to international best practices for evidence collection and preservation, ensuring materials meet the standards required by courts and tribunals.'],
      bodyGe: ['ჩვენი მეთოდოლოგია იცავს საერთაშორისო საუკეთესო პრაქტიკებს მტკიცებულებების შეგროვებისა და შენახვისთვის.'],
      bullets: ['Chain of custody documentation', 'Metadata preservation and verification', 'Witness protection protocols', 'Digital forensics standards', 'Corroboration requirements'],
      bulletsGe: ['მფლობელობის ჯაჭვის დოკუმენტაცია', 'მეტადატის შენახვა და ვერიფიკაცია', 'მოწმეთა დაცვის პროტოკოლები', 'ციფრული სასამართლო ექსპერტიზის სტანდარტები', 'დადასტურების მოთხოვნები']
    },
    {
      id: 'submit',
      heading: 'How to Submit Evidence',
      headingGe: 'როგორ წარადგინოთ მტკიცებულება',
      body: ['We maintain secure channels for the submission of evidence. Your safety is our priority.'],
      bodyGe: ['ჩვენ ვინარჩუნებთ უსაფრთხო არხებს მტკიცებულების წარდგენისთვის. თქვენი უსაფრთხოება ჩვენი პრიორიტეტია.'],
      bullets: ['Encrypted submission portal', 'Anonymized intake process', 'Secure document handling', 'Witness protection coordination'],
      bulletsGe: ['დაშიფრული წარდგენის პორტალი', 'ანონიმიზებული მიღების პროცესი', 'უსაფრთხო დოკუმენტების დამუშავება', 'მოწმეთა დაცვის კოორდინაცია'],
      links: [
        { label: 'Submit Evidence', labelGe: 'მტკიცებულების წარდგენა', href: '/appeal/submit-petition' },
        { label: 'Safety Protocols', labelGe: 'უსაფრთხოების პროტოკოლები', href: '/safety' }
      ]
    },
    {
      id: 'partners',
      heading: 'International Partners',
      headingGe: 'საერთაშორისო პარტნიორები',
      body: ['IIM-Georgia coordinates with established international accountability mechanisms and investigative bodies.'],
      bodyGe: ['IIM-საქართველო კოორდინაციას უწევს დამკვიდრებულ საერთაშორისო ანგარიშვალდებულების მექანიზმებსა და საგამოძიებო ორგანოებს.'],
      links: [
        { label: 'International Pathways', labelGe: 'საერთაშორისო გზები', href: '/remedy/international-pathways' },
        { label: 'Methodology', labelGe: 'მეთოდოლოგია', href: '/methodology' }
      ]
    }
  ]
};
