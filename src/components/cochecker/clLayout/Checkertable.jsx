// // import React, { useState } from "react";
// // import {
// //   Table,
// //   Tag,
// //   Button,
// //   Input,
// //   Select,
// //   Space,
// //   Typography,
// //   Progress,
// //   Drawer,
// // } from "antd";
// // import { EyeOutlined } from "@ant-design/icons";

// // const { Search } = Input;
// // const { Title, Text } = Typography;

// // const BaseChecklistTable = ({ title, data }) => {
// //   const [search, setSearch] = useState("");
// //   const [loanTypeFilter, setLoanTypeFilter] = useState(null);
// //   const [rmFilter, setRmFilter] = useState(null);
// //   const [openDrawer, setOpenDrawer] = useState(false);
// //   const [selectedChecklist, setSelectedChecklist] = useState(null);

// //   // FILTERING
// //   const filtered = data.filter((item) => {
// //     const s = search.toLowerCase();

// //     const matchSearch =
// //       item.customerName.toLowerCase().includes(s) ||
// //       item.id.toLowerCase().includes(s);

// //     const matchLoan = loanTypeFilter ? item.loanType === loanTypeFilter : true;
// //     const matchRM = rmFilter ? item.rm === rmFilter : true;

// //     return matchSearch && matchLoan && matchRM;
// //   });

// //   // TABLE COLUMNS
// //   const columns = [
// //     {
// //       title: "Loan No",
// //       dataIndex: "id",
// //       width: 110,
// //       render: (t) => <span style={{ fontSize: 12 }}>{t}</span>,
// //     },
// //     {
// //       title: "Customer",
// //       dataIndex: "customerName",
// //       width: 140,
// //       render: (t) => <span style={{ fontSize: 12 }}>{t}</span>,
// //     },
// //     {
// //       title: "Loan Type",
// //       dataIndex: "loanType",
// //       width: 120,
// //       render: (t) => <Tag color="purple">{t}</Tag>,
// //     },
// //     {
// //       title: "Progress",
// //       width: 150,
// //       render: (_, row) => {
// //         const percent = Math.round((row.submittedDocs / row.totalDocs) * 100);
// //         return <Progress percent={percent} size="small" />;
// //       },
// //     },
// //     {
// //       title: "Pending Docs",
// //       dataIndex: "pendingDocs",
// //       width: 100,
// //       render: (n) => <Tag color="orange">{n}</Tag>,
// //     },
// //     {
// //       title: "Status",
// //       dataIndex: "status",
// //       width: 100,
// //       render: (s) => (
// //         <Tag
// //           color={
// //             s === "Completed" ? "green" : s === "Deferred" ? "volcano" : "blue"
// //           }
// //         >
// //           {s}
// //         </Tag>
// //       ),
// //     },
// //     {
// //       title: "SLA",
// //       dataIndex: "deadline",
// //       width: 120,
// //     },
// //     {
// //       title: "Action",
// //       width: 100,
// //       render: (_, row) => (
// //         <Button
// //           size="small"
// //           icon={<EyeOutlined />}
// //           onClick={() => {
// //             setSelectedChecklist(row);
// //             setOpenDrawer(true);
// //           }}
// //         >
// //           Open
// //         </Button>
// //       ),
// //     },
// //   ];

// //   return (
// //     <div className="bg-white p-5 rounded-lg shadow">
// //       <Title level={4}>{title}</Title>

// //       <Space style={{ marginBottom: 10 }} wrap>
// //         <Search
// //           placeholder="Search customer or loan no..."
// //           onChange={(e) => setSearch(e.target.value)}
// //           style={{ width: 230 }}
// //           allowClear
// //         />

// //         <Select
// //           placeholder="Loan Type"
// //           allowClear
// //           onChange={setLoanTypeFilter}
// //           style={{ width: 180 }}
// //           options={[
// //             { value: "Mortgage", label: "Mortgage" },
// //             { value: "Sme Loan", label: "Sme Loan" },
// //             { value: "Asset Finance", label: "Asset Finance" },
// //           ]}
// //         />

// //         <Select
// //           placeholder="RM"
// //           allowClear
// //           onChange={setRmFilter}
// //           style={{ width: 180 }}
// //           options={[
// //             { value: "Sarah Wambui", label: "Sarah Wambui" },
// //             { value: "John Otieno", label: "John Otieno" },
// //           ]}
// //         />
// //       </Space>

