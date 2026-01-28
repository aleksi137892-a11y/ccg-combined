type LocalizedText = {
  en: string;
  ge: string;
};

export type MapJurisdiction = {
  id: string;
  countryName: string;
  name: LocalizedText;
  mechanism: LocalizedText;
};

export type MapDataset = {
  jurisdictions: MapJurisdiction[];
};

const t = (text: string): LocalizedText => ({ en: text, ge: text });

const EU_MEMBER_STATES: MapJurisdiction[] = [
  { id: "eu-austria", countryName: "Austria", name: t("Austria"), mechanism: t("EU Global Human Rights Sanctions Regime") },
  { id: "eu-belgium", countryName: "Belgium", name: t("Belgium"), mechanism: t("EU Global Human Rights Sanctions Regime") },
  { id: "eu-bulgaria", countryName: "Bulgaria", name: t("Bulgaria"), mechanism: t("EU Global Human Rights Sanctions Regime") },
  { id: "eu-croatia", countryName: "Croatia", name: t("Croatia"), mechanism: t("EU Global Human Rights Sanctions Regime") },
  { id: "eu-cyprus", countryName: "Cyprus", name: t("Cyprus"), mechanism: t("EU Global Human Rights Sanctions Regime") },
  { id: "eu-czechia", countryName: "Czechia", name: t("Czechia"), mechanism: t("EU Global Human Rights Sanctions Regime") },
  { id: "eu-denmark", countryName: "Denmark", name: t("Denmark"), mechanism: t("EU Global Human Rights Sanctions Regime") },
  { id: "eu-estonia", countryName: "Estonia", name: t("Estonia"), mechanism: t("EU Global Human Rights Sanctions Regime") },
  { id: "eu-finland", countryName: "Finland", name: t("Finland"), mechanism: t("EU Global Human Rights Sanctions Regime") },
  { id: "eu-france", countryName: "France", name: t("France"), mechanism: t("EU Global Human Rights Sanctions Regime") },
  { id: "eu-germany", countryName: "Germany", name: t("Germany"), mechanism: t("EU Global Human Rights Sanctions Regime") },
  { id: "eu-greece", countryName: "Greece", name: t("Greece"), mechanism: t("EU Global Human Rights Sanctions Regime") },
  { id: "eu-hungary", countryName: "Hungary", name: t("Hungary"), mechanism: t("EU Global Human Rights Sanctions Regime") },
  { id: "eu-ireland", countryName: "Ireland", name: t("Ireland"), mechanism: t("EU Global Human Rights Sanctions Regime") },
  { id: "eu-italy", countryName: "Italy", name: t("Italy"), mechanism: t("EU Global Human Rights Sanctions Regime") },
  { id: "eu-latvia", countryName: "Latvia", name: t("Latvia"), mechanism: t("EU Global Human Rights Sanctions Regime") },
  { id: "eu-lithuania", countryName: "Lithuania", name: t("Lithuania"), mechanism: t("EU Global Human Rights Sanctions Regime") },
  { id: "eu-luxembourg", countryName: "Luxembourg", name: t("Luxembourg"), mechanism: t("EU Global Human Rights Sanctions Regime") },
  { id: "eu-malta", countryName: "Malta", name: t("Malta"), mechanism: t("EU Global Human Rights Sanctions Regime") },
  { id: "eu-netherlands", countryName: "Netherlands", name: t("Netherlands"), mechanism: t("EU Global Human Rights Sanctions Regime") },
  { id: "eu-poland", countryName: "Poland", name: t("Poland"), mechanism: t("EU Global Human Rights Sanctions Regime") },
  { id: "eu-portugal", countryName: "Portugal", name: t("Portugal"), mechanism: t("EU Global Human Rights Sanctions Regime") },
  { id: "eu-romania", countryName: "Romania", name: t("Romania"), mechanism: t("EU Global Human Rights Sanctions Regime") },
  { id: "eu-slovakia", countryName: "Slovakia", name: t("Slovakia"), mechanism: t("EU Global Human Rights Sanctions Regime") },
  { id: "eu-slovenia", countryName: "Slovenia", name: t("Slovenia"), mechanism: t("EU Global Human Rights Sanctions Regime") },
  { id: "eu-spain", countryName: "Spain", name: t("Spain"), mechanism: t("EU Global Human Rights Sanctions Regime") },
  { id: "eu-sweden", countryName: "Sweden", name: t("Sweden"), mechanism: t("EU Global Human Rights Sanctions Regime") }
];

export const sanctionsMapData: MapDataset = {
  jurisdictions: [
    {
      id: "us",
      countryName: "United States of America",
      name: t("United States"),
      mechanism: t("OFAC — Global Magnitsky Act")
    },
    {
      id: "uk",
      countryName: "United Kingdom",
      name: t("United Kingdom"),
      mechanism: t("UK Global Human Rights Sanctions Regulations")
    },
    ...EU_MEMBER_STATES,
    {
      id: "ca",
      countryName: "Canada",
      name: t("Canada"),
      mechanism: t("Justice for Victims of Corrupt Foreign Officials Act")
    },
    {
      id: "au",
      countryName: "Australia",
      name: t("Australia"),
      mechanism: t("Autonomous Sanctions Regulations")
    },
    {
      id: "ch",
      countryName: "Switzerland",
      name: t("Switzerland"),
      mechanism: t("Embargo Act (Sanctions Ordinances)")
    },
    {
      id: "no",
      countryName: "Norway",
      name: t("Norway"),
      mechanism: t("Norwegian sanctions regulations")
    },
    {
      id: "jp",
      countryName: "Japan",
      name: t("Japan"),
      mechanism: t("Foreign Exchange and Foreign Trade Act")
    }
  ]
};

export const universalJurisdictionMapData: MapDataset = {
  jurisdictions: [
    {
      id: "de",
      countryName: "Germany",
      name: t("Germany"),
      mechanism: t("VStGB (Code of Crimes against International Law)")
    },
    {
      id: "fr",
      countryName: "France",
      name: t("France"),
      mechanism: t("Pôle crimes against humanity")
    },
    {
      id: "es",
      countryName: "Spain",
      name: t("Spain"),
      mechanism: t("Audiencia Nacional universal jurisdiction")
    },
    {
      id: "be",
      countryName: "Belgium",
      name: t("Belgium"),
      mechanism: t("Universal jurisdiction provisions")
    },
    {
      id: "nl",
      countryName: "Netherlands",
      name: t("Netherlands"),
      mechanism: t("International Crimes Act")
    },
    {
      id: "se",
      countryName: "Sweden",
      name: t("Sweden"),
      mechanism: t("International Crimes Unit")
    },
    {
      id: "ch",
      countryName: "Switzerland",
      name: t("Switzerland"),
      mechanism: t("Office of the Attorney General")
    },
    {
      id: "us",
      countryName: "United States of America",
      name: t("United States"),
      mechanism: t("Federal universal jurisdiction statutes")
    }
  ]
};
