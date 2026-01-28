// Mission Content - Core institutional declaration
// The verbatim text is the authoritative statement of purpose

export const missionContent = {
  meta: {
    title: "Mission",
    titleGe: "მისია",
    subtitle: "Declaration of Purpose",
    subtitleGe: "მიზნის დეკლარაცია",
    lastUpdated: "January 2026",
    lastUpdatedGe: "იანვარი 2026"
  },
  declaration: {
    text: "The Civic Council of Georgia serves as the custodian of the Republic's legal and moral obligations. Founded on the Doctrine of Civic Necessity, we intervene where the captured state has abdicated its duty to protect the citizen. We do not seek power; we assume the burden of accountability. We record the truth of state capture, enforce the price of complicity, and secure the inalienable right to remedy for every victim of the regime.",
    textGe: "საქართველოს სამოქალაქო საბჭო წარმოადგენს რესპუბლიკის სამართლებრივი და მორალური ვალდებულებების მცველს. დაფუძნებული სამოქალაქო აუცილებლობის დოქტრინაზე, ჩვენ ვერევით იქ, სადაც ხელყოფილმა სახელმწიფომ უარი თქვა მოქალაქის დაცვის მოვალეობაზე. ჩვენ არ ვეძებთ ძალაუფლებას; ჩვენ ვიღებთ ანგარიშვალდებულების ტვირთს. ჩვენ ვაფიქსირებთ სახელმწიფოს ხელში ჩაგდების სიმართლეს, ვაწესებთ თანამონაწილეობის ფასს და ვუზრუნველყოფთ რეჟიმის ყოველი მსხვერპლის განუსხვისებელ უფლებას გამოსწორებაზე."
  },
  pillars: [
    {
      id: 'custodianship',
      title: 'Custodianship',
      titleGe: 'მეურვეობა',
      description: 'Guardians of the Republic\'s legal and moral obligations',
      descriptionGe: 'რესპუბლიკის სამართლებრივი და მორალური ვალდებულებების მცველები'
    },
    {
      id: 'intervention',
      title: 'Intervention',
      titleGe: 'ჩარევა',
      description: 'Acting where the captured state has abdicated its duty',
      descriptionGe: 'მოქმედება იქ, სადაც ხელყოფილმა სახელმწიფომ უარი თქვა მოვალეობაზე'
    },
    {
      id: 'accountability',
      title: 'Accountability',
      titleGe: 'ანგარიშვალდებულება',
      description: 'Recording truth and enforcing the price of complicity',
      descriptionGe: 'სიმართლის ფიქსირება და თანამონაწილეობის ფასის დაწესება'
    },
    {
      id: 'remedy',
      title: 'Remedy',
      titleGe: 'გამოსწორება',
      description: 'Securing the inalienable right to remedy for every victim',
      descriptionGe: 'ყოველი მსხვერპლის განუსხვისებელი უფლების უზრუნველყოფა'
    }
  ],
  doctrineReference: {
    label: 'Doctrine of Civic Necessity',
    labelGe: 'სამოქალაქო აუცილებლობის დოქტრინა',
    href: '/about/civic-necessity'
  },
  relatedLinks: [
    { label: 'Right to Remedy', labelGe: 'გამოსწორების უფლება', href: '/about/right-to-remedy' },
    { label: 'Read the Mandate', labelGe: 'წაიკითხეთ მანდატი', href: '/mandate' },
    { label: 'View the Charter', labelGe: 'ნახეთ ქარტია', href: '/charter' },
    { label: 'About the Council', labelGe: 'საბჭოს შესახებ', href: '/about' },
    { label: 'Forum for Justice', labelGe: 'სამართლის ფორუმი', href: '/justice' }
  ]
};

export type MissionContent = typeof missionContent;