// //       <Table
// //         size="small"
// //         columns={columns}
// //         dataSource={filtered}
// //         rowKey="id"
// //         pagination={{ pageSize: 6 }}
// //       />

// //       {/* DRAWER */}
// //       <Drawer
// //         width={420}
// //         title={`Checklist — ${selectedChecklist?.customerName}`}
// //         open={openDrawer}
// //         onClose={() => setOpenDrawer(false)}
// //       >
// //         {selectedChecklist && (
// //           <>
// //             <Text strong>Loan Type:</Text> {selectedChecklist.loanType}
// //             <br />
// //             <Text strong>Status:</Text> {selectedChecklist.status}
// //             <br />
// //             <Text strong>Pending Docs:</Text> {selectedChecklist.pendingDocs}
// //             <br />
// //             <Text strong>Deadline:</Text> {selectedChecklist.deadline}
// //             <br />

// //             <Title level={5} style={{ marginTop: 20 }}>
// //               Documents
// //             </Title>

// //             {selectedChecklist.checklist.map((d) => (
// //               <div key={d.name} className="flex justify-between py-1 border-b">
// //                 <span>{d.name}</span>
// //                 <Tag
// //                   color={
// //                     d.status === "Submitted"
// //                       ? "green"
// //                       : d.status === "Deferred"
// //                       ? "orange"
// //                       : "blue"
// //                   }
// //                 >
// //                   {d.status}
// //                 </Tag>
// //               </div>
// //             ))}
// //           </>
// //         )}
// //       </Drawer>
// //     </div>
// //   );
// // };

// // export default BaseChecklistTable;
// import React, { useState } from "react";
// import {
//   Table,
//   Tag,
//   Button,
//   Input,
//   Select,
//   Space,
//   Typography,
//   Progress,
//   Drawer,
//   Divider,
// } from "antd";
// import { EyeOutlined } from "@ant-design/icons";

// const { Search } = Input;
// const { Title, Text } = Typography;

// const BaseChecklistTable = ({ title, data }) => {
//   const [search, setSearch] = useState("");
//   const [loanTypeFilter, setLoanTypeFilter] = useState(null);
//   const [rmFilter, setRmFilter] = useState(null);

//   const [openDrawer, setOpenDrawer] = useState(false);
//   const [selectedChecklist, setSelectedChecklist] = useState(null);

//   // FILTERING LOGIC
//   const filtered = data.filter((item) => {
//     const s = search.toLowerCase();

//     const matchSearch =
//       item.customerName.toLowerCase().includes(s) ||
//       item.id.toLowerCase().includes(s);

//     const matchLoan = loanTypeFilter ? item.loanType === loanTypeFilter : true;
//     const matchRM = rmFilter ? item.rm === rmFilter : true;

//     return matchSearch && matchLoan && matchRM;
//   });

//   // TABLE COLUMNS
//   const columns = [
//     {
//       title: "Loan No",
//       dataIndex: "id",
//       width: 110,
//       render: (t) => <span style={{ fontSize: 12 }}>{t}</span>,
//     },
//     {
//       title: "Customer",
//       dataIndex: "customerName",
//       width: 140,
//       render: (t) => <span style={{ fontSize: 12 }}>{t}</span>,
//     },
//     {
//       title: "Loan Type",
//       dataIndex: "loanType",
//       width: 120,
//       render: (t) => <Tag color="purple">{t}</Tag>,
//     },
//     {
//       title: "Progress",
//       width: 150,
//       render: (_, row) => {
//         const percent = Math.round((row.submittedDocs / row.totalDocs) * 100);
//         return <Progress percent={percent} size="small" />;
//       },
//     },
//     {
//       title: "Pending Docs",
//       dataIndex: "pendingDocs",
//       width: 100,
//       render: (n) => <Tag color="orange">{n}</Tag>,
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       width: 100,
//       render: (s) => (
//         <Tag
//           color={
//             s === "Completed" ? "green" : s === "Deferred" ? "volcano" : "blue"
//           }
//         >
//           {s}
//         </Tag>
//       ),
//     },
//     {
//       title: "SLA",
//       dataIndex: "deadline",
//       width: 120,
//     },
//     {
//       title: "Action",
//       width: 100,
//       render: (_, row) => (
//         <Button
//           size="small"
//           icon={<EyeOutlined />}
//           onClick={() => {
//             setSelectedChecklist(row);
//             setOpenDrawer(true);
//           }}
//         >
//           Open
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <div className="bg-white p-5 rounded-lg shadow">
//       <Title level={4}>{title}</Title>

