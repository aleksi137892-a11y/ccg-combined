import { translations } from "@/i18n/translations";

// Extract English translations
const translationsEn = translations.en;

// Hardcoded English strings from components
const componentStrings = {
  securityAdvisoryAutoDialog: {
    portal: "Secure Documentation Portal",
    mandate: "Read Our Mandate",
    donate: "Support Our Work",
    securityWarningTitle: "Your safety is our priority",
    securityWarningText: "Consider using a VPN or Tor Browser. Clear your browsing history after visiting.",
    loadingPortal: "Loading portal...",
    loadingGeneric: "Loading...",
    skip: "Skip",
    clearBrowserHistory: "How to clear your browser history"
  },
  header: {
    languageLabel: "In English",
    languages: {
      en: "In English",
      ka: "ქართულად",
      ru: "По-русски",
      az: "Azərbaycanca",
      hy: "Հայdelays"
    }
  },
  footer: {
    disclaimer: "This investigative mechanism operates as an independent initiative...",
    copyright: "Independent Investigative Mechanism for Georgia"
  },
  thankYouScreen: {
    title: "Submission Received",
    subtitle: "Your evidence has been securely preserved",
    secureComm: "Secure Communication",
    contactMessage: "For follow-up requests or additional submissions:",
    returnHome: "Return to Mandate",
    iimg: "Independent Investigative Mechanism for Georgia",
    support: "Support the Georgia Civil Society Council",
    shareTitle: "Share with a friend"
  },
  donate: {
    headline: "Defense, Not Charity",
    subheadline: "Support independent documentation of state violence",
    whyDonate: "Why Your Support Matters"
  },
  submitEvidenceLanding: {
    exitButton: "Exit",
    title: "Secure Documentation Portal",
    subtitle: "Document. Preserve. Protect."
  }
};

