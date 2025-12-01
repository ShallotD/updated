import React from "react";

const TopToolbar = () => {
  return (
    <div className="w-full bg-white shadow px-6 py-4 flex gap-4 items-center">
      <select className="border px-3 py-2 rounded bg-white">
        <option>Registration No</option>
      </select>

      <select className="border px-3 py-2 rounded bg-white">
        <option>Select Process</option>
      </select>

      <input
        type="text"
        placeholder="Search Workitem"
        className="border px-3 py-2 rounded w-64"
      />
    </div>
  );
};

export default TopToolbar;
