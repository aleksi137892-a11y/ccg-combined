export const triageContent = {
  welcome: {
    en: "How can I help you find what you need?",
    ge: "როგორ შემიძლია დაგეხმაროთ იპოვოთ რაც გჭირდებათ?"
  },
  placeholder: {
    en: "Describe your situation or ask a question...",
    ge: "აღწერეთ თქვენი სიტუაცია ან დასვით კითხვა..."
  },
  roles: [
    {
      id: 'victim',
      label: { en: "I experienced harm", ge: "მე განვიცადე ზიანი" },
      prompt: { en: "I am a victim. I experienced harm and need help.", ge: "მე ვარ მსხვერპლი. მე განვიცადე ზიანი და მჭირდება დახმარება." }
    },
    {
      id: 'witness',
      label: { en: "I witnessed something", ge: "მე რაღაც ვიხილე" },
      prompt: { en: "I am a witness. I observed wrongdoing and want to report it.", ge: "მე ვარ მოწმე. ვიხილე დანაშაული და მინდა განაცხადოს." }
    },
    {
      id: 'insider',
      label: { en: "I work inside an institution", ge: "ვმუშაობ ინსტიტუციაში" },
      prompt: { en: "I am an insider. I work within an institution and have information.", ge: "მე ვარ ინსაიდერი. ვმუშაობ ინსტიტუციაში და მაქვს ინფორმაცია." }
    },
    {
      id: 'journalist',
      label: { en: "I'm a journalist", ge: "მე ჟურნალისტი ვარ" },
      prompt: { en: "I am a journalist researching for a story.", ge: "მე ჟურნალისტი ვარ და ვამზადებ მასალას." }
    },
    {
      id: 'listed',
      label: { en: "I'm on The List", ge: "მე სიაში ვარ" },
      prompt: { en: "I am on The List and want to understand my options.", ge: "მე სიაში ვარ და მინდა გავიგო ჩემი ვარიანტები." }
    },
    {
      id: 'support',
      label: { en: "I want to help", ge: "მინდა დახმარება" },
      prompt: { en: "I want to support CCG's work. How can I help?", ge: "მინდა დავეხმარო CCG-ს საქმიანობას. როგორ შემიძლია?" }
    }
  ],
  safety: {
    en: "For sensitive matters, use Secure Channel. Do not email documents at risk.",
    ge: "სენსიტიური საკითხებისთვის გამოიყენეთ უსაფრთხო არხი. არ გააგზავნოთ დოკუმენტები ელფოსტით."
  },
  secureLink: {
    label: { en: "Open Secure Channel", ge: "უსაფრთხო არხის გახსნა" },
    href: "https://forum.sabcho.org/secure"
  },
  error: {
    en: "Unable to connect. Please try the links below or contact us directly.",
    ge: "კავშირი ვერ მოხერხდა. გთხოვთ, გამოიყენეთ ქვემოთ მოცემული ბმულები ან დაგვიკავშირდით პირდაპირ."
  },
  secureHotlines: {
    title: { en: "Secure hotlines", ge: "უსაფრთხო ხაზები" },
    description: { en: "For immediate encrypted contact:", ge: "დაშიფრული კავშირისთვის:" },
    channels: [
      {
        id: 'signal',
        name: 'Signal',
        href: 'https://signal.me/#eu/iimg',
        description: { en: 'Most secure', ge: 'ყველაზე უსაფრთხო' }
      },
      {
        id: 'whatsapp',
        name: 'WhatsApp',
        href: 'https://wa.me/message/IIMG_CCG',
        description: { en: 'End-to-end encrypted', ge: 'დაშიფრული' }
      },
      {
        id: 'threema',
        name: 'Threema',
        href: 'https://threema.id/IIMGCCG',
        description: { en: 'Anonymous option', ge: 'ანონიმური' }
      }
    ]
  },
  animatedPlaceholders: {
    en: [
      "I need legal help...",
      "I witnessed something...",
      "I want to report abuse...",
      "How do I submit evidence?",
      "I'm a journalist researching...",
      "I work inside an institution...",
      "How can I protect myself...",
      "My family member needs help...",
      "My rights were violated...",
      "I want to report anonymously...",
      "How can I support the cause...",
      "I'm on The List, what now..."
    ],
    ge: [
      "მჭირდება იურიდიული დახმარება...",
      "მე რაღაც ვიხილე...",
      "მინდა ძალადობის შეტყობინება...",
      "როგორ წარვადგინო მტკიცებულება?",
      "მე ჟურნალისტი ვარ...",
      "ვმუშაობ ინსტიტუციაში...",
      "როგორ დავიცვა თავი...",
      "ჩემი ოჯახის წევრს სჭირდება დახმარება...",
      "დაირღვა ჩემი უფლებები...",
      "მინდა ანონიმურად შეტყობინება...",
      "როგორ შემიძლია დახმარება...",
      "მე სიაში ვარ, რა გავაკეთო..."
    ]
  },
  quickLinks: [
    { label: { en: "Submit Petition", ge: "პეტიცია" }, href: "https://forum.sabcho.org/petition" },
    { label: { en: "Secure Channel", ge: "უსაფრთხო არხი" }, href: "https://forum.sabcho.org/secure" },
    { label: { en: "FAQ", ge: "FAQ" }, href: "https://sabcho.org/faq" },
    { label: { en: "Contact", ge: "კონტაქტი" }, href: "https://sabcho.org/contact" }
  ]
};
