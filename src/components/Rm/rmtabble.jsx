// // // import React, { useState, useEffect } from "react";
// // // import { Table, Select, Input, Button, Tag } from "antd";
// // // import { useGetChecklistsQuery, useUpdateChecklistMutation } from "../../api/checklistApi";

// // // const { Option } = Select;

// // // const RMChecklistTablee = ({ userId }) => {
// // //   const { data: checklists = [], refetch, isLoading } = useGetChecklistsQuery(userId);
// // //   const [updateChecklist] = useUpdateChecklistMutation();

// // //   const [tableData, setTableData] = useState([]);

// // //   // Flatten checklists so each document is a row
// // //   useEffect(() => {
// // //     const flattened = checklists.flatMap((chkl) =>
// // //       chkl.documents.map((doc, idx) => ({
// // //         key: `${chkl._id}-${idx}`,
// // //         checklistId: chkl._id,
// // //         title: chkl.title,
// // //         loanType: chkl.loanType,
// // //         docName: doc.name,
// // //         status: doc.status,
// // //         comment: doc.comment,
// // //       }))
// // //     );
// // //     setTableData(flattened);
// // //   }, [checklists]);

// // //   const handleStatusChange = async (row, value) => {
// // //     const updatedRow = { ...row, status: value };
// // //     const updatedData = tableData.map((r) => (r.key === row.key ? updatedRow : r));
// // //     setTableData(updatedData);

// // //     // Update backend
// // //     const checklist = checklists.find((c) => c._id === row.checklistId);
// // //     if (!checklist) return;

// // //     const updatedDocs = checklist.documents.map((d) =>
// // //       d.name === row.docName ? { ...d, status: value } : d
// // //     );

// // //     try {
// // //       await updateChecklist({ id: checklist._id, documents: updatedDocs }).unwrap();
// // //     } catch (err) {
// // //       console.error("Failed to update status:", err);
// // //     }
// // //   };

// // //   const handleCommentChange = async (row, value) => {
// // //     const updatedRow = { ...row, comment: value };
// // //     const updatedData = tableData.map((r) => (r.key === row.key ? updatedRow : r));
// // //     setTableData(updatedData);

// // //     // Update backend
// // //     const checklist = checklists.find((c) => c._id === row.checklistId);
// // //     if (!checklist) return;

// // //     const updatedDocs = checklist.documents.map((d) =>
// // //       d.name === row.docName ? { ...d, comment: value } : d
// // //     );

// // //     try {
// // //       await updateChecklist({ id: checklist._id, documents: updatedDocs }).unwrap();
// // //     } catch (err) {
// // //       console.error("Failed to update comment:", err);
// // //     }
// // //   };

// // //   const handleDelete = async (row) => {
// // //     const updatedData = tableData.filter((r) => r.key !== row.key);
// // //     setTableData(updatedData);

// // //     const checklist = checklists.find((c) => c._id === row.checklistId);
// // //     if (!checklist) return;

// // //     const updatedDocs = checklist.documents.filter((d) => d.name !== row.docName);

// // //     try {
// // //       await updateChecklist({ id: checklist._id, documents: updatedDocs }).unwrap();
// // //       refetch();
// // //     } catch (err) {
// // //       console.error("Failed to delete document:", err);
// // //     }
// // //   };

