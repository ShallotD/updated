// export default CoChecklistPage;
import React, { useState, useEffect } from "react";
import {
  Button,
  Divider,
  Table,
  Tag,
  Modal,
  Input,
  Select,
  Card,
  Descriptions,
  message,
  Space,
  Upload,
} from "antd";
import { UploadOutlined, EyeOutlined } from "@ant-design/icons";
import ChecklistsPage from "../new/cocreater/ChecklistsPage";
import {
  useGetChecklistsQuery,
  useSubmitRmChecklistMutation,
} from "../../api/checklistApi";

const { Option } = Select;

const PRIMARY_BLUE = "#164679"; // Dark Blue/Navy
const ACCENT_LIME = "#b5d334";  // Lime/Light Green
const HIGHLIGHT_GOLD = "#fcb116"; // Gold / Yellow-orange
const LIGHT_YELLOW = "#fcd716"; // Light yellow
const SECONDARY_PURPLE = "#7e6496"; // Purple / Accent shade

/* -------------------------------------------------------------------
   ⭐ REVIEW CHECKLIST MODAL
------------------------------------------------------------------- */
const ReviewChecklistModal = ({ checklist, open, onClose }) => {
  const [docs, setDocs] = useState([]);
  const [deferralModal, setDeferralModal] = useState({
    open: false,
    docIdx: null,
  });
  const [deferralComment, setDeferralComment] = useState("");

  const [submitRmChecklist, { isLoading }] = useSubmitRmChecklistMutation();

  useEffect(() => {
    if (!checklist) return;
    const preparedDocs = checklist.documents.map((doc, idx) => ({
      ...doc,
      docIdx: idx,
      status: doc.status || "pending",
      comment: doc.comment || "",
      action: doc.action || "pending",
      fileUrl: doc.fileUrl || null,
    }));
    setDocs(preparedDocs);
  }, [checklist]);

  const handleActionChange = (idx, value) => {
    const updated = [...docs];
    updated[idx].action = value;
    if (value === "deferred") updated[idx].status = "deferred";
    setDocs(updated);
  };

  const handleCommentChange = (idx, value) => {
    const updated = [...docs];
    updated[idx].comment = value;
    setDocs(updated);
  };

  const handleDelete = (idx) => {
    const updated = docs.filter((_, i) => i !== idx);
    setDocs(updated);
  };

  const handleFileUpload = (docIdx, file) => {
    const updated = [...docs];
    updated[docIdx].fileUrl = URL.createObjectURL(file);
    updated[docIdx].status = "uploaded";
    setDocs(updated);
    message.success("File uploaded");
    return false;
  };

  const openDeferral = (docIdx) => {
    setDeferralModal({ open: true, docIdx });
    setDeferralComment("");
  };

  const submitDeferral = () => {
    if (!deferralComment.trim())
      return message.error("Enter a deferral reason");
    const updated = [...docs];
    updated[deferralModal.docIdx].status = "deferred";
    updated[deferralModal.docIdx].deferralReason = deferralComment;
    updated[deferralModal.docIdx].deferralRequested = true;
    setDocs(updated);
    message.success("Deferral submitted");
    setDeferralModal({ open: false, docIdx: null });
  };

  const submitToRM = async () => {
    try {
      if (!checklist?._id) throw new Error("Checklist ID missing");

      const payload = {
        checklistId: checklist._id,
        documents: docs.map((doc) => ({
          _id: doc._id || undefined,
          name: doc.name,
          category: doc.category,
          status: doc.status,
          action: doc.action,
          comment: doc.comment,
          fileUrl: doc.fileUrl || null,
          deferralReason: doc.deferralReason || null,
        })),
      };

      await submitRmChecklist(payload).unwrap();
      message.success("Checklist submitted to RM!");
      onClose();
    } catch (err) {
      console.error(err);
      message.error(err?.data?.error || "Failed to submit checklist to RM");
    }
  };

  const columns = [
    {
      title: "Document Name",
      dataIndex: "name",
      render: (text, record) => (
        <Input
          size="small"
          value={record.name}
          onChange={(e) => {
            const updated = [...docs];
            updated[record.docIdx].name = e.target.value;
            setDocs(updated);
          }}
        />
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (text) => (
        <span style={{ fontSize: 12, color: "#666" }}>{text}</span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <Select
          size="small"
          value={record.action}
          style={{ width: 120 }}
          onChange={(val) => handleActionChange(record.docIdx, val)}
        >
          <Option value="pending">Pending</Option>
          <Option value="uploaded">Uploaded</Option>
          <Option value="approved">Approved</Option>
          <Option value="deferred">Deferred</Option>
        </Select>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        const colors = {
          pending: "default",
          uploaded: "blue",
          approved: "green",
          deferred: "gold",
        };
        return (
          <Tag color={colors[status] || "default"} style={{ fontSize: 12 }}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Comment",
      dataIndex: "comment",
      render: (text, record) => (
        <Input
          size="small"
          value={text}
          onChange={(e) => handleCommentChange(record.docIdx, e.target.value)}
        />
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Upload
            showUploadList={false}
            beforeUpload={(file) => handleFileUpload(record.docIdx, file)}
          >
            <Button size="small" icon={<UploadOutlined />}>
              Upload
            </Button>
          </Upload>
          {record.fileUrl && (
            <Button
              size="small"
              icon={<EyeOutlined />}
              onClick={() => window.open(record.fileUrl, "_blank")}
            >
              View
            </Button>
          )}
          <Button
            size="small"
            danger
            onClick={() => handleDelete(record.docIdx)}
          >
            Delete
          </Button>
          <Button
            size="small"
            disabled={record.status === "deferred"}
            onClick={() => openDeferral(record.docIdx)}
          >
            {record.deferralRequested ? "Deferred" : "Request Deferral"}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Modal
        title={`Review Checklist — ${checklist?.title || ""}`}
        open={open}
        onCancel={onClose}
        width={1000}
        footer={[
          <Button key="cancel" size="small" onClick={onClose}>
            Close
          </Button>,
          <Button
            key="submit"
            size="small"
            type="primary"
            loading={isLoading}
            onClick={submitToRM}
          >
            Submit to RM
          </Button>,
        ]}
      >
        {checklist && (
          <>
            <Card size="small" style={{ marginBottom: 12 }}>
              <Descriptions
                size="small"
                column={2}
                labelStyle={{ fontSize: 12 }}
                contentStyle={{ fontSize: 12 }}
              >
                <Descriptions.Item label="DCL No">
                  {checklist._id}
                </Descriptions.Item>
                <Descriptions.Item label="Title">
                  {checklist.title}
                </Descriptions.Item>
                <Descriptions.Item label="Loan Type">
                  {checklist.loanType}
                </Descriptions.Item>
                <Descriptions.Item label="Created By">
                  {checklist.createdBy?.name}
                </Descriptions.Item>
                <Descriptions.Item label="RM">
                  {checklist.assignedToRM?.name}
                </Descriptions.Item>
                <Descriptions.Item label="Co-Checker">
                  {checklist.assignedToCoChecker?.name || "Pending"}
                </Descriptions.Item>
              </Descriptions>
            </Card>
            <Table
              rowKey="docIdx"
              size="small"
              pagination={false}
              dataSource={docs}
              columns={columns}
              bordered
            />
          </>
        )}
      </Modal>

      {/* Deferral Modal */}
      <Modal
        title="Request Deferral"
        open={deferralModal.open}
        onCancel={() => setDeferralModal({ open: false, docIdx: null })}
        footer={[
          <Button
            size="small"
            onClick={() => setDeferralModal({ open: false, docIdx: null })}
          >
            Cancel
          </Button>,
          <Button size="small" type="primary" onClick={submitDeferral}>
            Submit
          </Button>,
        ]}
      >
        <Input.TextArea
          rows={3}
          size="small"
          value={deferralComment}
          onChange={(e) => setDeferralComment(e.target.value)}
          placeholder="Enter deferral reason"
        />
      </Modal>
    </>
  );
};

/* -------------------------------------------------------------------
   ⭐ MAIN PAGE: CoChecklistPage
------------------------------------------------------------------- */
const CoChecklistPage = ({ userId }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedChecklist, setSelectedChecklist] = useState(null);

  const { data: checklists = [], refetch } = useGetChecklistsQuery();

  // const myChecklists = checklists.filter((c) => c.assignedToRM?._id === userId);
  const myChecklists = checklists.filter((c) => c.createdBy?._id === userId);

  const customTableStyles = `
    .ant-table-wrapper {
        border-radius: 12px;
        overflow: hidden; /* Ensures border-radius applies to all corners including header */
        box-shadow: 0 10px 30px rgba(22, 70, 121, 0.08); /* Lighter, more subtle shadow */
        border: 1px solid #e0e0e0; /* Define a light, crisp outer border */
    }

    /* MODERN Header Styling: Light background, strong text, and thick accent line */
    .ant-table-thead > tr > th {
        background-color: #f7f7f7 !important; /* Very light gray header */
        color: ${PRIMARY_BLUE} !important;
        font-weight: 700;
        font-size: 15px;
        padding: 16px 16px !important;
        border-bottom: 3px solid ${ACCENT_LIME} !important; /* Thicker accent line */
        border-right: none !important; /* Remove vertical header lines */
    }
    
    /* Row Separators Only (Horizontal) */
    .ant-table-tbody > tr > td {
        border-bottom: 1px solid #f0f0f0 !important; /* Light horizontal separator */
        border-right: none !important; /* Remove vertical dividers for a cleaner look */
        padding: 14px 16px !important;
        font-size: 14px;
        color: #333; /* Softer text color */
    }

    .ant-table-tbody > tr.ant-table-row:hover > td {
        background-color: rgba(181, 211, 52, 0.1) !important; /* Light lime hover effect */
        cursor: pointer;
    }

    /* Remove Antd's default 'bordered' styling which creates heavy internal lines */
    .ant-table-bordered .ant-table-container, 
    .ant-table-bordered .ant-table-tbody > tr > td,
    .ant-table-bordered .ant-table-thead > tr > th {
        border: none !important;
    }

    /* Pagination Styling - Maintained from previous version */
    .ant-pagination .ant-pagination-item-active {
        background-color: ${ACCENT_LIME} !important;
        border-color: ${ACCENT_LIME} !important;
    }
    .ant-pagination .ant-pagination-item-active a {
        color: ${PRIMARY_BLUE} !important;
        font-weight: 600;
    }
    .ant-pagination .ant-pagination-item:hover {
        border-color: ${ACCENT_LIME} !important;
    }
    .ant-pagination .ant-pagination-prev:hover .ant-pagination-item-link,
    .ant-pagination .ant-pagination-next:hover .ant-pagination-item-link {
        color: ${ACCENT_LIME} !important;
    }
    .ant-pagination .ant-pagination-options .ant-select-selector {
        border-radius: 8px !important;
    }
  `;

  // Define columns array - LOGIC KEPT EXACTLY AS IS
  const columns = [
    { title: "DCL No", dataIndex: "_id", width: 200, 
      render: (text) => <span style={{ fontWeight: 'bold', color: PRIMARY_BLUE }}>{text}</span> // Emphasize ID
    },
    { title: "Title", dataIndex: "title", width: 180, 
      render: (text) => <span style={{ color: SECONDARY_PURPLE }}>{text}</span> 
    },
    { title: "Loan Type", dataIndex: "loanType", width: 140 },
    {
      title: "Assigned RM",
      dataIndex: "assignedToRM",
      width: 120,
      render: (rm) => <span style={{ color: PRIMARY_BLUE, fontWeight: '500' }}>{rm?.name || "Not Assigned"}</span>, // Use primary blue for RM name
    },
    {
      title: "# Docs",
      dataIndex: "documents",
      width: 80,
      align: 'center', // Center align number of documents
      render: (docs) => (
        <Tag 
          color={LIGHT_YELLOW} // Using a light background for count
          style={{ 
            fontSize: 12, 
            borderRadius: 999, // Pill shape for modern look
            fontWeight: 'bold', 
            color: PRIMARY_BLUE, 
            border: `1px solid ${HIGHLIGHT_GOLD}`
          }}
        >
          {docs.length}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 120,
      render: (status, record) => {
        const totalDocs = record.documents.length;
        const approvedDocs = record.documents.filter(
          (d) => d.status === "approved"
        ).length;
        
        // Custom color logic based on the provided palette
        const tagColor = approvedDocs === totalDocs ? ACCENT_LIME : HIGHLIGHT_GOLD;
        const tagText = approvedDocs === totalDocs ? "Fully Approved" : "In Progress";

        return (
          <Tag 
            color={tagColor} 
            style={{ 
                fontSize: 12, 
                borderRadius: 999, // Pill shape for modern look
                fontWeight: 'bold',
                padding: '4px 8px', 
                color: PRIMARY_BLUE, // Dark blue text for better contrast
                backgroundColor: approvedDocs === totalDocs ? ACCENT_LIME : LIGHT_YELLOW // Use light yellow for in-progress tag background
            }}>
            {tagText}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      width: 100,
      render: (_, record) => (
        <Button
          size="small"
          type="link"
          onClick={() => setSelectedChecklist(record)}
          style={{ 
              color: SECONDARY_PURPLE, // Use purple for link button
              fontWeight: 'bold',
              fontSize: 13,
              borderRadius: 6,
              // Add a hover effect for better UX
              '--antd-wave-shadow-color': ACCENT_LIME, // Custom Antd wave color
          }}
        >
          View
        </Button>
      ),
    },
  ];
 

  return (
    <div style={{ padding: 16 }}>
      <Button type="primary" size="small" onClick={() => setDrawerOpen(true)}>
        Create New DCL
      </Button>

      {drawerOpen && (
        <ChecklistsPage
          open={drawerOpen}
          onClose={() => {
            setDrawerOpen(false);
            refetch();
          }}
          coCreatorId={userId}
        />
      )}

      <Divider style={{ margin: "12px 0" }}>Assigned Checklists</Divider>

       <style>{customTableStyles}</style>

      <Table
        columns={columns} // Using the defined columns array
        dataSource={myChecklists}
        rowKey="_id"
        size="large" // Increased size for better readability
        // IMPORTANT UX CHANGE: Removed 'bordered' to allow for modern border styling via CSS
        // bordered // REMOVED THIS PROP
        pagination={{ 
          pageSize: 5, 
          showSizeChanger: true, // Allow user to change page size
          pageSizeOptions: ['5', '10', '20', '50'], // Options for page size
          position: ['bottomCenter'] // Center the pagination
        }}
        // Use rowClassName for subtle alternating row colors (good UX)
        rowClassName={(record, index) => (index % 2 === 0 ? 'bg-white' : 'bg-gray-50')}
      />

      {selectedChecklist && (
        <ReviewChecklistModal
          checklist={selectedChecklist}
          open={!!selectedChecklist}
          onClose={() => setSelectedChecklist(null)}
        />
      )}
    </div>
  );
};

export default CoChecklistPage;
