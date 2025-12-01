// import React from "react";
// import { FiCheckCircle, FiClipboard, FiAlertTriangle, FiLogOut } from "react-icons/fi";

// const CoCheckerDashboard = () => {
//   return (
//     <div className="flex min-h-screen bg-gray-100">

//       {/* SIDEBAR */}
//       <aside className="w-64 bg-white shadow-md p-6">
//         <h2 className="text-xl font-bold text-green-600 mb-6">CO Creator Panel</h2>

//         <nav className="space-y-4">
//           <button className="flex items-center gap-3 hover:text-green-600 font-medium text-gray-700">
//             <FiClipboard /> Work Queue
//           </button>

//           <button className="flex items-center gap-3 hover:text-green-600 font-medium text-gray-700">
//             <FiCheckCircle /> Accepted Docs
//           </button>

//           <button className="flex items-center gap-3 hover:text-green-600 font-medium text-gray-700">
//             <FiAlertTriangle /> Rejected Docs
//           </button>

//           <button className="flex items-center gap-3 text-red-500 font-medium mt-10">
//             <FiLogOut /> Logout
//           </button>
//         </nav>
//       </aside>

//       {/* MAIN CONTENT */}
//       <main className="flex-1 p-8">

//         <h1 className="text-3xl font-bold text-gray-800 mb-6">CO Creator Dashboard</h1>

//         {/* STAT CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white p-6 rounded shadow text-center">
//             <h3 className="text-gray-600">Docs to Verify</h3>
//             <p className="text-3xl font-bold text-green-600">12</p>
//           </div>

//           <div className="bg-white p-6 rounded shadow text-center">
//             <h3 className="text-gray-600">Approved Today</h3>
//             <p className="text-3xl font-bold text-blue-600">7</p>
//           </div>

//           <div className="bg-white p-6 rounded shadow text-center">
//             <h3 className="text-gray-600">Rejected Today</h3>
//             <p className="text-3xl font-bold text-red-500">2</p>
//           </div>
//         </div>

//         {/* TABLE */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4">Pending Document Checks</h2>

//           <table className="w-full text-left text-sm">
//             <thead className="border-b text-gray-600">
//               <tr>
//                 <th className="py-2">Doc Name</th>
//                 <th className="py-2">Client</th>
//                 <th className="py-2">Status</th>
//                 <th className="py-2">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               <tr className="border-b">
//                 <td className="py-2">ID Copy</td>
//                 <td className="py-2">James Brown</td>
//                 <td className="py-2 text-yellow-600">Pending</td>
//                 <td className="py-2">
//                   <button className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700">
//                     Review
//                   </button>
//                 </td>
//               </tr>

//               <tr className="border-b">
//                 <td className="py-2">Bank Statement</td>
//                 <td className="py-2">Mary Smith</td>
//                 <td className="py-2 text-yellow-600">Pending</td>
//                 <td className="py-2">
//                   <button className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700">
//                     Review
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//       </main>
//     </div>
//   );
// };

// export default CoCheckerDashboard;
