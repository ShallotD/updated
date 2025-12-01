import { getFilePreview } from "../utils/filePreview";

const FileUpload = ({ id, file, onUpload }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
    {/* Upload / Change Button */}
    <label
      htmlFor={id}
      className="cursor-pointer bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 text-sm sm:text-base px-3 py-1.5 rounded-md shadow-sm transition-colors duration-200"
    >
      {file ? "Change File" : "Upload"}
    </label>

    {/* Hidden File Input */}
    <input
      id={id}
      type="file"
      className="hidden"
      onChange={(e) => onUpload(e.target.files[0])}
    />

    {/* File Preview Icon */}
    {file && (
      <div className="flex items-center gap-2 mt-1 sm:mt-0">
        <img
          src={getFilePreview(file)}
          className="w-6 h-6 object-contain rounded"
          alt="file-preview"
        />
        <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
          {file.name.length > 15
            ? file.name.slice(0, 15) + "..."
            : file.name}
        </span>
      </div>
    )}
  </div>
);

export default FileUpload;
