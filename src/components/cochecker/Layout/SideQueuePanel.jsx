import React from "react";

const SideQueuePanel = () => {
  return (
    <div className="w-64 bg-white shadow-md min-h-screen p-4">
      <h3 className="font-semibold text-[#0052B1] text-lg">Queue Management</h3>

      <input
        type="text"
        placeholder="Search Queue"
        className="border mt-3 px-3 py-2 rounded w-full"
      />

      <div className="mt-4 text-sm font-semibold text-gray-600">
        My Queue
      </div>

      <div className="mt-10 text-xs text-gray-500 italic">
        No pinned search item.
      </div>
    </div>
  );
};

export default SideQueuePanel;
