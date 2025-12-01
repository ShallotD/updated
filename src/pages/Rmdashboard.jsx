import React from "react";
import { FiHome, FiUsers, FiList, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const RmDashboardd = () => {
//   const [openChecklist, setOpenChecklist] = useState(false);

const navigate = useNavigate()

  const handleOpenChecklist = () => {
    navigate("/rmck")
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-xl font-bold text-blue-600 mb-6">RM Portal</h2>

        <nav className="space-y-4">
          <button className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium">
            <FiHome /> Dashboard
          </button>

          <button className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium">
            <FiUsers /> Customer List
          </button>

          <button className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium">
            <FiList /> Loan Applications
          </button>

          <button
            onClick={handleOpenChecklist}
            className="flex items-center gap-3 text-red-500 font-medium mt-10"
          >
            {/* <FiLogOut /> Logout */}
            open rm checklist
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">RM Dashboard</h1>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded shadow text-center">
            <h3 className="text-gray-600">Active Clients</h3>
            <p className="text-3xl font-bold text-blue-600">42</p>
          </div>

          <div className="bg-white p-6 rounded shadow text-center">
            <h3 className="text-gray-600">Pending Applications</h3>
            <p className="text-3xl font-bold text-yellow-500">18</p>
          </div>

          <div className="bg-white p-6 rounded shadow text-center">
            <h3 className="text-gray-600">Approved Loans</h3>
            <p className="text-3xl font-bold text-green-600">27</p>
          </div>
        </div>

    
        {/* TABLE */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Recent Loan Requests
          </h2>

          <table className="w-full text-left text-sm">
            <thead className="border-b text-gray-600">
              <tr>
                <th className="py-2">Client Name</th>
                <th className="py-2">Loan Type</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-2">John Doe</td>
                <td className="py-2">Personal Loan</td>
                <td className="py-2">Ksh 250,000</td>
                <td className="py-2 text-yellow-600">Pending</td>
              </tr>

              <tr className="border-b">
                <td className="py-2">Mary Smith</td>
                <td className="py-2">Business Loan</td>
                <td className="py-2">Ksh 540,000</td>
                <td className="py-2 text-green-600">Approved</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default RmDashboardd;