// // //   const columns = [
// // //     { title: "Checklist Title", dataIndex: "title", key: "title", width: 200 },
// // //     { title: "Loan Type", dataIndex: "loanType", key: "loanType", width: 150 },
// // //     {
// // //       title: "Document Name",
// // //       dataIndex: "docName",
// // //       key: "docName",
// // //       width: 200,
// // //     },
// // //     {
// // //       title: "Status",
// // //       dataIndex: "status",
// // //       key: "status",
// // //       width: 150,
// // //       render: (text, record) => (
// // //         <Select
// // //           value={text}
// // //           onChange={(val) => handleStatusChange(record, val)}
// // //           style={{ width: "100%" }}
// // //           size="small"
// // //         >
// // //           <Option value="pending">Pending</Option>
// // //           <Option value="uploaded">Uploaded</Option>
// // //           <Option value="deferred">Deferred</Option>
// // //           <Option value="approved">Approved</Option>
// // //         </Select>
// // //       ),
// // //     },
// // //     {
// // //       title: "Comment",
// // //       dataIndex: "comment",
// // //       key: "comment",
// // //       width: 200,
// // //       render: (text, record) => (
// // //         <Input
// // //           value={text}
// // //           onChange={(e) => handleCommentChange(record, e.target.value)}
// // //           size="small"
// // //         />
// // //       ),
// // //     },
// // //     {
// // //       title: "Delete",
// // //       key: "delete",
// // //       width: 100,
// // //       render: (_, record) => (
// // //         <Button danger size="small" onClick={() => handleDelete(record)}>
// // //           Delete
// // //         </Button>
// // //       ),
// // //     },
// // //   ];

// // //   return (
// // //     <div style={{ padding: 16 }}>
// // //       <h2>Checklists Assigned to Me</h2>
// // //       <Table
// // //         loading={isLoading}
// // //         columns={columns}
// // //         dataSource={tableData}
// // //         pagination={{ pageSize: 8 }}
// // //         bordered
// // //         size="small"
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default RMChecklistTablee;

// // import React, { useState, useEffect } from "react";
// // import { Table, Select, Input } from "antd";
// // import { useGetChecklistsQuery, useUpdateChecklistMutation } from "../../api/checklistApi";

// // const { Option } = Select;

// // const RMChecklistTablee = ({ userId }) => {
// //   const { data: checklists = [], refetch, isLoading } = useGetChecklistsQuery(userId);
// //   const [updateChecklist] = useUpdateChecklistMutation();

// //   const [tableData, setTableData] = useState([]);

// //   // Flatten checklists so each document is a row
// //   useEffect(() => {
// //     const flattened = checklists.flatMap((chkl) =>
// //       chkl.documents.map((doc, idx) => ({
// //         key: `${chkl._id}-${idx}`,
// //         checklistId: chkl._id,
// //         title: chkl.title,
// //         loanType: chkl.loanType,
// //         docName: doc.name,
// //         status: doc.status,
// //         comment: doc.comment,
// //       }))
// //     );
// //     setTableData(flattened);
// //   }, [checklists]);

// //   const handleStatusChange = async (row, value) => {
// //     const updatedRow = { ...row, status: value };
// //     const updatedData = tableData.map((r) => (r.key === row.key ? updatedRow : r));
// //     setTableData(updatedData);

// //     const checklist = checklists.find((c) => c._id === row.checklistId);
// //     if (!checklist) return;

// //     const updatedDocs = checklist.documents.map((d) =>
// //       d.name === row.docName ? { ...d, status: value } : d
// //     );

// //     try {
// //       await updateChecklist({ id: checklist._id, documents: updatedDocs }).unwrap();
// //     } catch (err) {
// //       console.error("Failed to update status:", err);
// //     }
// //   };

// //   const handleCommentChange = async (row, value) => {
// //     const updatedRow = { ...row, comment: value };
// //     const updatedData = tableData.map((r) => (r.key === row.key ? updatedRow : r));
// //     setTableData(updatedData);

// //     const checklist = checklists.find((c) => c._id === row.checklistId);
// //     if (!checklist) return;

// //     const updatedDocs = checklist.documents.map((d) =>
// //       d.name === row.docName ? { ...d, comment: value } : d
// //     );

// //     try {
// //       await updateChecklist({ id: checklist._id, documents: updatedDocs }).unwrap();
// //     } catch (err) {
// //       console.error("Failed to update comment:", err);
// //     }
// //   };

