
import React, { useState } from "react";
import { Button, Divider } from "antd";
import ChecklistsPage from "../new/cocreater/ChecklistsPage";
import ChecklistsTable from "../cocreator/checklists/ChecklistsTable";
// import ChecklistsPageh fro";
// import ChecklistsTable from "./ChecklistsTable";

const CreateChecklistPage = ({ userId, role }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const loanTypes = ["Buy & Build", "Mortgage DCL", "Construction Loan"];
  const loanTypeDocuments = {
    "Buy & Build": [
      {
        title: "Contract Documents",
        documents: ["Offer Letter", "Affidavit of Title"],
      },
      {
        title: "KYC Documents",
        documents: ["Borrower’s PIN & ID/Passport"],
      },
      {
        title: "Security Documents",
        documents: [
          "Original Title",
          "Pre-Construction Valuation",
          "Bills of Quantities (BOQ)",
          "Architect Registration Proof",
          "Contractor NCA Registration",
          "Construction Drawings & Program",
          "Insurance (Construction → Fire)",
          "Performance Bond",
        ],
      },
      {
        title: "Other Conditions",
        documents: [
          "NCA Project Approvals",
          "Final Valuation Report",
          "Sale Agreement",
          "Spousal Consent Documents",
          "Domestic Package Insurance",
          "Mortgage Protection Insurance",
          "Tax Compliance Certificate",
        ],
      },
    ],

    "Mortgage DCL": [
      {
        title: "Contract Documents",
        documents: [
          "Facility Letter",
          "Guarantor Acknowledgment",
          "Statement of Assets & Liabilities",
          "Board Resolution",
          "Cost of Credit",
        ],
      },
      {
        title: "KYC Documents",
        documents: [
          "Directors' ID/Passport & PIN",
          "Certificate of Incorporation",
          "Memorandum & Articles",
          "Licenses & Permits",
        ],
      },
      {
        title: "Security Conditions",
        documents: [
          "Certificate of Registration of Mortgage",
          "CR25",
          "Post Registration Searches",
          "Clean Title",
          "Affidavit of Title",
          "Deed of Assignment",
          "Director CRB Report",
        ],
      },
      {
        title: "Loan Conditions",
        documents: [
          "Sale Agreement",
          "Borrower’s Contribution Proof",
          "Wallet Share 80%",
          "Fees & Commission Agreements",
        ],
      },
      {
        title: "Financial Conditions",
        documents: [
          "Annual Audited Accounts",
          "Quarterly Management Accounts",
          "Finance Covenant Certificate",
        ],
      },
      {
        title: "Compliance Documents",
        documents: [
          "Current CR12",
          "Tax Compliance Certificate",
          "Land Rates & Rent Receipts (3 years)",
          "Annual Returns (3 years)",
          "Asset Insurance",
          "Business Loan Protector Cover",
        ],
      },
    ],

    "Construction Loan": [
      {
        title: "Contract Documents",
        documents: [
          "Executed Facility Letter",
          "Guarantor Acknowledgement",
          "Assets & Liabilities Statement",
          "Board Resolution",
          "Tax Compliance Certificate",
        ],
      },
      {
        title: "KYC Documents",
        documents: ["Directors ID/Passport & PIN", "Incorporation Documents"],
      },
      {
        title: "Security Documents",
        documents: [
          "Clean Title",
          "Searches (Post-Reg & Green Card)",
          "Personal Guarantee",
          "Assignment of Rent",
          "Business Loan Protector Cover",
          "Valuation Report",
          "Annual Returns (3 yrs)",
          "Land Rates & Rent Receipts (3 yrs)",
          "NCBA Linked Till/Paybill",
          "Tax Compliance Certificate",
          "CR12",
        ],
      },
    ],
    "test": [
    {
      title: "Test Documents",
      documents: [
        "Executed Offer Letter",
        "Executed Affidavit of Title",
      ],
    },
    {
      title: "KYC Documents",
      documents: ["Borrower's PIN & ID/Passport"],
    }   
  ],
  };

  return (
    <div style={{ padding: 24 }}>
      <Button type="primary" onClick={() => setDrawerOpen(true)}>
        Create New DCL
      </Button>

      <ChecklistsPage
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        loanTypes={loanTypes}
        loanTypeDocuments={loanTypeDocuments}
        coCreatorId={userId} // pre-assign co-creator
      />

      <Divider>My Checklists</Divider>
      <ChecklistsTable userId={userId} role={role} />
    </div>
  );
};

export default CreateChecklistPage
