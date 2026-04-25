export type ProblemStep = {
  title: string;
  description: string;
};

export type Problem = {
  id: string;
  icon: string;
  title: string;
  shortDesc: string;
  color: string;
  borderColor: string;
  timeline: string;
  documents: string[];
  steps: ProblemStep[];
  officialLink: string;
  officialLinkText: string;
  internalLink?: string;
  internalLinkText?: string;
  scorePoints: number;
};

export const problems: Problem[] = [
  {
    id: "not-registered",
    icon: "🔍",
    title: "I don't know if I'm registered",
    shortDesc: "Check your name on the electoral roll in 2 minutes.",
    color: "from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30",
    borderColor: "border-blue-200 dark:border-blue-800",
    timeline: "5 minutes",
    documents: ["Your full name", "Date of birth", "State of residence"],
    steps: [
      {
        title: "Visit the Electoral Search Portal",
        description: "Go to electoralsearch.eci.gov.in — this is the official Election Commission of India voter search portal.",
      },
      {
        title: "Enter your basic details",
        description: "Fill in your name, date of birth, and state. You do NOT need your Voter ID number for this search.",
      },
      {
        title: "Check your result",
        description: "If your name appears, you are registered. Note your Part Number and Serial Number for future reference.",
      },
      {
        title: "Name not found?",
        description: "Try variations of your name spelling. If still not found, use the 'Correct / Add' flow below.",
      },
      {
        title: "Download your e-EPIC",
        description: "Once confirmed registered, you can download a digital copy of your Voter ID card from voters.eci.gov.in.",
      },
    ],
    officialLink: "https://electoralsearch.eci.gov.in/",
    officialLinkText: "Search Electoral Roll →",
    internalLink: "/solve?problem=name-missing",
    internalLinkText: "Name not found? See correction guide",
    scorePoints: 5,
  },
  {
    id: "name-missing",
    icon: "📋",
    title: "My name is missing from voter list",
    shortDesc: "Get your name added to the electoral roll using Form 6.",
    color: "from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30",
    borderColor: "border-orange-200 dark:border-orange-800",
    timeline: "15–30 days",
    documents: [
      "Proof of age (Birth Certificate / Class 10 Marksheet / Passport)",
      "Proof of ordinary residence (Aadhaar / Utility Bill / Bank Passbook)",
      "Passport-size photograph",
    ],
    steps: [
      {
        title: "Confirm your eligibility",
        description: "You must be an Indian citizen, 18+ years old (as of Jan 1 of the qualifying year), and a resident of the constituency.",
      },
      {
        title: "Fill Form 6 online",
        description: "Visit voters.eci.gov.in → 'New Registration (Form 6)'. Fill in your personal details, upload photo and address proof.",
      },
      {
        title: "Submit and note Application ID",
        description: "After submission, you will receive an Application Reference ID. Save this — you can track your application status online.",
      },
      {
        title: "Verification visit (if required)",
        description: "A BLO (Booth Level Officer) may visit your address for verification. Ensure someone is home to confirm your residence.",
      },
      {
        title: "Name added to roll",
        description: "Upon approval, your name is added to the electoral roll. You'll receive your EPIC (Voter ID card) after 30 days.",
      },
    ],
    officialLink: "https://voters.eci.gov.in/",
    officialLinkText: "Apply via Form 6 →",
    internalLink: "/recover",
    internalLinkText: "More correction options",
    scorePoints: 5,
  },
  {
    id: "no-voter-id",
    icon: "🪪",
    title: "I don't have a Voter ID",
    shortDesc: "Get your Voter ID card or use alternate valid IDs at the booth.",
    color: "from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30",
    borderColor: "border-purple-200 dark:border-purple-800",
    timeline: "30–90 days for physical card; Download e-EPIC instantly",
    documents: [
      "Proof of age",
      "Proof of address",
      "Passport-size photograph",
      "Mobile number linked to Aadhaar (for e-EPIC)",
    ],
    steps: [
      {
        title: "Check if you are already registered",
        description: "First, search your name on electoralsearch.eci.gov.in. You may be registered but just not have received the physical card.",
      },
      {
        title: "Download e-EPIC (if registered)",
        description: "Log in to voters.eci.gov.in with your EPIC number or mobile OTP. Download a digital Voter ID valid at polling booths.",
      },
      {
        title: "Register if not in roll",
        description: "Fill Form 6 on voters.eci.gov.in to get your name added. Physical EPIC will be delivered within 30–90 days.",
      },
      {
        title: "Use alternate IDs at booth (if registered but no card)",
        description: "If your name is on the roll, you can vote using: Aadhaar, Passport, Driving License, PAN, MNREGA Job Card, Bank Passbook with photo.",
      },
    ],
    officialLink: "https://voters.eci.gov.in/",
    officialLinkText: "Get e-EPIC / Register →",
    internalLink: "/documents",
    internalLinkText: "See all valid alternate IDs →",
    scorePoints: 5,
  },
  {
    id: "valid-documents",
    icon: "📄",
    title: "I don't know what documents are valid",
    shortDesc: "See which IDs are accepted at the polling booth.",
    color: "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30",
    borderColor: "border-green-200 dark:border-green-800",
    timeline: "Instant information",
    documents: [],
    steps: [
      {
        title: "Primary ID: EPIC (Voter ID Card)",
        description: "Your Voter ID card (physical or e-EPIC on phone) is the primary document. Show it to the Presiding Officer.",
      },
      {
        title: "Alternate IDs accepted at booth",
        description: "If you don't have your Voter ID, these 11 documents are accepted: Aadhaar, Passport, Driving License, PAN Card, Smart Card issued by RGI, MNREGA Job Card, Passbook with photo from Bank/Post Office, Health Insurance Smart Card, Pension Document with photo, NPR Smart Card, Official ID issued by Central/State Govt.",
      },
      {
        title: "Important: Name must be on electoral roll",
        description: "ANY of the above documents can be used for identity proof — but your name MUST already be on the electoral roll for the polling booth you visit.",
      },
      {
        title: "What is NOT accepted",
        description: "Mobile screenshots of documents, photocopies, expired documents, or self-made certificates are NOT accepted.",
      },
    ],
    officialLink: "https://eci.gov.in",
    officialLinkText: "ECI Official Website →",
    internalLink: "/documents",
    internalLinkText: "Use Smart Document Helper →",
    scorePoints: 5,
  },
  {
    id: "first-time-voter",
    icon: "🌟",
    title: "I am a first-time voter",
    shortDesc: "Complete guided journey from registration to confident voting.",
    color: "from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30",
    borderColor: "border-yellow-200 dark:border-yellow-800",
    timeline: "30 minutes to complete all steps",
    documents: ["Age proof (18+)", "Residence proof", "Photo"],
    steps: [
      {
        title: "Check if you're already registered",
        description: "Many first-time voters get added automatically when they turn 18. Check at electoralsearch.eci.gov.in before registering.",
      },
      {
        title: "Register if needed",
        description: "Fill Form 6 at voters.eci.gov.in. Takes about 10 minutes. Keep age and address proofs ready.",
      },
      {
        title: "Know your polling booth",
        description: "After registration (or if already registered), find your exact polling booth using the electoral search portal.",
      },
      {
        title: "Practice the voting process",
        description: "Use our Voting Simulator to practice pressing the EVM button. Learn about NOTA and what happens after you vote.",
      },
      {
        title: "Prepare your documents",
        description: "Keep your Voter ID or any alternate ID ready. Download our checklist for what to carry on voting day.",
      },
      {
        title: "Vote with confidence!",
        description: "Arrive at your polling booth, show your ID, get your finger inked, and press the EVM button. You're done in 5 minutes!",
      },
    ],
    officialLink: "https://voters.eci.gov.in/",
    officialLinkText: "Register to Vote →",
    internalLink: "/first-time",
    internalLinkText: "Enter First-Time Voter Mode →",
    scorePoints: 5,
  },
  {
    id: "confused-process",
    icon: "🤔",
    title: "I am confused about the process",
    shortDesc: "A simple 5-step overview of everything you need to do.",
    color: "from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30",
    borderColor: "border-teal-200 dark:border-teal-800",
    timeline: "15 minutes to understand",
    documents: ["Voter ID or alternate ID", "Voter Information Slip (recommended)"],
    steps: [
      {
        title: "Step 1: Are you registered?",
        description: "Check your name on the electoral roll at electoralsearch.eci.gov.in. If not registered, apply via Form 6.",
      },
      {
        title: "Step 2: Find your polling booth",
        description: "Your polling booth is assigned based on your registered address. Find it on the electoral search portal or through our Polling Guidance page.",
      },
      {
        title: "Step 3: Know what to carry",
        description: "Carry your Voter ID (physical or e-EPIC) OR any one alternate ID. Mobile phones are NOT allowed inside the voting compartment.",
      },
      {
        title: "Step 4: At the booth",
        description: "Join the queue. Give your name/EPIC number. Get your finger inked. Go to the EVM compartment. Press the button next to your chosen candidate (or NOTA).",
      },
      {
        title: "Step 5: VVPAT confirmation",
        description: "A paper slip will appear in the VVPAT machine window for 7 seconds, showing your vote. This confirms your vote was recorded correctly.",
      },
    ],
    officialLink: "https://eci.gov.in",
    officialLinkText: "ECI Official Guide →",
    internalLink: "/simulate",
    internalLinkText: "Practice in our Simulator →",
    scorePoints: 5,
  },
];
