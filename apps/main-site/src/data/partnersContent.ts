import type { InstitutionalContent } from '@/types/institutional';

export const partnersContent: InstitutionalContent = {
  meta: {
    title: 'International Pathways',
    titleGe: 'საერთაშორისო გზები',
    lastUpdated: 'January 2026',
    lastUpdatedGe: 'იანვარი 2026',
    intro: 'Resources and guidance on international accountability mechanisms. This page provides informational context, not legal advice.',
    introGe: 'რესურსები და სახელმძღვანელო საერთაშორისო ანგარიშვალდებულების მექანიზმების შესახებ. ეს გვერდი უზრუნველყოფს ინფორმაციულ კონტექსტს, არა იურიდიულ რჩევას.',
  },
  jumpToItems: [
    { id: 'icc', label: 'ICC', labelGe: 'საერთაშორისო სისხლის სამართლის სასამართლო' },
    { id: 'echr', label: 'ECHR', labelGe: 'ადამიანის უფლებათა ევროპული სასამართლო' },
    { id: 'magnitsky', label: 'Magnitsky', labelGe: 'მაგნიტსკი' },
    { id: 'universal', label: 'Universal Jurisdiction', labelGe: 'უნივერსალური იურისდიქცია' },
    { id: 'boundaries', label: 'Boundaries', labelGe: 'საზღვრები' },
  ],
  sections: [
    {
      id: 'icc',
      heading: 'International Criminal Court',
      headingGe: 'საერთაშორისო სისხლის სამართლის სასამართლო',
      body: [
        'The International Criminal Court (ICC) in The Hague has jurisdiction over genocide, crimes against humanity, war crimes, and the crime of aggression. Georgia is a state party to the Rome Statute.',
        'The ICC operates on the principle of complementarity—it acts only when national courts are unwilling or unable to genuinely prosecute. Documentation supporting ICC referrals must meet the court\'s evidentiary standards.',
      ],
      bodyGe: [
        'საერთაშორისო სისხლის სამართლის სასამართლოს (ICC) ჰააგაში აქვს იურისდიქცია გენოციდზე, კაცობრიობის წინააღმდეგ ჩადენილ დანაშაულებზე, ომის დანაშაულებზე და აგრესიის დანაშაულზე. საქართველო არის რომის სტატუტის მონაწილე სახელმწიფო.',
        'ICC მოქმედებს კომპლემენტარულობის პრინციპით—ის მოქმედებს მხოლოდ მაშინ, როდესაც ეროვნული სასამართლოები არ სურთ ან არ შეუძლიათ რეალურად სისხლისსამართლებრივი დევნა. ICC-ზე მიმართვის მხარდამჭერი დოკუმენტაცია უნდა აკმაყოფილებდეს სასამართლოს მტკიცებულებით სტანდარტებს.',
      ],
    },
    {
      id: 'echr',
      heading: 'European Court of Human Rights',
      headingGe: 'ადამიანის უფლებათა ევროპული სასამართლო',
      body: [
        'The European Court of Human Rights (ECtHR) in Strasbourg adjudicates claims under the European Convention on Human Rights. Georgia has been a Council of Europe member since 1999.',
        'Applications to the ECtHR require exhaustion of domestic remedies. The Court has issued significant judgments concerning Georgia, including on electoral rights, judicial independence, and conditions of detention.',
      ],
      bodyGe: [
        'ადამიანის უფლებათა ევროპული სასამართლო (ECtHR) სტრასბურგში განიხილავს პრეტენზიებს ადამიანის უფლებათა ევროპული კონვენციის ფარგლებში. საქართველო ევროპის საბჭოს წევრია 1999 წლიდან.',
        'ECtHR-ზე განაცხადები მოითხოვს ეროვნული საშუალებების ამოწურვას. სასამართლომ გამოიტანა მნიშვნელოვანი გადაწყვეტილებები საქართველოსთან დაკავშირებით, მათ შორის საარჩევნო უფლებებზე, სასამართლო დამოუკიდებლობაზე და დაკავების პირობებზე.',
      ],
    },
    {
      id: 'magnitsky',
      heading: 'Global Magnitsky Mechanisms',
      headingGe: 'გლობალური მაგნიტსკის მექანიზმები',
      body: [
        'Global Magnitsky-style sanctions allow governments to impose targeted measures—asset freezes, visa bans—on individuals responsible for human rights abuses or significant corruption. Multiple jurisdictions maintain such regimes.',
        'These sanctions do not require criminal conviction. They are executive measures based on credible evidence of misconduct. Designations are typically based on documented patterns of abuse or corruption.',
      ],
      bodyGe: [
        'გლობალური მაგნიტსკის სტილის სანქციები მთავრობებს საშუალებას აძლევს დააწესონ მიზნობრივი ზომები—აქტივების გაყინვა, სავიზო აკრძალვები—ადამიანის უფლებათა დარღვევებზე ან მნიშვნელოვან კორუფციაზე პასუხისმგებელ პირებზე.',
        'ეს სანქციები არ საჭიროებს სისხლისსამართლებრივ მსჯავრდებას. ეს არის აღმასრულებელი ზომები, დაფუძნებული არასწორი ქცევის სანდო მტკიცებულებაზე.',
      ],
      bullets: [
        'United States: Global Magnitsky Act',
        'European Union: EU Global Human Rights Sanctions Regime',
        'United Kingdom: Global Anti-Corruption Sanctions',
        'Canada: Justice for Victims of Corrupt Foreign Officials Act',
      ],
      bulletsGe: [
        'შეერთებული შტატები: გლობალური მაგნიტსკის აქტი',
        'ევროკავშირი: EU გლობალური ადამიანის უფლებათა სანქციების რეჟიმი',
        'გაერთიანებული სამეფო: გლობალური ანტიკორუფციული სანქციები',
        'კანადა: კორუმპირებული უცხოელი თანამდებობის პირების მსხვერპლთა სამართლიანობის აქტი',
      ],
    },
    {
      id: 'universal',
      heading: 'Universal Jurisdiction',
      headingGe: 'უნივერსალური იურისდიქცია',
      body: [
        'Universal jurisdiction allows domestic courts in certain countries to prosecute grave international crimes—torture, war crimes, crimes against humanity—regardless of where they occurred or the nationality of perpetrator or victim.',
        'This pathway is narrow and complex. It requires the accused to be present in the prosecuting state, and prosecutors must determine that the offense qualifies under domestic implementing legislation.',
      ],
      bodyGe: [
        'უნივერსალური იურისდიქცია საშუალებას აძლევს გარკვეული ქვეყნების შიდა სასამართლოებს სისხლისსამართლებრივად დაედევნონ მძიმე საერთაშორისო დანაშაულებს—წამება, ომის დანაშაულები, კაცობრიობის წინააღმდეგ ჩადენილი დანაშაულები—მიუხედავად იმისა, სად მოხდა ან დამნაშავის ან მსხვერპლის მოქალაქეობისა.',
        'ეს გზა ვიწროა და რთული. ის მოითხოვს ბრალდებულის ყოფნას მდევნელ სახელმწიფოში და პროკურორებმა უნდა დაადგინონ, რომ დანაშაული კვალიფიცირდება შიდა განმახორციელებელი კანონმდებლობით.',
      ],
    },
    {
      id: 'boundaries',
      heading: 'What We Do Not Do',
      headingGe: 'რას არ ვაკეთებთ',
      body: [
        'This page provides informational context about international accountability mechanisms. It is not legal advice. We do not represent individuals in international proceedings, and we do not guarantee outcomes.',
        'The Forum for Justice documents, preserves, and routes—it does not litigate. Individuals seeking legal representation should consult qualified counsel in the relevant jurisdiction.',
      ],
      bodyGe: [
        'ეს გვერდი უზრუნველყოფს ინფორმაციულ კონტექსტს საერთაშორისო ანგარიშვალდებულების მექანიზმების შესახებ. ეს არ არის იურიდიული რჩევა. ჩვენ არ წარმოვადგენთ ინდივიდებს საერთაშორისო წარმოებებში და არ გარანტირებთ შედეგებს.',
        'სამართლიანობის ფორუმი ადასტურებს, ინახავს და მიმართავს—ის არ აწარმოებს სამართალწარმოებას. იურიდიული წარმომადგენლობის მსურველმა პირებმა უნდა მიმართონ კვალიფიციურ იურიდიულ მრჩევლებს შესაბამის იურისდიქციაში.',
      ],
    },
  ],
};
