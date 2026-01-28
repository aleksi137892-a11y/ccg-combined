// Centralized contact information for the IIMG
// Signal username: CCG.95, WhatsApp: +19406037552, Threema: 5HCEVM84, ProtonMail: submissions_iimg@proton.me

export const CONTACTS = {
  signal: {
    username: "CCG.95",
    url: "https://signal.me/#eu/s5fLOAXoBqChwY13U_LhOvqcWDBfPfsjBe0suqv0yOYYfNDDz5FOuoyedcUkFrfO",
    display: "CCG.95",
  },
  whatsapp: {
    number: "+19406037552",
    url: "https://wa.me/19406037552",
    display: "+1 940 603 7552",
  },
  threema: {
    id: "5HCEVM84",
    url: "https://threema.id/5HCEVM84",
    display: "5HCEVM84",
  },
  protonmail: {
    email: "submissions_iimg@proton.me",
    url: "mailto:submissions_iimg@proton.me",
    display: "submissions_iimg@proton.me",
  },
  tresorit: {
    url: "https://web.tresorit.com/r#3COkGJ8lyQzeYmTk5C-X2A",
  },
} as const;

export type ContactType = keyof typeof CONTACTS;
