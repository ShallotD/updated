import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  /* ---------------------------------------------------------------------- */
  /* THEME HANDLING (light/dark) — NON-INTRUSIVE                            */
  /* ---------------------------------------------------------------------- */
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.style.setProperty("--bg-main", "#f4f4f9");
      root.style.setProperty("--bg-card", "#ffffff");
      root.style.setProperty("--text-main", "#1f2937");
      root.style.setProperty("--text-secondary", "#4b5563");
      root.style.setProperty("--primary", "#0052B1");
    } else {
      root.style.setProperty("--bg-main", "#181a1f");
      root.style.setProperty("--bg-card", "#1f2329");
      root.style.setProperty("--text-main", "#e5e7eb");
      root.style.setProperty("--text-secondary", "#9ca3af");
      root.style.setProperty("--primary", "#3b82f6");
    }
  }, [theme]);

  /* ---------------------------------------------------------------------- */
  /* ORIGINAL STATE (unchanged)                                             */
  /* ---------------------------------------------------------------------- */
  const [loans, setLoans] = useState([
    {
      id: 101,
      registrationNo: "Loan-293614",
      name: "John Doe",
      amount: 50000,
      status: "Pending Review",
      entryDate: "2025-10-09 16:58:23",
      tatRemaining: "09d:06h:26m",
      tatConsumed: "09d:06h:26m",
      workStep: "Docs_Pending",
      firstName: "JOHN",
      surname: "DOE",
    },
    {
      id: 102,
      registrationNo: "Loan-292160",
      name: "Mary Smith",
      amount: 25000,
      status: "Pending Deferral",
      entryDate: "2025-09-26 18:36:08",
      tatRemaining: "13d:00h:25m",
      tatConsumed: "13d:00h:25m",
      workStep: "Pending_Deferral",
      firstName: "MARY",
      surname: "SMITH",
    },
    {
      id: 103,
      registrationNo: "Loan-291032",
      name: "James Brown",
      amount: 40000,
      status: "Submitted",
      entryDate: "2025-10-24 12:06:58",
      tatRemaining: "—",
      tatConsumed: "—",
      workStep: "Submitted",
      firstName: "JAMES",
      surname: "BROWN",
    },
  ]);

  const [openedLoan, setOpenedLoan] = useState(null);
  const [search, setSearch] = useState("");

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const statusOptions = ["Pending Review", "Pending Deferral", "Submitted"];
  const workStepOptions = ["Docs_Pending", "Pending_Deferral", "Submitted"];

  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    const sorted = [...loans].sort((a, b) =>
      a[key] < b[key]
        ? direction === "asc"
          ? -1
          : 1
        : a[key] > b[key]
        ? direction === "asc"
          ? 1
          : -1
        : 0
    );
    setLoans(sorted);
  };

  const filteredLoans = loans.filter(
    (loan) =>
      loan.registrationNo.toLowerCase().includes(search.toLowerCase()) ||
      loan.name.toLowerCase().includes(search.toLowerCase())
  );

  const updateLoanStatus = (id, newStatus) => {
    setLoans((prev) =>
      prev.map((ln) => (ln.id === id ? { ...ln, status: newStatus } : ln))
    );
    setOpenedLoan(null);
  };

  const updateWorkStep = (id, newStep) => {
    setLoans((prev) =>
      prev.map((ln) => (ln.id === id ? { ...ln, workStep: newStep } : ln))
    );
    setOpenedLoan(null);
  };

  const getArrow = (key) => {
    if (sortConfig.key !== key) return "↕";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  const getWorkStepColor = (workStep) => {
    switch (workStep) {
      case "Docs_Pending":
        return "bg-black text-white";
      case "Pending_Deferral":
        return "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300";
      case "Submitted":
        return "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
    }
  };

  const navigate = useNavigate();
  const openChecklist = () => navigate("/cl");

  /* ---------------------------------------------------------------------- */
  /* UI (mobile-first + dark theme)                                         */
  /* ---------------------------------------------------------------------- */

  return (
    <div
      className="min-h-screen p-4 transition-all"
      style={{ background: "var(--bg-main)", color: "var(--text-main)" }}
    >
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <h2
          className="text-lg font-bold"
          style={{ color: "var(--primary)" }}
        >
          Loan Queue
        </h2>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm"
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 rounded mb-4 w-full sm:w-72 dark:bg-gray-800 dark:border-gray-700"
      />

      {/* Table Container */}
      <div
        className="rounded shadow overflow-auto"
        style={{ background: "var(--bg-card)" }}
      >
        <table className="min-w-full text-xs sm:text-sm">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
              {[
                ["registrationNo", "Registration No"],
                ["entryDate", "Entry Date Time"],
                ["tatRemaining", "TAT Remaining"],
                ["tatConsumed", "TAT Consumed"],
                ["workStep", "Workstep"],
                ["firstName", "FName"],
                ["surname", "SName"],
              ].map(([key, label]) => (
                <th
                  key={key}
                  onClick={() => sortData(key)}
                  className="py-3 px-4 cursor-pointer whitespace-nowrap"
                >
                  {label} {getArrow(key)}
                </th>
              ))}

              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredLoans.map((loan) => (
              <tr
                key={loan.id}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                onClick={openChecklist}
              >
                <td className="py-3 px-4 text-red-600 dark:text-red-400 font-semibold">
                  {loan.registrationNo}
                </td>
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
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenedLoan(loan);
                    }}
                    className="bg-yellow-400 text-blue-900 px-3 py-1 rounded font-semibold hover:bg-yellow-500"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {openedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div
            className="w-full sm:w-96 p-6 rounded shadow-lg"
            style={{ background: "var(--bg-card)", color: "var(--text-main)" }}
          >
            <h3
              className="text-lg font-bold mb-4"
              style={{ color: "var(--primary)" }}
            >
              Update {openedLoan.registrationNo}
            </h3>

            <p>
              <strong>Name:</strong> {openedLoan.name}
            </p>
            <p>
              <strong>Amount:</strong> Ksh{" "}
              {openedLoan.amount.toLocaleString()}
            </p>

            <div className="mt-4">
              <label className="font-semibold">Status</label>
              <select
                defaultValue={openedLoan.status}
                onChange={(e) => updateLoanStatus(openedLoan.id, e.target.value)}
                className="border w-full px-3 py-2 rounded mt-1 dark:bg-gray-800 dark:border-gray-700"
              >
                {statusOptions.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <label className="font-semibold">Work Step</label>
              <select
                defaultValue={openedLoan.workStep}
                onChange={(e) => updateWorkStep(openedLoan.id, e.target.value)}
                className="border w-full px-3 py-2 rounded mt-1 dark:bg-gray-800 dark:border-gray-700"
              >
                {workStepOptions.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setOpenedLoan(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hero;
