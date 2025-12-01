// import StatusSelect from "./StatusSelect";
// import FileUpload from "./FileUpload";
// import { getFilePreview } from "../utils/filePreview";

// const DocumentCard = ({ doc, catIdx, docIdx, onUpdate, onFileUpload }) => {
//   const statusColor =
//     doc.status === "Submitted"
//       ? "text-green-600"
//       : doc.status === "Pending"
//       ? "text-red-600"
//       : "text-gray-400";

//   return (
//     <div className="bg-white p-4 rounded-lg shadow border">
//       <p className="font-medium mb-1">{doc.name}</p>

//       <p className={`font-semibold mb-2 ${statusColor}`}>
//         Status: {doc.status || "—"}
//       </p>

//       <StatusSelect
//         value={doc.status}
//         onChange={(v) => onUpdate(catIdx, docIdx, "status", v)}
//       />

//       <input
//         className="border w-full rounded-md mt-2 px-2 py-1"
//         placeholder="Comment..."
//         value={doc.comment}
//         onChange={(e) => onUpdate(catIdx, docIdx, "comment", e.target.value)}
//       />

//       <FileUpload
//         id={`mobile-file-${catIdx}-${docIdx}`}
//         file={doc.file}
//         onUpload={(file) => onFileUpload(catIdx, docIdx, file)}
//       />

//       {doc.file && (
//         <div className="flex items-center gap-2 mt-2">
//           <img src={getFilePreview(doc.file)} className="w-4 h-4" />
//           <button
//             onClick={() => window.open(URL.createObjectURL(doc.file), "_blank")}
//             className="bg-gray-700 hover:bg-gray-900 text-white text-sm px-3 py-1.5 rounded-md"
//           >
//             View File
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DocumentCard;
import StatusSelect from "./StatusSelect";
import FileUpload from "./FileUpload";
import { getFilePreview } from "../utils/filePreview";

const DocumentCard = ({ doc, catIdx, docIdx, onUpdate, onFileUpload }) => {
  // Bank-style status colors
  const statusColor =
    doc.status === "Submitted"
      ? "text-green-600 dark:text-green-400"
      : doc.status === "Pending"
      ? "text-yellow-600 dark:text-yellow-400"
      : "text-gray-500 dark:text-gray-400";

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 mb-4 transition-colors duration-300">
      {/* Document Title */}
      <p className="font-semibold text-gray-800 dark:text-gray-100 mb-1 text-sm sm:text-base">
        {doc.name}
      </p>

      {/* Status */}
      <p className={`font-medium mb-3 ${statusColor} text-sm sm:text-base`}>
        Status: {doc.status || "—"}
      </p>

      {/* Status Selector */}
      <div className="mb-3">
        <StatusSelect
          value={doc.status}
          onChange={(v) => onUpdate(catIdx, docIdx, "status", v)}
        />
      </div>

      {/* Comment Box */}
      <textarea
        className="w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 text-gray-700 dark:text-gray-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
        placeholder="Add comment..."
        value={doc.comment || ""}
        onChange={(e) => onUpdate(catIdx, docIdx, "comment", e.target.value)}
        rows={2}
      />

      {/* File Upload */}
      <div className="mt-3">
        <FileUpload
          id={`mobile-file-${catIdx}-${docIdx}`}
          file={doc.file}
          onUpload={(file) => onFileUpload(catIdx, docIdx, file)}
        />
      </div>

      {/* File Preview */}
      {doc.file && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-3">
          <img
            src={getFilePreview(doc.file)}
            alt="preview"
            className="w-6 h-6 object-contain rounded"
          />
          <button
            onClick={() => window.open(URL.createObjectURL(doc.file), "_blank")}
            className="bg-gray-700 dark:bg-gray-600 hover:bg-gray-900 dark:hover:bg-gray-500 text-white text-sm px-3 py-1.5 rounded-md transition-colors duration-200"
          >
            View File
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentCard;
