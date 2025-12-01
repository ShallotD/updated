import StatusSelect from "./StatusSelect";
import FileUpload from "./FileUpload";
import { useNavigate } from "react-router-dom";

const DocumentRow = ({
  category,
  doc,
  catIdx,
  docIdx,
  onUpdate,
  onFileUpload,
}) => {
  const navigate = useNavigate();

  const openChecklist = () => {
    navigate("/checklist");
  };

  const statusColor =
    doc.status === "Submitted"
      ? "text-green-600 dark:text-green-400"
      : doc.status === "Pending"
      ? "text-yellow-600 dark:text-yellow-400"
      : "text-gray-500 dark:text-gray-400";

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 transition-colors duration-200">
  {docIdx === 0 && (
    <td
      rowSpan={category.documents.length}
      className="px-2 py-0.5 border-r border-gray-200 dark:border-gray-600 font-semibold bg-gray-100 dark:bg-gray-800 text-sm"
    >
      {category.title}
    </td>
  )}

  <td className="px-2 py-0.5 border-r border-gray-200 dark:border-gray-600 text-sm">
    {doc.name}
  </td>

  <td
    className={`px-2 py-0.5 border-r border-gray-200 dark:border-gray-600 font-semibold ${statusColor} text-sm`}
  >
    {doc.status || "—"}
  </td>

  <td className="px-2 py-0.5 border-r border-gray-200 dark:border-gray-600">
    <StatusSelect
      value={doc.status}
      onChange={(v) => onUpdate(catIdx, docIdx, "status", v)}
      className="h-6 text-sm"
    />
  </td>

  <td className="px-2 py-0.5 border-r border-gray-200 dark:border-gray-600">
    <input
      className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-0.5 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
      placeholder="Add comment..."
      value={doc.comment || ""}
      onChange={(e) =>
        onUpdate(catIdx, docIdx, "comment", e.target.value)
      }
    />
  </td>

  <td className="px-2 py-0.5 border-r border-gray-200 dark:border-gray-600">
    <FileUpload
      id={`file-${catIdx}-${docIdx}`}
      file={doc.file}
      onUpload={(file) => onFileUpload(catIdx, docIdx, file)}
      compact
    />
  </td>

  <td className="px-2 py-0.5 text-center">
    {doc.file ? (
      <button
        onClick={openChecklist}
        className="bg-gray-700 dark:bg-gray-600 hover:bg-gray-900 dark:hover:bg-gray-500 text-white text-xs px-2 py-0.5 rounded-md transition-colors duration-200"
      >
        View
      </button>
    ) : (
      <span className="text-gray-400 dark:text-gray-500 text-xs">
        No File
      </span>
    )}
  </td>
</tr>
  );
};

export default DocumentRow;
