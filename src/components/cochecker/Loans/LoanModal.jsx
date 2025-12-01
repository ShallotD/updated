import React from "react";

const LoanModal = ({ loan, statusOptions, workStepOptions, onStatusUpdate, onStepUpdate, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">

        <h3 className="text-xl font-bold text-[#0052B1] mb-4">
          Update {loan.registrationNo}
        </h3>

        <p><strong>Name:</strong> {loan.name}</p>
        <p><strong>Amount:</strong> Ksh {loan.amount.toLocaleString()}</p>

        <div className="mt-4">
          <label className="font-semibold">Status</label>
          <select
            className="border w-full px-3 py-2 rounded mt-1"
            defaultValue={loan.status}
            onChange={(e) => onStatusUpdate(loan.id, e.target.value)}
          >
            {statusOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <label className="font-semibold">Work Step</label>
          <select
            className="border w-full px-3 py-2 rounded mt-1"
            defaultValue={loan.workStep}
            onChange={(e) => onStepUpdate(loan.id, e.target.value)}
          >
            {workStepOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default LoanModal;
