import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Reports({ loans }) {
  const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444"];

  // Total Loan Amount by Type
  const loanAmountByType = Object.values(
    loans.reduce((acc, loan) => {
      if (!acc[loan.type]) acc[loan.type] = { type: loan.type, amount: 0 };
      acc[loan.type].amount += loan.amount;
      return acc;
    }, {})
  );

  // Loan Status distribution
  const loanStatusData = Object.values(
    loans.reduce((acc, loan) => {
      if (!acc[loan.status]) acc[loan.status] = { status: loan.status, count: 0 };
      acc[loan.status].count += 1;
      return acc;
    }, {})
  );

  // Top 5 customers
  const topCustomers = [...loans]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5)
    .map((loan) => ({ customer: loan.customer, amount: loan.amount }));

  // Loan count per type
  const loanCountByType = Object.values(
    loans.reduce((acc, loan) => {
      if (!acc[loan.type]) acc[loan.type] = { type: loan.type, count: 0 };
      acc[loan.type].count += 1;
      return acc;
    }, {})
  );

  return (
    <div className="h-screen p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Loans Dashboard Reports</h2>

      {/* 2x2 Grid, each chart takes half width and half height */}
      <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full">

        {/* Total Loan Amount by Type */}
        <div className="bg-white p-2 rounded shadow flex flex-col">
          <h3 className="text-lg font-semibold mb-2">Total Loan Amount by Type</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={loanAmountByType} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Loans by Status */}
        <div className="bg-white p-2 rounded shadow flex flex-col">
          <h3 className="text-lg font-semibold mb-2">Loans by Status</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={loanStatusData}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={60} // smaller radius to fit
                fill="#4f46e5"
                label
              >
                {loanStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top 5 Customers */}
        <div className="bg-white p-2 rounded shadow flex flex-col">
          <h3 className="text-lg font-semibold mb-2">Top 5 Customers by Loan Amount</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={topCustomers} margin={{ top: 5, right: 10, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="customer" />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Loan Counts per Type */}
        <div className="bg-white p-2 rounded shadow flex flex-col">
          <h3 className="text-lg font-semibold mb-2">Loan Counts per Type</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={loanCountByType} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

