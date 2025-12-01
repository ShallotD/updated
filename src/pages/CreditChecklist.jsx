

import React, { useState } from "react";

const CreditChecklist = ({ rmChecklist }) => {
  const documentCategories = [
    {
      title: "Contracts Documents Required",
      documents: [
        "Duly executed facility offer letter",
        "Board resolution of the borrower",
        "Acknowledgment by guarantor form",
        "Total cost of credit",
      ],
    },
    {
      title: "KYC Documents",
      documents: [
        "Certificate of incorporation",
        "Memorandum and articles of association",
        "Company PIN certificate",
        "CR12",
        "ID / Passport",
        "PIN certificate of the borrowers",
      ],
    },
    {
      title: "Facility Documents",
      documents: [
        "Directors personal guarantees and indemnities",
        "Borrowers to open mpesa till number linked to NCBA account",
      ],
    },
    {
      title: "Compliance Documents",
      documents: [
        "Business loan protector cover",
        "Business permits",
        "Borrowers to provide a current/valid tax compliance certificate",
      ],
    },
  ];

  const [checklist, setChecklist] = useState(
    documentCategories.map((category) => ({
      title: category.title,
      documents: category.documents.map((doc) => ({
        name: doc,
        status: "",
        action: "",
        comment: "",
        file: null,
      })),
    }))
  );

  // Handle action change
  const handleActionChange = (catIdx, docIdx, value) => {
    const updated = [...checklist];
    updated[catIdx].documents[docIdx].action = value;

    if (value === "Approved") {
      updated[catIdx].documents[docIdx].status = "Submitted";
    } else if (value === "Rejected") {
      updated[catIdx].documents[docIdx].status = "Pending";
    } else {
      updated[catIdx].documents[docIdx].status = "";
    }

    setChecklist(updated);
  };

  const handleCommentChange = (catIdx, docIdx, value) => {
    const updated = [...checklist];
    updated[catIdx].documents[docIdx].comment = value;
    setChecklist(updated);
  };

  const handleFileUpload = (catIdx, docIdx, file) => {
    const updated = [...checklist];
    updated[catIdx].documents[docIdx].file = file;
    setChecklist(updated);
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">NCBA Loan Checklist</h1>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Total Documents */}
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4 border">
          <img
            src="https://cdn-icons-png.flaticon.com/512/327/327148.png"
            alt="total"
            className="w-10 h-10"
          />
          <div>
            <p className="text-gray-600 text-sm">Total Documents</p>
            <p className="text-xl font-bold">
              {checklist.reduce((sum, cat) => sum + cat.documents.length, 0)}
            </p>
          </div>
        </div>

        {/* Actioned */}
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4 border">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4436/4436481.png"
            alt="actioned"
            className="w-10 h-10"
          />
          <div>
            <p className="text-gray-600 text-sm">Documents Actioned</p>
            <p className="text-xl font-bold">
              {
                checklist
                  .flatMap((cat) => cat.documents)
                  .filter((d) => d.action === "Approved" || d.action === "Rejected")
                  .length
              }
            </p>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4 border">
          <img
            src="https://cdn-icons-png.flaticon.com/512/595/595067.png"
            alt="pending"
            className="w-10 h-10"
          />
          <div>
            <p className="text-gray-600 text-sm">Pending Documents</p>
            <p className="text-xl font-bold">
              {
                checklist
                  .flatMap((cat) => cat.documents)
                  .filter((d) => d.status === "Pending").length
              }
            </p>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white rounded-lg shadow-sm">
          <thead className="bg-gray-100 text-gray-700 border-b border-gray-300">
            <tr>
              <th className="px-4 py-2 text-left border-r border-gray-300">Category</th>
              <th className="px-4 py-2 text-left border-r border-gray-300">Document</th>
              <th className="px-4 py-2 text-left border-r border-gray-300">Status</th>
              <th className="px-4 py-2 text-left border-r border-gray-300">Action</th>
              <th className="px-4 py-2 text-left border-r border-gray-300">View Submitted</th>
              <th className="px-4 py-2 text-left border-r border-gray-300">Deferred Documents</th>
              <th className="px-4 py-2 text-left">Comment</th>
            </tr>
          </thead>

          <tbody>
            {checklist.map((category, catIdx) =>
              category.documents.map((doc, docIdx) => (
                <tr key={docIdx} className="hover:bg-gray-50 border-b border-gray-300">
                  {docIdx === 0 && (
                    <td
                      rowSpan={category.documents.length}
                      className="px-4 py-2 border-r border-gray-300 font-semibold text-gray-700 bg-gray-50"
                    >
                      {category.title}
                    </td>
                  )}

                  <td className="px-4 py-2 border-r border-gray-300">{doc.name}</td>

                  <td
                    className={`px-4 py-2 border-r border-gray-300 font-semibold ${
                      doc.status === "Submitted"
                        ? "text-green-600"
                        : doc.status === "Pending"
                        ? "text-red-600"
                        : "text-gray-400"
                    }`}
                  >
                    {doc.status || "—"}
                  </td>

                  <td className="px-4 py-2 border-r border-gray-300">
                    <select
                      className="border border-gray-300 rounded-md px-2 py-1 w-full focus:ring-2 focus:ring-blue-400"
                      value={doc.action}
                      onChange={(e) => handleActionChange(catIdx, docIdx, e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Approved">Approve</option>
                      <option value="Rejected">Reject</option>
                    </select>
                  </td>

                  <td className="px-4 py-2 border-r border-gray-300">
                    {doc.file ? (
                      <button
                        onClick={() => window.open(URL.createObjectURL(doc.file), "_blank")}
                        className="bg-gray-700 hover:bg-gray-800 text-white text-sm px-3 py-1.5 rounded-md"
                      >
                        View
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm">No File</span>
                    )}
                  </td>

                  <td className="px-4 py-2 border-r border-gray-300 text-red-600">
                    {rmChecklist?.[catIdx]?.documents?.[docIdx]?.deferred ? "Deferred" : "—"}
                  </td>

                  <td className="px-4 py-2 border-gray-300">
                    <input
                      className={`w-full border rounded-md px-2 py-1 ${
                        doc.status === "Submitted"
                          ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "border-gray-300 bg-white text-gray-700"
                      }`}
                      placeholder={doc.status === "Pending" ? "Reason for rejection..." : "—"}
                      value={doc.comment}
                      onChange={(e) => handleCommentChange(catIdx, docIdx, e.target.value)}
                      disabled={doc.status === "Submitted"}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreditChecklist;
