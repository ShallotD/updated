
// import React, { useState, useEffect } from "react";
// import { Modal, Select, Input, Button, Space, Table, Collapse } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import { useGetUsersQuery } from "../../api/userApi";
// import { loanTypes, loanTypeDocuments } from "../cocreator/cocreatordash/pages/docTypes";
// import { useCreateChecklistMutation } from "../../api/checklistApi";

// const { Option } = Select;
// const { Panel } = Collapse;

// const ChecklistsPageh = ({ open, onClose }) => {
//   const [loanType, setLoanType] = useState("");
//   const [title, setTitle] = useState("");
//   const [assignedToRM, setAssignedToRM] = useState("");
//   const [customerId, setCustomerId] = useState("");
//   // const [customerId, setCustomerNumber] = useState("");
//   const [customerName, setCustomerName] = useState("");

//   const [documents, setDocuments] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [newDocName, setNewDocName] = useState("");

//   // Load ALL users and filter RMs + Customers
//   const { data: users = [] } = useGetUsersQuery(undefined, { skip: !open });
//   const rms = users.filter((u) => u.role?.toLowerCase() === "rm");
//   const customers = users.filter((u) => u.role?.toLowerCase() === "customer");

//   // DCL creation API
//   const [createChecklist] = useCreateChecklistMutation();

//   /** Auto-fill customer info when customerId changes */
//   useEffect(() => {
//     if (customerId) {
//       const selected = customers.find((c) => c._id === customerId);
//       if (selected) {
//         setCustomerName(selected.name || "");
//         setCustomerNumber(selected.customerNumber || "");
//       }
//     } else {
//       setCustomerName("");
//       setCustomerNumber("");
//     }
//   }, [customerId, customers]);

//   /** Handle loan type selection and load default documents */
//   const handleLoanTypeChange = (value) => {
//     setLoanType(value);
//     const categories = loanTypeDocuments[value] || [];
//     setDocuments(
//       categories.map((cat) => ({
//         category: cat.title,
//         docList: cat.documents.map((d) => ({
//           name: d,
//           status: "pending",
//           action: "",
//           comment: "",
//         })),
//       }))
//     );
//   };

//   /** Submit DCL */
//   const handleSubmit = async () => {
//     if (!assignedToRM || !loanType || !title) {
//       return alert("Please fill all required fields (RM, Loan Type, Title).");
//     }

//     const payload = {
//       title,
//       loanType,
//       assignedToRM,
//       customerId: customerId || null,
//       customerName: customerName || "",
//       customerNumber: customerNumber || null,
//       documents: documents.flatMap((cat) =>
//         cat.docList.map((doc) => ({
//           name: doc.name,
//           category: cat.category,
//           action: doc.action,
//           status: doc.status,
//           comment: doc.comment,
//         }))
//       ),
//     };

//     try {
//       await createChecklist(payload).unwrap();
//       alert("Checklist created successfully!");
//       onClose();
//     } catch (err) {
//       console.error("Checklist creation error:", err);
//       alert("Failed to create checklist.");
//     }
//   };

//   /** Add new document to selected category */
//   const handleAddNewDocument = () => {
//     if (!newDocName.trim() || selectedCategory === null) return;
//     const updated = [...documents];
//     updated[selectedCategory].docList.push({
//       name: newDocName.trim(),
//       status: "pending",
//       action: "",
//       comment: "",
//     });
//     setDocuments(updated);
//     setNewDocName("");
//   };

//   return (
//     <Modal
//       title="Create DCL Checklist"
//       open={open}
//       onCancel={onClose}
//       width={1100}
//       footer={null}
//     >
//       <Space direction="vertical" style={{ width: "100%" }} size="large">
//         {/* RM selector */}
//         <Select
//           placeholder="Assign RM"
//           value={assignedToRM || undefined}
//           onChange={setAssignedToRM}
//           style={{ width: "100%" }}
//         >
//           {rms.map((rm) => (
//             <Option key={rm._id} value={rm._id}>
//               {rm.name}
//             </Option>
//           ))}
//         </Select>

