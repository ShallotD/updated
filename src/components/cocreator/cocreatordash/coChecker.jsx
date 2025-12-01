// src/components/checklists/BaseChecklistTableCo.jsx
import React, { useState, useMemo } from "react";
import {
  Table,
  Tag,
  Button,
  Drawer,
  Typography,
  message,
} from "antd";

const { Title, Text } = Typography;

// ---------------------- MOCK DATA (shared with RM) ----------------------
let mockChecklists = [
  {
    id: "LN001",
    customerName: "John Doe",
    loanType: "Mortgage",
    rm: "Alice",
    status: "Pending",
    deadline: "2025-12-01",
    categories: [
      { name: "Proof of income", status: "Submitted", file: "income.pdf" },
      { name: "Credit report", status: "Submitted", file: "credit.pdf" },
      { name: "Bank Statements", status: "Submitted", file: "bank.pdf" },
    ],
  },
  {
    id: "LN002",
    customerName: "Mary Jane",
    loanType: "Sme Loan",
    rm: "Alice",
    status: "Pending",
    deadline: "2025-12-10",
    categories: [
      { name: "Business license", status: "Submitted", file: "license.pdf" },
      { name: "Financial statements", status: "Deferred", file: null },
    ],
  },
];

const BaseChecklistTableCo = () => {
  const [selectedChecklist, setSelectedChecklist] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [, forceUpdate] = useState({}); // hack to force re-render for mock state

  // ---------------------- OPEN DRAWER ----------------------
  const openChecklist = (record) => {
    setSelectedChecklist({ ...record }); // clone to avoid mutation
    setDrawerVisible(true);
  };

  // ---------------------- CO ACTIONS ----------------------
  const handleApprove = () => {
    const checklist = mockChecklists.find((c) => c.id === selectedChecklist.id);
    checklist.status = "Approved";
    message.success(`Checklist ${checklist.id} approved`);
    setDrawerVisible(false);
    forceUpdate({}); // refresh table
  };

  const handleReject = () => {
    const checklist = mockChecklists.find((c) => c.id === selectedChecklist.id);
    checklist.status = "Rejected";
    message.error(`Checklist ${checklist.id} rejected`);
    setDrawerVisible(false);
    forceUpdate({});
  };

  const handleReturnToRm = () => {
    const checklist = mockChecklists.find((c) => c.id === selectedChecklist.id);
    checklist.status = "Returned to RM";
    message.warning(`Checklist ${checklist.id} returned to RM for correction`);
    setDrawerVisible(false);
    forceUpdate({});
  };

  // ---------------------- FILTER SUBMITTED CHECKLISTS ----------------------
  const submittedChecklists = useMemo(() => {
    return mockChecklists.filter((c) =>
      c.categories.some((d) => d.status === "Submitted" || d.status === "Deferred")
    );
  }, []);

  // ---------------------- TABLE COLUMNS ----------------------
  const columns = [
    { title: "Loan No", dataIndex: "id", width: 100 },
    { title: "Customer", dataIndex: "customerName", width: 150 },
    { title: "Loan Type", dataIndex: "loanType", width: 150 },
    {
      title: "Progress",
      render: (_, row) => {
        const total = row.categories.length;
        const submitted = row.categories.filter((d) => d.status === "Submitted")
          .length;
        return `${submitted}/${total} submitted`;
      },
    },
    { title: "Status", dataIndex: "status", width: 130 },
    {
      title: "Action",
      render: (_, record) => (
        <Button type="primary" size="small" onClick={() => openChecklist(record)}>
          Review
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={submittedChecklists}
        rowKey="id"
        size="small"
        pagination={{ pageSize: 5 }}
      />

      {/* ---------------------- CO DRAWER ---------------------- */}
      <Drawer
        title={`Checklist Review — ${selectedChecklist?.customerName}`}
        width={450}
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      >
        {selectedChecklist && (
          <>
            <Text strong>Loan Type:</Text> {selectedChecklist.loanType} <br />
            <Text strong>RM:</Text> {selectedChecklist.rm} <br />
            <Text strong>Deadline:</Text> {selectedChecklist.deadline} <br />

            <Title level={5} style={{ marginTop: 20 }}>
              Documents
            </Title>

            {selectedChecklist.categories.map((doc) => (
              <div
                key={doc.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <span>{doc.name}</span>
                <Tag
                  color={
                    doc.status === "Submitted"
                      ? "green"
                      : doc.status === "Deferred"
                      ? "orange"
                      : "blue"
                  }
                >
                  {doc.status}
                </Tag>
              </div>
            ))}

            <Title level={5} style={{ marginTop: 25 }}>
              Actions
            </Title>

            <div style={{ display: "flex", gap: 8 }}>
              <Button type="primary" onClick={handleApprove}>
                Approve
              </Button>
              <Button danger onClick={handleReject}>
                Reject
              </Button>
              <Button onClick={handleReturnToRm}>Return to RM</Button>
            </div>
          </>
        )}
      </Drawer>
    </div>
  );
};

export default BaseChecklistTableCo;
