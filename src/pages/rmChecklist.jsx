import React, { useState } from "react";
import {
  Table,
  Tag,
  Upload,
  Button,
  Card,
  Row,
  Col,
  Space,
  message,
  Typography,
} from "antd";
import {
  UploadOutlined,
  FileDoneOutlined,
  FileExclamationOutlined,
  FileAddOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const RequestChecklist = () => {
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

  // State
  const [checklist, setChecklist] = useState(
    documentCategories.map((category) => ({
      title: category.title,
      documents: category.documents.map((doc) => ({
        name: doc,
        status: "Pending",
        file: null,
        requestDeferral: false,
      })),
    }))
  );

  const updateDocument = (catIdx, docIdx, updates) => {
    const updated = [...checklist];
    updated[catIdx].documents[docIdx] = {
      ...updated[catIdx].documents[docIdx],
      ...updates,
    };
    setChecklist(updated);
  };

  const handleFileUpload = (catIdx, docIdx, file) => {
    updateDocument(catIdx, docIdx, {
      file,
      status: "Submitted",
    });
    message.success("File uploaded successfully");
  };

  const toggleDeferral = (catIdx, docIdx) => {
    const doc = checklist[catIdx].documents[docIdx];
    const newState = !doc.requestDeferral;

    updateDocument(catIdx, docIdx, {
      requestDeferral: newState,
      status: newState ? "Deferred" : "Pending",
    });

    message.info(newState ? "Deferral requested" : "Deferral removed");
  };

  // Summary
  const flatDocs = checklist.flatMap((c) => c.documents);
  const total = flatDocs.length;
  const pending = flatDocs.filter((d) => d.status === "Pending").length;
  const submitted = flatDocs.filter((d) => d.status === "Submitted").length;

  // Build data for table
  const tableData = checklist.flatMap((category, catIdx) =>
    category.documents.map((doc, docIdx) => ({
      key: `${catIdx}-${docIdx}`,
      category: category.title,
      name: doc.name,
      status: doc.status,
      file: doc.file,
      requestDeferral: doc.requestDeferral,
      catIdx,
      docIdx,
    }))
  );

  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      width: 200,
      render: (text) => <b style={{ color: "#531dab" }}>{text}</b>,
      fixed: "left",
    },
    {
      title: "Document Name",
      dataIndex: "name",
      width: 250,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 120,
      render: (status) => {
        const color =
          status === "Submitted"
            ? "green"
            : status === "Deferred"
            ? "orange"
            : "volcano";

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Upload",
      width: 140,
      render: (_, row) => (
        <Upload
          beforeUpload={(file) => {
            handleFileUpload(row.catIdx, row.docIdx, file);
            return false;
          }}
          showUploadList={false}
        >
          <Button
            size="small"
            icon={<UploadOutlined />}
            type="default"
            style={{ padding: "0px 8px" }}
          >
            Choose File
          </Button>
        </Upload>
      ),
    },
    {
      title: "Actions",
      width: 180,
      render: (_, row) => (
        <Space size="small">
          <Button
            size="small"
            type={row.requestDeferral ? "default" : "dashed"}
            danger={row.requestDeferral}
            onClick={() => toggleDeferral(row.catIdx, row.docIdx)}
          >
            {row.requestDeferral ? "Deferred" : "Request Deferral"}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, background: "#f5f5f5", minHeight: "100vh" }}>
      <Title level={3}>NCBA Loan Checklist</Title>

      {/* Summary Section */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Card size="small">
            <Space>
              <FileAddOutlined style={{ fontSize: 24, color: "#1890ff" }} />
              <div>
                <Text type="secondary">Total Documents</Text>
                <br />
                <Title level={4}>{total}</Title>
              </div>
            </Space>
          </Card>
        </Col>

        <Col span={8}>
          <Card size="small">
            <Space>
              <FileExclamationOutlined style={{ fontSize: 24, color: "orange" }} />
              <div>
                <Text type="secondary">Pending Documents</Text>
                <br />
                <Title level={4}>{pending}</Title>
              </div>
            </Space>
          </Card>
        </Col>

        <Col span={8}>
          <Card size="small">
            <Space>
              <FileDoneOutlined style={{ fontSize: 24, color: "green" }} />
              <div>
                <Text type="secondary">Submitted Documents</Text>
                <br />
                <Title level={4}>{submitted}</Title>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={tableData}
        size="small"
        bordered
        pagination={false}
        style={{
          background: "white",
          borderRadius: 8,
        }}
      />
    </div>
  );
};

export default RequestChecklist;