//         {/* Customer selector */}
//         <Select
//           placeholder="Select Customer"
//           value={customerId || undefined}
//           onChange={(value) => setCustomerId(value)}
//           style={{ width: "100%" }}
//         >
//           {customers.map((c) => (
//             <Option key={c._id} value={c._id}>
//               {c.customerNumber} - {c.name}
//             </Option>
//           ))}
//         </Select>

//         {/* Auto-filled customer info */}
//         <Input placeholder="Customer Name" value={customerName} disabled />
//         <Input placeholder="Customer Number" value={customerNumber} disabled />

//         {/* Checklist title */}
//         <Input
//           placeholder="Checklist Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         {/* Loan type selector */}
//         <Select
//           placeholder="Select Loan Type"
//           value={loanType || undefined}
//           onChange={handleLoanTypeChange}
//           style={{ width: "100%" }}
//         >
//           {loanTypes.map((t) => (
//             <Option key={t} value={t}>
//               {t}
//             </Option>
//           ))}
//         </Select>

//         {/* Document Accordion */}
//         {loanType && (
//           <>
//             <Space>
//               <Select
//                 value={selectedCategory}
//                 onChange={setSelectedCategory}
//                 placeholder="Select Category"
//                 style={{ width: 250 }}
//               >
//                 {documents.map((cat, i) => (
//                   <Option key={i} value={i}>
//                     {cat.category}
//                   </Option>
//                 ))}
//               </Select>

//               <Input
//                 placeholder="New Document Name"
//                 value={newDocName}
//                 onChange={(e) => setNewDocName(e.target.value)}
//                 style={{ width: 250 }}
//               />

//               <Button
//                 type="primary"
//                 icon={<PlusOutlined />}
//                 onClick={handleAddNewDocument}
//               >
//                 Add
//               </Button>
//             </Space>

//             <Collapse accordion>
//               {documents.map((cat, catIdx) => (
//                 <Panel header={cat.category} key={catIdx}>
//                   <Table
//                     pagination={false}
//                     dataSource={cat.docList.map((doc, docIdx) => ({
//                       key: `${catIdx}-${docIdx}`,
//                       name: doc.name,
//                       status: doc.status,
//                       action: doc.action,
//                       comment: doc.comment,
//                       catIdx,
//                       docIdx,
//                     }))}
//                     columns={[
//                       { title: "Document", dataIndex: "name" },
//                       {
//                         title: "Action",
//                         dataIndex: "action",
//                         render: (text, record) => (
//                           <Select
//                             value={text}
//                             onChange={(val) => {
//                               const updated = [...documents];
//                               const doc =
//                                 updated[record.catIdx].docList[record.docIdx];
//                               doc.action = val;
//                               const map = {
//                                 submitted: "submitted",
//                                 rejected: "rejected",
//                                 tbo: "tbo",
//                                 sighted: "sighted",
//                                 waived: "waived",
//                                 deferred: "deferred",
//                               };
//                               doc.status = map[val] || "pending";
//                               setDocuments(updated);
//                             }}
//                             style={{ width: 150 }}
//                           >
//                             <Option value="submitted">Submitted</Option>
//                             <Option value="rejected">Rejected</Option>
//                             <Option value="tbo">TBO</Option>
//                             <Option value="sighted">Sighted</Option>
//                             <Option value="waived">Waiver</Option>
//                             <Option value="deferred">Deferred</Option>
//                           </Select>
//                         ),
//                       },
//                       {
//                         title: "Comment",
//                         dataIndex: "comment",
//                         render: (text, record) => (
//                           <Input
//                             value={text}
//                             onChange={(e) => {
//                               const updated = [...documents];
//                               updated[record.catIdx].docList[record.docIdx].comment =
//                                 e.target.value;
//                               setDocuments(updated);
//                             }}
//                           />
//                         ),
//                       },
//                       {
//                         title: "Remove",
//                         render: (_, record) => (
//                           <Button
//                             danger
//                             onClick={() => {
//                               const updated = [...documents];
//                               updated[record.catIdx].docList.splice(
//                                 record.docIdx,
//                                 1
//                               );
//                               setDocuments(updated);
//                             }}
//                           >
//                             Remove
//                           </Button>
//                         ),
//                       },
//                     ]}
//                   />
//                 </Panel>
//               ))}
//             </Collapse>
//           </>
//         )}

