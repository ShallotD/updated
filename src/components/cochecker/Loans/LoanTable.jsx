import React from "react";
import LoanRow from "./LoanRow";
import { useNavigate } from "react-router-dom";

const LoanTable = ({ loans, onOpen }) => {

      const navigate = useNavigate();
      const openChecklist = () => {
        navigate("/cl");
      };

  return (
    <div className="bg-white shadow rounded overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr className="text-left text-gray-600">
            <th className="py-3 px-4">Registration No</th>
            <th className="py-3 px-4">Entry Date Time</th>
            <th className="py-3 px-4">TAT Remaining</th>
            <th className="py-3 px-4">TAT Consumed</th>
            <th className="py-3 px-4">Workstep Name</th>
            <th className="py-3 px-4">FName</th>
            <th className="py-3 px-4">SName</th>
            <th className="py-3 px-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {loans.map((loan) => (
            <LoanRow key={loan.id} loan={loan} onOpen={onOpen} />
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={openChecklist}>checklists available</button>
      </div>
    </div>
  );
};

export default LoanTable;