//       {/* FILTERS */}
//       <Space style={{ marginBottom: 10 }} wrap>
//         <Search
//           placeholder="Search customer or loan no..."
//           onChange={(e) => setSearch(e.target.value)}
//           style={{ width: 230 }}
//           allowClear
//         />

//         <Select
//           placeholder="Loan Type"
//           allowClear
//           onChange={setLoanTypeFilter}
//           style={{ width: 180 }}
//           options={[
//             { value: "Mortgage", label: "Mortgage" },
//             { value: "Sme Loan", label: "Sme Loan" },
//             { value: "Asset Finance", label: "Asset Finance" },
//           ]}
//         />

//         <Select
//           placeholder="RM"
//           allowClear
//           onChange={setRmFilter}
//           style={{ width: 180 }}
//           options={[
//             { value: "Sarah Wambui", label: "Sarah Wambui" },
//             { value: "John Otieno", label: "John Otieno" },
//           ]}
//         />
//       </Space>

//       {/* TABLE */}
//       <Table
//         size="small"
//         columns={columns}
//         dataSource={filtered}
//         rowKey="id"
//         pagination={{ pageSize: 6 }}
//       />

//       {/* DRAWER */}
//       <Drawer
//         width={450}
//         title={`Checklist — ${selectedChecklist?.customerName}`}
//         open={openDrawer}
//         onClose={() => setOpenDrawer(false)}
//       >
//         {selectedChecklist && (
//           <>
//             <Text strong>Loan Type:</Text> {selectedChecklist.loanType}
//             <br />
//             <Text strong>Status:</Text> {selectedChecklist.status}
//             <br />
//             <Text strong>Pending Docs:</Text> {selectedChecklist.pendingDocs}
//             <br />
//             <Text strong>Deadline:</Text> {selectedChecklist.deadline}
//             <br />

//             <Divider />

//             <Title level={5}>Documents</Title>

//             {selectedChecklist.checklist.map((d) => (
//               <div
//                 key={d.name}
//                 className="flex justify-between py-1 border-b text-sm"
//               >
//                 <span>{d.name}</span>
//                 <Tag
//                   color={
//                     d.status === "Submitted"
//                       ? "green"
//                       : d.status === "Deferred"
//                       ? "orange"
//                       : "blue"
//                   }
//                 >
//                   {d.status}
//                 </Tag>
//               </div>
//             ))}

//             <Divider />

//             {/* ---------------- CO ACTIONS SECTION ---------------- */}
//             <Title level={5} style={{ marginTop: 20 }}>
//               CO Actions
//             </Title>

//             <Space direction="vertical" style={{ width: "100%" }}>
//               <Button block type="primary">
//                 Approve Checklist
//               </Button>

//               <Button block danger>
//                 Reject Checklist
//               </Button>

//               <Button block>
//                 Return to RM
//               </Button>

//               <Button block type="dashed">
//                 Request More Documents
//               </Button>

//               <Button block>
//                 Assign Credit Officer
//               </Button>
//             </Space>
//             {/* ---------------- END CO ACTIONS ---------------- */}
//           </>
//         )}
//       </Drawer>
//     </div>
//   );
// };

// export default BaseChecklistTable;
// src/components/checklists/ChecklistTableWithActions.jsx
import React, { useState, useMemo } from "react";
import {
  Table,
  Tag,
  Input,
  Select,
  Space,
  Button,
  Drawer,
  Progress,
  Typography,
} from "antd";

const { Title } = Typography;
const { Search } = Input;

const mockChecklists = [
  {
    id: "LN001",
    customerName: "John Doe",
    loanType: "Mortgage",
    totalDocs: 6,
    pendingDocs: 2,
    status: "Pending",
    deadline: "2025-12-01",
    rm: "Alice",
    categories: [
      { name: "Proof of income", status: "Submitted" },
      { name: "Credit report", status: "Pending" },
    ],
  },
  {
    id: "LN002",
    customerName: "Mary Jane",
    loanType: "Sme Loan",
    totalDocs: 4,
    pendingDocs: 1,
    status: "Deferred",
    deadline: "2025-11-25",
    rm: "Bob",
    categories: [
      { name: "Business financial statements", status: "Deferred" },
    ],
  },
  {
    id: "LN003",
    customerName: "Peter Parker",
    loanType: "Mortgage",
    totalDocs: 5,
    pendingDocs: 0,
    status: "Completed",
    deadline: "2025-11-28",
    rm: "Alice",
    categories: [
      { name: "Property appraisal", status: "Submitted" },
      { name: "ID documents", status: "Submitted" },
    ],
  },
];

