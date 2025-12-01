// /data/loanDocsConfig.js
export const RM_LIST = [
  { id: "rm1", name: "John Mwangi", email: "john.mwangi@ncbagroup.com" },
  { id: "rm2", name: "Sarah Kamau", email: "sarah.kamau@ncbagroup.com" },
  { id: "rm3", name: "Brian Otieno", email: "b.otieno@ncbagroup.com" },
  { id: "rm4", name: "Linet Achieng", email: "linet.achieng@ncbagroup.com" },
  { id: "rm5", name: "Kevin Waweru", email: "kevin.waweru@ncbagroup.com" }
];

// MASTER DOCUMENT CONFIG
export const LOAN_DOCS_CONFIG = {
  "Equity Release Loan": {
    contract: [
      "Duly executed facility letter (Latest)",
      "Acknowledgement by Guarantors",
      "Personal financial statement",
      "Financial Ratios Compliance",
      "Board resolution authorizing entire borrowing"
    ],
    kyc: [
      "Certified copies of National IDs/Passports and PINs of directors",
      "Certificate of Incorporation",
      "Company PIN Certificate",
      "Memorandum & Articles of Association"
    ],
    security: [
      "First legal charge with original title",
      "Post registration search",
      "Certificate of clean title",
      "Directors’ Personal Guarantees",
      "Valuation report from approved valuer",
      "Original title to be lodged with bank",
      "Affidavit of title"
    ],
    compliance: [
      "Relevant business licenses",
      "Comprehensive insurance cover with bank as first loss payee",
      "Annual returns (last 3 years)",
      "Land rates & rent receipts (3 years)",
      "Tax Compliance Certificate",
      "Valid CR12",
      "Business loan protector insurance"
    ]
  },

  "Affordable Housing Construction Loan": {
    contract: [
      "Duly executed facility letter (Latest)",
      "Board Resolution",
      "Financial Ratios Compliance"
    ],
    kyc: [
      "Memorandum & Articles of Association",
      "Certificate of Incorporation",
      "Directors’ IDs & PINs"
    ],
    security: [
      "First Ranking Legal Charge with title",
      "Valuation report"
    ],
    compliance: [
      "Annual returns (3 years)",
      "Land rates & rent receipts (3 years)",
      "Comprehensive insurance cover",
      "Tax Compliance Certificate",
      "CR12",
      "Valuation report (post construction)"
    ]
  },

  "Shamba Loan": {
    contract: [
      "Duly executed Offer letter (Latest)",
      "HR Memo",
      "TCC"
    ],
    kyc: [
      "Borrower ID + PIN",
      "Marriage certificate or affidavit of single status",
      "Spouse ID + PIN"
    ],
    security: [
      "First legal charge & title",
      "Valuation report",
      "Spousal consent",
      "Independent legal advice certificate",
      "Post registration search"
    ],
    compliance: [
      "Life assurance cover",
      "Land rent confirmation",
      "Land rates confirmation",
      "Certificate of clean title"
    ]
  },

  // ... (ALL REMAINING LOAN TYPES INCLUDED — I CAN PASTE REST IF NEEDED)
};
