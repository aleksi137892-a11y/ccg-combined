import { useState, useMemo, useEffect, useCallback } from "react";
// Force refresh - cache bust
import { useLanguage } from "@/contexts/LanguageContext";
import { RegistryCard } from "@/components/registry/RegistryCard";
import { RegistryDetailPage } from "@/components/registry/RegistryDetailPage";
import { PhotoHealthCheck } from "@/components/registry/PhotoHealthCheck";
import { BulkPhotoUpload } from "@/components/registry/BulkPhotoUpload";
import { BrokenPhotoFixer } from "@/components/registry/BrokenPhotoFixer";
import { BatchPhotoImport } from "@/components/registry/BatchPhotoImport";
import { QuickPhotoMigration } from "@/components/registry/QuickPhotoMigration";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Activity, Upload, Wrench, RefreshCw, Images } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RegistryEntry } from "@/types/registry";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";


// Registry data - Georgian officials from the Complicit and Silent categories
const registryEntries: RegistryEntry[] = [
  // === THE APEX: INFORMAL OLIGARCHY ===
  {
    id: "1",
    name: "Bidzina Ivanishvili",
    position: "Honorary Chairman, Georgian Dream",
    organization: "Georgian Dream Party",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Bidzina_Ivanishvili_official_photo.jpg/440px-Bidzina_Ivanishvili_official_photo.jpg",
    complicity: {
      nature: "Architect of State Capture & Authoritarian Consolidation",
      severity: "high",
      details:
        "The sovereign decision-maker at the summit of Georgia's power structure. Every significant act of repression, legislative restriction, and foreign policy pivot flows from his strategic imperative to maintain power and align Georgia with Russian geopolitical interests. Personal wealth estimated at a quarter of Georgia's GDP, providing disproportionate leverage over the state's economic and political life.",
    },
    dateAdded: "2024-10-26",
    sanctions: ["US State Department Designation", "US Treasury Sanctions", "UK Sanctions", "Baltic States Sanctions", "Ukraine Sanctions", "Czech Republic Sanctions"],
    sources: [
      { title: "JAM-news: Western sanctions against Georgian Dream", url: "https://jam-news.net/for-first-time-in-georgias-history-government-is-under-western-sanctions-jamnews-compiles-sanctions-from-2023-to-present/" },
      { title: "TI Georgia: Sanctions List", url: "https://transparency.ge/en/blog/individuals-sanctioned-or-recommended-sanctions-various-countries-context-georgia" },
      { title: "Civil.ge: Baltic States Sanctions", url: "https://civil.ge/archives/666721" },
    ],
  },
  {
    id: "2",
    name: "Irakli Kobakhidze",
    position: "Prime Minister",
    organization: "Government of Georgia",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Irakli_Kobakhidze_%282018%29.jpg/440px-Irakli_Kobakhidze_%282018%29.jpg",
    complicity: {
      nature: "Ideological Vanguard & Anti-Western Propaganda",
      severity: "high",
      details:
        "Primary articulator of the anti-Western 'Global War Party' conspiracy theory. Utilized his office to provide pseudo-legal and moral justifications for the crackdown on civil society. Oversaw the implementation of the 'Russian Law' and the purging of the civil service, framing the opposition as 'stateless' enemies to legitimize their repression.",
    },
    dateAdded: "2024-05-28",
    sanctions: ["US Visa Restrictions", "Estonia Sanctions", "Lithuania Sanctions", "Ukraine Sanctions"],
    sources: [
      { title: "JAM-news: Western sanctions against Georgian Dream", url: "https://jam-news.net/for-first-time-in-georgias-history-government-is-under-western-sanctions-jamnews-compiles-sanctions-from-2023-to-present/" },
      { title: "Civil.ge: Baltic States Expand Sanctions", url: "https://civil.ge/archives/666721" },
    ],
  },
  {
    id: "3",
    name: "Kakha Kaladze",
    position: "Mayor of Tbilisi & Secretary-General",
    organization: "Georgian Dream Party",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Kakha_Kaladze_2012.jpg/440px-Kakha_Kaladze_2012.jpg",
    complicity: {
      nature: "Election Manipulation & Illicit Financing",
      severity: "high",
      details:
        "Deeply involved in the 'loyalty-points economy.' Implicated in controlling residential construction permits in the capital, allegedly restricting them to favored companies like Archi Construction to ensure a steady stream of illicit financing for the party. At the heart of the party's election manipulation strategies, including mobilization of administrative resources.",
    },
    dateAdded: "2024-10-26",
    sanctions: ["Lithuania Sanctions", "Ukraine Sanctions"],
    sources: [
      { title: "JAM-news: Western sanctions against Georgian Dream", url: "https://jam-news.net/for-first-time-in-georgias-history-government-is-under-western-sanctions-jamnews-compiles-sanctions-from-2023-to-present/" },
      { title: "TI Georgia: Alleged Cases of High-Level Corruption", url: "https://transparency.ge/en/blog/alleged-cases-high-level-corruption-periodically-updated-list" },
    ],
  },
  // === THE ENFORCERS ===
  {
    id: "4",
    name: "Vakhtang Gomelauri",
    position: "Minister of Internal Affairs & Vice Prime Minister",
    organization: "Ministry of Internal Affairs",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Minister_of_Internal_Affairs_of_Georgia%2C_Vakhtang_Gomelauri_on_Police_day.jpg/440px-Minister_of_Internal_Affairs_of_Georgia%2C_Vakhtang_Gomelauri_on_Police_day.jpg",
    complicity: {
      nature: "Brutal Crackdowns & Serious Human Rights Abuses",
      severity: "high",
      details:
        "Bears direct responsibility for brutal crackdowns on pro-European protests. Under his command, police deployed water cannons, tear gas, and allegedly toxic chemical agents against peaceful demonstrators. Designated by the U.S. Department of State for serious human rights abuses. Added to Magnitsky List December 2024. Promoted to Vice Prime Minister after sanctions were imposed. Awarded state 'Order of Merit' by Georgian Dream.",
    },
    dateAdded: "2024-12-01",
    sanctions: ["US Magnitsky List", "UK Sanctions", "Baltic States Sanctions", "Ukraine Sanctions"],
    sources: [
      { title: "US Treasury: Sanctions on Georgian MIA Officials", url: "https://home.treasury.gov/news/press-releases/jy2759" },
      { title: "JAM-news: Western sanctions against Georgian Dream", url: "https://jam-news.net/for-first-time-in-georgias-history-government-is-under-western-sanctions-jamnews-compiles-sanctions-from-2023-to-present/" },
      { title: "UK Gov: Sanctions on Georgia", url: "https://www.gov.uk/government/news/uk-sanctions-georgian-officials-for-violence-against-peaceful-protesters" },
      { title: "Wikipedia: Vakhtang Gomelauri", url: "https://en.wikipedia.org/wiki/Vakhtang_Gomelauri" },
    ],
  },
  {
    id: "5",
    name: "Zviad Kharazishvili",
    position: "Director, Special Tasks Department",
    organization: "Ministry of Internal Affairs",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Zviad_Kharazishvili.jpg/440px-Zviad_Kharazishvili.jpg",
    complicity: {
      nature: "Brutal Beatings & Punitive Squad Operations",
      severity: "high",
      details:
        "Field commander of repression. Sanctioned by the U.S. Treasury and the UK for overseeing brutal beatings of political opponents and journalists. Utilizes 'punitive squads' that target specific activists in a manner reminiscent of Russian OMON operations. Known by alias 'Khareba.' Added to Magnitsky List September 2024.",
    },
    dateAdded: "2024-12-01",
    sanctions: ["US Magnitsky List", "UK Sanctions", "Baltic States Sanctions"],
    sources: [
      { title: "US Treasury: September 2024 Sanctions", url: "https://home.treasury.gov/news/press-releases/jy2580" },
      { title: "JAM-news: Western sanctions against Georgian Dream", url: "https://jam-news.net/for-first-time-in-georgias-history-government-is-under-western-sanctions-jamnews-compiles-sanctions-from-2023-to-present/" },
      { title: "UK Gov: Sanctions on Georgia", url: "https://www.gov.uk/government/news/uk-sanctions-georgian-officials-for-violence-against-peaceful-protesters" },
    ],
  },
  {
    id: "6",
    name: "Mamuka Mdinaradze",
    position: "Head of State Security Service (since September 2025)",
    organization: "State Security Service of Georgia",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Mamuka_Mdinaradze.jpg/440px-Mamuka_Mdinaradze.jpg",
    complicity: {
      nature: "Political Enforcement & Intelligence Weaponization",
      severity: "high",
      details:
        "Moved from parliamentary majority leader, where he shepherded the 'Russian Law,' to head the State Security Service in September 2025. Represents the fusion of political enforcement and intelligence. Signals a shift toward a more aggressive, politically driven intelligence apparatus focused on internal enemies rather than external threats. Previously served as Executive Secretary of Georgian Dream.",
    },
    dateAdded: "2024-12-15",
    sanctions: ["Lithuania Sanctions", "Estonia Sanctions", "Ukraine Sanctions"],
    sources: [
      { title: "Civil.ge: Mdinaradze Appointed Security Chief", url: "https://civil.ge/archives/699056" },
      { title: "Georgia Today: Mdinaradze appointed head of State Security", url: "https://georgiatoday.ge/mamuka-mdinaradze-appointed-head-of-georgias-state-security/" },
      { title: "Wikipedia: Mamuka Mdinaradze", url: "https://en.wikipedia.org/wiki/Mamuka_Mdinaradze" },
    ],
  },
  // === THE JUDICIAL CLAN ===
  {
    id: "7",
    name: "Levan Murusidze",
    position: "Judge, High Council of Justice",
    organization: "Georgian Judiciary",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Levan_Murusidze.jpg/440px-Levan_Murusidze.jpg",
    complicity: {
      nature: "Judicial Capture & Significant Corruption",
      severity: "high",
      details:
        "Architect of the captured judicial system. Sanctioned by the U.S. and UK for significant corruption. As life-tenured judge and leader of the High Council of Justice, manages the assignment of sensitive political cases to compliant judges, effectively capturing the third branch of government. First judge sanctioned by U.S. in April 2023.",
    },
    dateAdded: "2024-06-01",
    sanctions: ["US Visa Sanctions", "UK Sanctions", "Lithuania Sanctions", "Ukraine Sanctions"],
    sources: [
      { title: "JAM-news: April 2023 Judicial Sanctions", url: "https://jam-news.net/for-first-time-in-georgias-history-government-is-under-western-sanctions-jamnews-compiles-sanctions-from-2023-to-present/" },
      { title: "US State Department: Designations of Georgian Judges", url: "https://ge.usembassy.gov/public-designations-of-four-individuals-associated-with-the-georgian-judiciary-due-to-involvement-in-significant-corruption/" },
    ],
  },
  {
    id: "8",
    name: "Mikheil Chinchaladze",
    position: "Chairman, Tbilisi Court of Appeals",
    organization: "Georgian Judiciary",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Mikheil_Chinchaladze.jpg/440px-Mikheil_Chinchaladze.jpg",
    complicity: {
      nature: "Judicial Capture & Political Case Management",
      severity: "high",
      details:
        "Co-architect of the captured judicial system alongside Levan Murusidze. Sanctioned by the U.S. for significant corruption in April 2023. Controls the assignment of politically sensitive cases within the Court of Appeals, ensuring verdicts align with ruling party interests.",
    },
    dateAdded: "2024-06-01",
    sanctions: ["US Visa Sanctions", "Lithuania Sanctions", "Ukraine Sanctions"],
    sources: [
      { title: "JAM-news: April 2023 Judicial Sanctions", url: "https://jam-news.net/for-first-time-in-georgias-history-government-is-under-western-sanctions-jamnews-compiles-sanctions-from-2023-to-present/" },
      { title: "US State Department: Designations of Georgian Judges", url: "https://ge.usembassy.gov/public-designations-of-four-individuals-associated-with-the-georgian-judiciary-due-to-involvement-in-significant-corruption/" },
    ],
  },
  {
    id: "9",
    name: "Tamar Mchedlishvili",
    position: "Judge",
    organization: "Tbilisi City Court",
    photo: "https://civil.ge/wp-content/uploads/2025/10/Tamar-Mchedlishvili-780x470.jpg",
    complicity: {
      nature: "Political Persecution Through Detention Orders",
      severity: "high",
      details:
        "Presided over the detention of students and activists, including Irakli Miminoshvili, Zviad Tsetskhladze, Nikoloz Javakhishvili, and Tornike Goshadze. Consistently imposed pre-trial detention despite lack of evidence. Appears repeatedly in cases involving high-profile political prisoners. Sentenced former Defense Minister Irakli Okruashvili to 8 months in prison for refusing to appear before the Tsulukiani Commission.",
    },
    dateAdded: "2024-12-01",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Civil.ge: Okruashvili Sentenced to 8 Months", url: "https://civil.ge/archives/690111" },
      { title: "Georgia Today: Opposition politician sentenced", url: "https://georgiatoday.ge/opposition-politician-irakli-okruashvili-sentenced-to-8-months-in-prison/" },
      { title: "OC Media: Judge Mchedlishvili acquits protester of drug charges", url: "https://oc-media.org/georgian-court-acquits-protester-of-drug-charges/" },
    ],
  },
  {
    id: "10",
    name: "Nino Galustashvili",
    position: "Judge",
    organization: "Tbilisi City Court",
    photo: "https://static.court.ge/Uploads/Justice_ecbbebd8-db72-4f18-bb9f-e0d26f645852.jpeg",
    complicity: {
      nature: "Politically Motivated Sentencing",
      severity: "high",
      details:
        "Sentenced Russian activists Anastasia Zinovkina and Artem Gribul to 8.5 years in prison on dubious drug charges. Imposed detention on actor Andro Chichinadze and comedian Onise Tskhadadze. Preferred instrument for the regime's legal repression of high-profile cases.",
    },
    dateAdded: "2024-12-01",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Human Rights Center: Politically Motivated Cases", url: "https://www.hrc.ge/465/eng/" },
      { title: "Civil.ge: Political Cases Monitoring", url: "https://civil.ge/archives/political-prisoners" },
    ],
  },
  // === LEGISLATIVE RUBBER STAMP ===
  {
    id: "11",
    name: "Shalva Papuashvili",
    position: "Speaker of Parliament",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/7110/avatar.jpg",
    complicity: {
      nature: "Legislative Legitimation of Authoritarianism",
      severity: "high",
      details:
        "Aggressive defender of the 'Foreign Agents Law.' Uses his platform to attack Western diplomats and civil society. Led the parliamentary effort to override the Presidential veto. Central figure in transforming Parliament from deliberative body to mechanism for legalizing authoritarianism.",
    },
    dateAdded: "2024-05-28",
    sanctions: ["US Visa Restrictions"],
    sources: [
      { title: "Civil.ge: Parliament Overrides Presidential Veto", url: "https://civil.ge/archives/605627" },
      { title: "JAM-news: Violence during Foreign Agents Law adoption", url: "https://jam-news.net/beatings-of-activists-and-violence-in-georgia/" },
    ],
  },
  {
    id: "12",
    name: "Sozar Subari",
    position: "MP, People's Power Faction",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/4485/avatar.jpg",
    complicity: {
      nature: "Radical Anti-Western Rhetoric & Repressive Legislation",
      severity: "high",
      details:
        "Member of the 'People's Power' faction that formally split from Georgian Dream to voice radical anti-Western rhetoric before reintegrating for elections. Served as 'attack dog' of the regime, introducing the most repressive legislative concepts. One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "13",
    name: "Mikheil Kavelashvili",
    position: "President of Georgia (Installed)",
    organization: "Office of the President",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Mikheil_Kavelashvili_official_portrait_%28cropped%29.jpg/440px-Mikheil_Kavelashvili_official_portrait_%28cropped%29.jpg",
    complicity: {
      nature: "Illegitimate Installation, Homophobic Rhetoric & Democratic Dismantlement",
      severity: "high",
      details:
        "Former Manchester City footballer turned far-right politician. Installed as President in December 2024 through a controlled electoral college—a move that effectively dismantled the last independent institution of the executive branch. Known for 'expletive-laden parliament speeches and tirades against government critics,' promotes 'Global War Party' conspiracy theory. Described by multiple international outlets as 'homophobic' and pro-Russian. Called 'the epitome of the Georgian man' by Ivanishvili. His installation formalized Georgia's pivot to consolidated autocracy.",
    },
    dateAdded: "2024-12-14",
    sanctions: ["Non-Recognition by Western Partners", "Lithuania Sanctions", "Estonia Sanctions"],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
      { title: "The Guardian: Georgia's far-right president Mikheil Kavelashvili", url: "https://www.theguardian.com/world/2024/dec/29/georgia-new-president-mikheil-kavelashvili-inauguration" },
      { title: "BBC: Georgia inaugurates new president amid protests", url: "https://www.bbc.com/news/world-europe-64123456" },
    ],
  },
  // === ECONOMIC FACILITATORS ===
  {
    id: "14",
    name: "Natia Turnava",
    position: "Member of the Board, National Bank of Georgia",
    organization: "National Bank of Georgia",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/NatelaTurnava.jpg/440px-NatelaTurnava.jpg",
    complicity: {
      nature: "Sanctions Evasion & Financial System Decoupling",
      severity: "high",
      details:
        "Fundamentally altered the bank's regulations to protect sanctioned Georgian citizens (specifically Otar Partskhaladze) from international financial restrictions. Effectively decoupled the Georgian banking system from automatic enforcement of Western sanctions—a move described as 'treasonous' by the opposition.",
    },
    dateAdded: "2024-11-01",
    sanctions: ["Under Investigation"],
    sources: [
      { title: "TI Georgia: Otar Partskhaladze Sanctions Evasion", url: "https://transparency.ge/en/post/why-us-has-imposed-sanctions-otar-partskhaladze-who-has-been-untouchable-georgian-authorities" },
      { title: "Wikipedia: Natia Turnava", url: "https://en.wikipedia.org/wiki/Natela_Turnava" },
    ],
  },
  // === THE SILENT CLASS ===
  {
    id: "15",
    name: "Lasha Khutsishvili",
    position: "Minister of Finance",
    organization: "Ministry of Finance of Georgia",
    photo: "https://cdn.mof.ge/photos/minister/lasha_khutsishvili.jpg",
    complicity: {
      nature: "Fiscal Enablement of Repressive Machinery",
      severity: "medium",
      details:
        "While not a primary target of sanctions, his ministry manages the fiscal apparatus that funds the repressive machinery. Focus remains on macroeconomic stability and revenue collection, providing the fiscal runway for the government to weather Western aid cuts. Enables regime through technocratic competence.",
    },
    dateAdded: "2024-12-01",
    sanctions: [],
  },
  {
    id: "16",
    name: "Tamar Tkeshelashvili",
    position: "First Deputy Justice Minister",
    organization: "Ministry of Justice",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Implementation of Repressive Laws",
      severity: "medium",
      details:
        "While her superiors push the 'Foreign Agent' registry, she manages the administrative implementation. Claimed that compliance 'does not cause harm,' effectively gaslighting civil society regarding the law's intent. Normalizes regime operations through continued service.",
    },
    dateAdded: "2024-12-01",
    sanctions: [],
  },
  {
    id: "17",
    name: "Vaja Todua",
    position: "Prosecutor",
    organization: "Prosecutor's Office of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Specialized Political Prosecution",
      severity: "high",
      details:
        "Consistently appears as the prosecutor in politically motivated cases against protesters. Indicates a specialized role within the Prosecutor's Office for suppressing dissent. Partner in the coordinated nature of prosecution against student activists and opposition party members.",
    },
    dateAdded: "2024-12-01",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Human Rights Center: Politically Motivated Cases", url: "https://www.hrc.ge/465/eng/" },
    ],
  },
  {
    id: "18",
    name: "Giorgi Mukbaniani",
    position: "Prosecutor",
    organization: "Prosecutor's Office of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Coordinated Political Prosecution",
      severity: "high",
      details:
        "Partner prosecutor in cases against student activists and opposition party members. Appears across multiple unrelated political cases, indicating centralized prosecutorial strategy against dissent. Reinforces the coordinated nature of the prosecution.",
    },
    dateAdded: "2024-12-01",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Human Rights Center: Politically Motivated Cases", url: "https://www.hrc.ge/465/eng/" },
    ],
  },
  {
    id: "19",
    name: "Irakli Gharibashvili",
    position: "Former Prime Minister & Party Chairman (Retired from Politics 2025)",
    organization: "Georgian Dream Party (Former)",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Irakli_Garibashvili_%282021%29.jpg/440px-Irakli_Garibashvili_%282021%29.jpg",
    complicity: {
      nature: "Surveillance State Architecture & Tough Governance",
      severity: "high",
      details:
        "His tenure established the 'tough governance' style that normalized the use of surveillance against opponents. Left Georgian Dream and retired from politics in 2025 after serving twice as both Prime Minister and Party Chairman. During his tenure, he oversaw the early stages of authoritarian consolidation.",
    },
    dateAdded: "2024-10-26",
    sanctions: ["US Visa Restrictions", "Ukraine Sanctions", "EU Parliament Resolution Cited"],
    sources: [
      { title: "Georgia Today: Garibashvili leaves Georgian Dream, retires from politics", url: "https://georgiatoday.ge/ex-pm-garibashvili-leaves-georgian-dream-retires-from-politics/" },
      { title: "Wikipedia: Irakli Garibashvili", url: "https://en.wikipedia.org/wiki/Irakli_Garibashvili" },
    ],
  },
  {
    id: "20",
    name: "Grigol Liluashvili",
    position: "Minister of Regional Development (Former State Security Chief)",
    organization: "Government of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5666/avatar.jpg",
    complicity: {
      nature: "Surveillance Infrastructure & Illicit Revenue",
      severity: "high",
      details:
        "Played a pivotal role in establishing the infrastructure of surveillance that underpins the current regime. Linked to 'call center' schemes generating illicit revenue and illegal wiretapping of opposition leaders. Laid the groundwork for the surveillance state.",
    },
    dateAdded: "2024-10-01",
    sanctions: ["Under Investigation"],
  },
  // === ADDITIONAL MPs - FOREIGN AGENTS LAW VOTERS ===
  {
    id: "21",
    name: "Anri Okhanashvili",
    position: "National Security Advisor to the Prime Minister (Former State Security Service Head)",
    organization: "Office of the Prime Minister",
    photo: "https://web-api.parliament.ge/storage/s/persons/7134/avatar.jpg",
    complicity: {
      nature: "Legislative Architect of Foreign Agents Law & Intelligence Leadership",
      severity: "high",
      details:
        "As Chairman of the Legal Issues Committee, played a central role in drafting and shepherding the Foreign Agents Law through parliament. Subsequently appointed Head of State Security Service in 2025, but resigned after just five months. Now serves as Prime Minister's National Security Advisor. One of 84 MPs who voted to override Presidential veto.",
    },
    dateAdded: "2024-05-28",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
      { title: "BM.ge: Okhanashvili resigns as Security Service Chief", url: "https://bm.ge/en/news/anri-okhanashvili-resigns-as-security-service-chief-becomes-pms-national-security-advisor" },
    ],
  },
  {
    id: "22",
    name: "Dimitri Khundadze",
    position: "MP, People's Power Faction",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/2276/avatar.jpg",
    complicity: {
      nature: "Radical Anti-Western Rhetoric & Legislative Support",
      severity: "high",
      details:
        "Member of 'People's Power' faction known for radical anti-Western statements. One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Actively promoted conspiracy theories about Western 'interference' in Georgian affairs.",
    },
    dateAdded: "2024-05-28",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "23",
    name: "Guram Macharashvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5671/avatar.jpg",
    complicity: {
      nature: "Legislative Enabler of Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Active participant in parliamentary sessions that restricted civil liberties and targeted opposition voices.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "24",
    name: "Irakli Zarkua",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/7133/avatar.jpg",
    complicity: {
      nature: "Legislative Support for Repressive Measures",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Consistently voted in favor of legislation restricting civil society and independent media.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "25",
    name: "Nikoloz Samkharadze",
    position: "MP, Chairman of Foreign Relations Committee",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5939/avatar.jpg",
    complicity: {
      nature: "Diplomatic Sabotage & Anti-Western Alignment",
      severity: "high",
      details:
        "As Chairman of Foreign Relations Committee, actively worked to undermine Georgia's Euro-Atlantic integration. One of 84 MPs who voted to override Presidential veto. Used his position to legitimize anti-Western foreign policy shifts.",
    },
    dateAdded: "2024-05-28",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "26",
    name: "Davit Matikashvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5850/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity in Democratic Backsliding",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Participated in attacks on opposition MPs and civil society representatives during parliamentary debates.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "27",
    name: "Levan Koberidze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/7118/avatar.jpg",
    complicity: {
      nature: "Consistent Support for Authoritarian Legislation",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Voted in favor of anti-LGBTQ legislation and other discriminatory measures. Reliable rubber-stamp for regime initiatives.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "28",
    name: "Beka Odisharia",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/2135/avatar.jpg",
    complicity: {
      nature: "Legislative Enabler of Repression",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Actively participated in parliamentary procedures designed to silence opposition voices and rush through repressive legislation.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "29",
    name: "Gia Volski",
    position: "MP, First Vice-Speaker",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/2456/avatar.jpg",
    complicity: {
      nature: "Parliamentary Procedure Manipulation",
      severity: "high",
      details:
        "As First Vice-Speaker, helped manage parliamentary procedures to expedite passage of Foreign Agents Law. One of 84 MPs who voted to override Presidential veto. Key figure in transforming Parliament into a rubber-stamp institution.",
    },
    dateAdded: "2024-05-28",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "30",
    name: "Archil Talakvadze",
    position: "MP, Former Speaker of Parliament",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5648/avatar.jpg",
    complicity: {
      nature: "Institutional Degradation of Parliament",
      severity: "high",
      details:
        "As former Speaker, oversaw the initial degradation of parliamentary norms. One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Continued to support all authoritarian legislative initiatives.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "31",
    name: "Irakli Kadagishvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5123/avatar.jpg",
    complicity: {
      nature: "Legislative Support for Anti-Democratic Measures",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Consistently aligned with party leadership on all votes restricting civil liberties and targeting opposition.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "32",
    name: "Mikheil Sarjveladze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5677/avatar.jpg",
    complicity: {
      nature: "Complicity in Authoritarian Consolidation",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Part of the parliamentary majority that enabled the regime's authoritarian consolidation through legislative action.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "33",
    name: "Giorgi Kakauridze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5669/avatar.jpg",
    complicity: {
      nature: "Legislative Rubber-Stamp",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Reliable vote for all regime-sponsored legislation regardless of its impact on democratic institutions and civil liberties.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "34",
    name: "Shalva Kereselidze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/7128/avatar.jpg",
    complicity: {
      nature: "Support for Repressive Legislation",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Voted for anti-LGBTQ 'family values' legislation and other discriminatory measures targeting minorities.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "35",
    name: "Irakli Beraia",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5642/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Part of the unified bloc that enabled the passage of all authoritarian legislation without meaningful dissent.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "36",
    name: "Vakhtang Goguadze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5673/avatar.jpg",
    complicity: {
      nature: "Enabling Authoritarian Legislation",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Consistently voted with the majority on all measures restricting press freedom and civil society.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "37",
    name: "Kakha Kuchava",
    position: "MP, Former Speaker of Parliament",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5663/avatar.jpg",
    complicity: {
      nature: "Institutional Capture of Parliament",
      severity: "high",
      details:
        "As former Speaker, presided over key sessions that advanced authoritarian legislation. One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Facilitated the transformation of Parliament into a tool of autocratic rule.",
    },
    dateAdded: "2024-05-28",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "38",
    name: "Maia Bitadze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/278/avatar.jpg",
    complicity: {
      nature: "Legislative Support for Anti-Democratic Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Actively defended the law in public statements and media appearances, providing political cover for the regime.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "39",
    name: "Davit Songulashvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5658/avatar.jpg",
    complicity: {
      nature: "Complicity in Democratic Erosion",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Part of the parliamentary machinery that systematically dismantled Georgia's democratic institutions.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "40",
    name: "Nino Tsilosani",
    position: "MP, Georgian Dream, Deputy Speaker",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5694/avatar.jpg",
    complicity: {
      nature: "Legislative Enabler",
      severity: "high",
      details:
        "Deputy Speaker of Parliament. One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Provided reliable support for all regime initiatives targeting civil society and independent media.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "41",
    name: "Giorgi Mosidze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5655/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "42",
    name: "Zviad Kvachantiradze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5647/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "43",
    name: "Giorgi Shagidze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5638/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "44",
    name: "Zaza Papuashvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5670/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "45",
    name: "Erosi Kitsmarishvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5640/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "46",
    name: "Gia Benashvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5635/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "47",
    name: "Enzel Mkoiani",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5654/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "48",
    name: "Badri Japaridze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5680/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "49",
    name: "Sulkhan Sulkhanishvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5644/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "50",
    name: "Giorgi Chikovani",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5639/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "51",
    name: "Gocha Enukidze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/2110/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "52",
    name: "Viktor Japaridze",
    position: "MP, Georgian Dream & Owner of POSTV",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/1991/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity & Propaganda",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Owner of POSTV propaganda outlet. Sanctioned by Estonia and Lithuania.",
    },
    dateAdded: "2024-05-28",
    sanctions: ["Estonia Sanctions", "Lithuania Sanctions"],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "53",
    name: "Nodar Turdzeladze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/7125/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "54",
    name: "Giorgi Kakhiani",
    position: "MP, Georgian Dream, Deputy Speaker",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/2564/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "Deputy Speaker of Parliament. One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "55",
    name: "Roman Kakulia",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5641/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "56",
    name: "Ramaz Nikolaishvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5656/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "57",
    name: "Anzor Bolkvadze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/2431/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "58",
    name: "Irakli Chikovani",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5685/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "59",
    name: "Lado Kakhadze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/6783/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "60",
    name: "Zaza Lominadze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/7120/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "61",
    name: "Mamuka Akhvlediani",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5688/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "62",
    name: "Paata Manjgaladze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5645/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "63",
    name: "Nino Latsabidze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5660/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "64",
    name: "Eka Sepashvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/7097/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "65",
    name: "Davit Kasradze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5650/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "66",
    name: "Mariam Kvrivishvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5681/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "67",
    name: "Salome Kandashvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5661/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "68",
    name: "Levan Mgaloblishvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5684/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "69",
    name: "Mikheil Daushvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5649/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "70",
    name: "Beka Liluashvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5667/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "71",
    name: "Giorgi Gogichaishvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5651/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "72",
    name: "Kakha Kemoklidze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5665/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "73",
    name: "Irakli Shatakishvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/7681/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "74",
    name: "Zaza Gabunia",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/8446/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "75",
    name: "Elguja Gotsiridze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5652/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "76",
    name: "Aluda Ghudushauri",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/7102/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "77",
    name: "Fridon Injia",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5653/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "78",
    name: "Shalva Natelashvili",
    position: "MP, Labor Party",
    organization: "Parliament of Georgia",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Presidential_candidate_Shalva_Natelashvili_%28Labor_Party_of_Georgia%29_%2831705405498%29_%28cropped%29.jpg/440px-Presidential_candidate_Shalva_Natelashvili_%28Labor_Party_of_Georgia%29_%2831705405498%29_%28cropped%29.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Despite leading an ostensibly opposition party, aligned with Georgian Dream on this critical vote.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "79",
    name: "Davit Zilpimiani",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5695/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "80",
    name: "Aleksandre Tsuladze",
    position: "Former Minister of Education (2024-2025)",
    organization: "Ministry of Education (Former)",
    photo: "https://i0.wp.com/civil.ge/wp-content/uploads/2024/10/Aleksandre-Tsuladze.jpg?w=800",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "81",
    name: "Givi Mikanadze",
    position: "Minister of Education (Former MP)",
    organization: "Ministry of Education of Georgia",
    photo: "https://info.parliament.ge/hr/image/1/colleague/6476",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "82",
    name: "Teimuraz Todradze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5696/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "83",
    name: "Zurab Chichinadze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5697/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law.",
    },
    dateAdded: "2024-05-28",
    sanctions: [],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
    ],
  },
  {
    id: "84",
    name: "Gela Samkharauli",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/2051/avatar.jpg",
    complicity: {
      nature: "Legislative Complicity",
      severity: "high",
      details: "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Sanctioned by Lithuania and Estonia for undermining democratic institutions.",
    },
    dateAdded: "2024-05-28",
    sanctions: ["Lithuania Sanctions", "Estonia Sanctions"],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
    ],
  },
  // === THE IVANISHVILI FAMILY ===
  {
    id: "85",
    name: "Ekaterine Khvedelidze",
    position: "Wife of Bidzina Ivanishvili",
    organization: "Ivanishvili Family",
    photo: "https://jamestown.org/wp-content/uploads/2012/01/Bidzina_Ivanishvili_and_his_wife__Ekaterine_Khvedelidze_-_EDM_January_24__2012.jpg",
    complicity: {
      nature: "Beneficiary of State Capture & Political Enabler",
      severity: "high",
      details:
        "Spouse of Bidzina Ivanishvili. Publicly entered politics in 2012 to support Georgian Dream's rise to power. As co-beneficiary of the family's estimated $5 billion fortune—much of which stems from opaque dealings during the post-Soviet period—she benefits directly from the regime's protection of family assets and the evasion of international scrutiny.",
    },
    dateAdded: "2024-12-01",
    sanctions: ["Under Review"],
  },
  {
    id: "86",
    name: "Bera Ivanishvili",
    position: "Son of Bidzina Ivanishvili, Rapper & Media Owner",
    organization: "Ivanishvili Family / GDS Records",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Bera_Ivanishvili.jpg/440px-Bera_Ivanishvili.jpg",
    complicity: {
      nature: "Media Influence, Threatening Behavior & Dynasty Beneficiary",
      severity: "high",
      details:
        "Son of Bidzina Ivanishvili. Founded GDS Records and has leveraged family wealth for entertainment ventures. Secret recordings leaked by OCCRP in 2023 revealed him plotting with then-PM Gharibashvili to exact revenge against a schoolboy who criticized him on Facebook—discussing ways to punish the child. Described as 'unrepentant about threatening his offenders.' Controls media platforms that serve as soft propaganda outlets for the regime.",
    },
    dateAdded: "2024-12-01",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "OCCRP: Secret recordings of Bera Ivanishvili", url: "https://www.occrp.org/en/investigations/leaked-recordings-reveal-georgian-ruling-partys-murky-ties-to-a-fugitive-judge" },
      { title: "Civil.ge: Bera Ivanishvili recordings", url: "https://civil.ge/" },
      { title: "JAM News: Ivanishvili family recordings scandal", url: "https://jam-news.net/" },
    ],
  },
  {
    id: "87",
    name: "Uta Ivanishvili",
    position: "Son of Bidzina Ivanishvili",
    organization: "Ivanishvili Family",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Dynasty Beneficiary",
      severity: "medium",
      details:
        "Son of Bidzina Ivanishvili. Beneficiary of the family fortune accumulated through Georgia's state capture. The Ivanishvili family's wealth, estimated at a quarter of Georgia's GDP, provides them with extraordinary leverage over the country's economic and political life.",
    },
    dateAdded: "2024-12-01",
    sanctions: [],
  },
  {
    id: "88",
    name: "Gvantsa Ivanishvili",
    position: "Daughter of Bidzina Ivanishvili",
    organization: "Ivanishvili Family",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Dynasty Beneficiary",
      severity: "medium",
      details:
        "Daughter of Bidzina Ivanishvili. Beneficiary of the family fortune derived from Georgia's state capture. Family members bear responsibility for the regime's actions given their direct benefit from its continuation.",
    },
    dateAdded: "2024-12-01",
    sanctions: [],
  },
  // === ALT-INFO / FAR-RIGHT PROPAGANDISTS ===
  {
    id: "89",
    name: "Konstantine Morgoshia",
    position: "Co-founder, Alt-Info / Conservative Movement",
    organization: "Alt-Info",
    photo: "https://mythdetector.com/wp-content/uploads/2018/12/ko-1.png",
    complicity: {
      nature: "July 5 Violence Organizer & Hate Speech Incitement",
      severity: "high",
      details:
        "Co-founder of Alt-Info, Georgia's most prominent pro-Russian far-right platform. Led organization of the July 5, 2021 anti-LGBTQ violence that attacked 53 journalists and forced Pride march cancellation. TV Pirveli cameraman Aleksandre Lashkarava, beaten in the attacks, died six days later. None of the Alt-Info organizers were ever prosecuted despite Georgian Ombudsman's formal request. US Treasury sanctioned September 2024 for 'advocating for violent attacks against marginalized persons.'",
    },
    dateAdded: "2024-09-01",
    sanctions: ["US Treasury OFAC (Global Magnitsky)", "Lithuania Sanctions", "Estonia Sanctions"],
    sources: [
      { title: "US Treasury: Alt-Info Sanctions", url: "https://home.treasury.gov/news/press-releases/jy2609" },
      { title: "OC Media: Twenty far-right activists convicted", url: "https://oc-media.org/twenty-far-right-activists-convicted-over-5-july-attack-on-journalists/" },
      { title: "CPJ: Georgia convicts 26 over 2021 attack", url: "https://cpj.org/2022/04/georgia-convicts-26-people-over-2021-attack-on-journalists-by-anti-lgbt-protesters/" },
      { title: "Heinrich Böll Stiftung: How Anti-LGBTQ Ideas Help Georgian Dream", url: "https://www.boell.de/en/2025/04/17/how-anti-lgbtq-ideas-help-georgian-dream-consolidate-power" },
    ],
  },
  {
    id: "90",
    name: "Zurab Makharadze",
    position: "Co-founder, Alt-Info / Conservative Movement; Tbilisi Mayoral Candidate",
    organization: "Alt-Info / Conservative Movement",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Zura_Makharadze_2024.png/440px-Zura_Makharadze_2024.png",
    complicity: {
      nature: "Organizer of July 5, 2021 Violence & Disinformation",
      severity: "high",
      details:
        "Co-founder of Alt-Info. Georgian Ombudsman Nino Lomjaria formally requested prosecution for organizing the July 5, 2021 anti-LGBTQ violence that attacked 53 journalists and forced cancellation of Tbilisi Pride. Video evidence shows him directing group violence and leading break-ins at Tbilisi Pride and Shame Movement offices. US Treasury sanctioned September 2024 for spreading Kremlin disinformation and advocating violent attacks. Made multiple trips to Moscow. Running for Tbilisi Mayor despite sanctions.",
    },
    dateAdded: "2024-09-01",
    sanctions: ["US Treasury OFAC (Global Magnitsky)", "Lithuania Sanctions", "Estonia Sanctions"],
    sources: [
      { title: "US Treasury: Alt-Info Sanctions", url: "https://home.treasury.gov/news/press-releases/jy2609" },
      { title: "DF Watch: Ombudsman names Makharadze as organizer", url: "https://dfwatch.net/georgian-ombudsman-names-priest-blogger-as-organizers-of-july-5-anti-lgbtq-rally-and-calls-for-their-prosecution-54836" },
      { title: "Civil.ge: Public Defender Demands Prosecutions", url: "https://civil.ge/archives/438904" },
      { title: "CPJ: Georgia convicts 26 over 2021 attack", url: "https://cpj.org/2022/04/georgia-convicts-26-people-over-2021-attack-on-journalists-by-anti-lgbt-protesters/" },
    ],
  },
  {
    id: "91",
    name: "Shota Martinenko",
    position: "Co-founder, Alt-Info",
    organization: "Alt-Info",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Logo_of_the_Conservative_Movement_%28Georgia%29.svg/440px-Logo_of_the_Conservative_Movement_%28Georgia%29.svg.png",
    complicity: {
      nature: "Far-Right Media & Anti-Democratic Agitation",
      severity: "high",
      details:
        "Co-founder of Alt-Info. Key figure in the Conservative Movement political party. Instrumental in organizing violent mobs against Pride events and opposition gatherings.",
    },
    dateAdded: "2024-09-01",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "AP News: Georgia's anti-LGBTQ measures raise fears of hate crimes", url: "https://www.ap.org/news-highlights/spotlights/2024/georgias-anti-lgbtq-measures-raise-fears-of-hate-crimes-in-the-conservative-south-caucasus-nation/" },
    ],
  },
  // === PRO-GOVERNMENT MEDIA / PROPAGANDISTS ===
  {
    id: "92",
    name: "Irakli Rukhadze",
    position: "Owner, Imedi TV",
    organization: "Imedi Media Holding",
    photo: "https://cdn.lb.ge/libertybank/52/13/cfnWo1y2-Umb2PV0P0fFEA/%E1%83%98%E1%83%A0%E1%83%90%E1%83%99%E1%83%9A%E1%83%98-%E1%83%A0%E1%83%A3%E1%83%AE%E1%83%90%E1%83%AB%E1%83%94.png",
    complicity: {
      nature: "Propaganda Platform Ownership",
      severity: "high",
      details:
        "Owner of Imedi TV, Georgia's most-watched television channel and the ruling party's primary propaganda megaphone. Stated publicly the channel will remain 'on Ivanishvili's side' and would never criticize Georgian Dream. Former employees describe the channel as a 'machine of evil' producing harmful propaganda.",
    },
    dateAdded: "2024-12-01",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "OC Media: Ex-TV Imedi employees on working for Georgian Dream's spin machine", url: "https://oc-media.org/a-cog-in-the-machine-of-evil-ex-tv-imedi-employees-on-working-for-georgian-dreams-spin-machine/" },
      { title: "Eurasianet: The West needs to take a hard look at Georgian Dream's propaganda operation", url: "https://eurasianet.org/opinion-the-west-needs-to-take-a-hard-look-at-georgian-dreams-propaganda-operation" },
      { title: "Respublica: Imedi TV - The propaganda megaphone undermining Georgia's EU aspirations", url: "https://en.respublica.lt/imedi-tv-the-propaganda-megaphone-undermining-georgia-s-eu-aspirations" },
    ],
  },
  {
    id: "93",
    name: "Inga Grigolia",
    position: "Journalist & Host, Imedi TV",
    organization: "Imedi TV",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Inga_Grigolia.jpg/440px-Inga_Grigolia.jpg",
    complicity: {
      nature: "Pro-Government Propaganda Dissemination",
      severity: "medium",
      details:
        "Senior journalist at Imedi TV who conducts interviews favorable to the ruling party while attacking opposition figures. Part of the editorial team that transforms government talking points into broadcast content without journalistic scrutiny.",
    },
    dateAdded: "2024-12-01",
    sanctions: [],
    sources: [
      { title: "OC Media: Ex-TV Imedi employees on propaganda", url: "https://oc-media.org/a-cog-in-the-machine-of-evil-ex-tv-imedi-employees-on-working-for-georgian-dreams-spin-machine/" },
    ],
  },
  {
    id: "94",
    name: "Giorgi Gabunia",
    position: "Former Host, Imedi TV",
    organization: "Imedi TV",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Giorgi_Gabunia_%28cropped%29.jpg/440px-Giorgi_Gabunia_%28cropped%29.jpg",
    complicity: {
      nature: "Propaganda Platform Participation",
      severity: "medium",
      details:
        "TV presenter who worked at Imedi TV during its transformation into a government propaganda outlet. The channel has been used to accuse independent media of being agents of foreign intelligence services.",
    },
    dateAdded: "2024-12-01",
    sanctions: [],
    sources: [
      { title: "Civil.ge: Imedi's Conspiracy Report Targets Online Media", url: "https://civil.ge/archives/711864" },
    ],
  },
  // === BUSINESS OLIGARCHS & DONORS ===
  {
    id: "95",
    name: "Levan Vasadze",
    position: "Ultranationalist Businessman / Far-Right Leader",
    organization: "Unity, Essence, Hope / ERI Movement",
    photo: "https://i0.wp.com/civil.ge/wp-content/uploads/2021/05/Levan-Vasadze-scaled.jpg?w=800",
    complicity: {
      nature: "July 5 Violence Incitement & Far-Right Financing",
      severity: "high",
      details:
        "Wealthy businessman and leader of far-right movements. On June 15, 2021, warned government to cancel Pride or people would 'not allow' it—threatening violence in advance. His ERI movement helped organize the July 5 counter-protest that attacked 53 journalists and resulted in Lashkarava's death. After the attack, accused US Ambassador Kelly Degnan of being responsible for Lashkarava's death. Consolidating Georgia's extreme right with Georgian Dream's tacit support. In September 2025, announced candidacy for Tbilisi Mayor.",
    },
    dateAdded: "2024-12-01",
    sanctions: ["UK Sanctions", "US Sanctions", "Lithuania Sanctions", "Estonia Sanctions"],
    sources: [
      { title: "Civil.ge: Right-wing Vasadze urges gov't to cancel Pride", url: "https://agenda.ge/en/news/2021/1617" },
      { title: "Wikipedia: 2021 attack on Tbilisi Pride", url: "https://en.wikipedia.org/wiki/2021_attack_on_Tbilisi_Pride" },
      { title: "UK Gov: UK Sanctions Partskhaladze and Vasadze", url: "https://www.gov.uk/government/news/uk-sanctions-georgia-linked-supporters-of-putins-illegal-war-in-ukraine" },
      { title: "OC Media: Vasadze announces bid for Tbilisi Mayor", url: "https://oc-media.org/us-sanctioned-ultra-right-pro-russian-leader-announces-bid-for-tbilisi-mayor/" },
    ],
  },
  {
    id: "96",
    name: "Otar Partskhaladze",
    position: "Former Prosecutor General",
    organization: "Businessman",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Aleksandre_Chikaidze_and_Otar_Partskhaladze._2013.jpg/440px-Aleksandre_Chikaidze_and_Otar_Partskhaladze._2013.jpg",
    complicity: {
      nature: "Corruption & Sanctions Evasion",
      severity: "high",
      details:
        "Former Prosecutor General sanctioned by the U.S. and UK for significant corruption. The National Bank of Georgia specifically changed regulations to protect him from international sanctions enforcement—a move described as 'treasonous' by the opposition.",
    },
    dateAdded: "2024-06-01",
    sanctions: ["US Sanctions", "UK Sanctions"],
    sources: [
      { title: "TI-Georgia: Alleged Cases of High-Level Corruption", url: "https://transparency.ge/en/blog/alleged-cases-high-level-corruption-periodically-updated-list" },
      { title: "UK Gov: UK Sanctions Partskhaladze", url: "https://www.gov.uk/government/news/uk-sanctions-georgia-linked-supporters-of-putins-illegal-war-in-ukraine" },
      { title: "Wikipedia: Otar Partskhaladze", url: "https://en.wikipedia.org/wiki/Otar_Partskhaladze" },
    ],
  },
  // === GEORGIAN ORTHODOX CHURCH ===
  {
    id: "98",
    name: "Metropolitan Shio Mujiri",
    position: "Patriarchal Locum Tenens",
    organization: "Georgian Orthodox Church",
    photo: "https://oc-media.org/app/uploads/2019/12/%E1%83%A8%E1%83%98%E1%83%9D-484x650.jpg",
    complicity: {
      nature: "Church-State Alignment & Anti-Western Rhetoric",
      severity: "high",
      details:
        "Senior figure in the Georgian Orthodox Church hierarchy, serving as co-regent to Patriarch Ilia II. The Church has increasingly aligned with the government's anti-Western stance, with clergy participating in anti-EU demonstrations. Supporter of the Demographic Revival Fund run by Levan Vasadze. The Church issued official statement against 2021 Pride Week, calling it 'propaganda of non-traditional way of life.'",
    },
    dateAdded: "2024-12-01",
    sanctions: [],
    sources: [
      { title: "TI Georgia: Anatomy of Georgian Neo-Nazism - Vasadze connections", url: "https://transparency.ge/en/blog/anatomy-georgian-neo-nazism" },
      { title: "Carnegie: Orthodox Church in Georgian Society", url: "https://carnegieendowment.org/research/2021/07/the-orthodox-church-in-georgias-changing-society" },
      { title: "Wikipedia: 2021 attack on Tbilisi Pride", url: "https://en.wikipedia.org/wiki/2021_attack_on_Tbilisi_Pride" },
    ],
  },
  {
    id: "99",
    name: "Father Spiridon Tskipurishvili",
    position: "Archpriest / Pride Attack Organizer",
    organization: "Georgian Orthodox Church",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Organizer of July 5, 2021 Violence & Incitement",
      severity: "high",
      details:
        "Georgian Ombudsman Nino Lomjaria formally requested his prosecution for organizing the July 5, 2021 anti-LGBTQ violence. Video footage shows him openly calling on counter-rally participants to 'use violence for the homeland.' Led clergy contingent in the mob that attacked 53 journalists and broke into Tbilisi Pride and Shame Movement offices. Summoned for police questioning July 16, 2021 but released without charges. Church later reprimanded him but no state prosecution was ever brought despite the Ombudsman's recommendation.",
    },
    dateAdded: "2024-12-01",
    sanctions: [],
    sources: [
      { title: "DF Watch: Ombudsman names priest as organizer", url: "https://dfwatch.net/georgian-ombudsman-names-priest-blogger-as-organizers-of-july-5-anti-lgbtq-rally-and-calls-for-their-prosecution-54836" },
      { title: "Civil.ge: Public Defender Demands Prosecutions", url: "https://civil.ge/archives/438904" },
      { title: "CPJ: Georgia convicts 26 over 2021 attack", url: "https://cpj.org/2022/04/georgia-convicts-26-people-over-2021-attack-on-journalists-by-anti-lgbt-protesters/" },
      { title: "Wikipedia: 2021 attack on Tbilisi Pride", url: "https://en.wikipedia.org/wiki/2021_attack_on_Tbilisi_Pride" },
    ],
  },
  {
    id: "100",
    name: "Bishop Jacob (Iakobi) of Bodbe",
    position: "Bishop",
    organization: "Georgian Orthodox Church",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Anti-Western Agitation & Political Clergy",
      severity: "medium",
      details:
        "Bishop who has been vocal in supporting the government's anti-Western pivot and has participated in pro-government demonstrations.",
    },
    dateAdded: "2024-12-01",
    sanctions: [],
    sources: [
      { title: "Civil.ge: Georgian Dream's Oppressive Anti-LGBT Law Comes into Effect", url: "https://civil.ge/archives/640509" },
    ],
  },
  // === FAMILY OF SENIOR OFFICIALS ===
  {
    id: "101",
    name: "Anuki Areshidze",
    position: "Wife of Kakha Kaladze",
    organization: "Kaladze Family",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Anouki_Areshidze_%28cropped%29.jpg/440px-Anouki_Areshidze_%28cropped%29.jpg",
    complicity: {
      nature: "Beneficiary of Corrupt System",
      severity: "medium",
      details:
        "Spouse of Kakha Kaladze, Mayor of Tbilisi and Georgian Dream Secretary-General. Kaladze is implicated in controlling construction permits in the capital to ensure illicit party financing.",
    },
    dateAdded: "2024-12-01",
    sanctions: [],
    sources: [
      { title: "TI-Georgia: Alleged Cases of High-Level Corruption", url: "https://transparency.ge/en/blog/alleged-cases-high-level-corruption-periodically-updated-list" },
    ],
  },
  // === PROSECUTORS & JUDICIAL OFFICIALS ===
  {
    id: "102",
    name: "Giorgi Gabitashvili",
    position: "Former Prosecutor General, Current Auditor General",
    organization: "State Audit Office of Georgia",
    photo: "https://i0.wp.com/civil.ge/wp-content/uploads/2025/06/Gabitashvili-Kavlashvili-780x470.jpg",
    complicity: {
      nature: "Weaponization of Justice System & UK-Sanctioned Official",
      severity: "high",
      details:
        "Served as Prosecutor General overseeing the systematic prosecution of opposition figures, activists, and protesters. Under his leadership, the Prosecutor's Office pursued politically motivated cases against government critics while failing to investigate violence by security forces. Sanctioned by the UK in 2025 for serious human rights abuses. Transferred to Auditor General position after UK sanctions were imposed.",
    },
    dateAdded: "2024-12-01",
    sanctions: ["UK Sanctions"],
    sources: [
      { title: "UK Gov: Sanctions on Georgian Prosecutor General", url: "https://www.gov.uk/government/news/uk-sanctions-georgian-officials-responsible-for-allowing-brutal-police-violence" },
      { title: "Civil.ge: Prosecutor General Gabitashvili Tapped Next Chief Auditor", url: "https://civil.ge/archives/685099" },
      { title: "GYLA: Politically Motivated Cases 2024-2025", url: "https://admin.gyla.ge/uploads_script/publications/pdf/2024-2025%20wlebSi%20politikurad%20motivirebuli%20saqmeebi_eng.pdf" },
    ],
  },
  {
    id: "102b",
    name: "Irakli Shotadze",
    position: "Former Chief Prosecutor",
    organization: "Prosecutor's Office of Georgia",
    photo: "https://i0.wp.com/civil.ge/wp-content/uploads/2020/02/0702iraklishotadze.jpg?w=400",
    complicity: {
      nature: "Institutionalization of Prosecutorial Capture",
      severity: "high",
      details:
        "Previously served as Chief Prosecutor before Gabitashvili. Established the patterns of politically motivated prosecution that his successors continued. Oversaw the early stages of the prosecutorial apparatus being weaponized against civil society and opposition.",
    },
    dateAdded: "2024-12-01",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Civil.ge: Irakli Shotadze Regains Chief Prosecutor's Post", url: "https://civil.ge/archives/339132" },
    ],
  },
  {
    id: "103",
    name: "Giorgi Gvazava",
    position: "Deputy Chief Prosecutor",
    organization: "Prosecutor's Office of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political Prosecution & Selective Justice",
      severity: "high",
      details:
        "Deputy Chief Prosecutor instrumental in coordinating cases against opposition leaders including Nika Gvaramia, Zurab Japaridze, and other political figures. Has overseen prosecutions widely condemned by international observers as politically motivated and violating fair trial standards.",
    },
    dateAdded: "2024-12-01",
    sanctions: [],
    sources: [
      { title: "BBC: Georgia jails six political figures in one week", url: "https://www.bbc.com/news/articles/ckg5x53z7djo" },
      { title: "Reuters: Georgia jails third opposition leader", url: "https://www.reuters.com/world/georgia-jails-third-opposition-leader-crackdown-expands-2025-06-13/" },
    ],
  },
  // === POLICE COMMANDERS ===
  {
    id: "104",
    name: "Grigol Beselia",
    position: "Former Police Chief of Adjara / Promoted Official",
    organization: "Ministry of Internal Affairs",
    photo: "https://civil.ge/wp-content/uploads/2025/04/1-12-e1645435832700-780x452.jpg",
    complicity: {
      nature: "Protest Crackdowns & Police Violence",
      severity: "high",
      details:
        "Sanctioned police official who was subsequently promoted by the Georgian government. Oversaw police operations in Adjara region during anti-government protests. His promotion after international sanctions demonstrates the regime's reward structure for those who carry out repression.",
    },
    dateAdded: "2024-12-01",
    sanctions: ["International Sanctions", "US Designation"],
    sources: [
      { title: "OC Media: Georgia promotes sanctioned police official", url: "https://oc-media.org/georgia-promotes-sanctioned-police-official/" },
      { title: "Civil.ge: Adjara Police Chief Grigol Beselia Resigns", url: "https://civil.ge/archives/674117" },
    ],
  },
  {
    id: "105",
    name: "Teimuraz Kupatadze",
    position: "Deputy Director, Special Tasks Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Violent Dispersal Operations",
      severity: "high",
      details:
        "Deputy commander of the Special Tasks Department (Spetsnaz-like units) responsible for violent crackdowns on protesters in December 2024. Unit members operated without identification badges and used excessive force including rubber bullets, tear gas, and beatings against peaceful demonstrators and journalists.",
    },
    dateAdded: "2024-12-01",
    sanctions: ["Under Investigation"],
    sources: [
      { title: "Amnesty International: Police committing shocking human rights violations", url: "https://www.amnesty.org/en/latest/news/2024/12/georgia-police-committing-shocking-human-rights-violations-amid-ongoing-crackdown-on-protesters/" },
      { title: "CNN: Georgian protesters detail brutal beatings by special forces", url: "https://www.cnn.com/2024/12/06/europe/georgia-protest-tbilisi-police-brutality-intl" },
    ],
  },
  {
    id: "106",
    name: "Giorgi Butkhuzi",
    position: "Deputy Minister of Internal Affairs",
    organization: "Ministry of Internal Affairs",
    photo: "https://civil.ge/wp-content/uploads/2025/01/Kd-780x470.jpg",
    complicity: {
      nature: "Mass Arbitrary Detentions",
      severity: "high",
      details:
        "Patrol Police Chief who oversaw mass arbitrary detentions of protesters in Tbilisi. Under his command, over 400 protesters were detained in December 2024 alone, many held in inhumane conditions and denied access to lawyers. Responsible for coordinating the 'snatch squads' that targeted specific activists.",
    },
    dateAdded: "2024-12-01",
    sanctions: [],
    sources: [
      { title: "Amnesty International: Escalating Repression and Arbitrary Arrests", url: "https://www.amnesty.org/en/documents/eur56/0450/2025/en/" },
      { title: "OMCT: Georgia Unprecedented Police Brutality", url: "https://www.omct.org/en/resources/statements/georgia-unprecedented-police-brutality-requires-firmer-international-response" },
    ],
  },
  {
    id: "107",
    name: "Aleksandre Darakhvelidze",
    position: "Deputy Minister of Internal Affairs",
    organization: "Ministry of Internal Affairs",
    photo: "https://civil.ge/wp-content/uploads/2025/01/Kd-780x470.jpg",
    complicity: {
      nature: "Night Raids & Intimidation Operations",
      severity: "high",
      details:
        "Criminal Police Chief who coordinated heavily militarized night raids on homes of protesters and activists. Operations specifically targeted people in their homes, often in the presence of children, creating maximum psychological trauma. These tactics mirror Russian OMON operations and represent systematic intimidation.",
    },
    dateAdded: "2024-12-01",
    sanctions: [],
    sources: [
      { title: "Amnesty International: Escalating Repression and Arbitrary Arrests", url: "https://www.amnesty.org/en/documents/eur56/0450/2025/en/" },
      { title: "The Guardian: Georgian police fire teargas at pro-EU protesters", url: "https://www.theguardian.com/world/2024/dec/02/georgian-police-fire-teargas-at-pro-eu-protesters-as-political-crisis-deepens" },
    ],
  },
  // === PROSECUTORS HANDLING POLITICAL CASES ===
  {
    id: "108",
    name: "Giorgi Gogashvili",
    position: "Prosecutor, Political Cases Division",
    organization: "Prosecutor's Office of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Prosecution of Political Prisoners",
      severity: "high",
      details:
        "Lead prosecutor in multiple cases against opposition figures including members of Droa, Coalition for Change, and United National Movement. Has pursued charges widely condemned as politically motivated, including 'violence against police' charges against peaceful protesters. Instrumental in the judicial harassment of Nino Datashvili and other activists.",
    },
    dateAdded: "2024-12-01",
    sanctions: [],
    sources: [
      { title: "FIDH: Arbitrary detention of Nino Datashvili", url: "https://www.fidh.org/en/issues/human-rights-defenders/georgia-arbitrary-detention-and-judicial-harassment-of-pro-democracy" },
      { title: "GYLA: Politically Motivated Cases Report", url: "https://admin.gyla.ge/uploads_script/publications/pdf/2024-2025%20wlebSi%20politikurad%20motivirebuli%20saqmeebi_eng.pdf" },
    ],
  },
  {
    id: "109",
    name: "Levan Murusidze",
    position: "Judge, Tbilisi City Court",
    organization: "Judiciary of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Rubber-Stamping Political Detentions",
      severity: "high",
      details:
        "Judge who has consistently approved pre-trial detention for opposition figures and protesters despite lack of evidence. GYLA monitoring identified systematic patterns of judicial bias in his rulings, with near-automatic approval of prosecution requests in protest-related cases. Has denied bail in politically charged cases despite defendants posing no flight risk.",
    },
    dateAdded: "2024-12-01",
    sanctions: ["EU Sanctions Under Review"],
    sources: [
      { title: "Georgia Today: GYLA raises concerns over judicial bias", url: "https://georgiatoday.ge/gyla-raises-concerns-over-judicial-bias-in-activist-cases/" },
      { title: "Human Rights Center: Monitoring Court Proceedings with Political Motives", url: "https://fln.dk/media/4pjd4ei4/geor325.pdf" },
    ],
  },
  {
    id: "110",
    name: "Nino Chakhnashvili",
    position: "Judge, Tbilisi City Court",
    organization: "Judiciary of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Fast-Tracking Political Prosecutions",
      severity: "medium",
      details:
        "Judge involved in expedited processing of cases against protesters and activists. Has approved extended detentions and rejected appeals from those arbitrarily detained during December 2024 protests. Part of the judicial infrastructure enabling political persecution.",
    },
    dateAdded: "2024-12-01",
    sanctions: [],
    sources: [
      { title: "Civil.ge: Repression in Numbers", url: "https://civil.ge/archives/697375" },
    ],
  },
  {
    id: "111",
    name: "Vakhtang Mchedlishvili",
    position: "Prosecutor, Organized Crime Unit",
    organization: "Prosecutor's Office of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Abuse of Organized Crime Statutes",
      severity: "high",
      details:
        "Prosecutor who has applied organized crime and 'group violence' charges to protesters and activists, dramatically escalating penalties for political activity. This prosecutorial strategy mirrors tactics used in Russia and Belarus to transform misdemeanor protest charges into years-long prison sentences.",
    },
    dateAdded: "2024-12-01",
    sanctions: [],
    sources: [
      { title: "PoliticsGeo: Unconstitutional Revenge Commission", url: "https://politicsgeo.com/unconstitutional-revenge-commission-a-stepping-stone-towards-one-party-dictatorship/" },
      { title: "Amnesty International: Crackdown deepens as another opposition politician jailed", url: "https://www.amnesty.org/en/latest/news/2025/06/georgia-crackdown-on-government-critics-deepens-as-another-opposition-politician-is-jailed/" },
    ],
  },
  // === ADDITIONAL IMEDI TV STAFF ===
  {
    id: "112",
    name: "Natia Songhulashvili",
    position: "Head of News Department, Imedi TV",
    organization: "Imedi TV",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Editorial Direction of Government Propaganda",
      severity: "high",
      details:
        "Head of Imedi TV's news department who enforces the channel's pro-government editorial line. Former employees report she personally ensures coverage aligns with Georgian Dream narratives and has forced out journalists who refused to produce propaganda. Stated publicly that 'there is no place at Imedi for those who avoid calling the UNM violent.'",
    },
    dateAdded: "2024-12-01",
    sanctions: [],
    sources: [
      { title: "OC Media: Ex-TV Imedi employees on working for Georgian Dream's spin machine", url: "https://oc-media.org/a-cog-in-the-machine-of-evil-ex-tv-imedi-employees-on-working-for-georgian-dreams-spin-machine/" },
    ],
  },
  {
    id: "113",
    name: "Irakli Chikhladze",
    position: "Host, Imedis Kvira",
    organization: "Imedi TV",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Conspiracy Theories & Targeted Harassment",
      severity: "high",
      details:
        "Host of Imedi's flagship analytical program 'Imedis Kvira' which has accused independent media outlets of operating as 'networks for foreign security services.' His program regularly targets journalists, NGOs, and opposition figures with conspiracy-laden reports designed to delegitimize civil society.",
    },
    dateAdded: "2024-12-01",
    sanctions: [],
    sources: [
      { title: "Civil.ge: Imedi's Conspiracy Report Targets Online Media", url: "https://civil.ge/archives/711864" },
      { title: "OC Media: More than 20 outlets targeted by Georgian pro-government TV exposé", url: "https://oc-media.org/oc-media-among-among-22-outlets-targeted-by-georgian-pro-government-tv-expose/" },
    ],
  },
  {
    id: "114",
    name: "Nino Shubladze",
    position: "Journalist, Imedi TV",
    organization: "Imedi TV",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Disinformation Production",
      severity: "medium",
      details:
        "Imedi TV journalist who participated in producing disinformation content about protests and opposition. The Georgian Charter of Journalistic Ethics has ruled against Imedi journalists for ethical violations in their coverage.",
    },
    dateAdded: "2024-12-01",
    sanctions: [],
    sources: [
      { title: "Civil.ge: Journalist Self-Regulation Body Says Imedi TV Carries Propaganda", url: "https://civil.ge/archives/514682" },
    ],
  },
  // === FAR-RIGHT CELEBRITIES & ATHLETES ===
  {
    id: "115",
    name: "Mikheil Kavelashvili",
    position: "President of Georgia (since Dec 2024)",
    organization: "People's Power / Georgian Dream",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Mikheil_Kavelashvili_official_portrait_%28cropped%29.jpg/440px-Mikheil_Kavelashvili_official_portrait_%28cropped%29.jpg",
    complicity: {
      nature: "Far-Right Politician, Anti-LGBTQ Agitation & Authoritarian Figurehead",
      severity: "high",
      details:
        "Former Manchester City footballer turned far-right politician. Known for expletive-laden parliament speeches, tirades against government critics, and anti-LGBTQ rhetoric. Installed as president in December 2024 in an election process denounced as illegitimate by the sitting president and EU observers. Key figure in Georgian Dream's authoritarian consolidation.",
    },
    dateAdded: "2024-12-29",
    sanctions: ["Under International Review"],
    sources: [
      { title: "New York Times: Far-Right Soccer Star Is Tapped for Presidency", url: "https://www.nytimes.com/2024/12/14/world/europe/georgia-president-election-russia.html" },
      { title: "Al Jazeera: Georgia's governing party taps pro-Russian ex-footballer for president", url: "https://www.aljazeera.com/news/2024/11/27/georgias-governing-party-taps-pro-russian-ex-footballer-for-president" },
      { title: "Kyiv Post: Georgia's Disputed Far-Right President", url: "https://www.kyivpost.com/post/44618" },
    ],
  },
  // === BUSINESS DONORS WITH CORRUPTION TIES ===
  {
    id: "116",
    name: "Giorgi Iashvili",
    position: "Major Georgian Dream Donor",
    organization: "Business / Construction",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Corrupt Political Financing & State Contract Beneficiary",
      severity: "high",
      details:
        "Among the largest donors to Georgian Dream. Transparency International Georgia has documented that companies linked to major GD donors have won state tenders worth over ₾422 million since 2020, raising questions about systemic quid pro quo corruption in political financing.",
    },
    dateAdded: "2024-12-01",
    sanctions: [],
    sources: [
      { title: "Transparency International Georgia: Party Financing Report 2025", url: "https://transparency.ge/en/blog/party-financing-first-half-2025-financial-domination-georgian-dream" },
      { title: "Civil.ge: Georgian Dream Received 73% of All Donations", url: "https://civil.ge/archives/704019" },
    ],
  },
  {
    id: "117",
    name: "Nikoloz Tsutskiridze",
    position: "Major Georgian Dream Donor",
    organization: "Business",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political Financing & Government Contract Beneficiary",
      severity: "medium",
      details:
        "Significant donor to Georgian Dream whose associated companies have received lucrative government contracts. TI Georgia reports that 11 companies linked to GD's 168 donors won state tenders worth ₾143.6 million since 2024 alone, indicating systemic corruption in political financing.",
    },
    dateAdded: "2024-12-01",
    sanctions: [],
    sources: [
      { title: "Transparency International Georgia: GD Donations Report", url: "https://transparency.ge/en/blog/party-financing-first-half-2025-financial-domination-georgian-dream" },
      { title: "Eurasianet: Watchdog blows whistle on suspicious contracting practices", url: "https://eurasianet.org/georgia-watchdog-group-blows-whistle-on-suspicious-georgian-dream-contracting-practices" },
    ],
  },
  {
    id: "118",
    name: "Levan Kareli",
    position: "Construction Magnate & GD Donor",
    organization: "Business / Construction",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Corruption & Political Patronage",
      severity: "high",
      details:
        "Construction industry figure linked to Georgian Dream's network of political financing. Eurasianet documented that friends and relatives of government officials receive sweetheart deals on government contracts, representing systemic corruption.",
    },
    dateAdded: "2024-12-01",
    sanctions: [],
    sources: [
      { title: "Eurasianet: Watchdog group blows whistle on suspicious contracting practices", url: "https://eurasianet.org/georgia-watchdog-group-blows-whistle-on-suspicious-georgian-dream-contracting-practices" },
    ],
  },
  // === PRIDE 2021 VIOLENCE ORGANIZERS ===
  {
    id: "119",
    name: "Guram Palavandishvili",
    position: "Far-Right Activist",
    organization: "Conservative Movement",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Organization of Anti-LGBTQ Violence",
      severity: "high",
      details:
        "Participated in organizing and leading the violent mob that attacked journalists and LGBTQ activists during Tbilisi Pride 2021. At least 53 journalists were attacked, and one cameraman later died from injuries sustained during the violence. Georgian authorities failed to adequately protect demonstrators despite advance warning.",
    },
    dateAdded: "2024-12-01",
    sanctions: [],
    sources: [
      { title: "Amnesty International: Georgia authorities failure to protect Tbilisi Pride", url: "https://www.amnesty.org/en/latest/press-release/2021/07/georgia-the-authorities-failure-to-protect-tbilisi-pride-once-again-encourages-violence/" },
      { title: "CNN: LGBTQ campaigner attacked during Pride march offices", url: "https://www.cnn.com/2021/07/05/europe/lgbt-pride-march-attacked-georgia-intl/index.html" },
    ],
  },
  // === IVANISHVILI FAMILY ===
  {
    id: "120",
    name: "Aleksandre Ivanishvili",
    position: "Son of Bidzina Ivanishvili",
    organization: "Ivanishvili Family",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Dynasty Beneficiary & Wealth Inheritance",
      severity: "high",
      details:
        "Son of Bidzina Ivanishvili who benefits from the family's estimated $5 billion fortune derived from Russian business connections. The Ivanishvili family's wealth, estimated at a quarter of Georgia's GDP, creates an inherent conflict of interest with Georgia's democratic development and Euro-Atlantic integration.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "Forbes: Bidzina Ivanishvili Profile", url: "https://www.forbes.com/profile/bidzina-ivanishvili/" },
      { title: "Transparency International: State Capture in Georgia", url: "https://www.transparency.org/en/news/state-capture-in-georgia" },
    ],
  },
  {
    id: "121",
    name: "Tsotne Ivanishvili",
    position: "Son of Bidzina Ivanishvili",
    organization: "Ivanishvili Family",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Dynasty Beneficiary & Wealth Inheritance",
      severity: "high",
      details:
        "Son of Bidzina Ivanishvili, beneficiary of family fortune derived from Russian oligarch connections. The family's disproportionate economic influence over Georgia enables state capture and undermines democratic accountability.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "Forbes: Bidzina Ivanishvili Profile", url: "https://www.forbes.com/profile/bidzina-ivanishvili/" },
    ],
  },
  // === BUSINESS/OLIGARCH FIGURES ===
  {
    id: "122",
    name: "Irakli Gilauri",
    position: "Chairman & CEO, Georgia Capital (Former TBC Bank CEO)",
    organization: "Georgia Capital",
    photo: "https://georgiacapital.ge/sites/default/files/styles/person_photo/public/2018-12/irakli_0.jpg",
    complicity: {
      nature: "Financial Elite Accommodation of Regime",
      severity: "medium",
      details:
        "Former CEO of Bank of Georgia and current Chairman & CEO of Georgia Capital, one of Georgia's largest investment holding companies. Has maintained close business ties with government-connected entities. Has failed to take public stance against democratic backsliding despite leading major financial institutions.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "Georgia Capital Official", url: "https://georgiacapital.ge/governance/board" },
      { title: "Reuters: Georgia banks", url: "https://www.reuters.com/markets/europe/georgian-banks-shares-dive-after-western-sanctions-threat-2024-12-03/" },
    ],
  },
  {
    id: "123",
    name: "Davit Iakobashvili",
    position: "Businessman & Former Wimm-Bill-Dann Co-founder",
    organization: "Business Elite",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Russian Business Connections & Political Influence",
      severity: "medium",
      details:
        "Russian-Georgian billionaire who made his fortune in Russia. Has significant business interests in both countries and represents the cross-border oligarchic class that benefits from Georgian Dream's pro-Russian policies. His economic influence crosses the geopolitical divide Georgia faces.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "Forbes Russia: Davit Iakobashvili", url: "https://www.forbes.com/profile/david-yakobashvili/" },
    ],
  },
  {
    id: "124",
    name: "Viktor Japaridze",
    position: "Businessman",
    organization: "Business Elite",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Oligarchic Business Interests",
      severity: "medium",
      details:
        "Member of the business elite with connections to ruling party interests. Benefits from the economic arrangements maintained by Georgian Dream governance.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "125",
    name: "Aleksandre Japaridze",
    position: "Businessman",
    organization: "Business Elite",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Oligarchic Business Interests",
      severity: "medium",
      details:
        "Member of the business elite benefiting from arrangements with ruling party. Economic interests aligned with regime continuity.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "126",
    name: "Giorgi Japaridze",
    position: "Businessman",
    organization: "Business Elite",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Oligarchic Business Interests",
      severity: "medium",
      details:
        "Member of the business elite with connections to ruling party interests. Economic arrangements benefit from regime stability.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "127",
    name: "Zakhary Kalashov",
    position: "Criminal Authority (Thief-in-Law)",
    organization: "Organized Crime",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Organized Crime & State-Crime Nexus",
      severity: "high",
      details:
        "Known as 'Shakro Molodoy' (Young Shakro), one of the most powerful 'thieves-in-law' in the post-Soviet criminal world. Georgian-born crime boss whose organization has historically had influence in Georgia. The tolerance of organized crime networks by Georgian Dream raises questions about state-crime relationships.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Interpol Red Notice", "Spanish Conviction"],
    sources: [
      { title: "OCCRP: Shakro Kalashov Profile", url: "https://www.occrp.org/en/investigations/the-rise-and-fall-of-shakro-the-young" },
      { title: "El País: Spanish conviction", url: "https://english.elpais.com/elpais/2018/07/04/inenglish/1530691438_649289.html" },
    ],
  },
  {
    id: "128",
    name: "Lasha Shushanashvili",
    position: "Criminal Authority (Thief-in-Law)",
    organization: "Organized Crime",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Organized Crime Leadership",
      severity: "high",
      details:
        "One of the prominent 'thieves-in-law' with Georgian origins. Organized crime networks have historically had influence in Georgian politics and economics. The Georgian Dream government's relationship with such networks remains a subject of investigation.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Under Investigation"],
    sources: [
      { title: "OCCRP: Georgian Organized Crime", url: "https://www.occrp.org/en/daily/3770-georgian-court-sends-thief-in-law-lasha-shushanashvili-to-prison-for-8-5-years" },
    ],
  },
  {
    id: "129",
    name: "Kakaber Shushanashvili",
    position: "Criminal Figure",
    organization: "Organized Crime",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Organized Crime Connections",
      severity: "high",
      details:
        "Connected to Georgian organized crime networks. The intersection of organized crime and political power in Georgia represents a systemic threat to democratic governance.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  // === MEDIA PROPAGANDISTS ===
  {
    id: "130",
    name: "Tina Kandelaki",
    position: "Media Executive (Russia-based)",
    organization: "Russian Media",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/2240520_Gazprom_Day_1_4944_2.jpg/440px-2240520_Gazprom_Day_1_4944_2.jpg",
    complicity: {
      nature: "Pro-Russian Propaganda & Cultural Influence",
      severity: "high",
      details:
        "Georgian-born Russian media executive who has become a vocal supporter of Putin's regime and Russian policies. Uses her platform to promote pro-Russian narratives and undermine Georgian pro-Western orientation. Her trajectory represents the cultural capture of Georgian elites by Russian influence.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "Wikipedia: Tina Kandelaki", url: "https://en.wikipedia.org/wiki/Tina_Kandelaki" },
    ],
  },
  {
    id: "131",
    name: "Goga Khaindrava",
    position: "Former State Minister for Conflict Resolution",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political Opportunism & Shifting Allegiances",
      severity: "medium",
      details:
        "Former official whose political trajectory has involved shifting positions. Has been involved in various political configurations over the years.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "132",
    name: "Mari Meshveliani",
    position: "Television Presenter",
    organization: "Georgian Media",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Media Platform for Regime Narratives",
      severity: "medium",
      details:
        "Media personality who has provided platform for government-aligned narratives. Part of the media ecosystem that amplifies Georgian Dream messaging.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "133",
    name: "Vato Kipiani",
    position: "Journalist",
    organization: "Georgian Media",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Media Coverage Aligned with Regime",
      severity: "medium",
      details:
        "Journalist whose coverage has been aligned with government positions. Part of the media landscape that has accommodated Georgian Dream narratives.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  // === ADDITIONAL PARLIAMENTARIANS - FOREIGN AGENTS LAW VOTERS ===
  {
    id: "134",
    name: "Ivane Chkhartishvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Participated in the legislative dismantling of civil society protections.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "Parliament of Georgia: Foreign Agents Law Vote", url: "https://parliament.ge/" },
    ],
  },
  {
    id: "135",
    name: "Gocha Enukidze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/2110/avatar.jpg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Voted consistently for legislation restricting civil liberties.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "136",
    name: "Tamaz Gaiashvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Supported the full package of repressive legislation.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "137",
    name: "Giorgi Kapanadze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Part of the parliamentary majority that rubber-stamped authoritarian consolidation.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "138",
    name: "Anton Obolashvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Contributed to the legislative assault on civil society.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "139",
    name: "Sulkhan Papashvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Enabled the criminalization of civil society organizations.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "140",
    name: "Tornike Rizhvadze",
    position: "MP, Georgian Dream / Chairman of Adjara Government",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support & Regional Power Consolidation",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Has also served as Chairman of the Adjara Autonomous Republic government, extending Georgian Dream's grip on regional governance.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "141",
    name: "Irakli Rukhadze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Consistent supporter of restrictive legislation.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "142",
    name: "Ilia Tsulaia",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Participated in the parliamentary majority's authoritarian turn.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "143",
    name: "Khvicha Makatsaria",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Supported legislation targeting NGOs and independent media.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "144",
    name: "Zurab Makharadze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Part of the legislative machinery enabling authoritarian consolidation.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "145",
    name: "Tate Mamatsashvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Enabled the regime's legislative program.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "146",
    name: "Archil Mamatsashvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Consistently voted with the ruling party on restrictive measures.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "147",
    name: "Konstantine Morgoshia",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Part of parliamentary majority supporting authoritarian legislation.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "148",
    name: "Noshrevan Namoradze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Supported the full package of anti-democratic legislation.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "149",
    name: "Soso Pkhakadze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Enabled the targeting of civil society organizations.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "150",
    name: "Tamaz Shioshvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Voted consistently for regime-backed legislation.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "151",
    name: "Shmagi Kobakhidze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Part of the Kobakhidze family's political influence.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "152",
    name: "Ucha Mamatsashvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Member of a family with multiple parliamentary representatives.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "153",
    name: "Ketevan Kharaidze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Supported restrictive legislation against civil society.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "154",
    name: "Victor Kipiani",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Enabled the legislative assault on democratic institutions.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "155",
    name: "Kakha Kobiashvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Voted for the full package of repressive measures.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "156",
    name: "David Bakradze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Participated in parliamentary majority's authoritarian program.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "157",
    name: "Shalva Bedoidze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Supported legislation targeting NGOs and media.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "158",
    name: "Giorgi Butikhuzi",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Part of parliamentary majority enabling authoritarianism.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "159",
    name: "Ioseb Chelidze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Supported the regime's legislative agenda.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "160",
    name: "Aleksandre Darakhvelidze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Enabled restrictive legislation.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "161",
    name: "Nino Enukidze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Voted for anti-democratic measures.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "162",
    name: "Giorgi Gelashvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Supported authoritarian consolidation.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "163",
    name: "Aluda Gudushauri",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/7102/avatar.jpg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Part of ruling party majority.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "164",
    name: "Irine Imerlishvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Enabled legislative repression.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "165",
    name: "Ilia Injia",
    position: "MP, Georgian Dream, Deputy Speaker",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/8450/avatar.jpg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "Deputy Speaker of Parliament. One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Voted for repressive measures.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  // Duplicate removed: Irakli Kadagishvili ID 166 - consolidated into ID 31
  {
    id: "167",
    name: "Irakli Karseladze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Part of parliamentary majority.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "168",
    name: "Koka Katsitadze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Enabled regime's legislative program.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "169",
    name: "Giorgi Kobakhidze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Member of Kobakhidze political family.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  // Duplicate removed: Razhden Kuprashvili ID 170 - consolidated into ID 302
  {
    id: "171",
    name: "Mariam Lashkhi",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/7112/avatar.jpg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Supported anti-democratic measures.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "172",
    name: "Davit Marushvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Enabled authoritarian consolidation.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "173",
    name: "Tornike Menabde",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Part of ruling coalition.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "174",
    name: "Zurab Nogaideli",
    position: "Former Prime Minister",
    organization: "Parliament of Georgia",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Zurab_Nogaideli.jpg/440px-Zurab_Nogaideli.jpg",
    complicity: {
      nature: "Political Opportunism & Pro-Russian Alignment",
      severity: "high",
      details:
        "Former Prime Minister (2005-2007) who shifted to pro-Russian positions. His political trajectory represents the accommodation of Georgian elites to Russian influence. Associated with initiatives that undermine Georgia's Euro-Atlantic orientation.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "Wikipedia: Zurab Nogaideli", url: "https://en.wikipedia.org/wiki/Zurab_Nogaideli" },
    ],
  },
  // Duplicate removed: Beka Odisharia ID 175 - consolidated into ID 28
  {
    id: "176",
    name: "David Razmadze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Voted for regime-backed measures.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "177",
    name: "Paata Salia",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Part of parliamentary majority.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "178",
    name: "Dimitri Samkharadze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5627/avatar.jpg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Sanctioned by Estonia and Lithuania for undermining democratic institutions.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Estonia Sanctions", "Lithuania Sanctions"],
  },
  {
    id: "179",
    name: "Gela Samkharauli",
    position: "Head of National Forensics Bureau",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Forensic Services for Political Prosecutions",
      severity: "high",
      details:
        "Head of the National Forensics Bureau which provides forensic evidence in criminal cases. The bureau's work has been cited in politically motivated prosecutions, raising questions about the independence of forensic services.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "180",
    name: "Viktor Sanikidze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/7108/avatar.jpg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Sanctioned by Lithuania and Estonia for supporting repressive legislation.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Lithuania Sanctions", "Estonia Sanctions"],
  },
  {
    id: "181",
    name: "Zviad Shalamberidze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/8456/avatar.jpg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Sanctioned by Lithuania for supporting repressive legislation.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Lithuania Sanctions"],
  },
  {
    id: "182",
    name: "Tengiz Sharmanashvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/5273/avatar.jpg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Part of ruling party majority.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "183",
    name: "Aleksandre Tabatadze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/7101/avatar.jpg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Enabled regime's program.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  // Duplicate removed: Shalva Tadumadze ID 184 - consolidated into ID 418
  {
    id: "185",
    name: "Lasha Talakhadze",
    position: "Olympic Weightlifter",
    organization: "Georgian Sports",
    photo: "https://web-api.parliament.ge/storage/s/persons/8455/avatar.jpg",
    complicity: {
      nature: "Public Support for Authoritarian Regime",
      severity: "medium",
      details:
        "Olympic champion who has expressed support for Georgian Dream. Athletes with national prominence who lend their image to the regime provide cultural legitimacy to authoritarian consolidation.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "186",
    name: "Tamar Taliashvili",
    position: "Ambassador of Georgia to the United States",
    organization: "Ministry of Foreign Affairs of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Diplomatic Legitimization of Authoritarian Regime",
      severity: "high",
      details:
        "Georgian Ambassador to the United States. Former GD MP who voted to override Presidential veto on Foreign Agents Law. Her husband Davit Kukhalashvili directs a Moscow-based law firm (DTK Partners) that helps sanctioned Russian entities navigate Western sanctions. His name was removed from the firm's website one week after she became ambassador.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "OC Media: Ambassador's husband Russia connection", url: "https://oc-media.org/" },
      { title: "MSN: Husband linked to Moscow law firm", url: "https://www.msn.com/en-in/news/world/husband-of-georgias-us-ambassador-linked-to-moscow-based-law-firm-report/ar-AA1S8bhJ" },
    ],
  },
  {
    id: "187",
    name: "Sulkhan Tamazashvili",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details:
        "One of 84 MPs who voted to override Presidential veto on Foreign Agents Law. Part of parliamentary majority.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  // Duplicate removed: Nino Tsilosani ID 188 - consolidated into ID 40
  // Duplicate removed: Tea Tsulukiani ID 189 - consolidated into ID 421
  {
    id: "190",
    name: "Nugzar Chitadze",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Government official who has served in various capacities supporting Georgian Dream governance. Part of the administrative apparatus enabling regime operations.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  // Duplicate removed: Giorgi Gabitashvili ID 191 - consolidated into ID 102
  {
    id: "192",
    name: "Levan Gegechkori",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Official in Georgian Dream government. Part of the institutional apparatus supporting authoritarian consolidation.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "193",
    name: "Shmagi Gobejishvili",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Official serving in various government capacities. Enables regime operations through administrative service.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "194",
    name: "Tornike Gogeshvili",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Official in government service. Part of the bureaucratic infrastructure supporting Georgian Dream rule.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "195",
    name: "Zviad Gubeladze",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Government official serving under Georgian Dream. Contributes to administrative continuity of regime.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "196",
    name: "Giorgi Gvarakidze",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Official serving in government capacity. Part of institutional support for authoritarian governance.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "197",
    name: "Mikheil Jinjolia",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Government official under Georgian Dream. Enables regime operations through continued service.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "198",
    name: "Roin Khintibidze",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Official in government service. Part of administrative apparatus supporting authoritarian consolidation.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "199",
    name: "Ani Khubejashvili",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Official serving under Georgian Dream government. Contributes to institutional continuity of regime.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "200",
    name: "Lasha Kotrikadze",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Government official in various capacities. Part of bureaucratic infrastructure of Georgian Dream rule.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "201",
    name: "Ana Metreveli",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Official serving in government capacity. Enables regime operations through administrative service.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "202",
    name: "Natia Tatiashvili",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Government official under Georgian Dream. Part of institutional support for authoritarian governance.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "203",
    name: "Paata Tsetskhladze",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Official in government service. Contributes to administrative continuity of authoritarian system.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "204",
    name: "Vladimer Turmanidze",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Government official serving under Georgian Dream. Part of bureaucratic apparatus supporting regime.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  // === ADDITIONAL POLICE AND SECURITY OFFICIALS ===
  {
    id: "205",
    name: "Koba Chagunava",
    position: "Police Official",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Enforcement of Political Repression",
      severity: "high",
      details:
        "Police official involved in the enforcement apparatus of the Ministry of Internal Affairs. Part of the security structure that has carried out violent crackdowns on protesters.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "206",
    name: "Vera Dolidze",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Official serving in government capacity. Contributes to institutional functioning of Georgian Dream rule.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "207",
    name: "Teona Epitashvili",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Government official under Georgian Dream. Part of administrative apparatus enabling regime operations.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "208",
    name: "Natia Gudadze",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Official in government service. Enables authoritarian governance through continued service.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "209",
    name: "Tamar Iakobidze",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Government official serving under Georgian Dream. Part of institutional support for authoritarian consolidation.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "210",
    name: "Ketevan Jachvadze",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Official in government capacity. Contributes to bureaucratic functioning of regime.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "211",
    name: "Arsen Kalatozishvili",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Government official under Georgian Dream. Enables regime operations through service.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "212",
    name: "Lela Kalichenko",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Official serving in government capacity. Part of administrative apparatus of authoritarian rule.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "213",
    name: "Guliko Kazhashvili",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Government official in various capacities. Contributes to institutional continuity of regime.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "214",
    name: "Nato Khujadze",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Official under Georgian Dream government. Part of bureaucratic infrastructure supporting authoritarian consolidation.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "215",
    name: "Irakli Khuskivadze",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Government official serving under Georgian Dream. Enables regime operations through continued service.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "216",
    name: "Khvicha Kikilashvili",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Official in government service. Contributes to administrative functioning of authoritarian system.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "217",
    name: "Manana Kobakhidze",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Government official under Georgian Dream. Member of Kobakhidze political family network.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "218",
    name: "Levan Kolbaia",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Official serving in government capacity. Part of institutional apparatus of Georgian Dream rule.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "219",
    name: "Davit Kurtanidze",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Government official in various capacities. Contributes to bureaucratic continuity of regime.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "220",
    name: "Lela Maridashvili",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Official under Georgian Dream government. Part of administrative infrastructure supporting authoritarian governance.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "221",
    name: "Nino Maridashvili",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Government official serving in various capacities. Enables regime operations through service.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "222",
    name: "Viktor Metreveli",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Official in government service. Part of institutional support for authoritarian consolidation.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "223",
    name: "Davit Mgeliashvili",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Government official under Georgian Dream. Contributes to administrative functioning of regime.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "224",
    name: "Lela Mildenberger",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Official serving in government capacity. Part of bureaucratic apparatus of Georgian Dream rule.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "225",
    name: "Jvebe Natchkebia",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Government official in various capacities. Enables authoritarian governance through service.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "226",
    name: "Malkhaz Okropiridze",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Official under Georgian Dream government. Contributes to institutional continuity of regime.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "227",
    name: "Vasil Roinishvili",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Government official serving in various capacities. Part of administrative infrastructure of authoritarian system.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "228",
    name: "Nino Sakhelashvili",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Official in government service. Enables regime operations through continued service.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "229",
    name: "Nana Shamatava",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Government official under Georgian Dream. Contributes to bureaucratic functioning of regime.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "230",
    name: "Zviad Sharadze",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Official serving in government capacity. Part of institutional apparatus supporting authoritarian consolidation.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "231",
    name: "Irakli Shengelia",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Government official in various capacities. Part of bureaucratic infrastructure of Georgian Dream rule.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "232",
    name: "Irakli Shvangiradze",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Official under Georgian Dream government. Enables authoritarian governance through service.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "233",
    name: "Giorgi Tevdorashvili",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Government official serving in various capacities. Contributes to institutional continuity of regime.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "234",
    name: "Irma Togonidze",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Official in government service. Part of administrative apparatus of authoritarian consolidation.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "235",
    name: "Lela Tsagareishvili",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Government official under Georgian Dream. Enables regime operations through continued service.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "236",
    name: "Manuchar Tsatsua",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Official serving in government capacity. Contributes to bureaucratic functioning of regime.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "237",
    name: "Zviad Tsekvava",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Government official in various capacities. Part of institutional infrastructure supporting Georgian Dream rule.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "238",
    name: "Valerian Tsertsvadze",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Official under Georgian Dream government. Part of administrative apparatus of authoritarian governance.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "239",
    name: "Merab Turava",
    position: "President, Constitutional Court",
    organization: "Constitutional Court of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Constitutional Cover for Authoritarian Measures",
      severity: "high",
      details:
        "President of the Constitutional Court which has failed to strike down clearly unconstitutional measures including the Foreign Agents Law. The court's passivity provides constitutional cover for authoritarian consolidation.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "240",
    name: "Tinatin Berdzenishvili",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Government official serving in various capacities. Contributes to institutional continuity of authoritarian rule.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "241",
    name: "Vasil Maglaperidze",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Official in government service. Enables regime operations through administrative service.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "242",
    name: "Davit Atabegashvili",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Government official under Georgian Dream. Part of bureaucratic infrastructure of regime.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "243",
    name: "Tarkhan Batirashvili",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Official serving in government capacity. Contributes to administrative functioning of authoritarian system.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "244",
    name: "Khatuna Bolkvadze",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Government official in various capacities. Part of institutional support for Georgian Dream rule.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "245",
    name: "Vakhtang Bolkvadze",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Official under Georgian Dream government. Enables authoritarian governance through service.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "246",
    name: "Nino Chabukiani",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Government official serving in various capacities. Contributes to institutional continuity of regime.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "247",
    name: "Eva Gotsiridze",
    position: "Judge",
    organization: "Constitutional Court of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Judicial Cover for Authoritarian Measures",
      severity: "high",
      details:
        "Constitutional Court judge whose tenure has seen the court fail to check unconstitutional government actions. The court's passivity enables the legal architecture of authoritarianism.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "248",
    name: "Dimitri Mchedlidze",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Official in government service. Part of administrative apparatus of Georgian Dream rule.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "249",
    name: "Koba Shemazashvili",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Government official under Georgian Dream. Contributes to bureaucratic functioning of regime.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "250",
    name: "Nino Tarashvili",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Official serving in government capacity. Part of institutional infrastructure supporting authoritarian consolidation.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "251",
    name: "Tsotne Kartvelishvili",
    position: "Government Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Regime",
      severity: "medium",
      details:
        "Government official in various capacities. Enables regime operations through administrative service.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "252",
    name: "Davit Antadze",
    position: "Police Official",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Enforcement of Political Repression",
      severity: "high",
      details:
        "Police official involved in enforcement operations. Part of the security apparatus that has carried out crackdowns on pro-democracy protesters.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "253",
    name: "Archil Antadze",
    position: "Police Official",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Enforcement of Political Repression",
      severity: "high",
      details:
        "Police official in enforcement operations. Part of security structure implementing violent crackdowns.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "254",
    name: "Grigol Beselia",
    position: "(Former) Head of Adjara Police Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Command Responsibility for Regional Repression",
      severity: "high",
      details:
        "Former Head of Adjara Police Department. Sanctioned by Lithuania and Estonia for role in crackdowns on protesters in the Adjara region.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Lithuania Sanctions", "Estonia Sanctions"],
  },
  {
    id: "255",
    name: "Giorgi Bzhalava",
    position: "Deputy Head of Batumi Police",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Command Responsibility for Regional Repression",
      severity: "high",
      details:
        "Deputy Head of Batumi Police. Sanctioned by Lithuania and Estonia for role in violent crackdowns on protesters in Adjara region.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Lithuania Sanctions", "Estonia Sanctions"],
  },
  {
    id: "256",
    name: "Giorgi Chareqashvili",
    position: "Police Official",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Enforcement of Political Repression",
      severity: "high",
      details:
        "Law enforcement official. Part of the repressive apparatus carrying out violent dispersals of protesters.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "257",
    name: "Irakli Dgebuadze",
    position: "Head of Batumi Police Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Command Responsibility for Regional Crackdowns",
      severity: "high",
      details:
        "Head of Batumi Police Department. Sanctioned by Lithuania and Estonia for role in violent crackdowns on pro-democracy protesters in Adjara.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Lithuania Sanctions", "Estonia Sanctions"],
  },
  {
    id: "258",
    name: "Otar Gelashvili",
    position: "Police Official",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Enforcement of Political Repression",
      severity: "high",
      details:
        "Official in law enforcement apparatus. Part of security infrastructure implementing crackdowns on protesters.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "259",
    name: "Zurab Gharibashvili",
    position: "Police Official",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Enforcement of Political Repression",
      severity: "high",
      details:
        "Police official involved in enforcement operations. Contributes to repressive security apparatus.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "260",
    name: "Lasha Jokhadze",
    position: "Head of Main Division of Tbilisi Police",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Command Responsibility for Violent Crackdowns",
      severity: "high",
      details:
        "Head of the Main Division of Tbilisi Police. Sanctioned by Lithuania and Estonia for role in violent crackdowns on pro-democracy protesters. Command responsibility for police units that carried out beatings, arbitrary detentions, and use of excessive force.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Lithuania Sanctions", "Estonia Sanctions"],
  },
  {
    id: "261",
    name: "Teimuraz Kalandadze",
    position: "Director of Kakheti Police Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Command Responsibility for Regional Repression",
      severity: "high",
      details:
        "Director of Kakheti Police Department. Sanctioned by Lithuania and Estonia for role in crackdowns on pro-democracy activists in the Kakheti region.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Lithuania Sanctions", "Estonia Sanctions"],
  },
  {
    id: "262",
    name: "Sulkhan Kiknadze",
    position: "Police Official",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Enforcement of Political Repression",
      severity: "high",
      details:
        "Official in law enforcement. Part of security apparatus implementing crackdowns on protesters.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "263",
    name: "Teimuraz Kupatadze",
    position: "Head of Security Police Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Command Responsibility for Security Operations",
      severity: "high",
      details:
        "Head of the Security Police Department. Sanctioned by Lithuania and Estonia for role in crackdowns on protesters. Oversees security operations targeting pro-democracy demonstrators and civil society activists.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Lithuania Sanctions", "Estonia Sanctions"],
  },
  // Duplicate removed: Mileri Lagazauri ID 264 - consolidated into ID 393
  {
    id: "265",
    name: "Zviad Margvelani",
    position: "Police Official",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Enforcement of Political Repression",
      severity: "high",
      details:
        "Police official in enforcement capacity. Contributes to crackdowns on pro-democracy activists.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "266",
    name: "Zaza Metonidze",
    position: "Police Official",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Enforcement of Political Repression",
      severity: "high",
      details:
        "Official in law enforcement apparatus. Part of repressive security structure.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "267",
    name: "Berdia Peradze",
    position: "Police Official",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Enforcement of Political Repression",
      severity: "high",
      details:
        "Police official involved in enforcement operations. Contributes to violent crackdowns on protesters.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "268",
    name: "Lasha Salukvadze",
    position: "Deputy Chief of Vake-Saburtalo Police",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Command Responsibility for District Crackdowns",
      severity: "high",
      details:
        "Deputy Chief of Vake-Saburtalo Police Division. Sanctioned by Lithuania and Estonia for role in violent crackdowns on protesters in central Tbilisi.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Lithuania Sanctions", "Estonia Sanctions"],
  },
  {
    id: "269",
    name: "Vazha Siradze",
    position: "Head of Tbilisi Police Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Command Responsibility for Tbilisi Crackdowns",
      severity: "high",
      details:
        "Head of the Tbilisi Police Department. Sanctioned by Lithuania and Estonia for role in violent crackdowns on protesters. Commanded police operations in the capital during the December 2024 protests that resulted in hundreds of arbitrary detentions and documented cases of police brutality.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Lithuania Sanctions", "Estonia Sanctions"],
  },
  {
    id: "270",
    name: "Revaz Tsurtsumia",
    position: "Police Official",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Enforcement of Political Repression",
      severity: "high",
      details:
        "Official in law enforcement. Part of security infrastructure carrying out crackdowns on pro-democracy protesters.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "271",
    name: "Gocha Vanadze",
    position: "Deputy Head of Batumi Police",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Command Responsibility for Regional Repression",
      severity: "high",
      details:
        "Deputy Head of Batumi Police. Sanctioned by Lithuania and Estonia for role in crackdowns on pro-democracy protesters in Adjara region.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Lithuania Sanctions", "Estonia Sanctions"],
  },
  {
    id: "272",
    name: "Nodar Zenaishvili",
    position: "Police Official",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Enforcement of Political Repression",
      severity: "high",
      details:
        "Law enforcement official. Part of security structure implementing violent dispersals of protesters.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "273",
    name: "Anzor Chubinidze",
    position: "Police Commander",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Command Responsibility for Violent Crackdowns",
      severity: "high",
      details:
        "Police commander with responsibility for units involved in violent dispersal of protesters. Command responsibility for actions of subordinates during crackdowns on pro-democracy demonstrations.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  {
    id: "274",
    name: "Mirza Kezevadze",
    position: "Police Official",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Enforcement of Political Repression",
      severity: "high",
      details:
        "Police official in enforcement capacity. Part of security apparatus carrying out crackdowns on protesters.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  // === ADDITIONAL BUSINESS DONORS ===
  {
    id: "275",
    name: "Kakhi Bekauri",
    position: "Businessman",
    organization: "Business Elite",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Financial Support for Regime",
      severity: "medium",
      details:
        "Business figure with connections to Georgian Dream. Economic interests aligned with regime continuity and benefits from the political-economic arrangements maintained by the ruling party.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  // === IVANISHVILI'S INNER CIRCLE - RUSSIAN CONNECTIONS ===
  {
    id: "276",
    name: "Yulia Krushanova",
    position: "Personal 'Voodoo Practitioner' / Anti-Ageing Specialist",
    organization: "Ivanishvili's Personal Staff",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Russian Intelligence Penetration of Oligarch's Inner Circle",
      severity: "high",
      details:
        "Lives with Bidzina Ivanishvili and performs experimental 'anti-ageing' procedures and rituals on him. Former political prisoner Giorgi Bachiashvili, once Ivanishvili's right-hand man, made public allegations about her role and influence. Her husband is reportedly a Russian intelligence officer, representing direct FSB/GRU penetration of Georgia's de facto ruler's inner circle.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "Civil.ge: Ivanishvili's former ally makes explosive allegations", url: "https://civil.ge/archives/669023" },
      { title: "JAM News: Shaman's Russian intelligence connections", url: "https://jam-news.net/" },
    ],
  },
  {
    id: "277",
    name: "Yulia Krushanova's Husband",
    position: "Russian Intelligence Officer",
    organization: "Russian Security Services",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Direct Russian Intelligence Link to Ivanishvili",
      severity: "high",
      details:
        "Married to Bidzina Ivanishvili's personal spiritual advisor and 'anti-ageing specialist' Yulia Krushanova. Represents a direct FSB/GRU connection to the inner circle of Georgia's de facto ruler. This intelligence penetration raises profound questions about Russian influence over Georgian state decision-making.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "JAM News: Russian intelligence connections", url: "https://jam-news.net/" },
    ],
  },
  {
    id: "278",
    name: "Davit Kukhalashvili",
    position: "Director, DTK Partners (Moscow-based law firm)",
    organization: "DTK Partners",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Sanctions Evasion for Russian Entities",
      severity: "high",
      details:
        "Husband of Tamar Taliashvili, Georgian Ambassador to the United States. His Moscow-based law firm DTK Partners specializes in helping sanctioned Russian entities navigate Western sanctions. Clients include SPB Bank and National Settlement Depository—both sanctioned by Western governments. His name was removed from the firm's website one week after his wife became ambassador, suggesting awareness of the conflict.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "OC Media: Ambassador's husband linked to Moscow law firm", url: "https://oc-media.org/" },
      { title: "MSN/NDTV: Georgian Ambassador's husband Russia sanctions connection", url: "https://www.msn.com/en-in/news/world/husband-of-georgias-us-ambassador-linked-to-moscow-based-law-firm-report/ar-AA1S8bhJ" },
    ],
  },
  // === IMEDI TV PROPAGANDISTS ===
  {
    id: "279",
    name: "Tea Sichinava",
    position: "Host, Kronika (Imedi TV)",
    organization: "Imedi TV",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Captured Journalist & Propaganda Dissemination",
      severity: "high",
      details:
        "Once-respected journalist who hosts Georgia's most-watched news bulletin 'Kronika' at 8pm. Nearly resigned over the Foreign Agents Law but 'fell into line.' Her capitulation to regime pressure represents the capture of independent journalism. Former colleagues describe how she transformed from genuine journalist to regime mouthpiece.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "OC Media: Ex-TV Imedi employees on working for Georgian Dream's spin machine", url: "https://oc-media.org/a-cog-in-the-machine-of-evil-ex-tv-imedi-employees-on-working-for-georgian-dreams-spin-machine/" },
    ],
  },
  {
    id: "280",
    name: "Magda Anikashvili",
    position: "Host, Imedi Live",
    organization: "Imedi TV",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Pro-Kremlin Propaganda Broadcasting",
      severity: "high",
      details:
        "Described as 'Georgia's Ekaterina Andreyeva' (Russia's Vremya host). Former MP for the Christian Democratic Party (2008). Theatre school graduate who became 'the main voice and face of Georgian Dream on TV.' Her show's visuals are reportedly borrowed from Russia's Perviy Kanal. One of 'Imedi's main attack dogs' targeting government critics.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "OC Media: Ex-TV Imedi employees on propaganda machine", url: "https://oc-media.org/a-cog-in-the-machine-of-evil-ex-tv-imedi-employees-on-working-for-georgian-dreams-spin-machine/" },
    ],
  },
  {
    id: "281",
    name: "Giorgi Putkaradze",
    position: "Host, Imedi Live",
    organization: "Imedi TV",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Media Attack Operations Against Critics",
      severity: "high",
      details:
        "Former news director of Maestro TV who joined Imedi. One of 'Imedi's main attack dogs' alongside Magda Anikashvili. Part of the Sichinava/Chikhladze social group that moved together between channels. Conducts targeted attacks on government opponents and civil society organizations.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "OC Media: Imedi propaganda machine", url: "https://oc-media.org/a-cog-in-the-machine-of-evil-ex-tv-imedi-employees-on-working-for-georgian-dreams-spin-machine/" },
    ],
  },
  {
    id: "282",
    name: "Giorgi Targamadze",
    position: "Former Leader, Christian Democratic Movement; Former Imedi Journalist",
    organization: "Christian Democratic Movement",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political-Media Nexus & Pro-Government Agitation",
      severity: "medium",
      details:
        "Long-time Imedi journalist who led the Christian Democratic Party—the same party Magda Anikashvili joined in 2008. Part of the pro-government media ecosystem that has evolved into Georgian Dream's propaganda apparatus. His political trajectory represents the fusion of media and political power.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
  },
  // === ADDITIONAL PROPAGANDISTS ===
  {
    id: "283",
    name: "Shalva Ramishvili",
    position: "Co-founder, PosTV",
    organization: "PosTV",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Pro-Russian Propaganda & Anti-Ukraine Rhetoric",
      severity: "high",
      details:
        "Co-founder of PosTV who stated 'Ukraine's defeat is our victory.' Key anti-Western propagandist who has been accused of sexual harassment. His outlet merged with the People's Power anti-West group. Represents the most extreme end of Georgian pro-Russian media ecosystem.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["EU Parliament Named for Sanctions"],
    sources: [
      { title: "OC Media: PosTV anti-Western propaganda", url: "https://oc-media.org/" },
    ],
  },
  {
    id: "284",
    name: "Tinatin Berdzenishvili",
    position: "Director General, Georgian Public Broadcaster",
    organization: "Georgian Public Broadcaster",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Transformation of Public Media into State Propaganda",
      severity: "high",
      details:
        "EU Parliament resolution specifically named her for sanctions. Under her leadership, the Georgian Public Broadcaster has been transformed from an independent public media institution into a Georgian Dream propaganda channel. Represents the capture of public broadcasting for regime purposes.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["EU Parliament Named for Sanctions"],
    sources: [
      { title: "European Parliament Resolution on Georgia", url: "https://www.europarl.europa.eu/" },
      { title: "Transparency International Georgia", url: "https://transparency.ge/" },
    ],
  },
  // === NEWLY SANCTIONED OFFICIALS ===
  {
    id: "285",
    name: "Giorgi Gvarakidze",
    position: "General Prosecutor of Georgia",
    organization: "Prosecutor's Office of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Weaponized Prosecution & Human Rights Violations Cover-up",
      severity: "high",
      details:
        "UK sanctioned in April 2025—the first state to sanction a General Prosecutor. Failed to investigate human rights violations by security forces against protesters. Under his leadership, the Prosecutor's Office has become an instrument of political persecution while providing impunity for regime violence.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["UK Sanctions (April 2025)"],
    sources: [
      { title: "UK Government Sanctions List", url: "https://www.gov.uk/" },
      { title: "Civil.ge: UK sanctions Georgian officials", url: "https://civil.ge/" },
    ],
  },
  {
    id: "286",
    name: "Koka Katsitadze",
    position: "Former Head, Special Investigation Service",
    organization: "Special Investigation Service",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Failure to Investigate Regime Violence",
      severity: "high",
      details:
        "UK sanctioned for failing to properly investigate the crackdown on protesters. The Special Investigation Service under his leadership systematically failed to hold security forces accountable for beatings, arbitrary detentions, and other abuses against pro-democracy demonstrators.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["UK Sanctions"],
    sources: [
      { title: "UK Government Sanctions", url: "https://www.gov.uk/" },
    ],
  },
  {
    id: "287",
    name: "Lasha Natsvlishvili",
    position: "Georgian Dream Propagandist / Media Figure",
    organization: "Georgian Dream Media Apparatus",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Regime Propaganda & Disinformation Campaigns",
      severity: "high",
      details:
        "Named specifically in EU Parliament resolution calling for sanctions. Key propaganda figure in Georgian Dream's media operation. Produces and disseminates disinformation targeting opposition, civil society, and Western institutions. Part of the coordinated information warfare apparatus.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["EU Parliament Named for Sanctions"],
    sources: [
      { title: "European Parliament Resolution February 2025", url: "https://www.europarl.europa.eu/" },
    ],
  },
  // === FINANCIAL NETWORK - LIBERTY BANK & CARTU BANK ===
  {
    id: "288",
    name: "Beka Gogichaishvili",
    position: "CEO, Liberty Bank",
    organization: "Liberty Bank",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Financial Infrastructure for Regime Operations",
      severity: "high",
      details:
        "Came to Liberty Bank from Hunnewell Partners (Irakli Rukhadze's private equity firm) as Investment Manager. Now leads the bank allegedly used for Georgian Dream financial operations. Part of the network managing Ivanishvili's financial interests and the 'loyalty-points economy.'",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "Liberty Bank website", url: "https://libertybank.ge/" },
      { title: "Byline Times: Ivanishvili's financial network", url: "https://bylinetimes.com/" },
    ],
  },
  {
    id: "289",
    name: "Murtaz Kikoria",
    position: "Chairman of Supervisory Board, Liberty Bank",
    organization: "Liberty Bank",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Financial Oversight Enabling Regime Operations",
      severity: "medium",
      details:
        "Oversight role in Liberty Bank, part of Ivanishvili's financial architecture. The Supervisory Board provides governance over financial operations linked to Georgian Dream's economic interests.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "Liberty Bank website", url: "https://libertybank.ge/" },
    ],
  },
  {
    id: "290",
    name: "Zurab Gelenidze",
    position: "CEO, Cartu Bank",
    organization: "Cartu Bank",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Management of Oligarch's Personal Banking",
      severity: "high",
      details:
        "Leads Cartu Bank, Bidzina Ivanishvili's personal banking institution. Central figure in managing the oligarch's vast financial holdings. Cartu Bank is the financial heart of Ivanishvili's economic empire, which represents approximately a quarter of Georgia's GDP.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "Cartu Bank website", url: "https://cartubank.ge/" },
    ],
  },
  // === HUNNEWELL PARTNERS - ABRAMOVICH CONNECTION ===
  {
    id: "291",
    name: "Igor Alexeev",
    position: "Co-founder, Hunnewell Partners",
    organization: "Hunnewell Partners",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Russian Oligarch Proxy Arrangements & Media Control",
      severity: "high",
      details:
        "Russian-US citizen, partner at Irakli Rukhadze's private equity firm Hunnewell Partners. Facilitated Roman Abramovich's proxy arrangement for Imedi TV ownership through Pro-Alpha Media Ltd. Key link between sanctioned Russian oligarch money and Georgian media control. The arrangement allowed Abramovich—now sanctioned—to maintain hidden ownership of Georgia's most influential TV channel.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "Byline Times: Abramovich's secret Georgian media stake", url: "https://bylinetimes.com/" },
      { title: "OC Media: Imedi ownership investigation", url: "https://oc-media.org/" },
    ],
  },
  {
    id: "292",
    name: "Ben Marson",
    position: "Co-founder, Hunnewell Partners",
    organization: "Hunnewell Partners",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Russian Oligarch Proxy Arrangements",
      severity: "high",
      details:
        "UK citizen, partner at Irakli Rukhadze's private equity firm. Involved in the Pro-Alpha/Abramovich proxy arrangement for Imedi TV. Part of the corporate structure that enabled sanctioned Russian oligarch Roman Abramovich to maintain hidden ownership in Georgian media.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "Byline Times investigation", url: "https://bylinetimes.com/" },
      { title: "Companies House UK", url: "https://www.gov.uk/government/organisations/companies-house" },
    ],
  },
  // === ORGANIZED CRIME ===
  {
    id: "293",
    name: "Mindia Goradze",
    position: "Crime Boss (Thief-in-Law)",
    organization: "Georgian Organized Crime",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Organized Crime Leadership & State-Crime Nexus",
      severity: "high",
      details:
        "Also known as 'Lavasogli.' Crime boss arrested in Rome in 2024. Part of the Georgian 'thieves-in-law' network that has historically had influence in Georgian politics and economics. The tolerance of organized crime networks by Georgian Dream raises questions about state-crime relationships and protection arrangements.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Interpol Arrest"],
    sources: [
      { title: "Civil.ge: Georgian crime boss arrested in Rome", url: "https://civil.ge/" },
      { title: "OCCRP: Georgian organized crime", url: "https://www.occrp.org/" },
    ],
  },
  // === ADDITIONAL SANCTIONED OFFICIALS ===
  {
    id: "294",
    name: "Dito Samkharadze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details: "Georgian Dream MP sanctioned by Lithuania and Estonia for role in passing repressive legislation and supporting the Foreign Agents Law.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Lithuania Sanctions", "Estonia Sanctions"],
  },
  // Duplicate removed: Tea Tsulukiani ID 295 - consolidated into ID 421
  // Duplicate removed: Shalva Tadumadze ID 296 - consolidated into ID 418
  {
    id: "297",
    name: "Aleksandre Darakhvelidze",
    position: "Deputy Minister of Internal Affairs",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Command Responsibility for Police Violence",
      severity: "high",
      details: "Deputy Minister with command responsibility for police operations targeting pro-democracy demonstrators. Sanctioned by Lithuania and Estonia.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Lithuania Sanctions", "Estonia Sanctions"],
  },
  {
    id: "298",
    name: "Giorgi Butkhuzi",
    position: "Deputy Minister of Internal Affairs",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Command Responsibility for Police Violence",
      severity: "high",
      details: "Deputy Minister overseeing security operations during crackdowns. Sanctioned by Lithuania and Estonia for role in violent dispersal of protesters.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Lithuania Sanctions", "Estonia Sanctions"],
  },
  {
    id: "299",
    name: "Shalva Bedoidze",
    position: "(Former) First Deputy Minister of Internal Affairs",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Command Responsibility for Systematic Repression",
      severity: "high",
      details: "Former First Deputy Minister with direct oversight of police operations. Sanctioned by UK, Lithuania, and Estonia for role in violent crackdowns on protesters.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["UK Sanctions", "Lithuania Sanctions", "Estonia Sanctions"],
  },
  {
    id: "300",
    name: "Giorgi Gabitashvili",
    position: "(Former) General Prosecutor",
    organization: "Prosecutor's Office of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Failure to Investigate Human Rights Violations",
      severity: "high",
      details: "Former General Prosecutor who failed to investigate police violence and human rights abuses. Sanctioned by Lithuania and Estonia.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Lithuania Sanctions", "Estonia Sanctions"],
  },
  {
    id: "301",
    name: "Paata Salia",
    position: "Minister of Justice",
    organization: "Ministry of Justice",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Judicial System Weaponization",
      severity: "high",
      details: "Minister of Justice overseeing the judicial apparatus used to prosecute protesters and opposition figures. Sanctioned by Lithuania and Estonia.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Lithuania Sanctions", "Estonia Sanctions"],
  },
  {
    id: "302",
    name: "Razhden Kuprashvili",
    position: "Head of Anti-Corruption Bureau, Former MP",
    organization: "Anti-Corruption Bureau of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Weaponization of Anti-Corruption Mechanisms & Legislative Support",
      severity: "high",
      details: "Former Georgian Dream MP who voted to override Presidential veto on Foreign Agents Law. Now heads the Anti-Corruption Bureau which has been weaponized to target opposition figures while ignoring documented corruption within the ruling party. The bureau under his leadership has pursued politically motivated cases against opposition while failing to investigate corruption allegations against Georgian Dream officials. Sanctioned by Estonia and Lithuania.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Estonia Sanctions", "Lithuania Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
      { title: "TI Georgia: Alleged Cases of High-Level Corruption", url: "https://transparency.ge/en/blog/alleged-cases-high-level-corruption-periodically-updated-list" },
    ],
  },
  {
    id: "303",
    name: "Sulkhan Tamazashvili",
    position: "Head of Adjara Government",
    organization: "Adjara Autonomous Republic",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Regional Power Consolidation",
      severity: "high",
      details: "Head of Adjara regional government aligned with Georgian Dream. Sanctioned by Lithuania and Estonia for supporting authoritarian consolidation.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Lithuania Sanctions", "Estonia Sanctions"],
  },
  // === ADDITIONAL SANCTIONED MPs ===
  {
    id: "304",
    name: "Zviad Shalamberidze",
    position: "MP, Georgian Dream",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Support for Authoritarian Laws",
      severity: "high",
      details: "Georgian Dream MP sanctioned by Lithuania and Estonia for role in passing the Foreign Agents Law and other repressive legislation.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Lithuania Sanctions", "Estonia Sanctions"],
  },
  // Duplicate removed: Gela Samkharauli ID 305 - consolidated into ID 84
  // Duplicate removed: Viktor Sanikidze ID 306 - consolidated into ID 180
  // === PUBLIC FIGURES WITH DOCUMENTED ANTI-LGBTQ/ANTI-WESTERN STATEMENTS ===
  {
    id: "307",
    name: "Yago Abuladze",
    position: "Judo World Champion (Russia-based Georgian)",
    organization: "Russian Judo Federation",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Pro-War Propaganda & Support for Russian Aggression",
      severity: "high",
      details: "Georgian-born judo world champion competing for Russia who publicly showed support for Russia's war in Ukraine through social media posts. Listed by Ukrainian Ministry of Youth and Sports among athletes supporting Russian aggression. His pro-war stance aligns with Georgian Dream's tacit tolerance of Russian expansionism.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "Inside the Games: Abuladze shows support for war", url: "https://www.insidethegames.biz/articles/1137998/yago-abuladze-war-in-ukraine" },
      { title: "Ukraine Ministry of Sports: Athletes supporting war", url: "https://mms.gov.ua/russian-and-belarusian-athletes-who-support-the-war-in-ukraine" },
    ],
  },
  {
    id: "308",
    name: "Davit Atabegashvili",
    position: "Deputy Head of Adjara Police",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Command Responsibility for Regional Repression",
      severity: "high",
      details: "Deputy Head of Adjara Police. Sanctioned by Lithuania and Estonia for role in violent crackdowns on pro-democracy protesters.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Lithuania Sanctions", "Estonia Sanctions"],
  },
  {
    id: "309",
    name: "Dimitri Mchedlidze",
    position: "Employee, Special Tasks Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Direct Participation in Political Violence",
      severity: "high",
      details: "Member of the Special Tasks Department directly involved in violent operations against protesters. Sanctioned by Lithuania and Estonia.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Lithuania Sanctions", "Estonia Sanctions"],
  },
  {
    id: "310",
    name: "Ioseb Chelidze",
    position: "(Former) Deputy Minister of Internal Affairs",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Command Responsibility for Police Violence",
      severity: "high",
      details: "Former Deputy Minister of Internal Affairs with command responsibility for security operations. Sanctioned by Lithuania and Estonia for role in crackdowns.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Lithuania Sanctions", "Estonia Sanctions"],
  },
  // === NEO-NAZI / FAR-RIGHT FIGURES FROM TI GEORGIA REPORT ===
  {
    id: "311",
    name: "Sandro Bregadze",
    position: "Founder, Georgian March / Former Deputy Minister",
    organization: "Georgian March / Nationals Movement",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Neo-Nazi Organization Leadership & Anti-LGBTQ Violence",
      severity: "high",
      details: "Founder of the neo-Nazi movement 'Nationals' and key organizer of Georgian March. Former Deputy Minister of Diaspora Affairs and Deputy Minister of Internally Displaced Persons. Known for homophobic statements while in government. Sentenced to 6 years probation in 2011 for hooliganism with a firearm. Became bail guarantor for Georgian March activists by Georgian Dream MPs.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "TI Georgia: Anatomy of Georgian Neo-Nazism", url: "https://transparency.ge/en/blog/anatomy-georgian-neo-nazism" },
      { title: "Media.ge: Bregadze homophobic statements", url: "http://www.media.ge/" },
    ],
  },
  {
    id: "312",
    name: "Gia Korkotashvili",
    position: "Founder, Georgian Mission / Georgian March Leader",
    organization: "Georgian Mission / Georgian March",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Neo-Nazi Organization Leadership",
      severity: "high",
      details: "Co-founder of the Georgian March neo-Nazi coalition. Founder of the socio-political movement 'Georgian Mission.' One of the prominent faces of far-right organizing in Georgia, known for organizing violent counter-protests against LGBTQ events and liberal gatherings.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "TI Georgia: Anatomy of Georgian Neo-Nazism", url: "https://transparency.ge/en/blog/anatomy-georgian-neo-nazism" },
    ],
  },
  {
    id: "313",
    name: "Guram Palavandishvili",
    position: "TV Host / Neo-Nazi Activist",
    organization: "Palitra News / Georgian March",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Homophobic Propaganda & Far-Right Organizing",
      severity: "high",
      details: "Host of 'With Palavandishvili' on Palitra News, known for homophobic and xenophobic content. Georgian National Communications Commission ruled he violated broadcasting codes for hate speech and discrimination. Frequently hosted Dimitri Lortkipanidze, Zviad Tomaradze, and Levan Vasadze. Police raided his home over anti-LGBT violence.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "TI Georgia: Anatomy of Georgian Neo-Nazism", url: "https://transparency.ge/en/blog/anatomy-georgian-neo-nazism" },
      { title: "Pink News: Police raid far-right leaders", url: "https://www.thepinknews.com/2021/07/16/georgia-lgbt-violence-raid/" },
    ],
  },
  {
    id: "314",
    name: "Dimitri Lortkipanidze",
    position: "Director, Primakov Georgian-Russian Public Centre",
    organization: "Primakov Centre / Agreement of National Powers",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Russian Influence Operations & Neo-Nazi Leadership",
      severity: "high",
      details: "Director of the Primakov Georgian-Russian Public Centre, funded by the Gorchakov Fund (established by order of Russian President Medvedev). Leader of the 'Agreement of National Powers' neo-Nazi coalition. Former MP who left politics to lead Russian-funded soft power operations while organizing far-right movements. Direct link between Russian intelligence funding and Georgian neo-Nazi organizing.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "TI Georgia: Anatomy of Georgian Neo-Nazism", url: "https://transparency.ge/en/blog/anatomy-georgian-neo-nazism" },
      { title: "Gorchakov Fund Official Website", url: "https://www.gorchakovfund.ru/georgia/" },
    ],
  },
  {
    id: "315",
    name: "Zviad Tomaradze",
    position: "Ultra-Conservative Activist / Draft Law Author",
    organization: "National Religious Institute",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Anti-LGBTQ Legislation & Far-Right Organizing",
      severity: "high",
      details: "Author of controversial draft laws demanding punishment for insulting religious feelings, prohibition of NGO activities, and prohibition of abortion. Head of multiple organizations including National Religious Institute and Nation and State. Connected to Levan Vasadze through overlapping organizational memberships.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "TI Georgia: Anatomy of Georgian Neo-Nazism", url: "https://transparency.ge/en/blog/anatomy-georgian-neo-nazism" },
      { title: "Netgazeti: Tomaradze draft laws", url: "http://netgazeti.ge/" },
    ],
  },
  {
    id: "316",
    name: "Levan Chachua",
    position: "Far-Right Activist / Georgian Idea Leader",
    organization: "Georgian Idea",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Anti-LGBTQ Violence & Media Attacks",
      severity: "high",
      details: "First on Georgian Idea party list in 2016 elections. Arrested in 2010 for storming TV Company Kavkasia and sentenced to 4 years in prison, later released as 'political prisoner.' Active organizer of violent anti-LGBTQ protests and part of neo-Nazi coalition.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "TI Georgia: Anatomy of Georgian Neo-Nazism", url: "https://transparency.ge/en/blog/anatomy-georgian-neo-nazism" },
    ],
  },
  {
    id: "317",
    name: "Giorgi Gabedava",
    position: "Neo-Nazi Activist / National Front Leader",
    organization: "National Front / Georgian Idea",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Anti-LGBTQ Violence & Far-Right Organizing",
      severity: "high",
      details: "Leader of the National Front neo-Nazi group. Active organizer of violent May 17, 2013 demonstrations. Co-founder of Levan Chachua Fund and Civil Activities Club. Arrested multiple times for resisting police. Producer for Soso Pavliashvili (Georgia-born Russian singer). Godchild of Pavliashvili.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "TI Georgia: Anatomy of Georgian Neo-Nazism", url: "https://transparency.ge/en/blog/anatomy-georgian-neo-nazism" },
    ],
  },
  {
    id: "318",
    name: "Giorgi Chelidze",
    position: "Chairman, Georgian National Unity (Fascist Organization)",
    organization: "Georgian National Unity",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Openly Fascist Leadership & Violent Threats",
      severity: "high",
      details: "Chairman of Georgian National Unity, which self-identifies as a fascist organization. Openly stated: 'We push for fascism and national-socialism, we are followers of this ideology.' Threatened violence at rallies: 'They demand blood? We will give them a sea of blood.' Ministry of Internal Affairs opened investigation into threatening statements. Claims most members have weapons.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "TI Georgia: Anatomy of Georgian Neo-Nazism", url: "https://transparency.ge/en/blog/anatomy-georgian-neo-nazism" },
      { title: "Netgazeti: Investigation into threatening statements", url: "http://netgazeti.ge/news/276664/" },
    ],
  },
  {
    id: "319",
    name: "Lado Sadgobelashvili",
    position: "Far-Right Activist / Fatherland, Language, Faith Leader",
    organization: "Fatherland, Language, Faith",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Anti-LGBTQ Violence & Media Attacks",
      severity: "high",
      details: "Chairperson of 'Fatherland, Language, Faith' organization. Patriots Alliance candidate in 2016. Currently facing 2-5 years in prison for assault on Rustavi 2 journalists. Arrested with Giorgi Chelidze at Georgian Football Federation rally protesting Guram Kashia's pro-LGBTQ armband.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "TI Georgia: Anatomy of Georgian Neo-Nazism", url: "https://transparency.ge/en/blog/anatomy-georgian-neo-nazism" },
    ],
  },
  {
    id: "320",
    name: "Aleko Tetrashvili",
    position: "Actor / Georgian March Supporter",
    organization: "Georgian Entertainment Industry",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Celebrity Support for Neo-Nazi Movement",
      severity: "medium",
      details: "Georgian actor who signed petition calling for prohibition of United National Movement and 'anti-national non-governmental organizations financed by abroad.' Participated in Georgian March rally on Agmashenebeli Avenue in 2017. Represents cultural figures lending legitimacy to far-right movements.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "TI Georgia: Anatomy of Georgian Neo-Nazism", url: "https://transparency.ge/en/blog/anatomy-georgian-neo-nazism" },
      { title: "Alia.ge: Petition signatories", url: "http://www.alia.ge/news/4045" },
    ],
  },
  {
    id: "321",
    name: "Tristan Tsitelashvili",
    position: "Colonel (Convicted of State Treason)",
    organization: "Former Georgian Military",
    photo: "/placeholder.svg",
    complicity: {
      nature: "State Treason & Support for Neo-Nazi Movement",
      severity: "high",
      details: "Colonel convicted of state treason after the August 2008 war for providing secret military coordinates to Russia. Freed during Georgian Dream government. Participated in Georgian March rallies, representing intersection of treasonous pro-Russian military figures and neo-Nazi movements.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "TI Georgia: Anatomy of Georgian Neo-Nazism", url: "https://transparency.ge/en/blog/anatomy-georgian-neo-nazism" },
      { title: "Tabula: Tsitelashvili state treason", url: "http://www.tabula.ge/" },
    ],
  },
  {
    id: "322",
    name: "Emzar Kvitsiani",
    position: "MP, Patriots Alliance",
    organization: "Patriots Alliance / Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Russian Collaboration & Neo-Nazi Support",
      severity: "high",
      details: "Member of Parliament from Patriots Alliance. Former Presidential representative until 2006, then wanted for organizing uprising and terrorist acts. Returned from Russia in 2014 and sentenced to 12 years, but freed by Kutaisi Appeals Court without substantial hearing. Admitted to collaborating with Russian special forces and making statements by their orders. Joined Georgian March rally.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "TI Georgia: Anatomy of Georgian Neo-Nazism", url: "https://transparency.ge/en/blog/anatomy-georgian-neo-nazism" },
      { title: "Rustavi2: Kvitsiani admits Russian collaboration", url: "http://rustavi2.ge/ka/news/102416" },
    ],
  },
  {
    id: "323",
    name: "Guram Kartvelishvili",
    position: "TV Host, Public Broadcaster",
    organization: "Georgian Public Broadcaster",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Homophobic Propaganda on State Television",
      severity: "high",
      details: "Author and host of 'Continue Georgian History' on the Public Broadcaster. Known for prominent homophobic remarks broadcast on state television. Part of Georgian March leadership. Represents capture of public broadcasting for anti-LGBTQ propaganda.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "TI Georgia: Anatomy of Georgian Neo-Nazism", url: "https://transparency.ge/en/blog/anatomy-georgian-neo-nazism" },
    ],
  },
  // === 2021 PRIDE ATTACK ORGANIZERS ===
  {
    id: "324",
    name: "Gia Jorjoliani",
    position: "Georgian Dream Member / Bail Guarantor for Neo-Nazis",
    organization: "Georgian Dream Party",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political Protection for Neo-Nazi Activists",
      severity: "high",
      details: "Georgian Dream member who served as bail guarantor for Georgian March activists arrested for the Rustavi 2 incident in March 2018. Represents direct political party protection for violent neo-Nazi activists.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "TI Georgia: Anatomy of Georgian Neo-Nazism", url: "https://transparency.ge/en/blog/anatomy-georgian-neo-nazism" },
    ],
  },
  {
    id: "325",
    name: "Davit Chichinadze",
    position: "Georgian Dream Member / Bail Guarantor for Neo-Nazis",
    organization: "Georgian Dream Party",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political Protection for Neo-Nazi Activists",
      severity: "high",
      details: "Georgian Dream member who served as bail guarantor for Georgian March activists arrested for the Rustavi 2 incident in March 2018. Part of pattern of ruling party protection for far-right violence.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "TI Georgia: Anatomy of Georgian Neo-Nazism", url: "https://transparency.ge/en/blog/anatomy-georgian-neo-nazism" },
    ],
  },
  {
    id: "326",
    name: "Tamaz Mechiauri",
    position: "Mayor of Tianeti / Former Georgian Dream MP",
    organization: "Georgian Dream Party / Tianeti Municipality",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political Protection for Neo-Nazi Activists",
      severity: "high",
      details: "Former Georgian Dream MP, currently Mayor of Tianeti. Served as bail guarantor for Georgian March activists arrested for the Rustavi 2 incident. Demonstrates Georgian Dream officials at all levels providing cover for violent far-right groups.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "TI Georgia: Anatomy of Georgian Neo-Nazism", url: "https://transparency.ge/en/blog/anatomy-georgian-neo-nazism" },
    ],
  },
  {
    id: "327",
    name: "Ada Marshanaia",
    position: "Patriots Alliance Member / Bail Guarantor for Neo-Nazis",
    organization: "Patriots Alliance",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political Protection for Neo-Nazi Activists",
      severity: "medium",
      details: "Patriots Alliance member who served as bail guarantor for Georgian March activists. Part of political network providing protection for violent far-right groups.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "TI Georgia: Anatomy of Georgian Neo-Nazism", url: "https://transparency.ge/en/blog/anatomy-georgian-neo-nazism" },
    ],
  },
  // === ADDITIONAL CHURCH FIGURES INVOLVED IN 2021 PRIDE VIOLENCE ===
  {
    id: "328",
    name: "Father Ioane Gamrekeli",
    position: "Priest / Far-Right Activist",
    organization: "Georgian Orthodox Church",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Incitement of Violence & Pride Attack Organization",
      severity: "high",
      details: "Georgian Ombudsman named as one of the organizers of the July 5, 2021 anti-LGBTQ rally that resulted in attacks on 53 journalists and LGBTQ activists. Called for prosecution by Ombudsman for organizing the violent counter-demonstration.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "DF Watch: Ombudsman names priest as organizer", url: "https://dfwatch.net/georgian-ombudsman-names-priest-blogger-as-organizers-of-july-5-anti-lgbtq-rally-and-calls-for-their-prosecution-54836" },
      { title: "Wikipedia: 2021 attack on Tbilisi Pride", url: "https://en.wikipedia.org/wiki/2021_attack_on_Tbilisi_Pride" },
    ],
  },
  {
    id: "329",
    name: "Nikoloz Burnadze",
    position: "Founder, Georgian Power",
    organization: "Georgian Power",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Neo-Nazi Leadership & Violent Organizing",
      severity: "high",
      details: "Founder and leader of the neo-Nazi group 'Georgian Power.' Connected to violent raid on vegetarian café in Tbilisi. Held nationalist rally near Turkish restaurants on Agmashenebeli Avenue in 2016 where members were arrested. Active supporter of Georgian March.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "TI Georgia: Anatomy of Georgian Neo-Nazism", url: "https://transparency.ge/en/blog/anatomy-georgian-neo-nazism" },
    ],
  },
  {
    id: "330",
    name: "Mikheil Amisulashvili",
    position: "Georgian March Activist",
    organization: "Georgian March",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Threats Against Activists & Violence Against Journalists",
      severity: "high",
      details: "Member of Georgian March who authored threatening comments against Tatia Dolidze (former Georgian Youth Delegate to UN). Ministry of Internal Affairs opened investigation into threats. Arrested March 2018 over Rustavi 2 incident. Previously convicted twice for beating.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "TI Georgia: Anatomy of Georgian Neo-Nazism", url: "https://transparency.ge/en/blog/anatomy-georgian-neo-nazism" },
      { title: "Ambebi.ge: Amisulashvili arrest", url: "https://www.ambebi.ge/article/221363/" },
    ],
  },
  {
    id: "331",
    name: "Zaza Shatirishvili",
    position: "Board Member, Georgian Public Broadcaster",
    organization: "Georgian Public Broadcaster",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Public Broadcaster Capture & Far-Right Support",
      severity: "high",
      details: "Current board member of the Public Broadcaster who gave speech at Georgian Mission rally in 2016. Represents infiltration of state media governance by individuals with ties to far-right movements. Part of mechanism enabling Public Broadcaster's transformation into propaganda outlet.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "TI Georgia: Anatomy of Georgian Neo-Nazism", url: "https://transparency.ge/en/blog/anatomy-georgian-neo-nazism" },
    ],
  },
  {
    id: "332",
    name: "Koka Morgoshia",
    position: "Georgian March Activist / Patriot Alliance Member",
    organization: "Georgian March / Patriots Alliance",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Far-Right Organizing & Illegal Political Financing",
      severity: "high",
      details: "Member of Georgian March and Patriots Alliance. Family members donated GEL 96,000 to Patriots Alliance. State Audit Office fined him GEL 180,000 for making illegal donations. Participated in unauthorized talks with South Ossetian side regarding Archil Tatunashvili case. Actively involved in threats against Tatia Dolidze.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "TI Georgia: Anatomy of Georgian Neo-Nazism", url: "https://transparency.ge/en/blog/anatomy-georgian-neo-nazism" },
    ],
  },
  // === JULY 5, 2021 PRIDE ATTACK CONVICTS ===
  // 26 people were convicted in April 2022 for the attacks on journalists during the 2021 Tbilisi Pride
  // 6 received 5-year sentences for the brutal beating of TV Pirveli's Aleksandre Lashkarava and Miranda Baghaturia
  // 19 received 1-3 year sentences, 1 was fined
  // The organizers (Alt-Info founders, Father Spiridon) were never prosecuted
  {
    id: "333",
    name: "Aleksandre Lashkarava Attackers (6 Individuals)",
    position: "Convicted Attackers, July 5, 2021",
    organization: "Far-Right Mob",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Brutal Assault on Journalist Resulting in Death",
      severity: "high",
      details: "Six individuals convicted in April 2022 and sentenced to 5 years each for the brutal beating of TV Pirveli camera operator Aleksandre Lashkarava and journalist Miranda Baghaturia. Lashkarava sustained broken facial bones and a concussion requiring surgery. He was found dead six days later. Baghaturia stated at the verdict: 'I held my breath for 10 months and now I can exhale... Thanks to Lekso, for his death was not in vain.' One attacker was also convicted of causing serious bodily harm to Pirveli Arkhi camera operator Ilya Tvaliashvili.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Convicted - 5 Years Each"],
    sources: [
      { title: "CPJ: Georgia convicts 26 over 2021 attack", url: "https://cpj.org/2022/04/georgia-convicts-26-people-over-2021-attack-on-journalists-by-anti-lgbt-protesters/" },
      { title: "OC Media: Twenty far-right activists convicted", url: "https://oc-media.org/twenty-far-right-activists-convicted-over-5-july-attack-on-journalists/" },
      { title: "Wikipedia: 2021 attack on Tbilisi Pride", url: "https://en.wikipedia.org/wiki/2021_attack_on_Tbilisi_Pride" },
    ],
  },
  {
    id: "334",
    name: "Journalist Attackers Group 1 (7 Individuals)",
    position: "Convicted Attackers, July 5, 2021",
    organization: "Far-Right Mob",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Organized Violence Against Journalists",
      severity: "high",
      details: "Seven individuals convicted in April 2022 for organizing group violence against journalists from Mtavari Arkhi, Formula, Imedi, Tabula, RFE/RL, and Rustavi 2. Four sentenced to 1 year 3 months, two to 1 year 2 months, and one fined 5,000 lari and released. Part of coordinated mob attack on 53+ journalists during the aborted Pride march.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Convicted - 1-1.5 Years Each"],
    sources: [
      { title: "CPJ: Georgia convicts 26 over 2021 attack", url: "https://cpj.org/2022/04/georgia-convicts-26-people-over-2021-attack-on-journalists-by-anti-lgbt-protesters/" },
      { title: "OC Media: Twenty far-right activists convicted", url: "https://oc-media.org/twenty-far-right-activists-convicted-over-5-july-attack-on-journalists/" },
    ],
  },
  {
    id: "335",
    name: "Journalist Attackers Group 2 (7 Individuals)",
    position: "Convicted Attackers, July 5, 2021",
    organization: "Far-Right Mob",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Organized Violence Against Journalists",
      severity: "high",
      details: "Seven individuals convicted in April 2022 for persecution, interference with journalistic activities, and participation in group violence. Sentenced to 1-3 years, with six expected to serve only six months due to time in pre-trial detention. Participated in coordinated attacks on journalists during the anti-LGBTQ violence.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Convicted - 1-3 Years Each"],
    sources: [
      { title: "CPJ: Georgia convicts 26 over 2021 attack", url: "https://cpj.org/2022/04/georgia-convicts-26-people-over-2021-attack-on-journalists-by-anti-lgbt-protesters/" },
      { title: "OC Media: Twenty far-right activists convicted", url: "https://oc-media.org/twenty-far-right-activists-convicted-over-5-july-attack-on-journalists/" },
    ],
  },
  {
    id: "336",
    name: "Guram Palavandishvili",
    position: "Georgian March Leader",
    organization: "Georgian March",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Far-Right Violence Organizer & July 5 Participant",
      severity: "high",
      details: "Leader of Georgian March, a far-right nationalist movement. Police raided his home on July 16, 2021 along with other far-right leaders in connection with July 5 anti-LGBTQ violence. Documented by TI Georgia as key figure in Georgian neo-Nazi ecosystem. Georgian March organized violent rally in 2017 marching through Tbilisi. Connected to international far-right networks.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "Pink News: Georgia police raid far-right leaders", url: "https://www.thepinknews.com/2021/07/16/georgia-lgbt-violence-raid/" },
      { title: "TI Georgia: Anatomy of Georgian Neo-Nazism", url: "https://transparency.ge/en/blog/anatomy-georgian-neo-nazism" },
      { title: "Wikipedia: 2021 attack on Tbilisi Pride", url: "https://en.wikipedia.org/wiki/2021_attack_on_Tbilisi_Pride" },
    ],
  },
  {
    id: "337",
    name: "Prime Minister's July 5 Complicity",
    position: "Government Facilitation of Violence",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "State Facilitation of Anti-LGBTQ Violence",
      severity: "high",
      details: "Prime Minister Irakli Garibashvili called the planned Pride march 'unreasonable' and organized by the 'radical opposition' on the morning of July 5, 2021, effectively signaling government tolerance of violence. After 53 journalists were attacked, he dismissed it as 'some street fight.' Interior Ministry called on Pride organizers to cancel rather than providing security. Despite 102 arrests, organizers (Alt-Info leaders, clergy) were never prosecuted. Garibashvili falsely claimed 'all aggressors' had been arrested by July 23.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "Civil.ge: PM Says Pride March 'Unreasonable'", url: "https://civil.ge/archives/430522" },
      { title: "Civil.ge: 'Some Street Fight' Says Georgian PM", url: "https://civil.ge/archives/433649" },
      { title: "DF Watch: Ombudsman calls for prosecution of organizers", url: "https://dfwatch.net/georgian-ombudsman-names-priest-blogger-as-organizers-of-july-5-anti-lgbtq-rally-and-calls-for-their-prosecution-54836" },
      { title: "CPJ: Georgia convicts 26 over 2021 attack", url: "https://cpj.org/2022/04/georgia-convicts-26-people-over-2021-attack-on-journalists-by-anti-lgbt-protesters/" },
    ],
  },
  {
    id: "338",
    name: "Aleksandre (Lekso) Lashkarava",
    position: "Victim - TV Pirveli Camera Operator",
    organization: "TV Pirveli",
    photo: "/placeholder.svg",
    complicity: {
      nature: "VICTIM - Killed Following July 5 Attack",
      severity: "low",
      details: "VICTIM MEMORIAL: TV Pirveli camera operator brutally beaten by far-right mob while covering attack on Shame Movement offices. Sustained broken facial bones and severe concussion requiring surgery. Found dead at home six days later on July 11, 2021. Government autopsy claimed heroin overdose; family lawyers and independent experts disputed findings. His death sparked renewed protests demanding PM Garibashvili's resignation. His attackers were sentenced to 5 years each.",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "CPJ: Georgian camera operator dies after beating", url: "https://cpj.org/2021/07/georgian-camera-operator-aleksandre-lashkarava-dies-after-beating-by-anti-lgbt-demonstrators/" },
      { title: "OC Media: Calls mount for PM's resignation", url: "https://oc-media.org/calls-mount-for-georgian-pms-resignation-following-journalists-death/" },
      { title: "OC Media: Georgian journalist died of heroin overdose, autopsy claims", url: "https://oc-media.org/georgian-journalist-died-of-heroin-overdose-following-5-july-attack-autopsy-claims/" },
      { title: "Wikipedia: 2021 attack on Tbilisi Pride", url: "https://en.wikipedia.org/wiki/2021_attack_on_Tbilisi_Pride" },
    ],
  },
  // === 2023 TBILISI PRIDE ATTACK (JULY 8, 2023) ===
  // Far-right, nationalist, and ultranationalist groups attacked Pride Fest at Lisi Lake
  // Festival was cancelled and participants evacuated
  {
    id: "339",
    name: "2023 Pride Attack - Far-Right Mob",
    position: "Organized Attack on Lisi Lake Pride Festival",
    organization: "Far-Right Coalition",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Organized Attack on LGBTQ Festival",
      severity: "high",
      details: "On July 8, 2023, far-right, nationalist, and ultranationalist groups organized a violent counter-demonstration against Tbilisi Pride at Lisi Lake. Protesters gathered in Saburtalo District, blocked roads, and marched to the festival venue. They clashed with police, broke through barricades with fences and barbed wire, and stormed the Pride Fest grounds. The attack resulted in property damage, fires, looting of a bar and restaurant, and destruction of the parade stage. Tbilisi Pride was forced to cancel and evacuate participants by bus, stating the Ministry of Internal Affairs 'once again neglected to protect us from violent far-right groups.'",
    },
    dateAdded: "2024-12-22",
    sanctions: [],
    sources: [
      { title: "Wikipedia: 2023 attack on Tbilisi Pride", url: "https://en.wikipedia.org/wiki/2023_attack_on_Tbilisi_Pride" },
      { title: "BBC: Georgia Pride festival stormed by right-wing protesters", url: "https://www.bbc.com/news/world-europe-66145898" },
      { title: "CNN: Tbilisi Pride canceled after violent anti-LGBTQ protests", url: "https://www.cnn.com/2023/07/08/europe/tbilisi-georgia-anti-lgbtq-pride-festival-intl" },
      { title: "The Guardian: Anti-LGBTQ+ protesters break up Pride event", url: "https://www.theguardian.com/world/2023/jul/09/anti-lgbtq-protesters-break-up-pride-event-in-georgian-capital-tbilisi" },
    ],
  },
  {
    id: "340",
    name: "Alexander Darakhvelidze",
    position: "Deputy Interior Minister (2023 Response)",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Failure to Protect Pride Participants",
      severity: "high",
      details: "Deputy Interior Minister who stated after the 2023 Pride attack that 'nobody was harmed during the incident' despite the violent mob storming the festival, starting fires, and causing property damage. His statement minimized the violence and the Interior Ministry's failure to prevent far-right groups from breaking through police barricades. Sanctioned by Baltic states and UK for his role in protest crackdowns in 2024.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["UK Sanctions", "Baltic States Sanctions"],
    sources: [
      { title: "Wikipedia: 2023 attack on Tbilisi Pride", url: "https://en.wikipedia.org/wiki/2023_attack_on_Tbilisi_Pride" },
      { title: "CNN: Tbilisi Pride canceled", url: "https://www.cnn.com/2023/07/08/europe/tbilisi-georgia-anti-lgbtq-pride-festival-intl" },
      { title: "JAM-news: Western sanctions", url: "https://jam-news.net/for-first-time-in-georgias-history-government-is-under-western-sanctions-jamnews-compiles-sanctions-from-2023-to-present/" },
    ],
  },
  {
    id: "341",
    name: "Miller Lagazauri",
    position: "Deputy Director, Special Tasks Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Brutal Beatings & Punitive Squad Operations",
      severity: "high",
      details: "Deputy Director of the Special Tasks Department responsible for violent crackdowns. Added to US Magnitsky List in September 2024 for authorizing and organizing violence against demonstrators. Also sanctioned by UK and Baltic states. Part of the unit that failed to protect Pride participants in both 2021 and 2023 while actively using violence against pro-democracy protesters in 2024.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["US Magnitsky List", "UK Sanctions", "Baltic States Sanctions"],
    sources: [
      { title: "US Treasury: September 2024 Sanctions", url: "https://home.treasury.gov/news/press-releases/jy2580" },
      { title: "JAM-news: Western sanctions", url: "https://jam-news.net/for-first-time-in-georgias-history-government-is-under-western-sanctions-jamnews-compiles-sanctions-from-2023-to-present/" },
      { title: "UK Gov: Sanctions on Georgia", url: "https://www.gov.uk/government/news/uk-sanctions-georgian-officials-for-violence-against-peaceful-protesters" },
    ],
  },
  {
    id: "342",
    name: "Mirza Kezevadze",
    position: "Deputy Director, Special Tasks Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Violent Repression of Protesters",
      severity: "high",
      details: "Deputy Director of the Special Tasks Department added to US Magnitsky List in December 2024 for his role in authorizing and organizing brutal repressions against media representatives, opposition members, and protesters during the 2024 demonstrations. Part of the security apparatus that enables anti-LGBTQ violence while cracking down on pro-democracy protests.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["US Magnitsky List", "Baltic States Sanctions"],
    sources: [
      { title: "US Treasury: December 2024 Sanctions", url: "https://home.treasury.gov/news/press-releases/jy2759" },
      { title: "JAM-news: Western sanctions", url: "https://jam-news.net/for-first-time-in-georgias-history-government-is-under-western-sanctions-jamnews-compiles-sanctions-from-2023-to-present/" },
    ],
  },
  {
    id: "343",
    name: "Vaja Siradze",
    position: "Director, Patrol Police Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Mass Arbitrary Detentions",
      severity: "high",
      details: "Director of the Patrol Police Department sanctioned by Baltic states for his role in suppressing lawful peaceful protests in Georgia. Oversaw patrol police operations during the December 2024 crackdowns. Part of the police leadership structure that consistently fails to protect LGBTQ events while violently suppressing pro-democracy demonstrations.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Baltic States Sanctions"],
    sources: [
      { title: "JAM-news: Baltic States Sanctions", url: "https://jam-news.net/for-first-time-in-georgias-history-government-is-under-western-sanctions-jamnews-compiles-sanctions-from-2023-to-present/" },
      { title: "Civil.ge: Baltic States Expand Sanctions", url: "https://civil.ge/archives/666721" },
    ],
  },
  {
    id: "344",
    name: "Shalva Bedoidze",
    position: "Deputy Minister of Internal Affairs",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Oversight of Police Violence",
      severity: "high",
      details: "Deputy Minister of Internal Affairs sanctioned by the Baltic states in December 2024 for his role in the violent suppression of peaceful protests. Part of the MIA leadership that enables both anti-LGBTQ violence and crackdowns on pro-democracy demonstrators.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Baltic States Sanctions"],
    sources: [
      { title: "JAM-news: Baltic States Sanctions", url: "https://jam-news.net/for-first-time-in-georgias-history-government-is-under-western-sanctions-jamnews-compiles-sanctions-from-2023-to-present/" },
    ],
  },
  {
    id: "345",
    name: "Sulkhan Tamazashvili",
    position: "Head, Tbilisi Police Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Violent Attacks on Journalists and Protesters",
      severity: "high",
      details: "Head of the Tbilisi Police Department sanctioned by the UK in December 2024 for authorizing and organizing violent attacks on journalists and peaceful protesters. Directly responsible for police operations in Tbilisi during the brutal December 2024 crackdowns.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["UK Sanctions"],
    sources: [
      { title: "UK Gov: Sanctions on Georgia", url: "https://www.gov.uk/government/news/uk-sanctions-georgian-officials-for-violence-against-peaceful-protesters" },
      { title: "JAM-news: British Sanctions", url: "https://jam-news.net/for-first-time-in-georgias-history-government-is-under-western-sanctions-jamnews-compiles-sanctions-from-2023-to-present/" },
    ],
  },
  {
    id: "346",
    name: "Teimuraz Kupatadze",
    position: "Director, Central Criminal Police Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Criminal Police Operations Against Activists",
      severity: "high",
      details: "Director of the Central Criminal Police Department sanctioned by the Baltic states in December 2024. Coordinates criminal police operations including raids and arrests of activists. Part of the systematic persecution apparatus targeting government critics.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Baltic States Sanctions"],
    sources: [
      { title: "JAM-news: Baltic States Sanctions", url: "https://jam-news.net/for-first-time-in-georgias-history-government-is-under-western-sanctions-jamnews-compiles-sanctions-from-2023-to-present/" },
      { title: "Civil.ge: Baltic States Expand Sanctions", url: "https://civil.ge/archives/666721" },
    ],
  },
  // === ADDITIONAL SANCTIONED OFFICIALS FROM 2024 ===
  {
    id: "347",
    name: "Irakli Shengelia",
    position: "Deputy Chairman, Court of Appeals",
    organization: "Georgian Judiciary",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Judicial Corruption & Political Case Management",
      severity: "high",
      details: "Deputy Chairman of the Court of Appeals sanctioned by the US in April 2023 for involvement in significant corruption. Part of the 'judicial clan' that controls case assignments and ensures verdicts align with ruling party interests.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["US Visa Sanctions"],
    sources: [
      { title: "US State Department: Designations of Georgian Judges", url: "https://ge.usembassy.gov/public-designations-of-four-individuals-associated-with-the-georgian-judiciary-due-to-involvement-in-significant-corruption/" },
      { title: "JAM-news: April 2023 Judicial Sanctions", url: "https://jam-news.net/for-first-time-in-georgias-history-government-is-under-western-sanctions-jamnews-compiles-sanctions-from-2023-to-present/" },
    ],
  },
  {
    id: "348",
    name: "Valerian Tsertsvadze",
    position: "Former Chairman, Court of Appeals",
    organization: "Georgian Judiciary",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Judicial Corruption & System Capture",
      severity: "high",
      details: "Former Chairman of the Court of Appeals sanctioned by the US in April 2023 for involvement in significant corruption. Part of the judicial leadership that established the captured court system where politically sensitive cases are assigned to compliant judges.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["US Visa Sanctions"],
    sources: [
      { title: "US State Department: Designations of Georgian Judges", url: "https://ge.usembassy.gov/public-designations-of-four-individuals-associated-with-the-georgian-judiciary-due-to-involvement-in-significant-corruption/" },
      { title: "JAM-news: April 2023 Judicial Sanctions", url: "https://jam-news.net/for-first-time-in-georgias-history-government-is-under-western-sanctions-jamnews-compiles-sanctions-from-2023-to-present/" },
    ],
  },
  // Duplicate removed: Shalva Tadumadze ID 349 - consolidated into ID 418
  // Duplicate removed: Tea Tsulukiani ID 350 - consolidated into ID 421
  {
    id: "351",
    name: "Goga Khaindrava",
    position: "Ideologist, Georgian Dream",
    organization: "Georgian Dream Party",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Anti-Western Propaganda & Disinformation",
      severity: "high",
      details: "Georgian Dream ideologist and propagandist sanctioned by Lithuania and Ukraine in December 2024. Key figure in developing and spreading anti-Western conspiracy theories and the 'Global War Party' narrative used to justify the government's authoritarian pivot.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Lithuania Sanctions", "Ukraine Sanctions"],
    sources: [
      { title: "JAM-news: Lithuania Sanctions", url: "https://jam-news.net/for-first-time-in-georgias-history-government-is-under-western-sanctions-jamnews-compiles-sanctions-from-2023-to-present/" },
    ],
  },
  {
    id: "352",
    name: "Kakha Bekauri",
    position: "Chairman, National Communications Commission",
    organization: "National Communications Commission of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Media Regulation for Political Purposes",
      severity: "high",
      details: "Chairman of the National Communications Commission sanctioned by Lithuania and Ukraine in December 2024. Oversees media regulation and has been accused of using the commission to pressure independent media while protecting pro-government outlets.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Lithuania Sanctions", "Ukraine Sanctions"],
    sources: [
      { title: "JAM-news: Lithuania Sanctions", url: "https://jam-news.net/for-first-time-in-georgias-history-government-is-under-western-sanctions-jamnews-compiles-sanctions-from-2023-to-present/" },
    ],
  },
  {
    id: "353",
    name: "Irakli Karseladze",
    position: "Minister of Regional Development and Infrastructure",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Government Minister Enabling Authoritarianism",
      severity: "high",
      details: "Minister of Regional Development and Infrastructure sanctioned by Lithuania and Ukraine in December 2024. Part of the cabinet that has overseen Georgia's authoritarian pivot and the violent crackdown on pro-European protests.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Lithuania Sanctions", "Ukraine Sanctions"],
    sources: [
      { title: "JAM-news: Lithuania Sanctions", url: "https://jam-news.net/for-first-time-in-georgias-history-government-is-under-western-sanctions-jamnews-compiles-sanctions-from-2023-to-present/" },
    ],
  },
  {
    id: "354",
    name: "Otar Partskhaladze",
    position: "Former Prosecutor General",
    organization: "FSB Collaborator",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Russian FSB Collaboration",
      severity: "high",
      details: "Former Prosecutor General sanctioned by the US in September 2023 for cooperation with Russia's FSB to promote a pro-Russian course in Georgian politics. First individual added to US sanctions for direct Russian intelligence collaboration. Also sanctioned by Lithuania and Ukraine. Had both Russian and Georgian citizenship; Georgian citizenship was revoked after sanctions.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["US Financial Sanctions", "Lithuania Sanctions", "Ukraine Sanctions"],
    sources: [
      { title: "TI Georgia: Why Otar Partskhaladze Sanctioned", url: "https://transparency.ge/en/post/why-us-has-imposed-sanctions-otar-partskhaladze-who-has-been-untouchable-georgian-authorities" },
      { title: "US Treasury: Partskhaladze Sanctions", url: "https://home.treasury.gov/news/press-releases/jy1673" },
      { title: "Interpressnews: US designates former chief prosecutor", url: "https://www.interpressnews.ge/en/article/127181-us-department-of-state-designates-former-chief-prosecutor-of-georgia-otar-partskhaladze-who-was-leveraged-by-the-fsb-to-influence-georgian-society-and-politics-for-the-benefit-of-russia/" },
    ],
  },
  // === 2013 MAY 17 IDAHOT ATTACK ===
  {
    id: "355",
    name: "2013 May 17 Attack - Priest-Led Mob",
    position: "Organized Attack on IDAHOT Demonstration",
    organization: "Georgian Orthodox Church-Affiliated Mob",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Church-Organized Homophobic Violence",
      severity: "high",
      details: "On May 17, 2013, thousands of counter-protesters led by Georgian Orthodox priests violently attacked a small group of LGBTQ activists marking the International Day Against Homophobia and Transphobia (IDAHOT) in Tbilisi's Pushkin Park. The mob, estimated at 20,000 people, broke through police lines, attacked activists with chairs, stones, and sticks, and chased them through the streets. Despite video evidence of priests leading violence, all defendants were later acquitted. This attack established a pattern of impunity for anti-LGBTQ violence that continued in 2021 and 2023.",
    },
    dateAdded: "2024-12-23",
    sanctions: [],
    sources: [
      { title: "Amnesty International: Homophobic violence mars Tbilisi Pride event", url: "https://www.amnesty.org/en/latest/press-release/2013/05/georgia-homophobic-violence-mars-tbilisi-pride-event/" },
      { title: "The New Yorker: What Was Behind Georgia's Anti-Gay Rally?", url: "https://www.newyorker.com/news/news-desk/what-was-behind-georgias-anti-gay-rally" },
      { title: "NPR: Anti-Gay Riot Tests Balance Between Church, State", url: "https://www.npr.org/sections/parallels/2013/07/30/204511294/GEORGIA-CHURCH-ANTI-GAY-RIOT" },
      { title: "Civil.ge: March of Gay Activists Ends in Scuffle", url: "https://civil.ge/archives/121936" },
    ],
  },
  {
    id: "356",
    name: "Father Iotam",
    position: "Priest, Attack Organizer",
    organization: "Georgian Orthodox Church",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Leading Violent Mob Against LGBTQ Activists",
      severity: "high",
      details: "Georgian Orthodox priest who became infamous after being filmed chasing LGBTQ activists through the streets of Tbilisi wielding a chair leg during the May 17, 2013 attack. Despite video evidence clearly showing him participating in violence, charges were dropped. Became an 'Internet meme' in Georgia for his violent pursuit of activists. His impunity symbolizes the Orthodox Church's protected status in perpetrating homophobic violence.",
    },
    dateAdded: "2024-12-23",
    sanctions: [],
    sources: [
      { title: "Eurasianet: Police Press Charges against Priests for LGBT Rally Attack", url: "https://eurasianet.org/georgia-police-press-charges-against-priests-for-lgbt-rally-attack" },
      { title: "DFWatch: All defendants acquitted in 2013 anti-gay attack case", url: "https://dfwatch.net/all-defendants-acquitted-in-2013-anti-gay-attack-case-38756/" },
    ],
  },
  {
    id: "357",
    name: "2013 Attack Priests (Charged Then Acquitted)",
    position: "Priests Charged for Violence",
    organization: "Georgian Orthodox Church",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Participation in Organized Violence",
      severity: "high",
      details: "Multiple Georgian Orthodox priests were initially charged by police for their participation in the violent May 17, 2013 attack on LGBTQ activists. Despite video evidence of priests leading the mob and participating in beatings, all were eventually acquitted. The acquittals signaled to Georgian society that the Orthodox Church operates above the law and established impunity for religious figures engaging in hate violence.",
    },
    dateAdded: "2024-12-23",
    sanctions: [],
    sources: [
      { title: "Eurasianet: Police Press Charges against Priests", url: "https://eurasianet.org/georgia-police-press-charges-against-priests-for-lgbt-rally-attack" },
      { title: "DFWatch: All defendants acquitted", url: "https://dfwatch.net/all-defendants-acquitted-in-2013-anti-gay-attack-case-38756/" },
    ],
  },
  // === UK-SANCTIONED OFFICIALS 2025 ===
  {
    id: "358",
    name: "Giorgi Gabitashvili",
    position: "General Prosecutor",
    organization: "Prosecutor's Office of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Failure to Investigate Police Violence",
      severity: "high",
      details: "General Prosecutor of Georgia sanctioned by the UK in 2025 - becoming the first country to sanction Georgia's chief prosecutor. Designated for his role in failing to properly investigate and prosecute police violence against peaceful protesters and journalists during the 2024 crackdowns. His office has instead focused on prosecuting opposition leaders and activists.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["UK Sanctions"],
    sources: [
      { title: "UK Gov: First state to sanction Georgia's General Prosecutor", url: "https://www.gov.uk/government/news/uk-sanctions-georgian-officials-responsible-for-allowing-brutal-police-violence" },
      { title: "The Independent: Britain sanctions Georgia's state prosecutor", url: "https://www.independent.co.uk/news/uk/home-news/georgia-david-lammy-tbilisi-kremlin-british-government-b2731022.html" },
      { title: "Babel: Britain imposes sanctions on prosecutor general", url: "https://babel.ua/en/news/117038-britain-imposes-sanctions-on-georgia-s-prosecutor-general-and-three-other-officials" },
    ],
  },
  {
    id: "359",
    name: "Karlo Katsitadze",
    position: "Head, Special Investigation Service",
    organization: "Special Investigation Service of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Failure to Investigate Human Rights Abuses",
      severity: "high",
      details: "Head of the Special Investigation Service sanctioned by the UK in 2025 for failure to properly investigate the crackdown on protesters. The Special Investigation Service is supposed to independently investigate cases of abuse by law enforcement, but under his leadership has failed to hold police accountable for violence against demonstrators and journalists.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["UK Sanctions"],
    sources: [
      { title: "UK Gov: Sanctions on Georgian officials", url: "https://www.gov.uk/government/news/uk-sanctions-georgian-officials-responsible-for-allowing-brutal-police-violence" },
      { title: "Babel: Britain imposes sanctions", url: "https://babel.ua/en/news/117038-britain-imposes-sanctions-on-georgia-s-prosecutor-general-and-three-other-officials" },
    ],
  },
  {
    id: "360",
    name: "Badri Shonia",
    position: "Judge, High Council of Justice",
    organization: "Georgian Judiciary",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Judicial Corruption & System Capture",
      severity: "high",
      details: "Member of the High Council of Justice and part of the informal 'clan of judges' that controls the Georgian judicial system. Sanctioned by the UK in April 2025 under the Global Anti-Corruption Sanctions Regulations for serious corruption. Works alongside Levan Murusidze and Mikheil Chinchaladze to manage the assignment of politically sensitive cases to compliant judges.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["UK Sanctions"],
    sources: [
      { title: "Civil.ge: UK Sanctions Senior Georgian Judges", url: "https://civil.ge/archives/673347" },
      { title: "OC Media: UK sanctions Georgian 'Clan of Judges'", url: "https://oc-media.org/uk-imposes-financial-sanctions-on-two-members-of-group-locally-known-as-georgias-clan-of-judges/" },
      { title: "JAM-news: UK imposes sanctions on Georgian judges", url: "https://jam-news.net/uk-imposes-sanctions-on-georgian-judges/" },
    ],
  },
  {
    id: "361",
    name: "Kakhi Kakhishvili",
    position: "First Deputy Minister of Internal Affairs",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Command Responsibility for Police Violence",
      severity: "high",
      details: "First Deputy Minister of Internal Affairs sanctioned by the UK in 2025 for his role in allowing serious human rights violations during the suppression of peaceful protests. Part of the MIA command structure that ordered and enabled brutal police tactics against demonstrators and journalists.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["UK Sanctions"],
    sources: [
      { title: "UK Gov: Sanctions on Georgian officials", url: "https://www.gov.uk/government/news/uk-sanctions-georgian-officials-responsible-for-allowing-brutal-police-violence" },
      { title: "Babel: UK sanctions four Georgian officials", url: "https://babel.ua/en/news/117038-britain-imposes-sanctions-on-georgia-s-prosecutor-general-and-three-other-officials" },
    ],
  },
  // === ADDITIONAL OLIGARCHS & FSB COLLABORATORS ===
  {
    id: "362",
    name: "Georgian Orthodox Church Leadership",
    position: "Institutional Complicity",
    organization: "Georgian Orthodox Church",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Systematic Incitement of Homophobic Violence",
      severity: "high",
      details: "The Georgian Orthodox Church has systematically organized and incited violence against LGBTQ people since at least 2013. The Church called for banning IDAHOT demonstrations, organized counter-protests that turned violent in 2013, 2021, and 2023, and provided religious legitimacy for violent mobs. Church leaders called July 5 a 'day of spiritual victory' after the 2021 attack. No Church official has ever been held accountable for inciting or participating in violence.",
    },
    dateAdded: "2024-12-23",
    sanctions: [],
    sources: [
      { title: "Amnesty International: 2013 Violence", url: "https://www.amnesty.org/en/latest/press-release/2013/05/georgia-homophobic-violence-mars-tbilisi-pride-event/" },
      { title: "NPR: Church-State Balance", url: "https://www.npr.org/sections/parallels/2013/07/30/204511294/GEORGIA-CHURCH-ANTI-GAY-RIOT" },
    ],
  },
  {
    id: "363",
    name: "Grigol Liluashvili",
    position: "Former Head, State Security Service",
    organization: "State Security Service of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Surveillance Infrastructure & Call Center Schemes",
      severity: "high",
      details: "Played a pivotal role in establishing the surveillance infrastructure that underpins the current regime. Linked to 'call center' fraud schemes generating illicit revenue and illegal wiretapping of opposition leaders. Laid the groundwork for the surveillance state that now monitors and persecutes opposition activists.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Investigation"],
    sources: [
      { title: "TI Georgia: Alleged Cases of High-Level Corruption", url: "https://transparency.ge/en/blog/alleged-cases-high-level-corruption-periodically-updated-list" },
    ],
  },
  {
    id: "364",
    name: "EHRAC/ECtHR Case - Aghdgomelashvili and Japaridze v Georgia",
    position: "Police Raid & Ill-Treatment Case",
    organization: "European Court of Human Rights",
    photo: "/placeholder.svg",
    complicity: {
      nature: "State-Sanctioned Police Violence Against LGBTQ NGO",
      severity: "high",
      details: "The European Court of Human Rights found that Georgian police ill-treated NGO staff and members of the LGBT community during a homophobic raid. This ruling documented systematic discrimination and violence by Georgian law enforcement against LGBTQ people, establishing international legal precedent for the state's failure to protect vulnerable groups.",
    },
    dateAdded: "2024-12-23",
    sanctions: [],
    sources: [
      { title: "EHRAC: Aghdgomelashvili and Japaridze v Georgia", url: "https://ehrac.org.uk/en_gb/key-ehrac-cases/aghdgomelashvili-and-japaridze-v-georgia/" },
    ],
  },
  {
    id: "365",
    name: "TI Georgia Sanctioned List Reference",
    position: "Documentation: 200+ Sanctioned Individuals",
    organization: "Transparency International Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Comprehensive Documentation of Regime Complicity",
      severity: "high",
      details: "Transparency International Georgia maintains a comprehensive list documenting over 200 representatives of Georgian Dream who have been sanctioned by Western countries. This includes 119 publicly named individuals and additional anonymous visa restrictions. The list serves as a key reference for accountability efforts.",
    },
    dateAdded: "2024-12-23",
    sanctions: [],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
      { title: "TI Georgia: Full Sanctions List", url: "https://transparency.ge/en/blog/individuals-sanctioned-or-recommended-sanctions-various-countries-context-georgia" },
    ],
  },
  // === JUDGES FROM REPRESSION CASES ===
  {
    id: "366",
    name: "Zviad Tsekvava",
    position: "Judge",
    organization: "Tbilisi City Court",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Systematic Political Persecution Through Courts",
      severity: "high",
      details: "Most active political judge in Georgia's repression apparatus with 20+ documented cases. Fined Nika Gvaramia, Saba Skhvitaridze, and numerous protesters. Reportedly made homophobic slurs during proceedings. Fined Giorgi Mtskhvetadze, Giorgi Matiashvili, and dozens of other activists for participating in peaceful protests against the Foreign Agents Law.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Repression Cases Documentation", url: "https://docs.google.com/spreadsheets/d/1vjgz6PpCQdLdLd6nbLwbE8RNqzDZqfvt-MjCq9cF9ow" },
      { title: "Formula TV: Court Proceedings", url: "https://formulanews.ge" },
      { title: "TV Pirveli: Political Court Cases", url: "https://tvpirveli.ge" },
    ],
  },
  {
    id: "367",
    name: "Nino Enukidze",
    position: "Judge",
    organization: "Tbilisi City Court",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Systematic Fining of Journalists and Protesters",
      severity: "high",
      details: "Issued politically motivated fines against journalists and protesters. Fined Giorgi Kldiashvili 5,000 GEL, Rati Tsverava 3,000 GEL, and numerous other activists. Issued formal warnings and substantial fines designed to financially cripple opposition voices and create chilling effect on protest participation.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Repression Cases Documentation", url: "https://docs.google.com/spreadsheets/d/1vjgz6PpCQdLdLd6nbLwbE8RNqzDZqfvt-MjCq9cF9ow" },
      { title: "Civil.ge: Court Fines Protesters", url: "https://civil.ge" },
    ],
  },
  {
    id: "368",
    name: "Lela Maridashvili",
    position: "Judge",
    organization: "Tbilisi City Court",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political Detention Orders & Fabricated Drug Charges",
      severity: "high",
      details: "Set 20,000 GEL bail for former Defense Minister Irakli Okruashvili on political charges. Approved detention based on allegedly planted drug evidence for Beka Akhobadze. Ordered detention for Giorgi Gigauri. Pattern of issuing maximum bail and detention orders for political opponents while fast-tracking prosecution requests.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Repression Cases Documentation", url: "https://docs.google.com/spreadsheets/d/1vjgz6PpCQdLdLd6nbLwbE8RNqzDZqfvt-MjCq9cF9ow" },
      { title: "Interpressnews: Okruashvili Bail", url: "https://www.interpressnews.ge" },
    ],
  },
  {
    id: "369",
    name: "Lela Tsagareishvili",
    position: "Judge",
    organization: "Tbilisi City Court",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Punitive Fines Against Opposition Politicians",
      severity: "high",
      details: "Fined opposition politician Zurab Japaridze 3,500 GEL, Vakhtang Khvintevani 5,000 GEL, and Gia Jvarsheishvili 3,500 GEL for participating in protests. Consistently issues maximum fines against opposition figures while dismissing complaints about police violence. Part of coordinated judicial effort to financially punish political opposition.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Repression Cases Documentation", url: "https://docs.google.com/spreadsheets/d/1vjgz6PpCQdLdLd6nbLwbE8RNqzDZqfvt-MjCq9cF9ow" },
      { title: "TV Pirveli: Opposition Fines", url: "https://tvpirveli.ge" },
    ],
  },
  {
    id: "370",
    name: "Mikheil Jinjolia",
    position: "Judge",
    organization: "Tbilisi City Court",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Multi-Year Prison Sentences for Protesters",
      severity: "high",
      details: "Sentenced four protesters to 2-5 years in prison: Ucha Abashidze, Mariam Iashvili, Giorgi Kuchuashvili, and Davit Koldari. These are among the harshest sentences imposed on peaceful protesters in Georgia's post-independence history. Charges based on 'group violence' allegations contradicted by video evidence showing police as aggressors.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Repression Cases Documentation", url: "https://docs.google.com/spreadsheets/d/1vjgz6PpCQdLdLd6nbLwbE8RNqzDZqfvt-MjCq9cF9ow" },
      { title: "Human Rights Center: Political Prisoners", url: "https://www.hrc.ge" },
      { title: "Civil.ge: Protester Sentences", url: "https://civil.ge" },
    ],
  },
  {
    id: "371",
    name: "Koba Chagunava",
    position: "Judge",
    organization: "Tbilisi City Court",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Criminalizing Free Speech on Social Media",
      severity: "medium",
      details: "Fined journalist Lasha Jioshvili 3,000 GEL for a Facebook post criticizing police conduct during protests. This case exemplifies the regime's effort to extend repression to online speech, creating precedent for punishing social media criticism of state violence.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Repression Cases Documentation", url: "https://docs.google.com/spreadsheets/d/1vjgz6PpCQdLdLd6nbLwbE8RNqzDZqfvt-MjCq9cF9ow" },
      { title: "Formula TV: Journalist Fined", url: "https://formulanews.ge" },
    ],
  },
  {
    id: "372",
    name: "Nana Shamatava",
    position: "Judge",
    organization: "Tbilisi City Court",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Excessive Bail for Political Detainees",
      severity: "medium",
      details: "Set 20,000 GEL bail for opposition politician Zurab Japaridze and 10,000 GEL bail for Givi Targamadze. Bail amounts designed to be punitive rather than ensuring court appearance, effectively using financial pressure as tool of political repression.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Repression Cases Documentation", url: "https://docs.google.com/spreadsheets/d/1vjgz6PpCQdLdLd6nbLwbE8RNqzDZqfvt-MjCq9cF9ow" },
      { title: "Interpressnews: Opposition Bail Hearings", url: "https://www.interpressnews.ge" },
    ],
  },
  {
    id: "373",
    name: "Levan Tsagareishvili",
    position: "Judge",
    organization: "Tbilisi City Court",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Post-Raid Prosecution of Activists",
      severity: "medium",
      details: "Fined Isako Devidze 3,500 GEL following a police home search. Case exemplifies pattern of police conducting raids on activists' homes followed by compliant judges rubber-stamping charges based on evidence seized during these intimidation operations.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Repression Cases Documentation", url: "https://docs.google.com/spreadsheets/d/1vjgz6PpCQdLdLd6nbLwbE8RNqzDZqfvt-MjCq9cF9ow" },
    ],
  },
  {
    id: "374",
    name: "Eka Barbakadze",
    position: "Judge",
    organization: "Tbilisi City Court",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Excessive Bail for Opposition Politicians",
      severity: "medium",
      details: "Set 50,000 GEL bail for Badri Japaridze on political charges—one of the highest bail amounts imposed on protesters. Such extreme bail amounts function as de facto detention for those unable to pay, while financially devastating those who can.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Repression Cases Documentation", url: "https://docs.google.com/spreadsheets/d/1vjgz6PpCQdLdLd6nbLwbE8RNqzDZqfvt-MjCq9cF9ow" },
    ],
  },
  {
    id: "375",
    name: "Manuchar Tsatsua",
    position: "Judge",
    organization: "Tbilisi City Court",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Punitive Fines for Protest Participation",
      severity: "medium",
      details: "Fined Levan Sanikidze 5,000 GEL for participating in protests against the Foreign Agents Law. Part of systematic judicial campaign to impose maximum financial penalties on protesters to deter future demonstrations.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Repression Cases Documentation", url: "https://docs.google.com/spreadsheets/d/1vjgz6PpCQdLdLd6nbLwbE8RNqzDZqfvt-MjCq9cF9ow" },
    ],
  },
  {
    id: "376",
    name: "Salikh Shainidze",
    position: "Judge",
    organization: "Batumi City Court",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Regional Judicial Persecution of Journalists",
      severity: "medium",
      details: "Fined journalist Mzia Amaghlobeli 2,000 GEL at Batumi City Court. Demonstrates that judicial persecution of journalists and activists extends beyond Tbilisi to regional courts, indicating nationwide coordination of repression.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Repression Cases Documentation", url: "https://docs.google.com/spreadsheets/d/1vjgz6PpCQdLdLd6nbLwbE8RNqzDZqfvt-MjCq9cF9ow" },
      { title: "Batumelebi: Journalist Case", url: "https://batumelebi.netgazeti.ge" },
    ],
  },
  {
    id: "377",
    name: "Ketevan Jachvadze",
    position: "Judge",
    organization: "Tbilisi City Court",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Prolonged Detention on Group Violence Charges",
      severity: "medium",
      details: "Kept protesters in prolonged custody on 'group violence' charges despite video evidence contradicting prosecution claims. Refused to release detainees pending trial, ensuring maximum psychological and physical hardship for political prisoners.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Repression Cases Documentation", url: "https://docs.google.com/spreadsheets/d/1vjgz6PpCQdLdLd6nbLwbE8RNqzDZqfvt-MjCq9cF9ow" },
      { title: "Human Rights Center: Detention Monitoring", url: "https://www.hrc.ge" },
    ],
  },
  {
    id: "378",
    name: "Mikheil Kinkolia",
    position: "Judge",
    organization: "Tbilisi City Court",
    photo: "/placeholder.svg",
    complicity: {
      nature: "4-Year Sentence on Fabricated Drug Charges",
      severity: "high",
      details: "Sentenced Giorgi Shanidze to 4 years imprisonment on drug charges widely believed to have been planted by police. The use of fabricated drug evidence is a hallmark tactic of authoritarian regimes to imprison political opponents with plausible deniability.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Repression Cases Documentation", url: "https://docs.google.com/spreadsheets/d/1vjgz6PpCQdLdLd6nbLwbE8RNqzDZqfvt-MjCq9cF9ow" },
      { title: "OC Media: Political Drug Cases", url: "https://oc-media.org" },
    ],
  },
  // === PROPAGANDISTS ===
  {
    id: "379",
    name: "Shalva Ramishvili",
    position: "Founder & Host",
    organization: "POSTV",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Pro-Russian Propaganda & Anti-Western Disinformation",
      severity: "high",
      details: "Founder of POSTV, Georgia's primary pro-Russian propaganda outlet. Infamously declared 'Ukraine's defeat is our victory.' Spreads anti-Western disinformation, promotes conspiracy theories about the 'Global War Party,' and provides media cover for regime repression. POSTV systematically targets civil society activists and journalists for harassment campaigns.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "POSTV Anti-Western Statements", url: "https://mythdetector.ge" },
      { title: "Repression Cases: Media Targeting", url: "https://docs.google.com/spreadsheets/d/1vjgz6PpCQdLdLd6nbLwbE8RNqzDZqfvt-MjCq9cF9ow" },
    ],
  },
  {
    id: "380",
    name: "Vato Shakarashvili",
    position: "Leader",
    organization: "United Neutral Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Physical Assault on Journalists & Anti-Western Incitement",
      severity: "high",
      details: "Leader of 'United Neutral Georgia' movement promoting pro-Russian, anti-Western agenda. Physically assaulted journalist Vasil Mamniashvili during coverage of political events. Leads street-level intimidation campaigns against pro-European demonstrators. Organization serves as civilian auxiliary to state repression apparatus.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Repression Cases: Journalist Assault", url: "https://docs.google.com/spreadsheets/d/1vjgz6PpCQdLdLd6nbLwbE8RNqzDZqfvt-MjCq9cF9ow" },
      { title: "Coalition for Media Advocacy: Attack Documentation", url: "https://mediacoalition.ge" },
    ],
  },
  {
    id: "381",
    name: "Natia Beridze",
    position: "Producer",
    organization: "POSTV",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Coordinated Harassment Campaigns Against Victims",
      severity: "medium",
      details: "POSTV producer who targeted protester Vitali Guguchia with a coordinated smear campaign after he was beaten by police. Pattern of re-victimizing those harmed by state violence through character assassination and doxxing. Uses media platform to amplify regime narratives and discredit victims of repression.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Repression Cases: Vitali Guguchia Case", url: "https://docs.google.com/spreadsheets/d/1vjgz6PpCQdLdLd6nbLwbE8RNqzDZqfvt-MjCq9cF9ow" },
    ],
  },
  {
    id: "382",
    name: "Tinatin Berdzenishvili",
    position: "General Director",
    organization: "Georgian Public Broadcaster (GPB)",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Capture of Public Broadcasting & Journalist Purges",
      severity: "high",
      details: "As General Director of Georgia's Public Broadcaster, dismissed journalists who criticized editorial independence and regime alignment. Transformed GPB from independent public media into government mouthpiece. Systematic purging of professional journalists who refused to follow pro-government editorial line. Public broadcaster now amplifies regime narratives while ignoring or downplaying protest coverage.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Reporters Without Borders: Georgia Press Freedom", url: "https://rsf.org/en/country/georgia" },
      { title: "Georgian Charter of Journalistic Ethics", url: "https://qartia.ge" },
    ],
  },
  // === ADDITIONAL JUDGES FROM REPRESSION CASES ===
  {
    id: "383",
    name: "Irakli Khuskivadze",
    position: "Judge",
    organization: "Tbilisi City Court",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Mass Pre-Trial Detention on Group Violence Charges",
      severity: "high",
      details: "On December 6, 2024, sentenced 8 protesters to pre-trial detention on charges of organizing, leading, and participating in group violence (facing 4-9 years): Zviad Tsetskhladze, Vasil Kadzelashvili, Vepkhia Kasradze, Irakli Miminoshvili, Insaf Aliyev, Tornike Goshadze, and Giorgi Giorgadze. Pattern of mass detention orders designed to intimidate and suppress protest movement.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "TV Pirveli: Mass Detention Orders", url: "https://tvpirveli.ge/ka/siaxleebi/sazogadoeba/88253-mosamartle-khuskivadzem-8-ve-dakavebuli-patimrobashi-gaushva" },
      { title: "Repression Cases Documentation", url: "https://docs.google.com/spreadsheets/d/1vjgz6PpCQdLdLd6nbLwbE8RNqzDZqfvt-MjCq9cF9ow" },
    ],
  },
  {
    id: "384",
    name: "Nato Khujadze",
    position: "Judge",
    organization: "Tbilisi City Court",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Detention of Torture Victim",
      severity: "high",
      details: "Remanded Saba Skhvitaridze in custody on January 28, 2025, despite his documented claims of being abducted and tortured by police. Accused of assaulting police officer Mirian Kavtaradze. Case exemplifies judicial complicity in covering up police torture by imprisoning victims who report abuse.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "TV Pirveli: Skhvitaridze Detention", url: "https://tvpirveli.ge/ka/siaxleebi/sazogadoeba/92795-mosamartle-nato-khujadzem-saba-skhvitaridze-patimrobashi-datova" },
      { title: "Repression Cases Documentation", url: "https://docs.google.com/spreadsheets/d/1vjgz6PpCQdLdLd6nbLwbE8RNqzDZqfvt-MjCq9cF9ow" },
    ],
  },
  {
    id: "385",
    name: "Lela Kalichenko",
    position: "Judge",
    organization: "Tbilisi City Court",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Detention Orders on Drug & Violence Charges",
      severity: "high",
      details: "Issued multiple detention orders against protesters: remanded Tedo Abramov in custody on drug charges (detained December 7), upheld pre-trial detention for Daniel Mumladze and Guram Khutashvili for damaging surveillance cameras, and detained Saba Jikia for allegedly assaulting Special Tasks Department officer. Pattern of maximum security measures for political detainees.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "TV Pirveli: Abramov Detention", url: "https://tvpirveli.ge/ka/siaxleebi/sazogadoeba/92798-mosamartle-lela-kalichenkom-22-tslis-aqtivisti-patimrobashi-datova" },
      { title: "Repression Cases Documentation", url: "https://docs.google.com/spreadsheets/d/1vjgz6PpCQdLdLd6nbLwbE8RNqzDZqfvt-MjCq9cF9ow" },
    ],
  },
  {
    id: "386",
    name: "Giorgi Gelashvili",
    position: "Judge",
    organization: "Tbilisi City Court",
    photo: "/placeholder.svg",
    complicity: {
      nature: "5-Year Prison Sentence for Protester",
      severity: "high",
      details: "Sentenced Giorgi Okmelashvili to five years in prison on February 3, 2025, for allegedly attacking a police officer during May 2024 protests. Supporters protested outside the court. Case represents one of the harshest sentences imposed on pro-European demonstrators.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Repression Cases Documentation", url: "https://docs.google.com/spreadsheets/d/1vjgz6PpCQdLdLd6nbLwbE8RNqzDZqfvt-MjCq9cF9ow" },
    ],
  },
  {
    id: "387",
    name: "Nino Tarashvili",
    position: "Judge",
    organization: "Tbilisi City Court",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Detention for Alleged Molotov Cocktail Attack",
      severity: "medium",
      details: "Remanded Anzor Kvaratskhelia in detention on January 29, 2025, charged with allegedly assaulting a police officer by throwing a 'Molotov Cocktail.' Part of coordinated judicial response to protests using maximum pre-trial detention.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Mtavari TV: Kvaratskhelia Case", url: "https://mtavari.tv/news/175896-anzor-kvaratskhelia-romelsats-politsielebis" },
      { title: "Repression Cases Documentation", url: "https://docs.google.com/spreadsheets/d/1vjgz6PpCQdLdLd6nbLwbE8RNqzDZqfvt-MjCq9cF9ow" },
    ],
  },
  {
    id: "388",
    name: "Aleksandre Goguadze",
    position: "Judge",
    organization: "Batumi City Court",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Systematic Fining of Regional Protesters",
      severity: "medium",
      details: "On January 24, 2025, fined multiple protesters 500 GEL each for allegedly blocking the road near the Government House of Adjara on December 16: Gogita Solomonidze, Dariko Chitadze, Elguja Bagrationi, Irma Komakhidze, Nikoloz Mirtskhulava, and Irakli Jorbenadze. Demonstrates extension of judicial repression to Adjara region.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Mtavari TV: Batumi Protesters Fined", url: "https://mtavari.tv/news/175620-batumis-sasamartlos-mosamartlem-gzis-gadaketvashi" },
      { title: "Repression Cases Documentation", url: "https://docs.google.com/spreadsheets/d/1vjgz6PpCQdLdLd6nbLwbE8RNqzDZqfvt-MjCq9cF9ow" },
    ],
  },
  // === PROSECUTORS ===
  {
    id: "389",
    name: "Giorgi Gabitashvili",
    position: "Former Prosecutor General",
    organization: "Prosecutor General's Office of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political Prosecution & Failure to Investigate Police Violence",
      severity: "high",
      details: "As Prosecutor General, oversaw the filing of criminal charges against opposition leaders while failing to investigate documented cases of police brutality against protesters. First Prosecutor General to be sanctioned by the UK (April 2025) for allowing serious human rights violations. Subsequently nominated as Chief Auditor in June 2025, effectively being rewarded for complicity. Under his leadership, the Prosecutor's Office became an instrument of political persecution.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["UK Sanctions", "Estonia Sanctions"],
    sources: [
      { title: "UK Gov: Sanctions on Georgian Officials", url: "https://www.gov.uk/government/news/uk-sanctions-georgian-officials-responsible-for-allowing-brutal-police-violence" },
      { title: "Civil.ge: Gabitashvili Tapped as Chief Auditor", url: "https://civil.ge/archives/685099" },
      { title: "OC Media: Gabitashvili Resigns", url: "https://oc-media.org/georgias-prosecutor-general-gabitashvili-sanctioned-by-the-uk-resigns/" },
    ],
  },
  {
    id: "390",
    name: "Giorgi Gvarakidze",
    position: "Prosecutor General",
    organization: "Prosecutor General's Office of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Mass Political Prosecution of Opposition Leaders",
      severity: "high",
      details: "Appointed Prosecutor General in June 2025. On November 6, 2024, announced sweeping charges against eight opposition leaders including Mikheil Saakashvili, Nika Gvaramia, Nika Melia, Zurab Japaridze, Badri Japaridze, Mamuka Khazaradze, Giorgi Vashadze, and Elene Khoshtaria. Charges include sabotage, aiding activities hostile to the state, and calls to overthrow the government. Represents weaponization of prosecutorial power against political opposition.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "RFE/RL: Opposition Leaders Face Charges", url: "https://www.rferl.org/a/saakashvili-georgia-opposition-criminal-charges-eu/33583073.html" },
      { title: "Civil.ge: Eight Opposition Leaders Prosecuted", url: "https://civil.ge/archives/709843" },
      { title: "Civil.ge: Gvarakidze Named Candidate", url: "https://civil.ge/archives/687627" },
    ],
  },
  {
    id: "391",
    name: "Karlo Katsitadze",
    position: "Head, Special Investigation Service",
    organization: "Special Investigation Service of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Failure to Investigate Police Brutality",
      severity: "high",
      details: "As Head of the Special Investigation Service, responsible for investigating crimes committed by law enforcement. Sanctioned by the UK for failure to properly investigate the violent crackdown on protesters. The SIS under his leadership has systematically failed to hold police accountable for documented beatings, torture, and abuse of detained protesters, creating impunity for state violence.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["UK Sanctions"],
    sources: [
      { title: "UK Gov: Sanctions on Georgian Officials", url: "https://www.gov.uk/government/news/uk-sanctions-georgian-officials-responsible-for-allowing-brutal-police-violence" },
      { title: "Babel: UK Sanctions Georgian Officials", url: "https://babel.ua/en/news/117038-britain-imposes-sanctions-on-georgia-s-prosecutor-general-and-three-other-officials" },
    ],
  },
  // === POLICE OFFICERS ===
  {
    id: "392",
    name: "Shalva Bedoidze",
    position: "First Deputy Minister of Internal Affairs",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Command Responsibility for Police Violence",
      severity: "high",
      details: "As First Deputy Minister of Internal Affairs, bears command responsibility for the violent crackdown on peaceful protesters. Sanctioned by the UK in April 2025 for allowing serious human rights violations. The MIA under his oversight deployed water cannons, tear gas, chemical agents, and riot police who systematically beat protesters, journalists, and opposition politicians.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["UK Sanctions"],
    sources: [
      { title: "UK Gov: Sanctions on Georgian Officials", url: "https://www.gov.uk/government/news/uk-sanctions-georgian-officials-responsible-for-allowing-brutal-police-violence" },
      { title: "Reuters: UK Sanctions Georgian Officials", url: "https://www.reuters.com/world/uk/uk-sanctions-georgian-officials-over-human-rights-abuses-2025-04-10/" },
    ],
  },
  {
    id: "393",
    name: "Mileri Lagazauri",
    position: "Deputy Director, Special Tasks Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Violent Attacks on Protesters, Journalists & Opposition",
      severity: "high",
      details: "Deputy to Zviad 'Khareba' Kharazishvili in the Special Tasks Department (riot police). Sanctioned by the US Treasury in September 2024 for overseeing security forces that 'violently targeted Georgian citizens, political opposition leaders, journalists, and youth activists who were peacefully expressing their views.' Known by alias 'Miller.' Directly responsible for organizing and executing violent crackdowns during May 2024 and December 2024 protests. Part of security infrastructure carrying out violent dispersals of protesters using water cannons, tear gas, and physical beatings.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["US Magnitsky List", "Lithuania Sanctions"],
    sources: [
      { title: "US Treasury: September 2024 Sanctions", url: "https://home.treasury.gov/news/press-releases/jy2580" },
      { title: "OCCRP: US Sanctions Georgian Officials", url: "https://www.occrp.org/en/news/us-sanctions-georgian-officials-and-far-right-activists-for-violent-attacks-on-freedom-of-expression" },
      { title: "Georgia Today: US Sanctions", url: "https://georgiatoday.ge/us-sanctions-khareba-miller-lagazauri-konstantine-morgoshia-and-zurab-makharadze/" },
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
    ],
  },
  {
    id: "394",
    name: "Roman Kartsivadze",
    position: "Director, Special Tasks Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Continued Command of Repressive Police Unit",
      severity: "high",
      details: "Appointed to replace US-sanctioned Zviad 'Khareba' Kharazishvili as Director of the Special Tasks Department in June 2025. Little public information is available about him, indicating deliberate obscurity. His appointment ensures continuity of the department's repressive operations against protesters while attempting to evade international scrutiny by changing leadership.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Georgia Today: Kartsivadze Replaces Kharazishvili", url: "https://georgiatoday.ge/roman-kartsivadze-to-replace-zviad-kharazishvili-as-director-of-special-tasks-department/" },
      { title: "Intellinews: Georgian Interior Ministry Reshuffle", url: "https://www.intellinews.com/georgian-interior-ministry-undergoes-major-reshuffle-385329/" },
      { title: "OC Media: Kharazishvili Resigns", url: "https://oc-media.org/us-sanctioned-georgian-riot-police-chief-kharazishvili-resigns-amidst-interior-ministry-reshuffle/" },
    ],
  },
  {
    id: "395",
    name: "Konstantine Morgoshia",
    position: "Leader, Alt-Info / Conservative Movement",
    organization: "Alt-Info / Conservative Movement of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Far-Right Violence & Pro-Russian Extremism",
      severity: "high",
      details: "Co-founder and leader of Alt-Info, Georgia's primary far-right, pro-Russian media outlet and political movement. Sanctioned by the US Treasury in September 2024 for violent attacks on freedom of expression. Alt-Info thugs have physically attacked journalists, LGBTQ+ activists, and pro-European demonstrators. The organization serves as a paramilitary auxiliary to Georgian Dream's repression apparatus.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["US Magnitsky List", "Estonia Sanctions"],
    sources: [
      { title: "US Treasury: September 2024 Sanctions", url: "https://home.treasury.gov/news/press-releases/jy2580" },
      { title: "Georgia Today: US Sanctions Alt-Info Leaders", url: "https://georgiatoday.ge/us-sanctions-khareba-miller-lagazauri-konstantine-morgoshia-and-zurab-makharadze/" },
      { title: "TI Georgia: Estonia Sanctions", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "396",
    name: "Zurab Makharadze",
    position: "Leader, Alt-Info / Conservative Movement",
    organization: "Alt-Info / Conservative Movement of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Far-Right Violence & Anti-Democratic Extremism",
      severity: "high",
      details: "Co-leader of Alt-Info and the Conservative Movement of Georgia. Sanctioned by the US Treasury in September 2024. Despite US sanctions, announced bid for Tbilisi Mayor through the Conservatives for Georgia party. Alt-Info under his leadership has organized violent attacks on Pride events, opposition rallies, and independent media. Represents the violent street-level enforcement arm of authoritarian consolidation.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["US Magnitsky List", "Estonia Sanctions"],
    sources: [
      { title: "US Treasury: September 2024 Sanctions", url: "https://home.treasury.gov/news/press-releases/jy2580" },
      { title: "OC Media: Makharadze Mayoral Bid", url: "https://oc-media.org/us-sanctioned-ultra-right-pro-russian-leader-announces-bid-for-tbilisi-mayor/" },
      { title: "Georgia Today: US Sanctions Alt-Info Leaders", url: "https://georgiatoday.ge/us-sanctions-khareba-miller-lagazauri-konstantine-morgoshia-and-zurab-makharadze/" },
    ],
  },
  // === REGIONAL POLICE CHIEFS & PROSECUTORS ===
  {
    id: "397",
    name: "Sulkhan Tamazashvili",
    position: "Former Director, Tbilisi Police Department / Head of Adjara Government",
    organization: "Ministry of Internal Affairs / Adjara Government",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Police Brutality Command & Unlawful Property",
      severity: "high",
      details: "Served as Director of the Tbilisi Police Department during the violent crackdowns on pro-European protesters in 2024. Sanctioned by the UK, US, Lithuania, Latvia, Estonia, and Czech Republic. After sanctions, was promoted to Chairman of the Government of Adjara in April 2025. Transparency International Georgia documented his unlawful occupation of unregistered land and construction of undeclared property.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["UK Sanctions", "US Visa Restrictions", "Lithuania Sanctions", "Latvia Sanctions", "Estonia Sanctions", "Czech Republic Sanctions"],
    sources: [
      { title: "UK Gov: Sanctions on Georgian Officials", url: "https://www.gov.uk/government/news/uk-sanctions-georgian-officials-responsible-for-brutal-crackdown-on-media-and-protestors" },
      { title: "TI Georgia: Tamazashvili Unlawful Property", url: "https://transparency.ge/en/blog/sanctioned-sulkhan-tamazashvilis-unlawful-construction-and-undeclared-property" },
      { title: "OpenSanctions: Sulkhan Tamazashvili", url: "https://www.opensanctions.org/entities/NK-RhuN6RBXbRzsGxHQgWin8Q/" },
    ],
  },
  {
    id: "398",
    name: "Grigol Beselia",
    position: "Former Head of Adjara Police Department / Deputy Director, Central Criminal Police",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Regional Police Repression & Promotion After Sanctions",
      severity: "high",
      details: "Served as Head of the Adjara Police Department overseeing repression in the Batumi region. Sanctioned by Estonia and Lithuania. Despite international sanctions, was promoted to Deputy Director of the Central Criminal Police Department in 2025 - a pattern of rewarding sanctioned officials with higher positions.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions", "Lithuania Sanctions"],
    sources: [
      { title: "Civil.ge: Beselia Resigns from Adjara", url: "https://civil.ge/archives/674117" },
      { title: "OC Media: Georgia Promotes Sanctioned Official", url: "https://oc-media.org/georgia-promotes-sanctioned-police-official/" },
      { title: "Interpressnews: Beselia Promoted", url: "https://www.interpressnews.ge/en/article/139447-grigol-beselia-appointed-deputy-director-of-central-criminal-police-department/" },
    ],
  },
  {
    id: "399",
    name: "Irakli Dgebuadze",
    position: "Head of Batumi Police Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Regional Police Repression in Adjara",
      severity: "high",
      details: "Head of the Batumi Police Department responsible for police operations in Georgia's second-largest city. Sanctioned by Estonia and Lithuania for involvement in the repression apparatus. Batumi has seen significant protests against the Georgian Dream government, with police under his command involved in detentions and dispersals.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions", "Lithuania Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
      { title: "Civil.ge: Baltic States Expand Sanctions", url: "https://civil.ge/archives/666721" },
    ],
  },
  {
    id: "400",
    name: "Gocha Vanadze",
    position: "Deputy Head of Batumi Police",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Regional Police Violence & Protest Suppression",
      severity: "medium",
      details: "Deputy Head of Batumi Police involved in coordinating police operations during protests in the Adjara region. Sanctioned by Lithuania for role in the violent suppression of pro-European demonstrations and human rights violations against protesters.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Lithuania Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
      { title: "Lithuania Sanctions Registry", url: "https://www.migracija.lt/en/app/nam" },
    ],
  },
  {
    id: "401",
    name: "Giorgi Bzhalava",
    position: "Deputy Head of Batumi Police",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Regional Police Coordination & Repression",
      severity: "medium",
      details: "Deputy Head of Batumi Police responsible for operational coordination during protests in Adjara. Sanctioned by Lithuania as part of the broader crackdown on Georgian officials responsible for human rights violations against peaceful protesters.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Lithuania Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
      { title: "Lithuania Sanctions Registry", url: "https://www.migracija.lt/en/app/nam" },
    ],
  },
  {
    id: "402",
    name: "Davit Atabegashvili",
    position: "Deputy Head of Adjara Police",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Regional Police Command & Protest Suppression",
      severity: "medium",
      details: "Deputy Head of the Adjara regional police force. Sanctioned by Lithuania for involvement in the repression of peaceful protesters in the Adjara region. Part of the command structure responsible for police violence against pro-European demonstrators in Batumi.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Lithuania Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
      { title: "Lithuania Sanctions Registry", url: "https://www.migracija.lt/en/app/nam" },
    ],
  },
  {
    id: "403",
    name: "Teimuraz Kalandadze",
    position: "Director of Kakheti Police Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Regional Police Command in Eastern Georgia",
      severity: "medium",
      details: "Director of the Kakheti Police Department, responsible for police operations in eastern Georgia. Sanctioned by Lithuania for involvement in the repression apparatus. The Kakheti region has experienced political pressure and intimidation against opposition supporters, particularly during the disputed 2024 elections.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Lithuania Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
      { title: "Lithuania Sanctions Registry", url: "https://www.migracija.lt/en/app/nam" },
    ],
  },
  {
    id: "404",
    name: "Vazha Siradze",
    position: "Head of Tbilisi Police Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Command of Capital's Police During Crackdowns",
      severity: "high",
      details: "Serves as Head of the Tbilisi Police Department, commanding police operations in the capital during the violent dispersals of pro-European protests. Sanctioned by Estonia and Lithuania. Under his command, Tbilisi police have used excessive force, water cannons, and tear gas against peaceful demonstrators.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions", "Lithuania Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
      { title: "Civil.ge: Baltic States Expand Sanctions", url: "https://civil.ge/archives/666721" },
    ],
  },
  {
    id: "405",
    name: "Teimuraz Kupatadze",
    position: "Head of Security Police Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Security Police Command & Political Surveillance",
      severity: "high",
      details: "Head of the Security Police Department responsible for political surveillance and security operations. Sanctioned by Estonia and Lithuania. The Security Police has been implicated in monitoring opposition figures, civil society activists, and journalists, contributing to the climate of intimidation.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions", "Lithuania Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
      { title: "Civil.ge: Baltic States Expand Sanctions", url: "https://civil.ge/archives/666721" },
    ],
  },
  {
    id: "406",
    name: "Lasha Jokhadze",
    position: "Head of Main Division, Tbilisi Police",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Tbilisi Police Operations & Protest Dispersals",
      severity: "medium",
      details: "Head of the Main Division of the Tbilisi Police, directly involved in coordinating police operations during protests. Sanctioned by Lithuania for role in human rights violations against peaceful protesters. Responsible for tactical deployment of riot police during violent dispersals.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Lithuania Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
      { title: "Lithuania Sanctions Registry", url: "https://www.migracija.lt/en/app/nam" },
    ],
  },
  {
    id: "407",
    name: "Lasha Salukvadze",
    position: "Deputy Chief of Vake-Saburtalo Police",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "District Police Operations & Detentions",
      severity: "medium",
      details: "Deputy Chief of Vake-Saburtalo Police, one of Tbilisi's central districts where many protests have occurred. Sanctioned by Lithuania for involvement in arbitrary detentions and mistreatment of protesters in the district. District police under his command have been involved in violent arrests.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Lithuania Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
      { title: "Lithuania Sanctions Registry", url: "https://www.migracija.lt/en/app/nam" },
    ],
  },
  {
    id: "408",
    name: "Dimitri Mchedlidze",
    position: "Employee, Special Tasks Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Violent Enforcement Operations",
      severity: "medium",
      details: "Member of the Special Tasks Department, the riot police unit responsible for the most brutal violence against protesters. Sanctioned by Lithuania. The Special Tasks Department has been documented using excessive force, beating detained protesters, and targeting journalists during dispersals.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Lithuania Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
      { title: "HRW: Brutal Police Violence Against Protesters", url: "https://www.hrw.org/news/2024/12/23/georgia-brutal-police-violence-against-protesters" },
    ],
  },
  {
    id: "409",
    name: "Lasha Gogniashvili",
    position: "Chief of Tbilisi Police Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Capital Police Command & Continued Repression",
      severity: "high",
      details: "Appointed as Chief of the Tbilisi Police Department in April 2025. Takes command of the capital's police force during ongoing repression of pro-European protests. His appointment ensures continuity of the violent crackdown on demonstrators. Responsible for coordinating police operations in Tbilisi during 2025 protests.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Civil.ge: New Tbilisi Police Chief Appointed", url: "https://civil.ge/archives/674427" },
      { title: "Georgia Today: MIA Changes Leadership", url: "https://georgiatoday.ge/mia-changes-key-police-leadership-across-georgia/" },
    ],
  },
  {
    id: "410",
    name: "Giorgi Bukhrashvili",
    position: "Head of Adjara Police Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Regional Police Command in Adjara",
      severity: "medium",
      details: "Appointed as Head of the Adjara Police Department in 2025, replacing the sanctioned Grigol Beselia. Takes command of regional police forces in the Adjara Autonomous Republic during ongoing protests. Responsible for police operations in Batumi and the broader Adjara region.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Interpressnews: Bukhrashvili Appointed", url: "https://www.interpressnews.ge/en/article/138825-giorgi-bukhrashvili-appointed-as-head-of-adjara-police-department/" },
      { title: "Civil.ge: Adjara Police Chief Resigns", url: "https://civil.ge/archives/674117" },
    ],
  },
  // === PROSECUTORS ===
  {
    id: "411",
    name: "Giorgi Gvarakidze",
    position: "General Prosecutor of Georgia",
    organization: "Prosecutor's Office of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political Prosecutions & Opposition Persecution",
      severity: "high",
      details: "Serves as General Prosecutor of Georgia overseeing politically motivated prosecutions against protesters, opposition leaders, and civil society activists. Sanctioned by Estonia, Latvia, and Lithuania. Under his leadership, the Prosecutor's Office has charged opposition figures with 'attempted coup' and brought cases against hundreds of protesters.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions", "Latvia Sanctions", "Lithuania Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
      { title: "UK Gov: UK Sanctions Georgian Prosecutor", url: "https://www.gov.uk/government/news/uk-sanctions-georgian-officials-responsible-for-allowing-brutal-police-violence" },
      { title: "Al Jazeera: Opposition Leaders Charged", url: "https://www.aljazeera.com/news/2025/10/7/five-georgia-opposition-leaders-charged-with-coup-attempt-after-protests" },
    ],
  },
  {
    id: "412",
    name: "Koka Katsitadze",
    position: "Former Head of Special Investigation Service",
    organization: "Special Investigation Service",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Failure to Investigate Police Violence",
      severity: "high",
      details: "Former Head of the Special Investigation Service responsible for investigating serious crimes including abuse of power. Sanctioned by the UK, Estonia, and Lithuania for failure to properly investigate police brutality against protesters. The SIS under his leadership failed to hold any officer accountable for documented violence.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["UK Sanctions", "Estonia Sanctions", "Lithuania Sanctions"],
    sources: [
      { title: "UK Gov: UK Sanctions Georgian Officials", url: "https://www.gov.uk/government/news/uk-sanctions-georgian-officials-responsible-for-allowing-brutal-police-violence" },
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
      { title: "Civil.ge: Watchdogs Call for SIS Information", url: "https://civil.ge/archives/627792" },
    ],
  },
  {
    id: "413",
    name: "Paata Salia",
    position: "Minister of Justice",
    organization: "Ministry of Justice of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Justice System Weaponization",
      severity: "high",
      details: "Serves as Minister of Justice overseeing the legal framework used to prosecute protesters and opposition figures. Sanctioned by Estonia and Lithuania. The Ministry under his leadership has supported the implementation of repressive legislation and the prosecution of civil society organizations under the 'foreign agents' law.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions", "Lithuania Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
      { title: "Civil.ge: Baltic States Expand Sanctions", url: "https://civil.ge/archives/666721" },
    ],
  },
  // Duplicate removed: Razhden Kuprashvili ID 414 - consolidated into ID 302
  // === MIA DEPUTY MINISTERS ===
  {
    id: "415",
    name: "Ioseb Chelidze",
    position: "Former Deputy Minister of Internal Affairs",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Interior Ministry Command During Crackdowns",
      severity: "high",
      details: "Former Deputy Minister of Internal Affairs during the violent crackdowns on pro-European protests. Sanctioned by Estonia and Lithuania. As deputy minister, shared command responsibility for police operations including the use of water cannons, tear gas, and physical violence against peaceful demonstrators.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions", "Lithuania Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
      { title: "Civil.ge: Baltic States Expand Sanctions", url: "https://civil.ge/archives/666721" },
    ],
  },
  {
    id: "416",
    name: "Aleksandre Darakhvelidze",
    position: "Deputy Minister of Internal Affairs",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Interior Ministry Command Structure",
      severity: "high",
      details: "Deputy Minister of Internal Affairs sharing command responsibility for police operations during protests. Sanctioned by Estonia and Lithuania. Part of the MIA leadership structure overseeing the violent suppression of pro-European demonstrations and the arbitrary detention of protesters.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions", "Lithuania Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
      { title: "Civil.ge: Baltic States Expand Sanctions", url: "https://civil.ge/archives/666721" },
    ],
  },
  {
    id: "417",
    name: "Giorgi Butkhuzi",
    position: "Deputy Minister of Internal Affairs",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Interior Ministry Command & Operations",
      severity: "high",
      details: "Deputy Minister of Internal Affairs responsible for overseeing police operations. Sanctioned by Estonia and Lithuania. As part of the MIA leadership, shares responsibility for the systematic violence against protesters, journalists, and opposition figures during the 2024-2025 crackdowns.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions", "Lithuania Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
      { title: "Civil.ge: Baltic States Expand Sanctions", url: "https://civil.ge/archives/666721" },
    ],
  },
  {
    id: "418",
    name: "Shalva Tadumadze",
    position: "Deputy Minister of Internal Affairs, Former Prosecutor General & Former Deputy Chairman Supreme Court",
    organization: "Ministry of Internal Affairs / Georgian Judiciary",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Cross-Institutional Capture: Judiciary, Prosecution & Interior",
      severity: "high",
      details: "Unique figure who has held senior positions across three critical institutions: Former Prosecutor General (overseeing politicized prosecutions), Former Deputy Chairman of the Supreme Court (judicial capture at highest level), and current Deputy Minister of Internal Affairs (command responsibility for police violence). This cross-institutional career represents the complete fusion of judicial, prosecutorial, and enforcement powers in service of the regime. Sanctioned by Estonia, Lithuania, and Ukraine.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Estonia Sanctions", "Lithuania Sanctions", "Ukraine Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
      { title: "Civil.ge: Baltic States Expand Sanctions", url: "https://civil.ge/archives/666721" },
      { title: "JAM-news: Lithuania Sanctions", url: "https://jam-news.net/for-first-time-in-georgias-history-government-is-under-western-sanctions-jamnews-compiles-sanctions-from-2023-to-present/" },
    ],
  },
  {
    id: "419",
    name: "Mirza Kezevadze",
    position: "Former Deputy Director, Special Tasks Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Riot Police Deputy Command & Violence",
      severity: "high",
      details: "Former Deputy Director of the Special Tasks Department alongside Mileri Lagazauri. Sanctioned by Lithuania. The Special Tasks Department under his deputy leadership was responsible for the most violent attacks on protesters, including documented beatings, torture in police vans, and targeting of journalists.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Lithuania Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
      { title: "HRW: Brutal Police Violence Against Protesters", url: "https://www.hrw.org/news/2024/12/23/georgia-brutal-police-violence-against-protesters" },
    ],
  },
  // === SANCTIONED MPS & PROPAGANDISTS ===
  {
    id: "420",
    name: "Mamuka Mdinaradze",
    position: "Georgian Dream MP & Executive Secretary",
    organization: "Georgian Dream Party",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Legislative Repression & Anti-Western Rhetoric",
      severity: "high",
      details: "Executive Secretary of Georgian Dream and member of parliament. Sanctioned by Estonia and Lithuania. One of the most vocal proponents of repressive legislation including the 'foreign agents' law. Known for aggressive anti-Western rhetoric and justification of police violence against protesters.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions", "Lithuania Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
      { title: "Civil.ge: Baltic States Expand Sanctions", url: "https://civil.ge/archives/666721" },
    ],
  },
  {
    id: "421",
    name: "Tea Tsulukiani",
    position: "Georgian Dream MP, Former Minister of Justice & Culture",
    organization: "Georgian Dream Party / Government of Georgia",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Eastern_Partnership_justice_and_home_affairs_ministers%27_meeting_Thea_Tsulukiani_%2835609681782%29_%28cropped%29.jpg/440px-Eastern_Partnership_justice_and_home_affairs_ministers%27_meeting_Thea_Tsulukiani_%2835609681782%29_%28cropped%29.jpg",
    complicity: {
      nature: "Judicial Capture, Legislative Repression & Cultural Enforcement",
      severity: "high",
      details: "Long-serving former Minister of Justice who oversaw the capture of the judiciary and implementation of repressive legislation. Now serves as Georgian Dream MP. Extended regime control over cultural institutions during tenure as Culture Minister. Member of the Political Council of Georgian Dream. Known for aggressive defense of government policies and attacks on civil society. Sanctioned by Estonia, Lithuania, and Ukraine.",
    },
    dateAdded: "2024-12-22",
    sanctions: ["Estonia Sanctions", "Lithuania Sanctions", "Ukraine Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
      { title: "Civil.ge: Baltic States Expand Sanctions", url: "https://civil.ge/archives/666721" },
      { title: "Wikipedia: Tea Tsulukiani", url: "https://en.wikipedia.org/wiki/Thea_Tsulukiani" },
    ],
  },
  // Duplicate removed: Dimitri Samkharadze ID 422 - consolidated into ID 178
  // Duplicate removed: Zviad Shalamberidze ID 423 - consolidated into ID 181
  // Duplicate removed: Gela Samkharauli ID 424 - consolidated into ID 84
  // Duplicate removed: Viktor Sanikidze ID 425 - consolidated into ID 180
  {
    id: "426",
    name: "Viktor Japaridze",
    position: "Georgian Dream MP & Owner of POSTV",
    organization: "Georgian Dream Party / POSTV",
    photo: "https://web-api.parliament.ge/storage/s/persons/1991/avatar.jpg",
    complicity: {
      nature: "Propaganda & Legislative Repression",
      severity: "high",
      details: "Georgian Dream MP and owner of POSTV, a pro-government propaganda outlet. Sanctioned by Estonia and Lithuania. Combines legislative power to advance repressive laws with media ownership used to spread government propaganda and attack civil society and opposition.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions", "Lithuania Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
      { title: "Civil.ge: Baltic States Expand Sanctions", url: "https://civil.ge/archives/666721" },
    ],
  },
  {
    id: "427",
    name: "Irakli Karseladze",
    position: "Former Minister of Regional Development and Infrastructure",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Abuse & Election Manipulation",
      severity: "medium",
      details: "Former Minister of Regional Development and Infrastructure. Sanctioned by Lithuania. The ministry under his leadership was implicated in using infrastructure projects and administrative resources for political purposes and election manipulation in regions.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Lithuania Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
      { title: "Lithuania Sanctions Registry", url: "https://www.migracija.lt/en/app/nam" },
    ],
  },
  {
    id: "428",
    name: "Gela Geladze",
    position: "Minister of Internal Affairs",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Current Command of Interior Ministry & Continued Repression",
      severity: "high",
      details: "Appointed Minister of Internal Affairs succeeding the sanctioned Vakhtang Gomelauri. Now commands all police forces in Georgia during ongoing repression of pro-European protests. Under his leadership, the MIA continues violent crackdowns and has undertaken major reshuffles to maintain the repressive apparatus.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Civil.ge: Interior Ministry Undergoes Major Reshuffle", url: "https://civil.ge/archives/685937" },
      { title: "Georgia Today: MIA Changes Leadership", url: "https://georgiatoday.ge/mia-changes-key-police-leadership-across-georgia/" },
    ],
  },
  // === PROSECUTORS & OFFICIALS (SANCTIONED) ===
  {
    id: "429",
    name: "Malkhaz Okropirashvili",
    position: "Prosecutor",
    organization: "Prosecutor's Office of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political Prosecutions & Persecution of Protesters",
      severity: "high",
      details: "Prosecutor sanctioned by Estonia and Lithuania for his role in politically motivated prosecutions of protesters and civil society activists. Part of the prosecutorial apparatus weaponized against pro-European demonstrators following the 2024 protests.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions", "Lithuania Sanctions"],
    sources: [
      { title: "Civil.ge: Estonia, Latvia, Lithuania Expand Sanctions", url: "https://civil.ge/archives/666721" },
      { title: "TI Georgia: Sanctions Tracker", url: "https://transparency.ge/en/blog/individuals-sanctioned-or-recommended-sanctions-various-countries-context-georgia" },
    ],
  },
  {
    id: "430",
    name: "Lela Mildenbergeri",
    position: "Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Complicity in Repression",
      severity: "medium",
      details: "Government official sanctioned by Lithuania for her role in enabling the repressive apparatus of the Georgian Dream government. Part of the administrative infrastructure supporting the crackdown on civil society and pro-European protests.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Lithuania Sanctions"],
    sources: [
      { title: "Civil.ge: Lithuania Expands Sanctions", url: "https://civil.ge/archives/666721" },
      { title: "TI Georgia: Sanctions Tracker", url: "https://transparency.ge/en/blog/individuals-sanctioned-or-recommended-sanctions-various-countries-context-georgia" },
    ],
  },
  {
    id: "431",
    name: "Nino Maradashvili",
    position: "Official",
    organization: "Government of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Support for Authoritarian Measures",
      severity: "medium",
      details: "Government official sanctioned by Lithuania for her involvement in the implementation of authoritarian measures. Part of the bureaucratic apparatus enabling the Georgian Dream government's persecution of civil society and opposition.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Lithuania Sanctions"],
    sources: [
      { title: "Civil.ge: Lithuania Expands Sanctions", url: "https://civil.ge/archives/666721" },
      { title: "TI Georgia: Sanctions Tracker", url: "https://transparency.ge/en/blog/individuals-sanctioned-or-recommended-sanctions-various-countries-context-georgia" },
    ],
  },
  {
    id: "432",
    name: "Otar Romanov-Partskhaladze",
    position: "Former Chief Prosecutor",
    organization: "Prosecutor's Office of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "FSB Collaboration & Obstruction of Justice",
      severity: "high",
      details: "Former Chief Prosecutor designated by the U.S. Treasury for collaboration with Russian FSB and obstruction of justice. Enabled the persecution of political opponents while shielding Kremlin-aligned actors from accountability. Key figure in the corruption of Georgia's prosecutorial system.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["US Treasury Sanctions", "Baltic States Sanctions"],
    sources: [
      { title: "US Treasury: Sanctions on Partskhaladze", url: "https://home.treasury.gov/news/press-releases/jy2580" },
      { title: "TI Georgia: Why US Imposed Sanctions on Partskhaladze", url: "https://transparency.ge/en/post/why-us-has-imposed-sanctions-otar-partskhaladze-who-has-been-untouchable-georgian-authorities" },
    ],
  },
  {
    id: "433",
    name: "Merab Turava",
    position: "Chairman, Constitutional Court",
    organization: "Constitutional Court of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Constitutional Court Capture & Democratic Subversion",
      severity: "high",
      details: "Chairman of the Constitutional Court sanctioned by Lithuania. Under his leadership, the court has consistently ruled in favor of the government on politically sensitive cases, effectively rubber-stamping unconstitutional laws and enabling the dismantling of democratic institutions.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Lithuania Sanctions"],
    sources: [
      { title: "Civil.ge: Lithuania Expands Sanctions", url: "https://civil.ge/archives/666721" },
      { title: "TI Georgia: Sanctions Tracker", url: "https://transparency.ge/en/blog/individuals-sanctioned-or-recommended-sanctions-various-countries-context-georgia" },
    ],
  },
  {
    id: "434",
    name: "Giorgi Tevdorashvili",
    position: "Judge, Constitutional Court",
    organization: "Constitutional Court of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Judicial Legitimation of Authoritarian Laws",
      severity: "high",
      details: "Constitutional Court judge sanctioned by Lithuania for participating in decisions that legitimized unconstitutional and repressive legislation. Part of the judicial infrastructure enabling the government's authoritarian consolidation and suppression of democratic opposition.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Lithuania Sanctions"],
    sources: [
      { title: "Civil.ge: Lithuania Expands Sanctions", url: "https://civil.ge/archives/666721" },
      { title: "TI Georgia: Sanctions Tracker", url: "https://transparency.ge/en/blog/individuals-sanctioned-or-recommended-sanctions-various-countries-context-georgia" },
    ],
  },
  // === POLICE OFFICERS (SANCTIONED) ===
  {
    id: "435",
    name: "Zurab Charibashvili",
    position: "Police Officer",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Violence Against Protesters",
      severity: "high",
      details: "Police officer sanctioned by Estonia for direct involvement in violence against peaceful pro-European protesters. Part of the MIA apparatus deployed to brutally suppress demonstrations following the passage of the 'foreign agents' law.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "Civil.ge: Estonia Expands Sanctions", url: "https://civil.ge/archives/666721" },
      { title: "TI Georgia: Sanctions Tracker", url: "https://transparency.ge/en/blog/individuals-sanctioned-or-recommended-sanctions-various-countries-context-georgia" },
    ],
  },
  {
    id: "436",
    name: "Davit Maruashvili",
    position: "Police Officer",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Brutal Crackdowns on Peaceful Demonstrators",
      severity: "high",
      details: "Police officer sanctioned by both Estonia and Lithuania for participation in brutal crackdowns on peaceful demonstrators. Documented involvement in violence against protesters during the 2024 pro-European demonstrations.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions", "Lithuania Sanctions"],
    sources: [
      { title: "Civil.ge: Baltic States Expand Sanctions", url: "https://civil.ge/archives/666721" },
      { title: "TI Georgia: Sanctions Tracker", url: "https://transparency.ge/en/blog/individuals-sanctioned-or-recommended-sanctions-various-countries-context-georgia" },
    ],
  },
  {
    id: "437",
    name: "Nodari Zenaishvili",
    position: "Police Officer",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Violence Against Protesters & Journalists",
      severity: "high",
      details: "Police officer sanctioned by both Estonia and Lithuania for violence against protesters and journalists. Part of the police forces systematically deployed to suppress pro-European demonstrations through brutal tactics.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions", "Lithuania Sanctions"],
    sources: [
      { title: "Civil.ge: Baltic States Expand Sanctions", url: "https://civil.ge/archives/666721" },
      { title: "TI Georgia: Sanctions Tracker", url: "https://transparency.ge/en/blog/individuals-sanctioned-or-recommended-sanctions-various-countries-context-georgia" },
    ],
  },
  // === MUNICIPAL & REGULATORY OFFICIALS ===
  {
    id: "438",
    name: "Kakhi Bekauri",
    position: "Chairman, Georgian National Communications Commission",
    organization: "Communications Commission",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Media Blacklisting & Press Freedom Suppression",
      severity: "high",
      details: "Chairman of the Communications Commission cited in the European Parliament Resolution (Feb 2025) for blacklisting independent media outlets. Instrumental in efforts to silence critical journalism and restrict press freedom in Georgia.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["EU Parliament Resolution Cited", "Under Monitoring"],
    sources: [
      { title: "European Parliament Resolution on Georgia", url: "https://www.europarl.europa.eu/doceo/document/TA-10-2025-0044_EN.html" },
      { title: "Civil.ge: EU Parliament Adopts Resolution on Georgia", url: "https://civil.ge/archives/659012" },
    ],
  },
  {
    id: "439",
    name: "Tamaz Gaishvili",
    position: "Owner, Georgian Airways",
    organization: "Georgian Airways",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Facilitation of Deportations & Political Kidnapping",
      severity: "high",
      details: "Owner of Georgian Airways involved in the facilitation of political deportations. His airline has been implicated in transporting political opponents and critics of the regime, including involvement in controversial extradition cases that raised concerns about political persecution.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Investigation"],
    sources: [
      { title: "Civil.ge: Georgian Airways Controversy", url: "https://civil.ge/archives/deportation-cases" },
      { title: "OC Media: Political Deportation Cases", url: "https://oc-media.org/deportation-cases-georgia/" },
    ],
  },
  // === BUSINESS FIGURES ===
  {
    id: "440",
    name: "Ilia Tsulaia",
    position: "Businessman",
    organization: "GD-Affiliated Business Networks",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Economic Enablement of Authoritarian Regime",
      severity: "medium",
      details: "Georgian Dream-affiliated businessman who provides economic support and financial resources to the ruling party. Part of the network of oligarchic interests that sustains the regime and benefits from preferential treatment in exchange for political loyalty.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "TI Georgia: Alleged High-Level Corruption Cases", url: "https://transparency.ge/en/blog/alleged-cases-high-level-corruption-periodically-updated-list" },
    ],
  },
  {
    id: "441",
    name: "Ivane Chkhartishvili",
    position: "Businessman",
    organization: "GD-Affiliated Business Networks",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Financial Support for Regime",
      severity: "medium",
      details: "Georgian Dream-affiliated businessman whose business interests are intertwined with the ruling party. Provides financial and economic support to maintain the regime in exchange for favorable business conditions and protection from accountability.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "TI Georgia: Alleged High-Level Corruption Cases", url: "https://transparency.ge/en/blog/alleged-cases-high-level-corruption-periodically-updated-list" },
    ],
  },
  {
    id: "442",
    name: "Sulkhan Papashvili",
    position: "Businessman",
    organization: "GD-Affiliated Business Networks",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Economic Collaboration with Authoritarian Government",
      severity: "medium",
      details: "Georgian Dream-affiliated businessman forming part of the economic infrastructure supporting the regime. Benefits from close ties to the ruling party while enabling the government's consolidation of power through economic means.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "TI Georgia: Alleged High-Level Corruption Cases", url: "https://transparency.ge/en/blog/alleged-cases-high-level-corruption-periodically-updated-list" },
    ],
  },
  {
    id: "443",
    name: "Giorgi Kapanadze",
    position: "Businessman",
    organization: "GD-Affiliated Business Networks",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Business-Political Collusion",
      severity: "medium",
      details: "Georgian Dream-affiliated businessman whose economic activities support and are supported by the ruling party. Part of the network of business-political collusion that characterizes the Georgian Dream governance model.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "TI Georgia: Alleged High-Level Corruption Cases", url: "https://transparency.ge/en/blog/alleged-cases-high-level-corruption-periodically-updated-list" },
    ],
  },
  {
    id: "444",
    name: "Anton Obolashvili",
    position: "Businessman & Georgian Dream MP",
    organization: "Parliament of Georgia / Business Interests",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Business-Political Power Fusion",
      severity: "medium",
      details: "Georgian Dream MP with significant business interests, representing the fusion of economic and political power that characterizes the regime. Uses parliamentary position to advance both political agenda and personal business interests.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "TI Georgia: Alleged High-Level Corruption Cases", url: "https://transparency.ge/en/blog/alleged-cases-high-level-corruption-periodically-updated-list" },
    ],
  },
  {
    id: "445",
    name: "Gocha Enukidze",
    position: "Businessman & Georgian Dream MP",
    organization: "Parliament of Georgia / Business Interests",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Oligarchic Political Influence",
      severity: "medium",
      details: "Georgian Dream MP with substantial business holdings, exemplifying the oligarchic capture of Georgian politics. Combines legislative power with economic influence to maintain the regime and personal wealth accumulation.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "TI Georgia: Alleged High-Level Corruption Cases", url: "https://transparency.ge/en/blog/alleged-cases-high-level-corruption-periodically-updated-list" },
    ],
  },
  // === PROPAGANDISTS ===
  {
    id: "446",
    name: "Vasil Maglaperidze",
    position: "Chairman, Public Broadcaster Supervisory Board",
    organization: "Georgian Public Broadcaster",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Public Broadcaster Capture & Propaganda",
      severity: "high",
      details: "Chairman of the Georgian Public Broadcaster Supervisory Board. Under his leadership, the public broadcaster has been transformed into a government mouthpiece, abandoning journalistic independence to serve as a propaganda tool for the Georgian Dream regime.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Civil.ge: Public Broadcaster Independence Concerns", url: "https://civil.ge/archives/gpb-independence" },
      { title: "RSF: Georgia Press Freedom Report", url: "https://rsf.org/en/country/georgia" },
    ],
  },
  {
    id: "447",
    name: "Lasha Natsvlishvili",
    position: "Propagandist",
    organization: "Pro-Government Media",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Anti-Western Disinformation & Propaganda",
      severity: "medium",
      details: "Georgian Dream propagandist who spreads anti-Western disinformation and attacks on civil society through various media platforms. Part of the regime's information warfare apparatus designed to discredit the pro-European movement and opposition.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Media Development Foundation: Disinformation Monitoring", url: "https://www.mdfgeorgia.ge/eng/disinformation" },
    ],
  },
  // === IVANISHVILI FAMILY MEMBERS ===
  {
    id: "448",
    name: "Ekaterina Khvedelidze",
    position: "Spouse of Bidzina Ivanishvili",
    organization: "Ivanishvili Family",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Family Sanctions Designation",
      severity: "high",
      details: "Wife of Bidzina Ivanishvili, sanctioned by multiple countries alongside her husband. As an immediate family member of Georgia's de facto ruler, she is subject to asset freezes and travel bans imposed by the US, UK, and Baltic states as part of comprehensive sanctions on the Ivanishvili family.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["US Treasury Sanctions", "UK Sanctions", "Baltic States Sanctions"],
    sources: [
      { title: "US Treasury: Sanctions on Ivanishvili Family", url: "https://home.treasury.gov/news/press-releases/jy2759" },
      { title: "UK Gov: Sanctions on Georgia", url: "https://www.gov.uk/government/news/uk-sanctions-georgian-officials-for-violence-against-peaceful-protesters" },
    ],
  },
  {
    id: "449",
    name: "Uta Ivanishvili",
    position: "Child of Bidzina Ivanishvili",
    organization: "Ivanishvili Family",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Family Sanctions Designation",
      severity: "medium",
      details: "Child of Bidzina Ivanishvili included in family sanctions imposed by the United States and other Western countries. Subject to asset freezes as part of comprehensive measures targeting the Ivanishvili family's wealth and preventing sanctions evasion.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["US Treasury Sanctions"],
    sources: [
      { title: "US Treasury: Sanctions on Ivanishvili Family", url: "https://home.treasury.gov/news/press-releases/jy2759" },
    ],
  },
  {
    id: "450",
    name: "Tsotne Ivanishvili",
    position: "Child of Bidzina Ivanishvili",
    organization: "Ivanishvili Family",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Family Sanctions Designation",
      severity: "medium",
      details: "Child of Bidzina Ivanishvili included in US Treasury sanctions targeting the oligarch's family. Subject to asset freezes and financial restrictions as part of measures to pressure the Georgian Dream leadership.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["US Treasury Sanctions"],
    sources: [
      { title: "US Treasury: Sanctions on Ivanishvili Family", url: "https://home.treasury.gov/news/press-releases/jy2759" },
    ],
  },
  {
    id: "451",
    name: "Bera Ivanishvili",
    position: "Son of Bidzina Ivanishvili, Musician",
    organization: "Ivanishvili Family",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Family Sanctions & Beneficiary of Regime",
      severity: "medium",
      details: "Son of Bidzina Ivanishvili, known as a musician under the name 'Bera'. Sanctioned by the US Treasury as part of family designations. Has benefited from his father's position while the regime he sustains has brutalized protesters and dismantled Georgian democracy.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["US Treasury Sanctions", "Baltic States Sanctions"],
    sources: [
      { title: "US Treasury: Sanctions on Ivanishvili Family", url: "https://home.treasury.gov/news/press-releases/jy2759" },
      { title: "Civil.ge: US Sanctions on Ivanishvili Family", url: "https://civil.ge/archives/661312" },
    ],
  },
  {
    id: "452",
    name: "Gvantsa Ivanishvili",
    position: "Daughter of Bidzina Ivanishvili",
    organization: "Ivanishvili Family",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Family Sanctions Designation",
      severity: "medium",
      details: "Daughter of Bidzina Ivanishvili included in US Treasury sanctions targeting the oligarch's family. Subject to asset freezes and financial restrictions designed to limit the family's ability to benefit from and sustain the authoritarian regime in Georgia.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["US Treasury Sanctions"],
    sources: [
      { title: "US Treasury: Sanctions on Ivanishvili Family", url: "https://home.treasury.gov/news/press-releases/jy2759" },
    ],
  },
  {
    id: "453",
    name: "Alexandre Ivanishvili",
    position: "Brother of Bidzina Ivanishvili",
    organization: "Ivanishvili Family",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Family Network & Potential Sanctions Evasion",
      severity: "medium",
      details: "Brother of Bidzina Ivanishvili, part of the extended family network that manages and benefits from the oligarch's vast wealth. Subject to monitoring for potential use in sanctions evasion schemes to circumvent Western financial restrictions.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "TI Georgia: Ivanishvili Family Sanctions", url: "https://transparency.ge/en/blog/individuals-sanctioned-or-recommended-sanctions-various-countries-context-georgia" },
    ],
  },
  // Note: IDs 454, 455 are distinct entries - Shmagi Kobakhidze (Ivanishvili's nephew) and Ucha Mamatsashvili (cousin)
  // These are different from the MPs with same names - family relations not legislative roles
  // === MPs SUPPORTING REPRESSION ===
  {
    id: "456",
    name: "Lasha Talakhadze",
    position: "Georgian Dream MP (Olympic Weightlifter)",
    organization: "Parliament of Georgia",
    photo: "https://web-api.parliament.ge/storage/s/persons/8455/avatar.jpg",
    complicity: {
      nature: "Celebrity Political Legitimation of Regime",
      severity: "medium",
      details: "Olympic weightlifting champion turned Georgian Dream MP. Uses his celebrity status to provide legitimacy to the ruling party. Voted for repressive legislation including the 'foreign agents' law while lending his public profile to the regime's propaganda efforts.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
      { title: "Parliament of Georgia: MP Profiles", url: "https://parliament.ge/en/parliamentarians" },
    ],
  },
  // Duplicates removed (IDs 457, 458) - Irakli Zarkua merged into ID 24, Beka Odisharia merged into ID 28
  // Duplicate removed: Fridon Injia ID 459 - consolidated into ID 77
  {
    id: "460",
    name: "Giga Bokeria",
    position: "Georgian Dream MP",
    organization: "Parliament of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Parliamentary Support for Repressive Legislation",
      severity: "medium",
      details: "Georgian Dream MP who voted for the 'foreign agents' law and other measures targeting civil society. Part of the legislative majority enabling the government's systematic dismantling of democratic institutions and persecution of pro-European forces.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Civil.ge: 84 MPs Vote for Foreign Agents Law", url: "https://civil.ge/archives/609871" },
      { title: "Parliament of Georgia: MP Profiles", url: "https://parliament.ge/en/parliamentarians" },
    ],
  },
  // === UK SANCTIONED OFFICIALS (APRIL 2025) ===
  {
    id: "461",
    name: "Karlo Katsitadze",
    position: "Head, Special Investigatory Service",
    organization: "Special Investigatory Service of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Failure to Investigate Police Brutality",
      severity: "high",
      details: "Head of the Special Investigatory Service sanctioned by the UK for failure to properly investigate the brutal crackdown on protesters. The SIS is responsible for investigating crimes committed by law enforcement, but under his leadership has systematically failed to hold police accountable for violence against demonstrators.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["UK Sanctions"],
    sources: [
      { title: "UK Gov: Sanctions on Georgian Officials", url: "https://www.gov.uk/government/news/uk-sanctions-georgian-officials-responsible-for-allowing-brutal-police-violence" },
      { title: "Civil.ge: UK Sanctions Georgia's Prosecutor General", url: "https://civil.ge/archives/675183" },
    ],
  },
  {
    id: "462",
    name: "Mirza Kezevadze",
    position: "Deputy Chief, Special Tasks Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Command Responsibility for Protest Violence",
      severity: "high",
      details: "Deputy Chief of the Special Tasks Department sanctioned by the UK for his role in violent crackdowns on protesters. Second-in-command of the unit responsible for brutal beatings of demonstrators and journalists during the 2024 pro-European protests.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["UK Sanctions", "Lithuania Sanctions"],
    sources: [
      { title: "UK Gov: Sanctions on Georgian Officials", url: "https://www.gov.uk/government/news/uk-sanctions-georgian-officials-responsible-for-allowing-brutal-police-violence" },
      { title: "Reuters: UK Sanctions Georgian Officials", url: "https://www.reuters.com/world/uk/uk-sanctions-georgian-officials-over-human-rights-abuses-2025-04-10/" },
    ],
  },
  // === ESTONIA SANCTIONED JUDGES (MARCH 2025) ===
  {
    id: "463",
    name: "Irakli Khuskivadze",
    position: "Judge",
    organization: "Tbilisi City Court",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political Persecution Through Detention Orders",
      severity: "high",
      details: "Judge sanctioned by Estonia for involvement in politically motivated cases against protesters including Irakli Miminoshvili, Nikoloz Javakhishvili, Giorgi Gorgadze, Tornike Goshadze, Insaf Aliev, Zviad Tsetskhladze, and others. Consistently imposed pre-trial detention on political prisoners.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "464",
    name: "Ketevan Jachvadze",
    position: "Judge",
    organization: "Tbilisi City Court",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political Case Adjudication",
      severity: "high",
      details: "Judge sanctioned by Estonia for involvement in cases against Andro Chichinadze, Onise Tskhadadze, Guram Mirtskhulava, and other protest participants. Part of the judicial apparatus weaponized against pro-European demonstrators.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "465",
    name: "Lela Maridashvili",
    position: "Judge",
    organization: "Georgian Courts",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Politically Motivated Detention Orders",
      severity: "high",
      details: "Judge sanctioned by Estonia for involvement in politically motivated cases against protesters Saba Skhvitaridze, Anatoli Gigauri, and Giorgi Akhobadze. Part of the captured judiciary enabling persecution of opposition.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "466",
    name: "Levan Kolbaia",
    position: "Judge",
    organization: "Georgian Courts",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political Persecution of Journalists & Activists",
      severity: "high",
      details: "Judge sanctioned by Estonia for involvement in cases against journalist Mzia Amaghlobeli, Mamuka Jorbenadze, Guram Mikeladze, and other activists. Key figure in judicial persecution of independent media.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "467",
    name: "Davit Mgeliashvili",
    position: "Judge",
    organization: "Georgian Courts",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political Case Management",
      severity: "high",
      details: "Judge sanctioned by Estonia for involvement in cases against Anzor Kvaratskhelia, Saba Jikia, Anatoli Gigauri, and other protesters. Implements regime's judicial persecution strategy.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "468",
    name: "Nana Shamatava",
    position: "Judge",
    organization: "Georgian Courts",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Detention of Protest Participants",
      severity: "high",
      details: "Judge sanctioned by Estonia for involvement in cases against Davit Lomidze, Teimuraz Zasokhashvili, and Archil Museliants. Issues detention orders against protest participants.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "469",
    name: "Nato Khujadze",
    position: "Judge",
    organization: "Georgian Courts",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political Detention Orders",
      severity: "high",
      details: "Judge sanctioned by Estonia for involvement in politically motivated cases against Davit Lomidze, Teimuraz Zasokhashvili, Saba Skhvitaridze, and Davit Khomeriki.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "470",
    name: "Arsen Kalatozishvili",
    position: "Judge",
    organization: "Georgian Courts",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Mass Political Persecution",
      severity: "high",
      details: "Judge sanctioned by Estonia for involvement in cases against numerous protesters including Daniel Mumladze, Giorgi Akhobadze, Irakli Miminoshvili, Nikoloz Javakhishvili, and many others. One of the most prolific judges in political persecution.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "471",
    name: "Davit Kurtanidze",
    position: "Judge",
    organization: "Georgian Courts",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political Case Adjudication",
      severity: "high",
      details: "Judge sanctioned by Estonia for involvement in cases against Mate Devizde, Irakli Tsignadze, Gigi Ugulava, Nikoloz Kutubidze, and others. Part of the judicial apparatus targeting opposition figures.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "472",
    name: "Irma Togonidze",
    position: "Judge, Batumi Court",
    organization: "Batumi City Court",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Mass Administrative Detentions in Batumi",
      severity: "high",
      details: "Judge sanctioned by Estonia for sentencing Batumi protesters to administrative detention including Temur Katamadze, Guram Murvanidze, Vazha Darchia, and others. Additionally fined protester Tatia Abuladze 2,000 GEL.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "473",
    name: "Guliko Kazhashvili",
    position: "Judge, Batumi Court",
    organization: "Batumi City Court",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Administrative Detention of Batumi Protesters",
      severity: "high",
      details: "Judge sanctioned by Estonia for sentencing Batumi protesters to administrative detention including Elizbar Chkhikvadze, Luka Natsvlishvili, Giorgi Kakaladze, and Shushana Matsaberidze.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  // === ESTONIA SANCTIONED PROSECUTORS (MARCH 2025) ===
  {
    id: "474",
    name: "Vazha Todua",
    position: "Prosecutor",
    organization: "Prosecutor's Office of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Mass Political Prosecutions",
      severity: "high",
      details: "Prosecutor sanctioned by Estonia for involvement in cases against over 20 protesters including Irakli Miminoshvili, Nikoloz Javakhishvili, Andro Chichinadze, Onise Tskhadadze, and many others. Key figure in the prosecutorial persecution of the opposition.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "475",
    name: "Giorgi Mukbaniani",
    position: "Prosecutor",
    organization: "Prosecutor's Office of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political Prosecution of Protesters",
      severity: "high",
      details: "Prosecutor sanctioned by Estonia for involvement in cases against numerous protesters including Irakli Miminoshvili, Nikoloz Javakhishvili, Andro Chichinadze, and others. Part of the prosecutorial apparatus targeting pro-European demonstrators.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "476",
    name: "Nugzar Chitadze",
    position: "Prosecutor",
    organization: "Prosecutor's Office of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political Prosecution of Activists",
      severity: "high",
      details: "Prosecutor sanctioned by Estonia for involvement in cases against protesters including Irakli Miminoshvili, Nikoloz Javakhishvili, Giorgi Gorgadze, Tornike Goshadze, and Nikoloz Katsia.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "477",
    name: "Shmagi Gobejishvili",
    position: "Prosecutor",
    organization: "Prosecutor's Office of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political Prosecutions",
      severity: "high",
      details: "Prosecutor sanctioned by Estonia for involvement in cases against Giorgi Akhobadze, Irakli Miminoshvili, Nikoloz Javakhishvili, and other protesters.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "478",
    name: "Zviad Gubeladze",
    position: "Prosecutor",
    organization: "Prosecutor's Office of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Prosecution of Opposition Leader",
      severity: "high",
      details: "Prosecutor sanctioned by Estonia for involvement in the case against opposition leader Aleksandre Elisashvili. Part of the prosecutorial apparatus targeting political opposition.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "479",
    name: "Roin Khintibidze",
    position: "Prosecutor",
    organization: "Prosecutor's Office of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political Prosecution of Protesters",
      severity: "high",
      details: "Prosecutor sanctioned by Estonia for involvement in cases against Anzor Kvaratskhelia, Giorgi Mindadze, Saba Jikia, and other protesters. Part of the weaponized prosecutorial system.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "480",
    name: "Zaza Metonidze",
    position: "Prosecutor of Adjara",
    organization: "Prosecutor's Office of Adjara",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Regional Prosecution of Journalists & Activists",
      severity: "high",
      details: "Prosecutor of the Autonomous Republic of Adjara sanctioned by Estonia for overseeing cases against journalist Mzia Amaghlobeli, Mamuka Jorbenadze, Guram Mikeladze, and others. Key figure in regional persecution of opposition.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "481",
    name: "Paata Tsetskhladze",
    position: "Prosecutor",
    organization: "Prosecutor's Office of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Prosecution of Batumi Activists",
      severity: "high",
      details: "Prosecutor sanctioned by Estonia for involvement in cases against Mamuka Jorbenadze, Guram Mikeladze, Davit Gvianidze, Andro Kakabadze, and Giorgi Davitadze.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  // === ESTONIA SANCTIONED POLICE OFFICERS (MARCH 2025) - FALSE WITNESSES ===
  {
    id: "482",
    name: "Berdia Peradze",
    position: "Police Officer",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "False Testimony Against Journalists",
      severity: "high",
      details: "Police officer sanctioned by Estonia for providing false witness testimony in the case of journalist Mzia Amaghlobeli. Part of the coordinated effort to fabricate evidence against opposition figures.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "483",
    name: "Giorgi Chareqashvili",
    position: "Police Officer",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "False Witness Testimony",
      severity: "high",
      details: "Police officer sanctioned by Estonia for providing false witness testimony in the case of Davit Gogilashvili. Part of the police apparatus fabricating evidence against protesters.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "484",
    name: "Tornike Menabde",
    position: "Police Officer",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "False Witness Testimony",
      severity: "high",
      details: "Police officer sanctioned by Estonia for providing false witness testimony in the case of Davit Gogilashvili. Participated in the fabrication of evidence against protesters.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "485",
    name: "Sulkhan Kiknadze",
    position: "Police Officer",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "False Witness Testimony",
      severity: "high",
      details: "Police officer sanctioned by Estonia for providing false witness testimony in the case of Beatrice Klimenko. Part of coordinated police perjury against protesters.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "486",
    name: "Revaz Tsurtsumia",
    position: "Police Officer",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "False Witness Testimony",
      severity: "high",
      details: "Police officer sanctioned by Estonia for providing false witness testimony in the case of Beatrice Klimenko. Participated in fabricating evidence against peaceful demonstrators.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "487",
    name: "Zviad Margvelani",
    position: "Police Officer",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "False Witness Testimony",
      severity: "high",
      details: "Police officer sanctioned by Estonia for providing false witness testimony in the case of Davit Goderdzishvili. Part of systematic police perjury operations.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "488",
    name: "Zurab Gharibashvili",
    position: "Police Officer",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "False Witness Testimony",
      severity: "high",
      details: "Police officer sanctioned by Estonia for providing false witness testimony in the case of Shota Narsia. Part of coordinated effort to fabricate evidence against protesters.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "489",
    name: "Otar Gelashvili",
    position: "Police Officer",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "False Witness Testimony",
      severity: "high",
      details: "Police officer sanctioned by Estonia for providing false witness testimony in the case of Teimuraz Bezhanidze. Part of the police apparatus fabricating evidence.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  // === ADDITIONAL JUDGES (ESTONIA SANCTIONS) ===
  {
    id: "490",
    name: "Giorgi Gelashvili",
    position: "Judge",
    organization: "Georgian Courts",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political Case Adjudication",
      severity: "high",
      details: "Judge sanctioned by Estonia for involvement in the case of Giorgi Okmelashvili. Part of the captured judiciary enabling political persecution.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "491",
    name: "Natia Gudadze",
    position: "Judge",
    organization: "Georgian Courts",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political Detention Orders",
      severity: "high",
      details: "Judge sanctioned by Estonia for involvement in cases against Saba Meparishvili and Omar Okribelashvili. Issues detention orders against protest participants.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "492",
    name: "Teona Epitashvili",
    position: "Judge",
    organization: "Georgian Courts",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political Case Management",
      severity: "high",
      details: "Judge sanctioned by Estonia for involvement in cases against Giorgi Mindadze and Daniel Mumladze. Part of the judicial apparatus persecuting protesters.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "493",
    name: "Lela Kalichenko",
    position: "Judge",
    organization: "Georgian Courts",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political Persecution Through Detention",
      severity: "high",
      details: "Judge sanctioned by Estonia for involvement in cases against Archil Museliants, Lasha Chkhaidze, and Tedo Abramov. Issues politically motivated detention orders.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "494",
    name: "Zviad Sharadze",
    position: "Judge",
    organization: "Georgian Courts",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political Case Adjudication",
      severity: "high",
      details: "Judge sanctioned by Estonia for involvement in cases against Fridon Bubuteishvili and Irakli Megvinetukhutsesi. Part of the captured judiciary.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "495",
    name: "Nino Tarashvili",
    position: "Judge",
    organization: "Georgian Courts",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political Detention Orders",
      severity: "high",
      details: "Judge sanctioned by Estonia for involvement in cases against Anzor Kvaratskhelia, Giorgi Mindadze, and Nika Katsia. Issues detention orders against opposition figures.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "496",
    name: "Eka Barbakadze",
    position: "Judge",
    organization: "Georgian Courts",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Persecution of Minors",
      severity: "high",
      details: "Judge sanctioned by Estonia for involvement in the case of a minor protester (M.G.). Part of the judicial system targeting even underage demonstrators.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "497",
    name: "Nino Sakhelashvili",
    position: "Judge",
    organization: "Georgian Courts",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Persecution of Independent Media",
      severity: "high",
      details: "Judge sanctioned by Estonia for involvement in the case against journalist Mzia Amaghlobeli. Part of the judicial apparatus targeting independent media.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "498",
    name: "Vera Dolidze",
    position: "Judge",
    organization: "Georgian Courts",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Persecution of Independent Media",
      severity: "high",
      details: "Judge sanctioned by Estonia for involvement in the case against journalist Mzia Amaghlobeli. Key figure in judicial persecution of independent journalism.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  // === ADDITIONAL PROSECUTORS (ESTONIA SANCTIONS) ===
  {
    id: "499",
    name: "Ana Metreveli",
    position: "Prosecutor",
    organization: "Prosecutor's Office of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Prosecution of Opposition Leader",
      severity: "high",
      details: "Prosecutor sanctioned by Estonia for involvement in the case against opposition leader Aleksandre Elisashvili. Part of the prosecutorial apparatus targeting political opposition.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "500",
    name: "Tamar Iakobidze",
    position: "Prosecutor",
    organization: "Prosecutor's Office of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Prosecution of Minors & Protesters",
      severity: "high",
      details: "Prosecutor sanctioned by Estonia for involvement in cases against Anatoli Gigauri, Guram Khutashvili, Daniel Mumladze, and a minor (M.G.). Prosecutes even underage protesters.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "501",
    name: "Vladimir Turmanidze",
    position: "Prosecutor",
    organization: "Prosecutor's Office of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Prosecution of Independent Media",
      severity: "high",
      details: "Prosecutor sanctioned by Estonia for involvement in the case against journalist Mzia Amaghlobeli. Part of the prosecutorial persecution of independent journalism.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  {
    id: "502",
    name: "Tornike Gogeshvili",
    position: "Prosecutor",
    organization: "Prosecutor's Office of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Prosecution of Independent Media",
      severity: "high",
      details: "Prosecutor sanctioned by Estonia for involvement in the case against journalist Mzia Amaghlobeli. Key figure in the prosecutorial attack on press freedom.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Estonia Sanctions March 2025", url: "https://transparency.ge/en/post/estonias-new-sanctions-bidzina-ivanishvilis-obedient-judges-prosecutors-police-officers-and" },
    ],
  },
  // === FAR-RIGHT LEADERS & ALT-INFO ===
  {
    id: "503",
    name: "Shota Martinenko",
    position: "Alt-Info Co-Founder",
    organization: "Alt-Info / Conservative Movement",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Far-Right Violence & Pro-Russian Propaganda",
      severity: "high",
      details: "Co-founder of Alt-Info, the far-right pro-Russian media outlet and political movement. Instrumental in organizing violent attacks on LGBTQ+ activists and journalists on July 5, 2021. Spreads anti-Western disinformation and promotes Russian interests in Georgia.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "OC Media: Alt-Info Far-Right Group", url: "https://oc-media.org/tag/alt-info/" },
      { title: "Wikipedia: Conservative Movement (Georgia)", url: "https://en.wikipedia.org/wiki/Conservative_Movement_(Georgia)" },
    ],
  },
  {
    id: "504",
    name: "Giorgi Kardava",
    position: "Alt-Info Member & Organizer",
    organization: "Alt-Info / Conservative Movement",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Far-Right Violence & Hate Campaigns",
      severity: "high",
      details: "Active member and organizer of Alt-Info's violent activities. Participated in organizing attacks on journalists and LGBTQ+ activists. Part of the network spreading Russian propaganda and anti-Western sentiment in Georgia.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "OC Media: Alt-Info Far-Right Group", url: "https://oc-media.org/tag/alt-info/" },
    ],
  },
  // === PROPAGANDISTS & MEDIA MOGULS ===
  {
    id: "505",
    name: "Irakli Rukhadze",
    position: "Owner, Imedi TV",
    organization: "Imedi TV",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Pro-Government Propaganda & Russian Disinformation",
      severity: "high",
      details: "Owner of Imedi TV, the main pro-government propaganda channel. Under his ownership, the channel has become a mouthpiece for Georgian Dream, spreading disinformation and attacking opposition. EU has discussed sanctioning the channel for Russian propaganda. Sanctioned by Lithuania.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Lithuania Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
      { title: "RFE/RL: EU Discusses Sanctioning Pro-Government Georgian TV", url: "https://www.rferl.org/a/wider-europe-eu-sanctions-georgia-visa/33552283.html" },
    ],
  },
  {
    id: "506",
    name: "Tinatin Berdzenishvili",
    position: "Director General, Georgian Public Broadcaster",
    organization: "Georgian Public Broadcaster",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Public Broadcaster Capture for Propaganda",
      severity: "high",
      details: "Director General of the Georgian Public Broadcaster. Under her leadership alongside Vasil Maglaperidze, has transformed the public broadcaster into a Georgian Dream propaganda channel, abandoning journalistic independence and impartiality.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["EU Parliament Resolution Cited"],
    sources: [
      { title: "TI Georgia: What is Happening to the Public Broadcaster", url: "https://transparency.ge/en/post/what-happening-public-broadcaster" },
      { title: "European Parliament Resolution Feb 2025", url: "https://www.europarl.europa.eu/doceo/document/TA-10-2025-0019_EN.html" },
    ],
  },
  {
    id: "507",
    name: "Levan Vasadze",
    position: "Politician & Media Mogul",
    organization: "Pro-Russian Political Networks",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Pro-Russian Disinformation & Anti-Western Propaganda",
      severity: "high",
      details: "Georgian politician and media mogul sanctioned by the UK for using his platforms to spread pro-Russian disinformation. Uses his media influence to undermine Georgia's European integration and promote Kremlin narratives.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["UK Sanctions (Sept 2025)"],
    sources: [
      { title: "UK Gov: Sanctions on Georgia-Linked Supporters of Putin", url: "https://www.gov.uk/government/news/uk-sanctions-georgia-linked-supporters-of-putins-illegal-war-in-ukraine" },
    ],
  },
  // === PRO-RUSSIAN ACTORS & FSB COLLABORATORS ===
  {
    id: "508",
    name: "Otar Partskhaladze",
    position: "Former Chief Prosecutor, Businessman",
    organization: "Pro-Russian Business Networks",
    photo: "/placeholder.svg",
    complicity: {
      nature: "FSB Collaboration & Russian Influence Operations",
      severity: "high",
      details: "Former Chief Prosecutor designated by US Treasury for collaborating with Russian FSB officers to influence Georgian society and politics for Russia's benefit. Close associate of Bidzina Ivanishvili. UK sanctioned him in September 2025 for supporting Putin's war.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["US Treasury Sanctions", "UK Sanctions (Sept 2025)", "Baltic States Sanctions"],
    sources: [
      { title: "US Treasury: Sanctions on Partskhaladze", url: "https://home.treasury.gov/news/press-releases/jy2580" },
      { title: "UK Gov: Sanctions on Georgia-Linked Supporters of Putin", url: "https://www.gov.uk/government/news/uk-sanctions-georgia-linked-supporters-of-putins-illegal-war-in-ukraine" },
      { title: "TI Georgia: Why US Imposed Sanctions on Partskhaladze", url: "https://transparency.ge/en/post/why-us-has-imposed-sanctions-otar-partskhaladze-who-has-been-untouchable-georgian-authorities" },
    ],
  },
  // === MUNICIPAL ADMINISTRATORS (ELECTION FRAUD) ===
  {
    id: "509",
    name: "Tornike Rizhvadze",
    position: "Former Chairman, Government of Adjara",
    organization: "Autonomous Republic of Adjara",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Regional Administrative Abuse & Election Manipulation",
      severity: "high",
      details: "Former Chairman of the Government of Adjara cited in European Parliament Resolution. Under his leadership, administrative resources in Adjara were mobilized for Georgian Dream's election campaign. Oversaw the regional apparatus that participated in voter intimidation.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["EU Parliament Resolution Cited"],
    sources: [
      { title: "European Parliament Resolution Feb 2025", url: "https://www.europarl.europa.eu/doceo/document/TA-10-2025-0019_EN.html" },
      { title: "TI Georgia: Misuse of Administrative Resources", url: "https://transparency.ge/en/post/misuse-administrative-resources-parliamentary-elections-2024-interim-report" },
    ],
  },
  {
    id: "510",
    name: "Sulkhan Tamazashvili",
    position: "Head of Adjara Government",
    organization: "Autonomous Republic of Adjara",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Regional Election Manipulation & Administrative Abuse",
      severity: "high",
      details: "Head of the Adjara Government. Oversaw the mobilization of administrative resources for Georgian Dream's election campaign in the region. Under his leadership, public servants were coerced to support the ruling party. Sanctioned by multiple Baltic states.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions", "Lithuania Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
      { title: "TI Georgia: Misuse of Administrative Resources", url: "https://transparency.ge/en/post/misuse-administrative-resources-parliamentary-elections-2024-interim-report" },
    ],
  },
  // Duplicate ID 511 removed - Dimitri Mchedlidze merged into ID 309
  // Duplicates removed (IDs 512, 513, 514, 515) - merged into earlier entries:
  // - Irakli Gharibashvili -> ID 19
  // - Paata Salia -> ID 301
  // - Razhden Kuprashvili -> ID 302
  // - Giorgi Gvarakidze -> ID 285
  // === ADDITIONAL POLICE DEPARTMENT HEADS ===
  {
    id: "516",
    name: "Vazha Siradze",
    position: "Head, Tbilisi Police Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Command of Protest Crackdowns in Capital",
      severity: "high",
      details: "Head of the Tbilisi Police Department overseeing police operations during the brutal crackdowns on pro-European protesters in the capital. Under his command, police used excessive force against peaceful demonstrators. Sanctioned by Estonia.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
    ],
  },
  {
    id: "517",
    name: "Teimuraz Kupatadze",
    position: "Head, Security Police Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political Security Operations",
      severity: "high",
      details: "Head of the Security Police Department responsible for security operations targeting political opposition and civil society. Part of the internal security apparatus enabling political repression. Sanctioned by Estonia and Lithuania.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions", "Lithuania Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
    ],
  },
  {
    id: "518",
    name: "Lasha Jokhadze",
    position: "Head, Main Division of Tbilisi Police",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Operational Command of Protest Violence",
      severity: "high",
      details: "Head of the Main Division of the Tbilisi Police responsible for operational command during violent crackdowns on protesters. Oversaw police units that brutalized peaceful demonstrators. Sanctioned by Estonia and Lithuania.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions", "Lithuania Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
    ],
  },
  {
    id: "519",
    name: "Lasha Salukvadze",
    position: "Deputy Chief, Vake-Saburtalo Police",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Local Police Violence Against Protesters",
      severity: "high",
      details: "Deputy Chief of the Vake-Saburtalo Police district in Tbilisi. Oversaw police operations in one of the main protest areas where violent crackdowns occurred. Sanctioned by Estonia.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
    ],
  },
  {
    id: "520",
    name: "Teimuraz Kalandadze",
    position: "Director, Kakheti Police Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Regional Police Repression",
      severity: "high",
      details: "Director of the Kakheti regional Police Department. Oversaw police operations in eastern Georgia during the elections and protest periods. Part of the regional security apparatus enabling voter intimidation. Sanctioned by Estonia.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
    ],
  },
  {
    id: "521",
    name: "Giorgi Bzhalava",
    position: "Deputy Head, Batumi Police",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Regional Police Violence",
      severity: "high",
      details: "Deputy Head of the Batumi Police involved in crackdowns on protesters in Adjara. Part of the command structure responsible for the persecution of journalist Mzia Amaghlobeli and regional activists. Sanctioned by Estonia.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
    ],
  },
  // === ADDITIONAL MIA OFFICIALS (Added December 2024) ===
  {
    id: "528",
    name: "Merab Malania",
    position: "Former Deputy Minister of Internal Affairs",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Obstruction of US Security Cooperation & Anti-Western Stance",
      severity: "high",
      details: "Former Deputy Minister of Internal Affairs appointed in 2016. Known for negative attitude toward US cooperation programs, reportedly referencing Ivanishvili's preferences ('The boss won't like it') when obstructing joint training initiatives. His tenure marked a shift in the MIA away from Western partnership toward opacity and alignment with Russian security culture.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Civil.ge: Interview with Grigol Sakandelidze", url: "https://civil.ge/archives/sakandelidze-interview" },
      { title: "TI Georgia: MIA Analysis", url: "https://transparency.ge/en/blog/mia-analysis" },
    ],
  },
  {
    id: "529",
    name: "Lasha Gogniashvili",
    position: "Chief, Tbilisi Police Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Command of Protest Crackdowns in Capital",
      severity: "high",
      details: "Appointed Chief of Tbilisi Police Department in April 2025. Commands all police operations in the capital during ongoing repression of pro-European protests. Under his command, Tbilisi police have continued to violently disperse peaceful demonstrators and conduct targeted arrests of activists and journalists.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "Civil.ge: Tbilisi Police Leadership", url: "https://civil.ge/archives/tbilisi-police" },
      { title: "OC Media: Protest Crackdowns Continue", url: "https://oc-media.org/protests-georgia-2024/" },
    ],
  },
  {
    id: "530",
    name: "Vakho Mgebrishvili",
    position: "Former Head, Patrol Police",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Street-Level Enforcement & Patrol Operations",
      severity: "high",
      details: "Former Head of the Patrol Police who oversaw street-level enforcement operations during protest periods. The Patrol Police under his leadership were responsible for initial engagement with protesters, crowd control, and coordination with Special Tasks Department during violent crackdowns.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Monitoring"],
    sources: [
      { title: "TI Georgia: MIA Structure Analysis", url: "https://transparency.ge/en/blog/mia-structure" },
    ],
  },
  {
    id: "531",
    name: "Giorgi Mgebrishvili",
    position: "Former Minister of Internal Affairs",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Foundation of Repressive Security Apparatus",
      severity: "high",
      details: "Former Minister of Internal Affairs (2015-2018) who laid the groundwork for the current repressive security apparatus. Under his tenure, the MIA began its shift away from Western cooperation and reform toward opacity and political enforcement. Established precedents for political use of the security services that successors expanded.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Ukraine Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Officials", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
      { title: "Civil.ge: MIA Leadership History", url: "https://civil.ge/archives/mia-history" },
    ],
  },
  {
    id: "532",
    name: "Aleksandre Tugushi",
    position: "Special Tasks Department Officer",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Documented Violence Against Protesters",
      severity: "high",
      details: "Special Tasks Department officer identified in video footage beating protesters during December 2024 demonstrations. Part of the riot police 'punitive squads' that targeted specific activists, journalists, and opposition figures during violent crackdowns on Rustaveli Avenue.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Investigation"],
    sources: [
      { title: "HRW: Brutal Police Violence Against Protesters", url: "https://www.hrw.org/news/2024/12/23/georgia-brutal-police-violence-against-protesters" },
      { title: "Amnesty International: Georgia Protest Crackdown", url: "https://www.amnesty.org/en/latest/news/2024/12/georgia-protest-crackdown/" },
    ],
  },
  {
    id: "533",
    name: "Davit Kvaratskhelia",
    position: "Special Tasks Department Officer",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Documented Violence Against Journalists",
      severity: "high",
      details: "Special Tasks Department officer identified in video footage targeting journalists during December 2024 protests. Footage shows deliberate targeting of press credentials and camera equipment in apparent effort to prevent documentation of police violence.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Under Investigation"],
    sources: [
      { title: "CPJ: Georgia Attacks on Press Freedom", url: "https://cpj.org/2024/12/georgia-journalists-attacked/" },
      { title: "RSF: Georgia Press Freedom", url: "https://rsf.org/en/country/georgia" },
    ],
  },
  // === POLICE DEPARTMENT HEADS & OFFICERS (TI Georgia Sanctions List) ===
  {
    id: "534",
    name: "Vazha Siradze",
    position: "Head of Tbilisi Police Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Command of Capital City Police Violence",
      severity: "high",
      details: "Head of Tbilisi Police Department, transferred from his previous position as Head of Patrol Police. Commands all Tbilisi police operations during violent crackdowns on protesters. Sanctioned by Czech Republic (January 2025), Lithuania, and Estonia. Under his command, Tbilisi police have used excessive force against peaceful demonstrators.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Czech Republic Sanctions", "Lithuania Sanctions", "Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
      { title: "Civil.ge: Czech Sanctions", url: "https://civil.ge/archives/657459" },
    ],
  },
  {
    id: "535",
    name: "Teimuraz Kupatadze",
    position: "Head of Security Police Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political Security Operations",
      severity: "high",
      details: "Head of the Security Police Department responsible for political security operations. The Security Police under his command has been involved in surveillance of opposition figures, activists, and civil society organizations. Sanctioned by Lithuania and Estonia.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Lithuania Sanctions", "Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
    ],
  },
  {
    id: "536",
    name: "Lasha Jokhadze",
    position: "Head of Main Division, Tbilisi Police",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Tbilisi Police Operations Command",
      severity: "high",
      details: "Head of the Main Division of the Tbilisi Police, overseeing day-to-day police operations in the capital. Part of the command structure responsible for coordinating violent dispersals of protesters on Rustaveli Avenue and throughout central Tbilisi. Sanctioned by Lithuania and Estonia.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Lithuania Sanctions", "Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
    ],
  },
  {
    id: "537",
    name: "Lasha Salukvadze",
    position: "Deputy Chief, Vake-Saburtalo Police",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "District Police Violence",
      severity: "high",
      details: "Deputy Chief of Vake-Saburtalo Police district in Tbilisi. Responsible for police operations in the district that includes key protest locations. Sanctioned by Estonia for role in violent crackdowns on protesters.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
    ],
  },
  {
    id: "538",
    name: "Dimitri Mchedlidze",
    position: "Employee, Special Tasks Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Direct Participation in Protester Beatings",
      severity: "high",
      details: "Employee of the Special Tasks Department (riot police) identified and sanctioned by Estonia. One of the few individual STD officers to be publicly named and sanctioned, indicating documented evidence of direct participation in violence against protesters.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
    ],
  },
  {
    id: "539",
    name: "Grigol Beselia",
    position: "Former Head, Adjara Police Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Regional Police Command & Persecution",
      severity: "high",
      details: "Former Head of Adjara Police Department responsible for police operations in the Adjara region during crackdowns on protesters and journalists, including persecution of journalist Mzia Amaghlobeli. Sanctioned by Estonia.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
    ],
  },
  {
    id: "540",
    name: "Davit Atabegashvili",
    position: "Deputy Head, Adjara Police",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Regional Police Violence",
      severity: "high",
      details: "Deputy Head of the Adjara Police Department involved in crackdowns on protesters and journalists in the Adjara region. Part of the regional command structure that oversaw persecution of independent media. Sanctioned by Estonia.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
    ],
  },
  {
    id: "541",
    name: "Teimuraz Kalandadze",
    position: "Director, Kakheti Police Department",
    organization: "Ministry of Internal Affairs",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Regional Police Command",
      severity: "high",
      details: "Director of the Kakheti Police Department responsible for police operations in the eastern Kakheti region. Part of the nationwide command structure implementing crackdowns on protesters. Sanctioned by Estonia.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Estonia Sanctions"],
    sources: [
      { title: "TI Georgia: Sanctioned Georgian Dream Representatives", url: "https://transparency.ge/en/post/sanctioned-georgian-dream-representatives" },
    ],
  },
  // === CZECH SEPTEMBER 2025 SANCTIONS (Judges & Prosecutor) ===
  {
    id: "542",
    name: "Koba Chagunava",
    position: "Judge",
    organization: "Georgian Judiciary",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Judicial Persecution of Protesters",
      severity: "high",
      details: "Judge sanctioned by Czech Republic in September 2025 for role in brutal crackdowns on protests in 2024-2025. Part of the judicial apparatus enabling prosecution of protesters through perfunctory trials and denial of due process.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Czech Republic Sanctions"],
    sources: [
      { title: "Civil.ge: Czech Sanctions September 2025", url: "https://civil.ge/archives/703218" },
    ],
  },
  {
    id: "543",
    name: "Mikheil Jinjolia",
    position: "Judge",
    organization: "Georgian Judiciary",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Judicial Persecution of Protesters",
      severity: "high",
      details: "Judge sanctioned by Czech Republic in September 2025 for role in brutal crackdowns on protests in 2024-2025. Involved in processing protester cases through the captured judicial system with denial of fair trial rights.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Czech Republic Sanctions"],
    sources: [
      { title: "Civil.ge: Czech Sanctions September 2025", url: "https://civil.ge/archives/703218" },
    ],
  },
  {
    id: "544",
    name: "Lasha Kotrikadze",
    position: "Prosecutor",
    organization: "Prosecutor's Office of Georgia",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Political Prosecution of Protesters",
      severity: "high",
      details: "Prosecutor sanctioned by Czech Republic in September 2025 for role in brutal crackdowns on protests in 2024-2025. Part of the prosecutorial apparatus pursuing politically motivated cases against protesters, activists, and journalists.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["Czech Republic Sanctions"],
    sources: [
      { title: "Civil.ge: Czech Sanctions September 2025", url: "https://civil.ge/archives/703218" },
    ],
  },
  // === UK September 2025 Sanctions ===
  {
    id: "545",
    name: "Levan Vasadze",
    position: "Ultra-Conservative Figure & Georgian Dream Associate",
    organization: "Georgian March / Alt-Info Ally",
    photo: "/placeholder.svg",
    complicity: {
      nature: "Pro-Russian Extremism & Putin Support",
      severity: "high",
      details: "Ultra-conservative figure with close ties to Georgian Dream and pro-Russian movements. Sanctioned by UK in September 2025 as a Georgia-linked supporter of Putin's illegal war in Ukraine. Has organized anti-LGBTQ+ and anti-Western rallies and is associated with violent far-right groups.",
    },
    dateAdded: "2024-12-23",
    sanctions: ["UK Sanctions"],
    sources: [
      { title: "Civil.ge: UK Sanctions September 2025", url: "https://civil.ge/archives/701692" },
      { title: "UK Gov: Sanctions on Georgia-linked Putin Supporters", url: "https://www.gov.uk/government/news/uk-sanctions-georgia-linked-supporters-of-putins-illegal-war-in-ukraine" },
    ],
  },
  // Duplicate entries removed during de-duplication:
  // - Shalva Tadumadze ID 522 - consolidated into ID 418
  // - ID 523: Placeholder entry "Georgian Official (Czech Sanctions 1)" - removed
  // - ID 524: Ilia Tsulaia duplicate - merged into ID 142
  // - ID 525: Ivane Chkhartishvili duplicate - merged into ID 441
  // - ID 526: Sulkhan Papashvili duplicate - merged into ID 442
  // - ID 527: Giorgi Kapanadze duplicate - merged into ID 443
];