const BaseChecklistTable = ({ type = "Active" }) => {
  const [search, setSearch] = useState("");
  const [loanTypeFilter, setLoanTypeFilter] = useState(null);
  const [rmFilter, setRmFilter] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedChecklist, setSelectedChecklist] = useState(null);

  // SAFE FILTER
  const filteredData = useMemo(() => {
    return (mockChecklists || [])
      .filter((item) => {
        // Type filter
        if (type === "Active" && item.status !== "Pending") return false;
        if (type === "Completed" && item.status !== "Completed") return false;
        if (type === "Deferred" && item.status !== "Deferred") return false;

        const s = search.toLowerCase();
        const matchSearch =
          item.customerName.toLowerCase().includes(s) ||
          item.id.toLowerCase().includes(s);

        const matchLoan = loanTypeFilter ? item.loanType === loanTypeFilter : true;
        const matchRM = rmFilter ? item.rm === rmFilter : true;

        return matchSearch && matchLoan && matchRM;
      });
  }, [search, loanTypeFilter, rmFilter, type]);

  const columns = [
    {
      title: "Loan Number",
      dataIndex: "id",
      key: "id",
      width: 120,
      render: (text) => <span style={{ fontSize: 12 }}>{text}</span>,
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      width: 140,
      render: (text) => <span style={{ fontSize: 12 }}>{text}</span>,
    },
    {
      title: "Loan Type",
      dataIndex: "loanType",
      key: "loanType",
      width: 120,
      render: (text) => <span style={{ fontSize: 12 }}>{text}</span>,
    },
    {
      title: "Total Docs",
      dataIndex: "totalDocs",
      key: "totalDocs",
      width: 90,
      render: (text) => <span style={{ fontSize: 12 }}>{text}</span>,
    },
    {
      title: "Pending Docs",
      dataIndex: "pendingDocs",
      key: "pendingDocs",
      width: 100,
      render: (text) => <span style={{ fontSize: 12 }}>{text}</span>,
    },
    {
      title: "Progress",
      key: "progress",
      width: 120,
      render: (_, record) => {
        const percent = Math.round(
          ((record.totalDocs - record.pendingDocs) / record.totalDocs) * 100
        );
        return <Progress percent={percent} size="small" />;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status) => {
        let color = "blue";
        if (status === "Completed") color = "green";
        if (status === "Deferred") color = "orange";
        return <Tag color={color} style={{ fontSize: 12 }}>{status}</Tag>;
      },
    },
    {
      title: "Deadline / SLA",
      dataIndex: "deadline",
      key: "deadline",
      width: 120,
      render: (text) => <span style={{ fontSize: 12 }}>{text}</span>,
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Button
          size="small"
          type="primary"
          onClick={() => {
            setSelectedChecklist(record);
            setDrawerVisible(true);
          }}
        >
          Open Checklist
        </Button>
      ),
    },
  ];

  return (
    <div>
      {/* Search + Filters */}
      <Space style={{ marginBottom: 12 }}>
        <Search
          placeholder="Search Loan / Customer"
          allowClear
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 200 }}
        />
        <Select
          placeholder="Loan Type"
          allowClear
          style={{ width: 140 }}
          onChange={setLoanTypeFilter}
          options={[
            { label: "Mortgage", value: "Mortgage" },
            { label: "Sme Loan", value: "Sme Loan" },
          ]}
        />
        <Select
          placeholder="Filter RM"
          allowClear
          style={{ width: 140 }}
          onChange={setRmFilter}
          options={[
            { label: "Alice", value: "Alice" },
            { label: "Bob", value: "Bob" },
          ]}
        />
      </Space>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        size="small"
        scroll={{ x: 1000 }}
        pagination={{ pageSize: 6 }}
      />

      {/* CO Actions Drawer */}
      <Drawer
        title={`Checklist Details - ${selectedChecklist?.customerName || ""}`}
        placement="right"
        width={360}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
      >
        <Title level={5} style={{ marginTop: 30 }}>CO Actions</Title>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Button block type="primary">
            Approve Checklist
          </Button>

          <Button block danger>
            Reject Checklist
          </Button>

          <Button block>
            Return to RM
          </Button>

          <Button block type="dashed">
            Request More Documents
          </Button>

          <Button block>
            Assign Credit Officer
          </Button>
        </Space>
      </Drawer>
    </div>
  );
};

export default BaseChecklistTable;