// Data intake protocols with step-by-step instructions
const dataIntakeProtocols = {
  overview: {
    title: "Data Intake Protocol & Procedures",
    description: "Step-by-step instructions for evidence submission via all supported channels",
    portalUrl: "https://civic-light-keeper.lovable.app/submit-evidence",
    tiers: [
      {
        tier: 1,
        name: "Testimony",
        description: "Written account submission with SHA-256 verification"
      },
      {
        tier: 2,
        name: "Documents",
        description: "Encrypted Tresorit upload for sensitive files with chain of custody naming"
      },
      {
        tier: 3,
        name: "Digital Evidence",
        description: "Berkeley Protocol via Save App for court-admissible documentation"
      },
      {
        tier: 4,
        name: "Physical Evidence",
        description: "Preservation guidelines and coordination for physical items"
      },
      {
        tier: 5,
        name: "Direct Contact",
        description: "Speak with our team via secure channels"
      }
    ]
  },

  onboardingFlow: {
    title: "Onboarding Flow (Mental Health & Safety)",
    description: "7-step flow to ensure user safety and wellbeing before evidence collection",
    steps: [
      {
        step: 1,
        id: "safety",
        title: "Documentation with Dignity",
        content: "This portal balances our forensic duty to accountability with our duty of care to you. Your wellbeing is as important as the evidence you provide.",
        legalConsent: "By proceeding, you consent to your information being collected and preserved in accordance with international humanitarian law standards. Evidence may be shared with international accountability mechanisms. Your identity will be protected to the fullest extent possible under applicable law."
      },
      {
        step: 2,
        id: "medical",
        title: "Medical Check",
        question: "Do you need medical attention?",
        supportText: "If you have ongoing symptoms or injuries, please share them in your testimony—this can be important for documentation.",
        careCommitment: "We are committed to ensuring everyone has access to adequate care. If you need medical support, reach out via Signal so we can help coordinate."
      },
      {
        step: 3,
        id: "emotional",
        title: "Emotional Support",
        question: "Would you like to speak with someone first?",
        content: "You do not have to carry this alone. Our team is available to listen and provide support before you begin documentation."
      },
      {
        step: 4,
        id: "affirming",
        title: "Affirmation",
        headline: "We're here for you.",
        messages: [
          "Whatever you have witnessed or experienced, you do not have to carry it alone.",
          "Your story matters. Your voice matters.",
          "We are here to listen, to document with care, and to ensure what you share is preserved with the dignity it deserves.",
          "Take your time. There is no rush."
        ]
      },
      {
        step: 5,
        id: "resources",
        title: "Support Resources",
        headline: "There are people who can help.",
        content: "These organizations provide specialized support for those who have experienced trauma, violence, or persecution.",
        organizations: [
          { name: "Médecins Sans Frontières (MSF)", focus: "Medical humanitarian assistance" },
          { name: "Physicians for Human Rights (PHR)", focus: "Medical documentation of human rights abuses" },
          { name: "International Rehabilitation Council for Torture Victims (IRCT)", focus: "Torture rehabilitation" },
          { name: "DART", focus: "Crisis response support" }
        ]
      },
      {
        step: 6,
        id: "security",
        title: "Security Guidelines",
        headline: "We want to hear from you—securely.",
        content: "Your safety is our priority. Before reaching out, please take a moment to review these guidelines.",
        securityTips: [
          "Use a VPN when accessing this portal",
          "Avoid work or monitored devices",
          "Consider a separate device for sensitive communications",
          "Clear browser history after each session"
        ]
      },
      {
        step: 7,
        id: "ready",
        title: "Ready to Proceed",
        headline: "When you're ready, we're ready.",
        content: "You do not need to know what happens next. That is our responsibility. Your role is simply to share what you witnessed or experienced.",
        assurance: "Everything you share is encrypted, handled with care, and preserved to the highest evidentiary standards.",
        action: "I'm ready to share my story"
      }
    ]
  },

  evidenceSelection: {
    title: "Evidence Type Selection",
    prompt: "What evidence do you have?",
    subtitle: "Select all that apply.",
    options: [
      { id: "story", title: "My testimony", description: "Your account of what occurred." },
      { id: "documents", title: "Documents", description: "Medical records, official papers, correspondence." },
      { id: "digital", title: "Photos & Videos", description: "Digital evidence with verified chain of custody." },
      { id: "physical", title: "Physical Materials", description: "Clothing, samples, objects requiring forensic preservation." },
      { id: "talk", title: "Speak with someone", description: "Connect with our team via secure channels." }
    ],
    queueNote: "Selected options are processed one at a time in priority order."
  },

  tier1Testimony: {
    title: "Tier 1: Testimony Flow",
    description: "Step-by-step testimony collection with cryptographic verification",
    steps: [
      {
        step: 1,
        title: "What happened?",
        subtitle: "Take your time. Every detail matters.",
        placeholder: "Describe what happened. Include dates, locations, and names if known..."
      },
      {
        step: 2,
        title: "When and where?",
        subtitle: "Dates, times, locations—whatever you can recall.",
        fields: [
          { label: "When", placeholder: "Date, approximate time, or period (e.g., 'December 2024')" },
          { label: "Where", placeholder: "Street, building, city, or region" }
        ]
      },
      {
        step: 3,
        title: "Who was involved?",
        subtitle: "Names, descriptions, roles—only what you are comfortable sharing.",
        placeholder: "Names, descriptions, or roles of those present..."
      },
      {
        step: 4,
        title: "Can we reach you?",
        subtitle: "Optional. Enables follow-up if needed for legal proceedings.",
        placeholder: "Signal number or encrypted email",
        note: "Optional. Allows follow-up if needed. We recommend Signal or ProtonMail."
      }
    ],
    submission: {
      process: [
        "All fields compiled into canonical content string",
        "SHA-256 hash computed for tamper-proof verification",
        "Submission stored in encrypted database",
        "Evidence ledger entry created"
      ],
      receiptFields: ["Registration ID (UUID)", "Timestamp (UTC)", "SHA-256 Digital Fingerprint"]
    },
    sampleReceipt: `CERTIFICATE OF REGISTRATION
Independent Investigative Mechanism of Georgia
Citizen-led Body of Appeal
────────────────────────────────────────────────

Submission Type:     General Testimony
Registration ID:     [UUID]
Timestamp (UTC):     [ISO 8601 Timestamp]

────────────────────────────────────────────────
DIGITAL FINGERPRINT (SHA-256)

[64-character hexadecimal hash]

────────────────────────────────────────────────

Status: Forensically Preserved

This cryptographic hash serves as a tamper-proof verification
of your submission. The content cannot be altered without
changing this fingerprint.

Berkeley Protocol Compliant
────────────────────────────────────────────────`
  },

  tier2Documents: {
    title: "Tier 2: Documents Flow",
    description: "Document upload with chain of custody naming convention",
    steps: [
      {
        step: 1,
        title: "What kind of documents?",
        subtitle: "Select all that apply.",
        documentTypes: [
          { id: "medical", label: "Medical Records", shortCode: "MED" },
          { id: "legal", label: "Legal Documents", shortCode: "LEG" },
          { id: "official", label: "Official Correspondence", shortCode: "OFF" },
          { id: "financial", label: "Financial Records", shortCode: "FIN" },
          { id: "identity", label: "Identity Documents", shortCode: "ID" },
          { id: "other", label: "Other Documents", shortCode: "DOC" }
        ]
      },
      {
        step: 2,
        title: "Describe your documents",
        subtitle: "What do they show? Why are they important?"
      },
      {
        step: 3,
        title: "When and where?",
        subtitle: "This helps us organize and verify your documents.",
        fields: [
          { label: "Date of document(s)", placeholder: "e.g., 2024-12-15 or December 2024" },
          { label: "Location / Source", placeholder: "e.g., Tbilisi, Rustavi, Ministry of..." }
        ]
      },
      {
        step: 4,
        title: "Chain of Custody Filename",
        subtitle: "Copy this and rename your file before uploading.",
        filenameFormat: "[DATE]_[TYPE-CODES]_[LOCATION]_[SESSION-ID]",
        examples: [
          "2024-12-15_MED_TBILISI_A3K9.pdf",
          "2024-12-15_MED-LEG_RUSTAVI_B7F2_1.pdf"
        ],
        multipleFilesNote: "Add _1, _2, _3 suffixes for multiple files"
      },
      {
        step: 5,
        title: "Ready to upload",
        subtitle: "Encrypted end-to-end. Only you control access.",
        afterUploading: [
          "Save your Tresorit confirmation",
          "Note the filename you used",
          "Return to add testimony if needed"
        ]
      }
    ],
    tresoritInfo: {
      whyTresorit: "End-to-end encrypted vault. Documents are never decrypted on our servers.",
      features: [
        "No account required",
        "End-to-end encrypted",
        "Files encrypted before leaving your device",
        "Only the Commission can access them"
      ]
    }
  },

  berkeleyProtocol: {
    title: "Tier 3: Berkeley Protocol via Save App",
    description: "Court-admissible digital evidence with cryptographic verification. The Save app by OpenArchive embeds cryptographic hashes, GPS coordinates, and timestamps into every file, creating legally defensible chain of custody.",
    overview: {
      headline: "Digital evidence needs verification.",
      content: "Photos, videos, documents, and other digital files can be critical evidence—but only if their authenticity can be proven.",
      note: "We'll walk you through the process step by step."
    },
    whyItMatters: {
      headline: "Why proper preservation matters.",
      content: "Courts require proof that digital evidence hasn't been altered. The Berkeley Protocol provides international standards for this verification.",
      concepts: [
        { title: "Cryptographic Verification", description: "Creates a unique digital fingerprint (hash) that proves the file is authentic and unaltered." },
        { title: "Timestamp & Location", description: "Embeds when and where the file was captured, creating an unalterable record." },
        { title: "Chain of Custody", description: "Documents the complete handling history from capture to submission." }
      ],
      medicalNote: "Medical records, injury photos, and treatment documentation are critical evidence. Ensure dates, provider names, and patient identifiers are visible."
    },
    submissionOptions: [
      { id: "save", title: "Save App (Berkeley Protocol Compliant)", description: "The only method that provides full cryptographic verification for court admissibility.", recommended: true },
      { id: "tresorit", title: "Tresorit Encrypted Upload", description: "End-to-end encrypted file transfer. Does not include cryptographic verification.", recommended: false },
      { id: "protonmail", title: "ProtonMail Attachment", description: "If you're having issues with other methods, you can always send files as attachments.", recommended: false }
    ],
    requirements: [
      "Mobile device (iOS or Android)",
      "Save app by OpenArchive (free)",
      "Internet connection for upload"
    ],
    appDownload: {
      ios: "https://apps.apple.com/app/save-by-openarchive/id1462212414",
      android: "https://play.google.com/store/apps/details?id=net.opendasharchive.openarchive.release",
      info: "https://open-archive.org/save"
    },
    steps: [
      {
        step: 1,
        title: "Download Save App",
        instructions: "Install the Save app from the iOS App Store or Google Play Store. Search for 'Save by OpenArchive' or use the direct links provided."
      },
      {
        step: 2,
        title: "Open Save App",
        instructions: "Launch the app. Tap the menu icon (☰) in the top-left corner to access settings."
      },
      {
        step: 3,
        title: "Add New Server",
        instructions: "Navigate to 'Servers' in the menu. Tap the '+' button to add a new server. Select 'WebDAV' as the server type."
      },
      {
        step: 4,
        title: "Enter Server URL",
        instructions: "Enter the server URL exactly as shown. Double-check for typos.",
        field: { label: "Server Address", value: "[WebDAV server URL]" }
      },
      {
        step: 5,
        title: "Enter Username",
        instructions: "Enter the username for the secure server.",
        field: { label: "Username", value: "iimg_contributor" }
      },
      {
        step: 6,
        title: "Enter Password",
        instructions: "Password is dynamically generated via secure edge function with anti-abuse protection.",
        note: "Password is revealed after completing verification on portal."
      },
      {
        step: 7,
        title: "Create Folder",
        instructions: "Save will prompt you to create a folder. Name it anything memorable to you. This is where your evidence will be stored."
      },
      {
        step: 8,
        title: "Upload Evidence",
        instructions: "Return to the Save app main screen. Capture new photos/videos or import existing files. The app will automatically hash each file and upload.",
        autoFeatures: [
          "GPS coordinates embedded (if enabled)",
          "Timestamp recorded",
          "SHA-256 hash generated",
          "Automatic upload via Tor"
        ]
      }
    ],
    credentials: {
      server: "nx86146.your-storageshare.de",
      path: "/remote.php/dav/files/iimg_intake",
      username: "iimg_contributor",
      passwordNote: "Generated dynamically via portal. Valid for 10 minutes. Regenerate if expired."
    },
    benefits: [
      "Cryptographic hash verification (SHA-256) proves file integrity",
      "Embedded GPS coordinates document location of capture",
      "Timestamps create undeniable timeline",
      "Chain of custody documentation meets legal standards",
      "Court-admissible under Berkeley Protocol international standards",
      "Files stored on EU-based infrastructure"
    ],
    troubleshooting: [
      { issue: "Connection failed", solution: "Verify server URL is correct. Check internet connection. Ensure password has not expired." },
      { issue: "Password expired", solution: "Return to portal and complete verification again to get a new password." },
      { issue: "Upload stuck", solution: "Check internet connection. Large files may take time. App will resume if interrupted." }
    ]
  },

  physicalEvidence: {
    title: "Tier 4: Physical Evidence Protocol",
    description: "Handling physical items requiring forensic preservation. Physical evidence is extremely sensitive and requires specialized handling to maintain legal admissibility. Contact us before taking any action.",
    overview: {
      headline: "Physical evidence requires care.",
      content: "Physical items—clothing, objects, documents—can be critical evidence. How you handle them now affects their legal value later."
    },
    safetyWarning: {
      headline: "Your safety comes first.",
      content: "If you suspect chemical contamination or exposure to hazardous materials, do not handle items directly. Contact us first."
    },
    criticalWarning: "DO NOT wash, clean, or handle physical evidence without guidance. Improper handling can destroy forensic value.",
    contactSoon: {
      headline: "Please contact us as soon as you're able.",
      content: "Physical evidence handling is extremely delicate. We need to coordinate with you directly to establish a secure chain of custody and provide guidance specific to your situation.",
      action: "Screenshot or save these contacts now."
    },
    steps: [
      {
        step: 1,
        title: "Safety First",
        instructions: "If chemical contamination is suspected (tear gas, pepper spray, unknown substances), do not handle directly. Keep distance and ventilate area. Seek medical attention if exposed.",
        priority: "critical"
      },
      {
        step: 2,
        title: "Contact Us Immediately",
        instructions: "Reach out via Signal, ProtonMail, or Threema BEFORE moving or handling anything. Describe what you have and your situation. We will provide specific guidance.",
        priority: "critical"
      },
      {
        step: 3,
        title: "Document In Place",
        instructions: "While waiting for response, use Save app to photograph evidence where it currently is. Capture wide shots showing context, then close-ups of details. Do not touch or move items.",
        priority: "high"
      },
      {
        step: 4,
        title: "Preserve Properly",
        instructions: "Once you receive guidance, follow material-specific preservation guidelines exactly. Each evidence type has specific requirements.",
        priority: "high"
      }
    ],
    preservationGuidelines: {
      clothing: {
        title: "Clothing & Textiles",
        instructions: [
          "Place in clean PAPER bag (NOT plastic - plastic traps moisture and degrades evidence)",
          "Do NOT wash, clean, brush, or shake",
          "Label bag with date, time, and location of incident",
          "Store in cool, dry place away from sunlight",
          "If wet, lay flat on clean paper to air dry before bagging"
        ]
      },
      liquids: {
        title: "Liquids & Chemical Residue",
        instructions: [
          "Use glass container with airtight lid if available",
          "Store upright in cool, dark location",
          "Refrigerate if possible - do NOT freeze",
          "Label container with date, time, location, and description",
          "If on fabric, preserve the fabric rather than extracting liquid"
        ]
      },
      documents: {
        title: "Paper Documents",
        instructions: [
          "Handle by edges only - fingerprints can obscure evidence",
          "Place in clean folder or envelope",
          "Store flat in cool, dry location",
          "Do NOT laminate, tape, staple, or write on original",
          "Photograph documents before handling for backup"
        ]
      },
      projectiles: {
        title: "Projectiles & Casings",
        instructions: [
          "Do NOT touch with bare hands - use gloves or paper",
          "Place in rigid container to prevent damage",
          "Label with exact location found",
          "Photograph in place before moving",
          "Do NOT attempt to clean or polish"
        ]
      },
      electronics: {
        title: "Electronic Devices",
        instructions: [
          "If device is ON, keep it on if possible",
          "If device is OFF, do NOT turn it on",
          "Do NOT charge the device",
          "Place in paper bag or envelope (not plastic)",
          "Note any passwords if known"
        ]
      },
      general: {
        title: "General Guidelines",
        instructions: [
          "Keep away from sunlight, heat, and humidity",
          "Minimize handling - each touch can degrade evidence",
          "Document everything - photos, notes, timeline",
          "Do NOT give to anyone until coordination with us",
          "Maintain continuous possession if possible"
        ]
      }
    },
    photographGuidance: {
      headline: "Please photograph what you have.",
      content: "Using the Save app to photograph evidence in your possession is the most forensically rigorous approach. The app embeds cryptographic verification automatically.",
      tips: [
        "Include a reference object for scale (coin, ruler, pen)",
        "Capture multiple angles",
        "Document any visible damage or markings",
        "Keep location services enabled"
      ]
    },
    chainOfCustody: {
      definition: "Chain of custody is the documented history of who has handled evidence and when. Breaks in chain of custody can make evidence inadmissible in court.",
      requirements: [
        "Document when you obtained the evidence",
        "Keep evidence in your personal possession",
        "Log any transfers with date, time, and parties involved",
        "Photograph evidence at each transfer point",
        "Keep written record of all handling"
      ]
    }
  },

  tier5DirectContact: {
    title: "Tier 5: Direct Contact (Urgent)",
    description: "Speak with our team via secure channels",
    headline: "There are people who can help.",
    subtitle: "You do not need to face this alone.",
    content: "Reach out directly. We respond within 24 hours.",
    options: [
      { action: "Return to tell my story", navigatesTo: "testimony" },
      { action: "Continue, thank you", navigatesTo: "thankYou" }
    ]
  },

  thankYouScreen: {
    title: "Submission Received",
    opening: "Thank you for your courage in coming forward.",
    messages: [
      "Your materials have been securely documented and preserved in accordance with international evidentiary standards. Each contribution strengthens the documentary record and supports the possibility of future accountability through appropriate legal mechanisms.",
      "This investigative mechanism will continue to receive and document evidence as long as circumstances require. You may return at any time with additional materials or information."
    ],
    securityNote: "For your protection, we recommend clearing your browser history after this session.",
    securityLinks: [
      { label: "Security Guide", url: "/security-guide" },
      { label: "Tor Project", url: "https://www.torproject.org/" },
      { label: "DuckDuckGo", url: "https://duckduckgo.com/" }
    ],
    shareMessage: "Help document what's happening in Georgia. Submit evidence securely:",
    shareOptions: ["WhatsApp", "Copy link"],
    supportLink: { label: "Support the Civic Council of Georgia", url: "https://donate.sabcho.org" }
  },

  tresoritUpload: {
    title: "Tresorit Encrypted Upload",
    description: "End-to-end encrypted file transfer for documents. Files are encrypted on your device before upload and remain encrypted on Tresorit servers. No account required.",
    url: "https://web.tresorit.com/r#3COkGJ8lyQzeYmTk5C-X2A",
    steps: [
      { step: 1, title: "Access Secure Vault", instructions: "Click 'Open secure vault' button in the portal, or navigate directly to the Tresorit URL. No account or login required." },
      { step: 2, title: "Select Files", instructions: "Click 'Upload files' or drag and drop files into the browser window. You can select multiple files at once." },
      { step: 3, title: "Wait for Encryption", instructions: "Files are encrypted in your browser before upload. A progress bar shows encryption and upload status. Do not close the browser until complete." },
      { step: 4, title: "Confirm Upload", instructions: "Once complete, you'll see a confirmation message. Optionally screenshot this for your records." }
    ],
    filenameConvention: {
      format: "YYYY-MM-DD_DocumentType_Initials.ext",
      examples: [
        "2024-12-15_MedicalReport_JD.pdf",
        "2024-12-20_PhotoEvidence_AB.jpg",
        "2025-01-10_WitnessStatement_CD.docx"
      ],
      note: "Consistent naming helps match files to submissions and maintains chain of custody."
    },
    supportedFileTypes: [
      "Documents: PDF, DOCX, DOC, TXT, RTF",
      "Images: JPG, PNG, HEIC, TIFF",
      "Videos: MP4, MOV, AVI",
      "Audio: MP3, WAV, M4A",
      "Archives: ZIP (for multiple files)"
    ],
    benefits: [
      "End-to-end encryption - files encrypted before leaving your device",
      "No account required",
      "Files never decrypted on Tresorit servers",
      "Swiss privacy laws apply",
      "Simple drag-and-drop interface"
    ],
    limitations: [
      "Does not include cryptographic verification (no hash)",
      "No automatic chain of custody documentation",
      "Recommended as fallback when Save App is not available"
    ],
    whenToUse: [
      "Desktop computer without mobile device access",
      "Medical documents that don't require Berkeley Protocol",
      "Scanned historical documents",
      "Files already on computer that need secure transfer"
    ]
  },

  secureContacts: {
    title: "Secure Communication Channels",
    description: "All channels below use end-to-end encryption. Choose based on your comfort level and what you have installed.",
    channels: {
      signal: {
        name: "Signal",
        value: "CCG.95",
        url: "https://signal.me/#eu/s5fLOAXoBqChwY13U_LhOvqcWDBfPfsjBe0suqv0yOYYfNDDz5FOuoyedcUkFrfO",
        description: "Recommended for most users. End-to-end encrypted messaging.",
        downloadUrl: "https://signal.org/download/"
      },
      whatsapp: {
        name: "WhatsApp",
        value: "+1 940 603 7552",
        url: "https://wa.me/19406037552",
        description: "End-to-end encrypted. Widely available.",
        downloadUrl: "https://www.whatsapp.com/download/"
      },
      threema: {
        name: "Threema",
        value: "5HCEVM84",
        url: "https://threema.id/5HCEVM84",
        description: "Swiss-based. No phone number required. Maximum anonymity.",
        downloadUrl: "https://threema.ch/download"
      },
      protonmail: {
        name: "ProtonMail",
        value: "submissions_iimg@proton.me",
        url: "mailto:submissions_iimg@proton.me",
        description: "Encrypted email. Good for longer communications and attachments."
      }
    },
    securityRecommendations: [
      "Use disappearing messages when available",
      "Verify contact identity before sharing sensitive information",
      "Consider using VPN or Tor for additional anonymity",
      "Clear conversation history after sensitive discussions"
    ]
  },

  fallbackOptions: {
    title: "Alternative Submission Methods",
    description: "If Save App or Tresorit are not accessible, these options are available:",
    options: [
      { method: "Signal", description: "Send files directly via Signal message", contact: "CCG.95", limitations: "File size limits apply. No automatic chain of custody." },
      { method: "ProtonMail", description: "Email files as attachments to our encrypted inbox", contact: "submissions_iimg@proton.me", limitations: "25MB attachment limit per email. Use for documents, not large videos." },
      { method: "Threema", description: "Send files via Threema message", contact: "5HCEVM84", limitations: "File size limits apply. Highest anonymity option." }
    ]
  },

  technicalReference: {
    sha256: {
      title: "SHA-256 Hash Verification",
      purpose: "Creates a unique 64-character hexadecimal 'fingerprint' of submitted content. If even one character changes, the hash changes completely.",
      useCases: [
        "Testimony text + context fields + submission ID + timestamp",
        "Uploaded files",
        "Evidence ledger entries"
      ]
    },
    databaseSchema: {
      tables: [
        { name: "submissions", description: "Testimony submissions", fields: ["id", "testimony_text", "context_when", "context_where", "context_who", "contact_info", "sha256_hash", "submitted_at"] },
        { name: "evidence_ledger", description: "All evidence records", fields: ["id", "sha256_hash", "storage_path", "file_name", "file_size", "file_type", "submission_type", "submitted_at"] },
        { name: "triage_logs", description: "User journey analytics", fields: ["id", "action_type", "tier", "metadata", "session_token", "logged_at"] },
        { name: "save_app_tokens", description: "Dynamic credential generation", fields: ["id", "token", "session_token", "expires_at", "used_at"] }
      ]
    },
    attribution: {
      operatedBy: "Civic Council of Georgia, Inc.",
      advisedBy: "Archimedes Collective USA, Inc."
    }
  }
};

