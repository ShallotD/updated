// // import { useState } from "react";
// // import { Button } from "antd";
// // import ChecklistsPageh from "./CreateeCheklist";
// // import ChecklistsTablel from "./checkpage";
// // // import ChecklistsPageh from "./CreateeCheklist";

// // const RMUpload = () => {
// //   const [open, setOpen] = useState(false);

// //   return (
// //     <>
// //       <Button type="primary" onClick={() => setOpen(true)}>
// //         Create Checklist
// //       </Button>

// //       {/* Drawer Component */}
// //       <ChecklistsPageh open={open} onClose={() => setOpen(false)} />
// //         <ChecklistsTablel/>
// //     </>
// //   );
// // };

// // export default RMUpload;

// import  { useState } from "react";
// import { Button } from "antd";
// // import CreateDCLDrawer from "./CreateDCLDrawer";
// import ChecklistsPageh from "./CreateeCheklist";
// import ChecklistsTablel from "./checkpage";

// const RMUpload = () => {
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   // Loan Types
//   const loanTypes = ["Home Loan", "Car Loan", "SME Loan"];

//   // Loan Type → Document Template Mapping
//   const loanTypeDocuments = {
//     "Home Loan": [
//       {
//         title: "Personal Documents",
//         documents: ["Passport Copy", "Utility Bill", "Bank Statement"]
//       },
//       {
//         title: "Property Documents",
//         documents: ["Title Deed", "Valuation Report"]
//       }
//     ],

//     "Car Loan": [
//       {
//         title: "Required Documents",
//         documents: ["Emirates ID", "Driving License", "Salary Certificate"]
//       }
//     ],

//     "SME Loan": [
//       {
//         title: "Business Documents",
//         documents: ["Trade License", "MOA", "Financial Statements"]
//       }
//     ]
//   };

//   return (
//     <div style={{ padding: 24 }}>
//       <Button type="primary" onClick={() => setDrawerOpen(true)}>
//         Create New DCL
//       </Button>

//       <ChecklistsPageh
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         loanTypeDocuments={loanTypeDocuments}
//         loanTypes={loanTypes}
//       />
//        <ChecklistsTablel/>
//     </div>
//   );
// };

// export default RMUpload;
