import React, { useState } from "react";
import {
  Table,
  Input,
  Button,
  Card,
  Upload,
  Layout,
  Tag,
  message
} from "antd";
import { UploadOutlined, SearchOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const { Content } = Layout;

export default function RMDashboard() {
  const [loanNumber, setLoanNumber] = useState("");
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [checklist, setChecklist] = useState([]);

  const customers = [
    { name: "Mamba Mentality", loanNumber: "LD001" },
    { name: "Oliver Aloo", loanNumber: "LD002" },
    { name: "Mwalimu Nyerere", loanNumber: "LD003" },
    { name: "Bobby Taliban", loanNumber: "LD004" },
    { name: "Clark Dangote", loanNumber: "LD005" },
  ];

  const documentCategories = [
    {
      title: "Contracts Documents Required",
      documents: [
        "Duly executed facility offer letter",
        "Board resolution of the borrower",
        "Acknowledgment by guarantor form",
        "Total cost of credit",
      ],
    },
    {
      title: "KYC Documents",
      documents: [
        "Certificate of incorporation",
        "Memorandum and articles of association",
        "Company PIN certificate",
        "CR12",
        "ID / Passport",
        "PIN certificate of the borrowers",
      ],
    },
    {
      title: "Facility Documents",
      documents: [
        "Directors personal guarantees and indemnities",
        "Borrowers to open mpesa till number linked to NCBA account",
      ],
    },
    {
      title: "Compliance Documents",
      documents: [
        "Business loan protector cover",
        "Business permits",
        "Borrowers to provide a current/valid tax compliance certificate",
      ],
    },
  ];

  const initializeChecklist = () =>
    documentCategories.map((category) => ({
      title: category.title,
      documents: category.documents.map((doc) => ({
        name: doc,
        status: "Pending",
        file: null,
        requestDeferral: false,
      })),
    }));

  const [dclData, setDclData] = useState({
    LD001: [
      { name: "ID Copy", status: "Under Review", file: null, requestDeferral: false },
      { name: "Offer Letter", status: "Pending", file: null, requestDeferral: false },
    ],
    LD002: [
      { name: "ID Copy", status: "Pending", file: null, requestDeferral: false },
      { name: "Payslip", status: "Pending", file: null, requestDeferral: false },
    ],
    LD003: [
      { name: "Offer Letter", status: "Under Review", file: null, requestDeferral: false },
      { name: "CRB Report", status: "Pending", file: null, requestDeferral: false },
    ],
    LD004: [
      { name: "Passport Photo", status: "Deferred", file: null, requestDeferral: true },
      { name: "Bank Statement", status: "Under Review", file: null, requestDeferral: false },
    ],
    LD005: [
      { name: "ID Copy", status: "Pending", file: null, requestDeferral: false },
      { name: "Utility Bill", status: "Pending", file: null, requestDeferral: false },
    ],
  });

  // Select Loan
  const selectLoan = (loan) => {
    setSelectedLoan(loan);
    const existingDCL = dclData[loan.loanNumber];

    if (existingDCL) {
      const updatedChecklist = documentCategories.map((category) => ({
        title: category.title,
        documents: category.documents.map((doc) => {
          const existingDoc = existingDCL.find((d) => d.name === doc);
          return (
            existingDoc || { name: doc, status: "Pending", file: null, requestDeferral: false }
          );
        }),
      }));
      setChecklist(updatedChecklist);
    } else {
      setChecklist(initializeChecklist());
    }
  };

  const handleSearch = () => {
    const loan = customers.find(
      (c) => c.loanNumber.toLowerCase() === loanNumber.toLowerCase()
    );
    if (loan) selectLoan(loan);
  };

  const handleBack = () => {
    setSelectedLoan(null);
    setChecklist([]);
  };

  const handleSubmitChecklist = () => {
    const updated = checklist.map((category) => ({
      ...category,
      documents: category.documents.map((doc) => ({
        ...doc,
        status: doc.file && !doc.requestDeferral ? "Under Review" : doc.status,
      })),
    }));

    setChecklist(updated);
    message.success("Checklist submitted!");
  };

  // Summary Table Columns
  const summaryColumns = [
    { title: "Customer", dataIndex: "name" },
    { title: "Loan Number", dataIndex: "loanNumber" },
    { title: "Total Docs", dataIndex: "total" },
    {
      title: "Pending",
      dataIndex: "pending",
      render: (v) => <Tag color="red">{v}</Tag>,
    },
    {
      title: "Under Review",
      dataIndex: "underReview",
      render: (v) => <Tag color="blue">{v}</Tag>,
    },
    {
      title: "Deferred",
      dataIndex: "deferred",
      render: (v) => <Tag color="gold">{v}</Tag>,
    },
  ];

  // Customer Summary
  const customerSummary = customers.map((cust) => {
    const docs = dclData[cust.loanNumber] || [];
    return {
      ...cust,
      total: docs.length,
      pending: docs.filter((d) => d.status === "Pending").length,
      underReview: docs.filter((d) => d.status === "Under Review").length,
      deferred: docs.filter((d) => d.status === "Deferred").length,
    };
  });

  return (
    <Layout style={{ background: "#F0F2F5", padding: "40px" }}>
      <Content>

        {/* ---------------------- DASHBOARD ---------------------- */}
        {!selectedLoan && (
          <>
            <div style={{ display: "flex", gap: 20, marginBottom: 30 }}>
              <Card style={{ flex: 1, textAlign: "center" }}>
                <h2 style={{ fontSize: 32, color: "#003366" }}>12</h2>
                <p>Total Deferrals</p>
              </Card>

              <Card style={{ flex: 1, textAlign: "center", background: "#003366", color: "white" }}>
                <h2 style={{ fontSize: 32 }}>+</h2>
                <p>Request Deferral</p>
              </Card>

              <Card style={{ flex: 1, textAlign: "center" }}>
                <h2 style={{ fontSize: 32, color: "#003366" }}>5</h2>
                <p>Pending Deferrals</p>
              </Card>
            </div>

            {/* Search Input */}
            <Input.Search
              size="large"
              placeholder="Search Loan Number e.g. LD001"
              enterButton={<Button type="primary" icon={<SearchOutlined />} />}
              onSearch={handleSearch}
              value={loanNumber}
              onChange={(e) => setLoanNumber(e.target.value)}
              style={{ marginBottom: 25 }}
            />

            <Card title="Customers DCL Summary" bordered={false} style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
              <Table
                columns={summaryColumns}
                dataSource={customerSummary}
                rowKey="loanNumber"
                onRow={(record) => ({
                  onClick: () => selectLoan(record),
                })}
                pagination={false}
              />
            </Card>
          </>
        )}

        {/* ---------------------- CHECKLIST VIEW ---------------------- */}
        {selectedLoan && (
          <Card
            title={
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Button icon={<ArrowLeftOutlined />} onClick={handleBack} />
                <span style={{ fontSize: 20, fontWeight: 600 }}>
                  DCL for {selectedLoan.name} ({selectedLoan.loanNumber})
                </span>
              </div>
            }
            style={{ boxShadow: "0px 4px 20px rgba(0,0,0,0.1)" }}
          >
            {checklist.map((category) => (
              <Card
                key={category.title}
                title={category.title}
                style={{ marginBottom: 25, borderRadius: 8, border: "1px solid #d9d9d9" }}
              >
                <Table
                  dataSource={category.documents}
                  pagination={false}
                  rowKey="name"
                  columns={[
                    { title: "Document", dataIndex: "name" },
                    {
                      title: "Status",
                      dataIndex: "status",
                      render: (status) => (
                        <Tag
                          color={
                            status === "Under Review"
                              ? "blue"
                              : status === "Deferred"
                              ? "gold"
                              : "gray"
                          }
                        >
                          {status}
                        </Tag>
                      ),
                    },
                    {
                      title: "Upload",
                      render: (_, doc) => (
                        <Upload beforeUpload={() => false}>
                          <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                      ),
                    },
                    {
                      title: "Deferral",
                      render: (_, doc) => (
                        <Button type={doc.requestDeferral ? "primary" : "default"} danger={doc.requestDeferral}>
                          {doc.requestDeferral ? "Deferred" : "Request Deferral"}
                        </Button>
                      ),
                    },
                  ]}
                />
              </Card>
            ))}

            <div style={{ textAlign: "center", marginTop: 20 }}>
              <Button
                type="primary"
                size="large"
                style={{ background: "#003366", paddingLeft: 40, paddingRight: 40 }}
                onClick={handleSubmitChecklist}
              >
                SUBMIT CHECKLIST
              </Button>
            </div>
          </Card>
        )}

      </Content>
    </Layout>
  );
}