// Combine all content into exportable object
export const getEnglishContentExport = () => ({
  exported_at: new Date().toISOString(),
  language: "en",
  language_name: "English",
  translations: translationsEn,
  components: componentStrings,
  dataIntakeProtocols
});

// Download function (JSON)
export const downloadEnglishContent = () => {
  const content = getEnglishContentExport();
  const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `english-content-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Generate full site content as Markdown
export const generateSiteMarkdown = () => {
  const content = getEnglishContentExport();
  const protocols = content.dataIntakeProtocols;
  const t = content.translations;
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const md: string[] = [];
  
  // Header
  md.push("# IIMG Intake Process");
  md.push("## Independent Investigative Mechanism for Georgia");
  md.push("");
  md.push(`*Generated: ${today}*`);
  md.push("");
  md.push("---");
  md.push("");
  
  // Table of Contents
  md.push("## Table of Contents");
  md.push("");
  md.push("1. [Overview](#overview)");
  md.push("2. [Language Selection](#language-selection)");
  md.push("3. [Onboarding Flow](#onboarding-flow-mental-health--safety)");
  md.push("4. [Evidence Type Selection](#evidence-type-selection)");
  md.push("5. [Tier 1: Testimony](#tier-1-testimony-flow)");
  md.push("6. [Tier 2: Documents](#tier-2-documents-flow)");
  md.push("7. [Tier 3: Digital Evidence](#tier-3-berkeley-protocol-via-save-app)");
  md.push("8. [Tier 4: Physical Evidence](#tier-4-physical-evidence-protocol)");
  md.push("9. [Tier 5: Direct Contact](#tier-5-direct-contact)");
  md.push("10. [Secure Contacts](#secure-communication-channels)");
  md.push("11. [Technical Reference](#technical-reference)");
  md.push("");
  md.push("---");
  md.push("");
  
  // Overview
  md.push("## Overview");
  md.push("");
  md.push(protocols.overview.description);
  md.push("");
  md.push(`**Portal URL:** ${protocols.overview.portalUrl}`);
  md.push("");
  md.push("### Submission Tiers");
  md.push("");
md.push("| Tier | Name | Description |");
  md.push("|------|------|-------------|");
  protocols.overview.tiers.forEach((tier: { tier: number; name: string; description: string }) => {
    md.push(`| ${tier.tier} | ${tier.name} | ${tier.description} |`);
  });
  md.push("");
  
  // Language Selection
  md.push("## Language Selection");
  md.push("");
  md.push("The portal supports the following languages:");
  md.push("");
  md.push("- **English** (en)");
  md.push("- **Georgian** (ka) - ქართულად");
  md.push("- **Russian** (ru) - По-русски");
  md.push("- **Azerbaijani** (az) - Azərbaycanca");
  md.push("");
  md.push("Users who need another language can contact us via Signal.");
  md.push("");
  
  // Onboarding Flow
  md.push("## Onboarding Flow (Mental Health & Safety)");
  md.push("");
  md.push(protocols.onboardingFlow.description);
  md.push("");
  md.push("### Steps");
  md.push("");
  protocols.onboardingFlow.steps.forEach((step: any) => {
    md.push(`#### ${step.step}. ${step.title}`);
    if (step.content) md.push(`\n${step.content}`);
    if (step.headline) md.push(`\n*${step.headline}*`);
    if (step.question) md.push(`\n> Question: ${step.question}`);
    if (step.messages) {
      step.messages.forEach((msg: string) => md.push(`- ${msg}`));
    }
    if (step.securityTips) {
      step.securityTips.forEach((tip: string) => md.push(`- ${tip}`));
    }
    md.push("");
  });
  
  // Evidence Selection
  md.push("## Evidence Type Selection");
  md.push("");
  md.push(`**Prompt:** ${protocols.evidenceSelection.prompt}`);
  md.push("");
  md.push(protocols.evidenceSelection.subtitle);
  md.push("");
  md.push("| Option | Title | Description |");
  md.push("|--------|-------|-------------|");
  protocols.evidenceSelection.options.forEach((opt: { id: string; title: string; description: string }) => {
    md.push(`| ${opt.id} | ${opt.title} | ${opt.description} |`);
  });
  md.push("");
  
  // Tier 1: Testimony
  md.push("## Tier 1: Testimony Flow");
  md.push("");
  md.push(protocols.tier1Testimony.description);
  md.push("");
  md.push("### Steps");
  md.push("");
  protocols.tier1Testimony.steps.forEach((step: any) => {
    md.push(`#### ${step.step}. ${step.title}`);
    md.push(`\n${step.subtitle}`);
    if (step.placeholder) {
      md.push(`\n\`Placeholder: ${step.placeholder}\``);
    }
    if (step.fields) {
      step.fields.forEach((f: { label: string; placeholder: string }) => md.push(`- **${f.label}:** ${f.placeholder}`));
    }
    md.push("");
  });
  md.push("### Submission Process");
  md.push("");
  protocols.tier1Testimony.submission.process.forEach((p: string) => md.push(`- ${p}`));
  md.push("");
  md.push("### Sample Receipt");
  md.push("");
  md.push("```");
  md.push(protocols.tier1Testimony.sampleReceipt);
  md.push("```");
  md.push("");
  
  // Tier 2: Documents
  md.push("## Tier 2: Documents Flow");
  md.push("");
  md.push(protocols.tier2Documents.description);
  md.push("");
  md.push("### Document Types");
  md.push("");
  md.push("| Type | Label | Code |");
  md.push("|------|-------|------|");
  protocols.tier2Documents.steps[0].documentTypes?.forEach((dt: { id: string; label: string; shortCode: string }) => {
    md.push(`| ${dt.id} | ${dt.label} | ${dt.shortCode} |`);
  });
  md.push("");
  md.push("### Chain of Custody Filename Format");
  md.push("");
  md.push(`**Format:** \`${protocols.tier2Documents.steps[3].filenameFormat}\``);
  md.push("");
  md.push("**Examples:**");
  protocols.tier2Documents.steps[3].examples?.forEach((ex: string) => md.push(`- \`${ex}\``));
  md.push("");
  md.push("### Why Tresorit?");
  md.push("");
  md.push(protocols.tier2Documents.tresoritInfo.whyTresorit);
  md.push("");
  protocols.tier2Documents.tresoritInfo.features.forEach((f: string) => md.push(`- ${f}`));
  md.push("");
  
  // Tier 3: Berkeley Protocol
  md.push("## Tier 3: Berkeley Protocol via Save App");
  md.push("");
  md.push(protocols.berkeleyProtocol.description);
  md.push("");
  md.push("### Requirements");
  md.push("");
  protocols.berkeleyProtocol.requirements.forEach((req: string) => md.push(`- ${req}`));
  md.push("");
  md.push("### App Download");
  md.push("");
  md.push(`- **iOS:** ${protocols.berkeleyProtocol.appDownload.ios}`);
  md.push(`- **Android:** ${protocols.berkeleyProtocol.appDownload.android}`);
  md.push("");
  md.push("### Step-by-Step Instructions");
  md.push("");
  protocols.berkeleyProtocol.steps.forEach((step: any) => {
    md.push(`#### ${step.step}. ${step.title}`);
    md.push(`\n${step.instructions}`);
    if (step.field) {
      md.push(`\n> **${step.field.label}:** ${step.field.value}`);
    }
    if (step.autoFeatures) {
      step.autoFeatures.forEach((feat: string) => md.push(`- ${feat}`));
    }
    md.push("");
  });
  md.push("### Server Credentials");
  md.push("");
  md.push("| Field | Value |");
  md.push("|-------|-------|");
  md.push(`| Server | \`${protocols.berkeleyProtocol.credentials.server}\` |`);
  md.push(`| Path | \`${protocols.berkeleyProtocol.credentials.path}\` |`);
  md.push(`| Username | \`${protocols.berkeleyProtocol.credentials.username}\` |`);
  md.push(`| Password | *${protocols.berkeleyProtocol.credentials.passwordNote}* |`);
  md.push("");
  md.push("### Benefits");
  md.push("");
  protocols.berkeleyProtocol.benefits.forEach((b: string) => md.push(`- ${b}`));
  md.push("");
  md.push("### Troubleshooting");
  md.push("");
  md.push("| Issue | Solution |");
  md.push("|-------|----------|");
  protocols.berkeleyProtocol.troubleshooting.forEach((t: { issue: string; solution: string }) => {
    md.push(`| ${t.issue} | ${t.solution} |`);
  });
  md.push("");
  
  // Tier 4: Physical Evidence
  md.push("## Tier 4: Physical Evidence Protocol");
  md.push("");
  md.push(protocols.physicalEvidence.description);
  md.push("");
  md.push(`> **CRITICAL WARNING:** ${protocols.physicalEvidence.criticalWarning}`);
  md.push("");
  md.push("### Immediate Steps");
  md.push("");
  protocols.physicalEvidence.steps.forEach((step: any) => {
    const critical = step.priority === "critical" ? " **[CRITICAL]**" : "";
    md.push(`#### ${step.step}. ${step.title}${critical}`);
    md.push(`\n${step.instructions}`);
    md.push("");
  });
  md.push("### Preservation Guidelines by Material Type");
  md.push("");
  Object.entries(protocols.physicalEvidence.preservationGuidelines).forEach(([key, guide]: [string, any]) => {
    md.push(`#### ${guide.title}`);
    guide.instructions.forEach((inst: string) => md.push(`- ${inst}`));
    md.push("");
  });
  md.push("### Chain of Custody");
  md.push("");
  md.push(protocols.physicalEvidence.chainOfCustody.definition);
  md.push("");
  md.push("**Requirements:**");
  protocols.physicalEvidence.chainOfCustody.requirements.forEach((req: string) => md.push(`- ${req}`));
  md.push("");
  
  // Tier 5: Direct Contact
  md.push("## Tier 5: Direct Contact");
  md.push("");
  md.push(`**${protocols.tier5DirectContact.headline}**`);
  md.push("");
  md.push(`*${protocols.tier5DirectContact.subtitle}*`);
  md.push("");
  md.push(protocols.tier5DirectContact.content);
  md.push("");
  
  // Secure Contacts
  md.push("## Secure Communication Channels");
  md.push("");
  md.push(protocols.secureContacts.description);
  md.push("");
  md.push("| Channel | Contact | Description |");
  md.push("|---------|---------|-------------|");
  Object.entries(protocols.secureContacts.channels).forEach(([key, channel]: [string, any]) => {
    md.push(`| ${channel.name} | \`${channel.value}\` | ${channel.description} |`);
  });
  md.push("");
  md.push("### Security Recommendations");
  md.push("");
  protocols.secureContacts.securityRecommendations.forEach((rec: string) => md.push(`- ${rec}`));
  md.push("");
  
  // Technical Reference
  md.push("## Technical Reference");
  md.push("");
  md.push("### SHA-256 Hash Verification");
  md.push("");
  md.push(protocols.technicalReference.sha256.purpose);
  md.push("");
  md.push("**Use Cases:**");
  protocols.technicalReference.sha256.useCases.forEach((uc: string) => md.push(`- ${uc}`));
  md.push("");
  md.push("### Database Schema");
  md.push("");
  md.push("| Table | Description | Key Fields |");
  md.push("|-------|-------------|------------|");
  protocols.technicalReference.databaseSchema.tables.forEach((t: { name: string; description: string; fields: string[] }) => {
    const fields = t.fields.slice(0, 4).join(", ") + (t.fields.length > 4 ? "..." : "");
    md.push(`| \`${t.name}\` | ${t.description} | \`${fields}\` |`);
  });
  md.push("");
  md.push("### Attribution");
  md.push("");
  md.push(`**Operated by:** ${protocols.technicalReference.attribution.operatedBy}`);
  md.push("");
  md.push(`**Advised by:** ${protocols.technicalReference.attribution.advisedBy}`);
  md.push("");
  md.push("---");
  md.push("");
  md.push(`*Document generated: ${new Date().toISOString()}*`);
  
  return md.join("\n");
};

// Download site content as Markdown
export const downloadSiteMarkdown = () => {
  const markdown = generateSiteMarkdown();
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `IIMG-Intake-Process-${new Date().toISOString().split("T")[0]}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
