const SummaryBar = ({ summary }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
    {[
      {
        label: "Total Documents",
        value: summary.total,
        bg: "bg-gray-100 dark:bg-gray-800",
        text: "text-gray-800 dark:text-gray-200",
      },
      {
        label: "Submitted",
        value: summary.submitted,
        bg: "bg-green-100 dark:bg-green-900",
        text: "text-green-700 dark:text-green-400",
      },
      {
        label: "Pending",
        value: summary.pending,
        bg: "bg-yellow-100 dark:bg-yellow-900",
        text: "text-yellow-700 dark:text-yellow-400",
      },
      {
        label: "Not Actioned",
        value: summary.notActioned,
        bg: "bg-gray-200 dark:bg-gray-700",
        text: "text-gray-700 dark:text-gray-300",
      },
    ].map((item, i) => (
      <div
        key={i}
        className={`${item.bg} ${item.text} p-4 rounded-lg shadow border dark:border-gray-600 transition-colors duration-200`}
      >
        <p className="text-xs sm:text-sm font-medium">{item.label}</p>
        <p className="text-lg sm:text-xl font-bold mt-1">{item.value}</p>
      </div>
    ))}
  </div>
);

export default SummaryBar;
