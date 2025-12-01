import React from "react";
import { getWorkStepColor } from "./workStepColors";

const LoanRow = ({ loan, onOpen }) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-4 text-red-600 font-semibold">{loan.registrationNo}</td>
      <td className="py-3 px-4">{loan.entryDate}</td>
      <td className="py-3 px-4">{loan.tatRemaining}</td>
      <td className="py-3 px-4 text-red-500">{loan.tatConsumed}</td>

      <td className="py-3 px-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getWorkStepColor(
            loan.workStep
          )}`}
        >
          {loan.workStep}
        </span>
      </td>

      <td className="py-3 px-4">{loan.firstName}</td>
      <td className="py-3 px-4">{loan.surname}</td>

      <td className="py-3 px-4">
        <button
          onClick={() => onOpen(loan)}
          className="bg-[#FFCD00] text-[#0052B1] px-3 py-1 rounded font-semibold hover:bg-yellow-400"
        >
          Update
        </button>
      </td>
    </tr>
  );
};

export default LoanRow;