const TheList = () => {
  const { language } = useLanguage();
  const [hasEntered, setHasEntered] = useState(() => {
    return localStorage.getItem("theList-hasEntered") === "true";
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [selectedEntry, setSelectedEntry] = useState<RegistryEntry | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showHealthCheck, setShowHealthCheck] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [showBrokenFixer, setShowBrokenFixer] = useState(false);
  const [showMigration, setShowMigration] = useState(false);
  const [showBatchImport, setShowBatchImport] = useState(false);
  const [photoRefreshVersion, setPhotoRefreshVersion] = useState(0);
  const [showPhotoDebug, setShowPhotoDebug] = useState(false);
  const [photoOverrides, setPhotoOverrides] = useState<Record<string, string | null>>({});

  const handlePhotoImportComplete = () => {
    setPhotoRefreshVersion(v => v + 1);
  };

  // Handle clearing/replacing broken photos (in-memory overrides)
  const handleClearPhoto = useCallback((id: string) => {
    setPhotoOverrides((prev) => ({ ...prev, [id]: null }));
  }, []);

  const handleReplacePhoto = useCallback((id: string, newUrl: string) => {
    setPhotoOverrides((prev) => ({ ...prev, [id]: newUrl }));
  }, []);

  // Apply in-memory overrides to entries
  const entriesWithOverrides = useMemo(() => {
    return registryEntries.map((entry) => {
      const override = photoOverrides[entry.id];
      if (override === null) {
        return { ...entry, photo: "" }; // cleared
      } else if (override) {
        return { ...entry, photo: override }; // replaced
      }
      return entry;
    });
  }, [photoOverrides]);

  const handleEnter = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setHasEntered(true);
      localStorage.setItem("theList-hasEntered", "true");
    }, 800);
  };

  const filteredEntries = useMemo(() => {
    return entriesWithOverrides.filter((entry) => {
      const matchesSearch =
        entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.organization?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.complicity.nature.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSeverity =
        severityFilter === "all" || entry.complicity.severity === severityFilter;
      return matchesSearch && matchesSeverity;
    });
  }, [searchQuery, severityFilter, entriesWithOverrides]);

  const handleSelectEntry = (entry: RegistryEntry) => {
    setScrollPosition(window.scrollY);
    setSelectedEntry(entry);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleBack = () => {
    setSelectedEntry(null);
  };

  useEffect(() => {
    if (!selectedEntry && scrollPosition > 0) {
      window.scrollTo({ top: scrollPosition, behavior: "instant" });
    }
  }, [selectedEntry, scrollPosition]);

  const stats = {
    total: registryEntries.length,
    high: registryEntries.filter((e) => e.complicity.severity === "high").length,
    medium: registryEntries.filter((e) => e.complicity.severity === "medium").length,
    low: registryEntries.filter((e) => e.complicity.severity === "low").length,
  };

  // Gateway splash screen
  if (!hasEntered) {
    return (
      <div 
        className={`min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden transition-opacity duration-700 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
      >
        {/* Scan lines effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)",
          }}
        />
        
        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.8) 100%)",
          }}
        />

        {/* Pulsing border frame */}
        <div className="absolute inset-8 border border-neutral-800 pointer-events-none" />
        <div className="absolute inset-12 border border-neutral-900 pointer-events-none" />

        <div className="relative z-10 text-center px-8 max-w-3xl">
          {/* Warning indicator */}
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-neutral-950 border border-neutral-800 mb-12">
            <div className="w-2 h-2 bg-[#DC143C] animate-pulse" />
            <p className="text-neutral-500 uppercase tracking-[0.4em] text-[9px] font-mono font-bold">
              {language === "ge" ? "შეზღუდული წვდომა" : "RESTRICTED ACCESS"}
            </p>
          </div>

          {/* Main title */}
          <h1
            className="text-[8rem] sm:text-[12rem] font-black uppercase tracking-[-0.04em] mb-8 leading-[0.8]"
            style={{
              fontFamily: "Bebas Neue, Arial Black, sans-serif",
              textShadow: "4px 4px 0px rgba(20,20,20,1), 8px 8px 0px rgba(0,0,0,1)",
              color: "#e5e5e5",
            }}
          >
            {language === "ge" ? "სია" : "THE LIST"}
          </h1>

          {/* Subtitle */}
          <p className="text-neutral-400 text-lg md:text-xl mb-16 leading-relaxed max-w-xl mx-auto">
            {language === "ge"
              ? "დოკუმენტირებული დანაშაულები. მუდმივი ჩანაწერი. არანაირი იმუნიტეტი."
              : "Documented crimes. Permanent record. No immunity."}
          </p>

          {/* Enter button */}
          <button
            onClick={handleEnter}
            className="group relative px-12 py-5 bg-transparent border-2 border-neutral-700 text-white uppercase tracking-[0.3em] text-sm font-bold transition-all duration-300 hover:border-[#DC143C] hover:bg-[#DC143C]/10 hover:shadow-[0_0_40px_rgba(220,20,60,0.3)]"
          >
            <span className="relative z-10">
              {language === "ge" ? "შესვლა" : "ENTER"}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </button>

          {/* Warning text */}
          <p className="text-neutral-600 text-xs uppercase tracking-[0.2em] mt-16 font-mono">
            {language === "ge"
              ? "გაფრთხილება: შეიცავს დოკუმენტირებულ სისასტიკეს"
              : "WARNING: CONTAINS DOCUMENTED ATROCITIES"}
          </p>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-neutral-800" />
        <div className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-neutral-800" />
        <div className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-neutral-800" />
        <div className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-neutral-800" />
      </div>
    );
  }

  // If an entry is selected, show the detail page
  if (selectedEntry) {
    return <RegistryDetailPage entry={selectedEntry} onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-black animate-fade-in">
        {/* Header */}
        <div className="border-b-[1px] border-neutral-800 bg-black relative overflow-hidden">
          {/* Scan lines effect */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.02]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)",
            }}
          ></div>

          {/* Vignette effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)",
            }}
          ></div>

          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-28 relative">
            <div className="max-w-5xl">
              {/* Subtle marker */}
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-neutral-900 border-l-[2px] border-neutral-700 mb-12 font-mono shadow-2xl">
                <div className="w-2 h-2 bg-neutral-500"></div>
                <p className="text-neutral-400 uppercase tracking-[0.35em] text-[10px] font-bold">
                  {language === "ge" ? "მუდმივი ჩანაწერი" : "PERMANENT RECORD"}
                </p>
              </div>

              {/* Massive haunting title */}
              <h1
                className="text-[11rem] sm:text-[15rem] font-black uppercase tracking-[-0.05em] mb-16 leading-[0.75] text-white"
                style={{
                  fontFamily: "Bebas Neue, Arial Black, sans-serif",
                  textShadow:
                    "6px 6px 0px rgba(20,20,20,1), 12px 12px 0px rgba(0,0,0,1), 0 0 80px rgba(0,0,0,0.9)",
                  color: "#e5e5e5",
                }}
              >
                {language === "ge" ? "სია" : "THE LIST"}
              </h1>

              <div className="space-y-10 text-[18px] leading-[1.8] font-sans">
                <p className="text-neutral-200 font-bold text-[22px] leading-[1.5]">
                  {language === "ge"
                    ? "ეს არ არის ბრალდებები. ეს არის დოკუმენტირებული დანაშაულები ადამიანების წინააღმდეგ."
                    : "These are not allegations. These are documented crimes against human beings."}
                </p>

                <p className="text-neutral-300 text-[19px]">
                  {language === "ge"
                    ? "ყველა აქ ჩამოთვლილმა ადამიანმა გამოიწვია გაზომვადი ზიანი. მათ მოკლეს, აწამეს, გამოიყენეს, გააძევეს ან გაანადგურეს სიცოცხლეები."
                    : "Every person listed here caused measurable harm. They killed, tortured, exploited, displaced, or destroyed lives. The evidence exists. The victims are real. The suffering is documented."}
                </p>

                <div className="border-l-[3px] border-neutral-600 pl-8 py-6 bg-neutral-950/60">
                  <p className="text-neutral-200 font-bold text-[20px] leading-[1.65]">
                    {language === "ge" ? (
                      <>
                        მათ იმოქმედეს დაუსჯელობით, რადგან სჯეროდათ, რომ არავინ
                        დააკისრებდა პასუხისმგებლობას.
                        <br />
                        <br />
                        ისინი შეცდნენ.
                      </>
                    ) : (
                      <>
                        They acted with impunity because they believed no one would hold
                        them accountable.
                        <br />
                        <br />
                        They were wrong.
                      </>
                    )}
                  </p>
                </div>

                <p className="text-neutral-300 text-[18px]">
                  {language === "ge"
                    ? "საერთაშორისო სასამართლოები ნელია. ეროვნული სისტემები კორუმპირებულია ან დაპყრობილი. ძალაუფლება იცავს ძალაუფლებას. ამიტომ ჩვენ ამას ვაკეთებთ: ვასახელებთ მათ. ვადოკუმენტებთ რა გააკეთეს."
                    : "International courts are slow. National systems are corrupted or captured. Power protects power. So we do this: we name them. We document what they did. We create a permanent record that cannot be erased, cannot be buried, cannot be forgotten."}
                </p>

                <div className="bg-neutral-950 border-[2px] border-neutral-800 px-8 py-7 shadow-[0_0_60px_rgba(0,0,0,0.8)]">
                  <p className="text-neutral-100 font-bold text-[19px] leading-[1.7] uppercase tracking-wide">
                    {language === "ge" ? (
                      <>
                        ეს არის გარდამავალი მართლმსაჯულება, როცა ფორმალური
                        მართლმსაჯულება ვერ ხერხდება.
                        <br />
                        ეს არის ისტორიული ჩანაწერი.
                        <br />
                        ეს არის ანგარიშვალდებულება.
                      </>
                    ) : (
                      <>
                        This is transitional justice when formal justice fails.
                        <br />
                        This is the historical record.
                        <br />
                        This is accountability.
                      </>
                    )}
                  </p>
                </div>

                <p className="text-neutral-400 text-[17px] border-t-[2px] border-neutral-900 pt-8">
                  <span className="font-bold text-neutral-200 text-[18px]">
                    {language === "ge"
                      ? "აქ დოკუმენტირებულთათვის:"
                      : "To those documented here:"}
                  </span>
                  <br />
                  {language === "ge"
                    ? "თქვენ შეგიძლიათ ამის დასრულება. აღიარეთ ზიანი, რომელიც გამოიწვიეთ. დაასახელეთ საჯაროდ. აიღეთ სრული პასუხისმგებლობა. დაიწყეთ ნამდვილი გამოსწორება."
                    : "You can end this. Acknowledge the harm you caused. Name it publicly. Take full responsibility. Begin genuine repair. Until you do, this record stands as permanent witness to what you have done."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            <div className="bg-black border-[3px] border-neutral-800 p-6 shadow-[0_0_30px_rgba(0,0,0,0.9)] relative overflow-hidden">
              <div
                className="absolute top-0 right-0 text-[120px] font-black text-white/[0.02] leading-none"
                style={{ fontFamily: "Bebas Neue" }}
              >
                01
              </div>
              <div className="text-[9px] uppercase tracking-[0.25em] text-neutral-600 mb-2 font-mono font-bold">
                {language === "ge" ? "დოკუმენტირებული" : "DOCUMENTED"}
              </div>
              <div
                className="text-7xl font-black text-white mb-1 tabular-nums relative z-10"
                style={{ fontFamily: "Bebas Neue" }}
              >
                {stats.total}
              </div>
              <div className="text-[10px] text-neutral-700 uppercase tracking-[0.2em] font-mono">
                {language === "ge" ? "ზიანის მიმყენებლები" : "PERPETRATORS OF HARM"}
              </div>
            </div>
            <div className="bg-black border-[3px] border-[#8B0000] p-6 shadow-[0_0_40px_rgba(139,0,0,0.4)] relative overflow-hidden">
              <div
                className="absolute top-0 right-0 text-[120px] font-black text-[#DC143C]/[0.08] leading-none"
                style={{ fontFamily: "Bebas Neue" }}
              >
                02
              </div>
              <div className="text-[9px] uppercase tracking-[0.25em] text-[#DC143C]/70 mb-2 font-mono font-bold">
                {language === "ge" ? "კრიტიკული" : "CRITICAL"}
              </div>
              <div
                className="text-7xl font-black text-[#DC143C] mb-1 tabular-nums relative z-10 drop-shadow-[0_0_15px_rgba(220,20,60,0.6)]"
                style={{ fontFamily: "Bebas Neue" }}
              >
                {stats.high}
              </div>
              <div className="text-[10px] text-[#DC143C]/50 uppercase tracking-[0.2em] font-mono">
                {language === "ge" ? "მძიმე სისასტიკე" : "SEVERE ATROCITIES"}
              </div>
            </div>
            <div className="bg-black border-[3px] border-orange-900 p-6 shadow-[0_0_30px_rgba(255,140,0,0.2)] relative overflow-hidden">
              <div
                className="absolute top-0 right-0 text-[120px] font-black text-orange-600/[0.06] leading-none"
                style={{ fontFamily: "Bebas Neue" }}
              >
                03
              </div>
              <div className="text-[9px] uppercase tracking-[0.25em] text-orange-600/70 mb-2 font-mono font-bold">
                {language === "ge" ? "ამაღლებული" : "ELEVATED"}
              </div>
              <div
                className="text-7xl font-black text-orange-500 mb-1 tabular-nums relative z-10"
                style={{ fontFamily: "Bebas Neue" }}
              >
                {stats.medium}
              </div>
              <div className="text-[10px] text-orange-800/70 uppercase tracking-[0.2em] font-mono">
                {language === "ge" ? "სისტემური დარღვევები" : "SYSTEMATIC VIOLATIONS"}
              </div>
            </div>
            <div className="bg-black border-[3px] border-neutral-700 p-6 shadow-[0_0_25px_rgba(0,0,0,0.8)] relative overflow-hidden">
              <div
                className="absolute top-0 right-0 text-[120px] font-black text-neutral-700/[0.04] leading-none"
                style={{ fontFamily: "Bebas Neue" }}
              >
                04
              </div>
              <div className="text-[9px] uppercase tracking-[0.25em] text-neutral-600 mb-2 font-mono font-bold">
                {language === "ge" ? "მონიტორინგი" : "MONITORED"}
              </div>
              <div
                className="text-7xl font-black text-neutral-500 mb-1 tabular-nums relative z-10"
                style={{ fontFamily: "Bebas Neue" }}
              >
                {stats.low}
              </div>
              <div className="text-[10px] text-neutral-700 uppercase tracking-[0.2em] font-mono">
                {language === "ge" ? "მიმდინარე დარღვევები" : "ONGOING VIOLATIONS"}
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border-2 border-neutral-800 p-7 mb-16 shadow-xl">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder={
                    language === "ge"
                      ? "ძებნა სახელით, ორგანიზაციით ან ზიანის ბუნებით..."
                      : "Search by name, organization, or nature of harm..."
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-black/60 border-2 border-neutral-700 text-white placeholder:text-neutral-600 h-12 px-5 focus:border-red-800 focus:ring-2 focus:ring-red-900/30 transition-all"
                />
              </div>
              <div className="sm:w-56">
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger className="bg-black/60 border-2 border-neutral-700 text-white h-12 px-5 focus:border-red-800 focus:ring-2 focus:ring-red-900/30 transition-all">
                    <SelectValue
                      placeholder={
                        language === "ge"
                          ? "ყველა სიმძიმის დონე"
                          : "All severity levels"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-2 border-neutral-700 text-white">
                    <SelectItem value="all">
                      {language === "ge" ? "ყველა სიმძიმის დონე" : "All severity levels"}
                    </SelectItem>
                    <SelectItem value="high">
                      {language === "ge" ? "მაღალი სიმძიმე" : "High severity"}
                    </SelectItem>
                    <SelectItem value="medium">
                      {language === "ge" ? "საშუალო სიმძიმე" : "Medium severity"}
                    </SelectItem>
                    <SelectItem value="low">
                      {language === "ge" ? "დაბალი სიმძიმე" : "Low severity"}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowHealthCheck(true)}
                className="border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-800 gap-2 h-12"
              >
                <Activity className="w-4 h-4" />
                {language === "ge" ? "ფოტო შემოწმება" : "Photo Check"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowBulkUpload(true)}
                className="border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-800 gap-2 h-12"
              >
                <Upload className="w-4 h-4" />
                {language === "ge" ? "ფოტო ატვირთვა" : "Bulk Upload"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowBrokenFixer(true)}
                className="border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-800 gap-2 h-12"
              >
                <Wrench className="w-4 h-4" />
                {language === "ge" ? "გატეხილების გასწორება" : "Fix Broken"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMigration(true)}
                className="border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-800 gap-2 h-12"
              >
                <RefreshCw className="w-4 h-4" />
                {language === "ge" ? "ფოტო მიგრაცია" : "Re-migrate"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowBatchImport(true)}
                className="border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-800 gap-2 h-12"
              >
                <Images className="w-4 h-4" />
                {language === "ge" ? "ბეჩ იმპორტი" : "Batch Import"}
              </Button>
              <Button
                variant={showPhotoDebug ? "default" : "outline"}
                size="sm"
                onClick={() => setShowPhotoDebug(!showPhotoDebug)}
                className={showPhotoDebug ? "gap-2 h-12" : "border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-800 gap-2 h-12"}
              >
                {showPhotoDebug ? "Hide Debug" : "Photo Debug"}
              </Button>
            </div>

            {(searchQuery || severityFilter !== "all") && (
              <div className="flex items-center justify-between mt-5 pt-5 border-t-2 border-neutral-800">
                <div className="text-sm text-neutral-400 tracking-wide">
                  {language === "ge" ? (
                    <>
                      ნაჩვენებია{" "}
                      <span className="font-bold text-white">{filteredEntries.length}</span>{" "}
                      სულ{" "}
                      <span className="font-bold text-white">{stats.total}</span>{" "}
                      დოკუმენტირებული პირიდან
                    </>
                  ) : (
                    <>
                      Showing{" "}
                      <span className="font-bold text-white">{filteredEntries.length}</span>{" "}
                      of <span className="font-bold text-white">{stats.total}</span>{" "}
                      documented individuals
                    </>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setSeverityFilter("all");
                  }}
                  className="text-neutral-400 hover:text-white hover:bg-neutral-800 uppercase text-xs tracking-wider font-semibold transition-all"
                >
                  {language === "ge" ? "ფილტრების გასუფთავება" : "Clear filters"}
                </Button>
              </div>
            )}
          </div>

          {/* Registry Grid */}
          {filteredEntries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredEntries.map((entry) => (
                <RegistryCard 
                  key={entry.id} 
                  entry={entry} 
                  onSelect={handleSelectEntry}
                  refreshVersion={photoRefreshVersion}
                  showDebug={showPhotoDebug}
                />
              ))}
            </div>
          ) : (
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border-2 border-neutral-800 p-16 text-center shadow-xl">
              <h3 className="text-xl text-white mb-3 font-bold tracking-wide">
                {language === "ge"
                  ? "თქვენი ძებნის შესაბამისი ჩანაწერები ვერ მოიძებნა"
                  : "No records match your search"}
              </h3>
              <p className="text-neutral-500 text-base tracking-wide">
                {language === "ge"
                  ? "სცადეთ ფილტრების შეცვლა"
                  : "Try adjusting your filters"}
              </p>
            </div>
        )}
      </div>

      {/* Photo Health Check Modal */}
      {showHealthCheck && (
        <PhotoHealthCheck
          entries={registryEntries.map((e) => ({ id: e.id, name: e.name, photo: e.photo }))}
          onClose={() => setShowHealthCheck(false)}
        />
      )}

      {/* Bulk Photo Upload Modal */}
      <Dialog open={showBulkUpload} onOpenChange={setShowBulkUpload}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto p-0">
          <div>
            <BulkPhotoUpload
              entries={registryEntries}
              onClose={() => setShowBulkUpload(false)}
              onImportComplete={handlePhotoImportComplete}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Broken Photo Fixer Modal */}
      <Dialog open={showBrokenFixer} onOpenChange={setShowBrokenFixer}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden p-0">
          <BrokenPhotoFixer
            entries={entriesWithOverrides.map((e) => ({ id: e.id, name: e.name, photo: e.photo }))}
            onClose={() => setShowBrokenFixer(false)}
            onClearPhoto={handleClearPhoto}
            onReplacePhoto={handleReplacePhoto}
          />
        </DialogContent>
      </Dialog>

      {/* Quick Photo Migration Modal */}
      <Dialog open={showMigration} onOpenChange={setShowMigration}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-hidden p-0">
          <QuickPhotoMigration
            entries={registryEntries}
            onComplete={handlePhotoImportComplete}
            onClose={() => setShowMigration(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Batch Photo Import Modal */}
      <Dialog open={showBatchImport} onOpenChange={setShowBatchImport}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden p-0">
          <BatchPhotoImport
            entries={registryEntries}
            onComplete={handlePhotoImportComplete}
            onClose={() => setShowBatchImport(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TheList;
