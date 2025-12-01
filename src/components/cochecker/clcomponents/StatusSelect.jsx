const StatusSelect = ({ value, onChange }) => (
  <select
    className="
      w-full 
      border border-gray-300 dark:border-gray-600 
      bg-white dark:bg-gray-800 
      text-gray-900 dark:text-gray-100 
      rounded-md px-3 py-2 
      text-sm sm:text-base 
      focus:outline-none 
      focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
      transition-colors duration-200
    "
    value={value}
    onChange={(e) => onChange(e.target.value)}
  >
    <option value="">Select</option>
    <option value="Submitted">Submitted</option>
    <option value="Pending">Pending</option>
  </select>
);

export default StatusSelect;