//         {/* Submit */}
//         <Button type="primary" block onClick={handleSubmit}>
//           Submit Checklist
//         </Button>
//       </Space>
//     </Modal>
//   );
// };

// export default ChecklistsPageh;


import React, { useState, useEffect } from "react";
import { Modal, Select, Input, Button, Space, Table, Collapse } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useGetUsersQuery } from "../../api/userApi";
import { loanTypes, loanTypeDocuments } from "../cocreator/cocreatordash/pages/docTypes";
import { useCreateChecklistMutation } from "../../api/checklistApi";

const { Option } = Select;
const { Panel } = Collapse;

const ChecklistsPageh = ({ open, onClose }) => {
  const [loanType, setLoanType] = useState("");
  const [title, setTitle] = useState("");
  const [assignedToRM, setAssignedToRM] = useState("");
  const [customerId, setCustomerId] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");

  const [documents, setDocuments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newDocName, setNewDocName] = useState("");

  // Load all users
  const { data: users = [] } = useGetUsersQuery(undefined, { skip: !open });
  const rms = users.filter((u) => u.role?.toLowerCase() === "rm");
  const customers = users.filter((u) => u.role?.toLowerCase() === "customer");

  // Mutation for creating DCL
  const [createChecklist] = useCreateChecklistMutation();

  /** Auto-fill customer info when customerId changes */
  useEffect(() => {
    const selected = customers.find((c) => c._id === customerId);
    if (selected) {
      setCustomerName(selected.name || "");
      setCustomerNumber(selected.customerNumber || "");
    } else {
      setCustomerName("");
      setCustomerNumber("");
    }
  }, [customerId, customers]);

  /** Handle loan type selection */
  const handleLoanTypeChange = (value) => {
    setLoanType(value);

    const categories = loanTypeDocuments[value] || [];

    // Format documents
    setDocuments(
      categories.map((cat) => ({
        category: cat.title,
        docList: cat.documents.map((d) => ({
          name: d,
          status: "pending",
          action: "",
          comment: "",
        })),
      }))
    );
  };

  /** Add custom document into selected category */
  const handleAddNewDocument = () => {
    if (!newDocName.trim() || selectedCategory === null) return;

    const updated = [...documents];
    updated[selectedCategory].docList.push({
      name: newDocName.trim(),
      status: "pending",
      action: "",
      comment: "",
    });

    setDocuments(updated);
    setNewDocName("");
  };

  /** Submit checklist */
  const handleSubmit = async () => {
    if (!assignedToRM || !loanType || !title) {
      alert("Please fill all required fields.");
      return;
    }

    const payload = {
      title,
      loanType,
      assignedToRM,
      customerId,
      customerName,
      customerNumber,
      documents: documents.flatMap((cat) =>
        cat.docList.map((doc) => ({
          name: doc.name,
          category: cat.category,
          action: doc.action,
          status: doc.status,
          comment: doc.comment,
        }))
      ),
    };

    try {
      await createChecklist(payload).unwrap();
      alert("Checklist created successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error creating checklist.");
    }
  };

  /** Action → Status Mapping */
  const actionToStatus = {
    submitted: "submitted",
    rejected: "rejected",
    tbo: "tbo",
    sighted: "sighted",
    waived: "waived",
    deferred: "deferred",
  };

  return (
    <Modal title="Create DCL Checklist" open={open} onCancel={onClose} width={1100} footer={null}>
      <Space direction="vertical" style={{ width: "100%" }} size="large">

        {/* Select RM */}
        <Select
          placeholder="Assign RM"
          value={assignedToRM || undefined}
          onChange={setAssignedToRM}
          style={{ width: "100%" }}
          showSearch
        >
          {rms.map((rm) => (
            <Option key={rm._id} value={rm._id}>
              {rm.name}
            </Option>
          ))}
        </Select>

        {/* Select Customer */}
        <Select
          placeholder="Select Customer"
          value={customerId || undefined}
          onChange={setCustomerId}
          style={{ width: "100%" }}
          showSearch
          filterOption={(input, option) =>
            option?.children?.toLowerCase().includes(input.toLowerCase())
          }
        >
          {customers.map((c) => (
            <Option key={c._id} value={c._id}>
              {c.customerNumber} - {c.name}
            </Option>
          ))}
        </Select>

        {/* Auto-filled customer info */}
        <Input placeholder="Customer Name" value={customerName} disabled />
        <Input placeholder="Customer Number" value={customerNumber} disabled />

        {/* Title */}
        <Input placeholder="Checklist Title" value={title} onChange={(e) => setTitle(e.target.value)} />

        {/* Loan Type */}
        <Select
          placeholder="Select Loan Type"
          value={loanType || undefined}
          onChange={handleLoanTypeChange}
          style={{ width: "100%" }}
        >
          {loanTypes.map((t) => (
            <Option key={t} value={t}>
              {t}
            </Option>
          ))}
        </Select>

        {/* Document Section */}
        {loanType && (
          <>
            <Space>
              <Select
                placeholder="Select Category"
                style={{ width: 250 }}
                value={selectedCategory}
                onChange={setSelectedCategory}
              >
                {documents.map((cat, i) => (
                  <Option key={i} value={i}>
                    {cat.category}
                  </Option>
                ))}
              </Select>

              <Input
                placeholder="Document Name"
                value={newDocName}
                onChange={(e) => setNewDocName(e.target.value)}
                style={{ width: 250 }}
              />

              <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNewDocument}>
                Add
              </Button>
            </Space>

            <Collapse accordion>
              {documents.map((cat, catIdx) => (
                <Panel header={cat.category} key={catIdx}>
                  <Table
                    pagination={false}
                    dataSource={cat.docList.map((doc, docIdx) => ({
                      key: `${catIdx}-${docIdx}`,
                      ...doc,
                      catIdx,
                      docIdx,
                    }))}
                    columns={[
                      { title: "Document", dataIndex: "name" },
                      {
                        title: "Action",
                        dataIndex: "action",
                        render: (_, record) => (
                          <Select
                            value={record.action}
                            onChange={(action) => {
                              const updated = [...documents];
                              const doc = updated[record.catIdx].docList[record.docIdx];
                              doc.action = action;
                              doc.status = actionToStatus[action] || "pending";
                              setDocuments(updated);
                            }}
                            style={{ width: 130 }}
                          >
                            <Option value="submitted">Submitted</Option>
                            <Option value="rejected">Rejected</Option>
                            <Option value="tbo">TBO</Option>
                            <Option value="sighted">Sighted</Option>
                            <Option value="waived">Waived</Option>
                            <Option value="deferred">Deferred</Option>
                          </Select>
                        ),
                      },
                      {
                        title: "Status",
                        dataIndex: "status",
                        render: (s) => <strong>{s}</strong>,
                      },
                      {
                        title: "Comment",
                        dataIndex: "comment",
                        render: (_, record) => (
                          <Input
                            value={record.comment}
                            onChange={(e) => {
                              const updated = [...documents];
                              updated[record.catIdx].docList[record.docIdx].comment =
                                e.target.value;
                              setDocuments(updated);
                            }}
                          />
                        ),
                      },
                      {
                        title: "Remove",
                        render: (_, record) => (
                          <Button
                            danger
                            onClick={() => {
                              const updated = [...documents];
                              updated[record.catIdx].docList.splice(record.docIdx, 1);
                              setDocuments(updated);
                            }}
                          >
                            Remove
                          </Button>
                        ),
                      },
                    ]}
                  />
                </Panel>
              ))}
            </Collapse>
          </>
        )}

        {/* Submit */}
        <Button type="primary" block onClick={handleSubmit}>
          Submit Checklist
        </Button>
      </Space>
    </Modal>
  );
};

export default ChecklistsPageh;