// //   const columns = [
// //     { title: "Checklist Title", dataIndex: "title", key: "title", width: 200 },
// //     { title: "Loan Type", dataIndex: "loanType", key: "loanType", width: 150 },
// //     { title: "Document Name", dataIndex: "docName", key: "docName", width: 200 },
// //     {
// //       title: "Status",
// //       dataIndex: "status",
// //       key: "status",
// //       width: 150,
// //       render: (text, record) => (
// //         <Select
// //           value={text}
// //           onChange={(val) => handleStatusChange(record, val)}
// //           style={{ width: "100%" }}
// //           size="small"
// //         >
// //           <Option value="pending">Pending</Option>
// //           <Option value="uploaded">Uploaded</Option>
// //           <Option value="deferred">Deferred</Option>
// //           <Option value="approved">Approved</Option>
// //         </Select>
// //       ),
// //     },
// //     {
// //       title: "Comment",
// //       dataIndex: "comment",
// //       key: "comment",
// //       width: 200,
// //       render: (text, record) => (
// //         <Input
// //           value={text}
// //           onChange={(e) => handleCommentChange(record, e.target.value)}
// //           size="small"
// //         />
// //       ),
// //     },
// //   ];

// //   return (
// //     <div style={{ padding: 16 }}>
// //       <h2>Checklists Assigned to Me</h2>
// //       <Table
// //         loading={isLoading}
// //         columns={columns}
// //         dataSource={tableData}
// //         pagination={{ pageSize: 8 }}
// //         bordered
// //         size="small"
// //       />
// //     </div>
// //   );
// // };

// // export default RMChecklistTablee;

// import React, { useState, useEffect } from "react";
// import { Table, Input, Button, Tag } from "antd";
// import { useGetChecklistsQuery } from "../../api/checklistApi";

// const RMChecklistTablee = ({ userId, onViewChecklist }) => {
//   const { data: checklists = [], isLoading } = useGetChecklistsQuery(userId);
//   const [tableData, setTableData] = useState([]);

//   // Flatten checklists so each document is a row
//   useEffect(() => {
//     const flattened = checklists.flatMap((chkl) =>
//       chkl.documents.map((doc, idx) => ({
//         key: `${chkl._id}-${idx}`,
//         checklistId: chkl._id,
//         title: chkl.title,
//         loanType: chkl.loanType,
//         docName: doc.name,
//         status: doc.status,
//         comment: doc.comment,
//       }))
//     );
//     setTableData(flattened);
//   }, [checklists]);

//   const handleCommentChange = (row, value) => {
//     const updatedData = tableData.map((r) => (r.key === row.key ? { ...r, comment: value } : r));
//     setTableData(updatedData);
//     // You can add backend update here if needed
//   };

//   const statusColor = (status) => {
//     switch (status) {
//       case "pending":
//         return "orange";
//       case "uploaded":
//         return "blue";
//       case "deferred":
//         return "gold";
//       case "approved":
//         return "green";
//       default:
//         return "gray";
//     }
//   };

//   const columns = [
//     { title: "Checklist Title", dataIndex: "title", key: "title", width: 200 },
//     { title: "Loan Type", dataIndex: "loanType", key: "loanType", width: 150 },
//     { title: "Document Name", dataIndex: "docName", key: "docName", width: 200 },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       width: 150,
//       render: (status) => (
//         <Tag color={statusColor(status)} style={{ fontWeight: 600 }}>
//           {status.toUpperCase()}
//         </Tag>
//       ),
//     },
//     {
//       title: "Comment",
//       dataIndex: "comment",
//       key: "comment",
//       width: 200,
//       render: (text, record) => (
//         <Input
//           value={text}
//           onChange={(e) => handleCommentChange(record, e.target.value)}
//           size="small"
//         />
//       ),
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       width: 120,
//       render: (_, record) => (
//         <Button type="link" onClick={() => onViewChecklist(record.checklistId)}>
//           View
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: 16 }}>
//       <h2>Checklists Assigned to Me</h2>
//       <Table
//         loading={isLoading}
//         columns={columns}
//         dataSource={tableData}
//         pagination={{ pageSize: 8 }}
//         bordered
//         size="small"
//       />
//     </div>
//   );
// };

// export default RMChecklistTablee;
