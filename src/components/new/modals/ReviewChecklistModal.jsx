import React, { useState, useEffect } from "react";
import {
  Button,
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
import {
  UploadOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";

import DocumentInputSection from "../cocreater/components/DocumentInputSection";
import {
  useSubmitRmChecklistMutation,
  useUpdateChecklistStatusMutation,
} from "../../../api/checklistApi";

const { Option } = Select;

// Theme Colors (kept here as the modal also uses them for document status)
const PRIMARY_BLUE = "#164679"; // Dark corporate blue
const ACCENT_LIME = "#b5d334"; // Key accent for success/approval
const HIGHLIGHT_GOLD = "#fcb116"; // Accent for warnings/deferral
const LIGHT_YELLOW = "#fcd716"; // Secondary warning/pending accent
const SECONDARY_PURPLE = "#7e6496"; // Tertiary accent for labels/secondary info

// Custom CSS for a clean, professional look
const customStyles = `
  /* Modal Header Customization */
  .ant-modal-header {
      background-color: ${PRIMARY_BLUE} !important;
      padding: 18px 24px !important;
  }
  .ant-modal-title {
      color: white !important;
      font-size: 1.15rem !important;
      font-weight: 700 !important;
      letter-spacing: 0.5px;
  }
  .ant-modal-close-x {
      color: white !important;
  }

  /* Info Card (Descriptions) Styling */
  .checklist-info-card .ant-card-head {
    border-bottom: 2px solid ${ACCENT_LIME} !important;
  }
  .checklist-info-card .ant-descriptions-item-label {
      font-weight: 600 !important;
      color: ${SECONDARY_PURPLE} !important;
      padding-bottom: 4px;
  }
  .checklist-info-card .ant-descriptions-item-content {
      color: ${PRIMARY_BLUE} !important;
      font-weight: 700 !important;
      font-size: 13px !important;
  }

  /* Table Customization */
  .doc-table.ant-table-wrapper table {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
  }
  .doc-table .ant-table-thead > tr > th {
      background-color: #f7f9fc !important;
      color: ${PRIMARY_BLUE} !important;
      font-weight: 600 !important;
      padding: 12px 16px !important;
  }
  .doc-table .ant-table-tbody > tr > td {
      padding: 10px 16px !important;
      border-bottom: 1px dashed #f0f0f0 !important;
  }

  /* Input/Select Styling */
  .ant-input, .ant-select-selector {
    border-radius: 6px !important;
    border-color: #e0e0e0 !important;
  }
  .ant-input:focus, .ant-select-focused .ant-select-selector {
    box-shadow: 0 0 0 2px rgba(22, 70, 121, 0.2) !important;
    border-color: ${PRIMARY_BLUE} !important;
  }

  /* Tag Customization (Pill Shape) */
  .status-tag {
    font-weight: 700 !important;
    border-radius: 999px !important;
    padding: 3px 8px !important;
    text-transform: capitalize;
    min-width: 80px;
    text-align: center;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    justify-content: center;
  }
  /* Footer Button Styling */
  .ant-modal-footer .ant-btn {
      border-radius: 8px;
      font-weight: 600;
      height: 38px;
      padding: 0 16px;
  }
  .ant-modal-footer .ant-btn-primary {
      background-color: ${PRIMARY_BLUE} !important;
      border-color: ${PRIMARY_BLUE} !important;
  }
`;

const ReviewChecklistModal = ({ checklist, open, onClose }) => {
  // --- Document List State ---
  const [docs, setDocs] = useState([]);

  // --- New Document Addition State ---
  const [newDocName, setNewDocName] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);

  // --- Deferral State ---
  const [deferralModal, setDeferralModal] = useState({
    open: false,
    docIdx: null,
  });
  const [deferralComment, setDeferralComment] = useState("");

  // --- API Hooks ---
  const [submitRmChecklist, { isLoading }] = useSubmitRmChecklistMutation();
  const [updateChecklistStatus, { isLoading: isCheckerSubmitting }] =
    useUpdateChecklistStatusMutation();

  // --- useEffect: Initialize Docs ---
  useEffect(() => {
    if (!checklist || !checklist.documents) return;

    const flattenedDocs = checklist.documents.reduce((acc, categoryObj) => {
      const categoryDocs = categoryObj.docList.map((doc, index) => ({
        ...doc,
        category: categoryObj.category,
        docIdx: acc.length + index,
      }));
      return acc.concat(categoryDocs);
    }, []);

    const preparedDocs = flattenedDocs.map((doc, idx) => ({
      ...doc,
      docIdx: idx,
      status: doc.status || "pending",
      comment: doc.comment || "",
      action: doc.action || "pending",
      fileUrl: doc.fileUrl || null,
      deferralRequested: doc.deferralRequested || false,
      deferralReason: doc.deferralReason || "",
    }));

    setDocs(preparedDocs);
  }, [checklist]);

  // --- Handler for Adding New Document ---
  const handleAddNewDocument = () => {
    if (!newDocName.trim() || !selectedCategoryName) {
      return message.error(
        "Please enter a document name and select a category."
      );
    }

    setDocs((prevDocs) => {
      const newDocument = {
        docIdx: prevDocs.length,
        name: newDocName.trim(),
        category: selectedCategoryName,
        status: "pending",
        action: "pending",
        comment: "Document added by Co-Creator.",
        fileUrl: null,
        deferralRequested: false,
        deferralReason: "",
      };

      return [...prevDocs, newDocument];
    });

    // Reset form inputs after addition
    setNewDocName("");
    setSelectedCategoryName(null);

    message.success(
      `Document '${newDocName.trim()}' added to ${selectedCategoryName}.`
    );
  };

  // --- Other Handlers ---
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
    // Re-index remaining documents for continuous docIdx values
    const reIndexed = updated.map((doc, i) => ({ ...doc, docIdx: i }));
    setDocs(reIndexed);
    message.success("Document deleted.");
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

  // Logic to submit to the final checker
  const submitToCheckers = async () => {
    if (!checklist?._id)
      return message.error("Checklist ID missing for submission.");

    try {
      message.loading({
        content: "Submitting checklist to Co-Checker...",
        key: "checkerSubmit",
      });

      const payload = {
        checklistId: checklist._id,
        documents: docs,
        status: "co_checker_review",
        submittedToCoChecker: true,
        assignedToCoChecker: "692bfab9b72c363184f9e160",
      };

      await updateChecklistStatus(payload).unwrap();

      message.success({
        content: "Checklist successfully submitted to Co-Checker!",
        key: "checkerSubmit",
        duration: 3,
      });
      onClose();
    } catch (err) {
      console.error(err);
      message.error({
        content:
          err?.data?.error || "Failed to submit checklist to Co-Checker.",
        key: "checkerSubmit",
      });
    }
  };

  // --- Computed Values ---
  const uniqueCategories = [...new Set(docs.map((doc) => doc.category))];
  const allDocsApproved =
    docs.length > 0 && docs.every((doc) => doc.action === "approved");

  // --- UI/UX: Status Tag Renderer ---
  const renderStatusTag = (status) => {
    const statusMap = {
      pending: {
        color: SECONDARY_PURPLE,
        text: "Pending",
        icon: <ClockCircleOutlined />,
      },
      uploaded: {
        color: PRIMARY_BLUE,
        text: "Uploaded",
        icon: <UploadOutlined />,
      },
      approved: {
        color: ACCENT_LIME,
        text: "Approved",
        icon: <CheckCircleOutlined />,
      },
      deferred: {
        color: HIGHLIGHT_GOLD,
        text: "Deferred",
        icon: <CloseCircleOutlined />,
      },
    };
    const { color, text, icon } = statusMap[status] || {
      color: "default",
      text: status,
      icon: <SyncOutlined spin />,
    };

    return (
      <Tag
        className="status-tag"
        style={{
          color: color,
          backgroundColor: color + "22",
          borderColor: color + "55",
        }}
      >
        {icon}
        {text}
      </Tag>
    );
  };

  // --- Columns Definition ---
  const columns = [
    {
      title: "Document Name",
      dataIndex: "name",
      width: 250,
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
      width: 120,
      render: (text) => (
        <span
          style={{ fontSize: 12, color: SECONDARY_PURPLE, fontWeight: "500" }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      width: 140,
      render: (text, record) => (
        <Select
          size="small"
          value={record.action}
          style={{ width: "100%" }}
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
      width: 120,
      render: (status) => renderStatusTag(status),
    },
    {
      title: "Comment",
      dataIndex: "comment",
      width: 200,
      render: (text, record) => (
        <Input.TextArea
          rows={1}
          size="small"
          value={text}
          onChange={(e) => handleCommentChange(record.docIdx, e.target.value)}
        />
      ),
    },
    {
      title: "Actions",
      width: 300,
      render: (_, record) => (
        <Space size={4}>
          <Upload
            showUploadList={false}
            beforeUpload={(file) => handleFileUpload(record.docIdx, file)}
          >
            <Button
              size="small"
              icon={<UploadOutlined />}
              style={{
                borderRadius: 6,
                color: PRIMARY_BLUE,
                borderColor: PRIMARY_BLUE + "55",
              }}
            >
              Upload
            </Button>
          </Upload>
          {record.fileUrl && (
            <Button
              size="small"
              icon={<EyeOutlined />}
              onClick={() => window.open(record.fileUrl, "_blank")}
              style={{
                borderRadius: 6,
                color: SECONDARY_PURPLE,
                borderColor: SECONDARY_PURPLE + "55",
              }}
            >
              View
            </Button>
          )}
          <Button
            size="small"
            danger
            onClick={() => handleDelete(record.docIdx)}
            style={{ borderRadius: 6 }}
          >
            Delete
          </Button>
          <Button
            size="small"
            disabled={record.deferralRequested}
            onClick={() => openDeferral(record.docIdx)}
            style={{
              borderRadius: 6,
              borderColor: HIGHLIGHT_GOLD + "55",
              backgroundColor: record.deferralRequested
                ? LIGHT_YELLOW + "88"
                : "white",
              color: record.deferralRequested ? PRIMARY_BLUE : HIGHLIGHT_GOLD,
            }}
          >
            {record.deferralRequested ? "Deferred" : "Request Deferral"}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <style>{customStyles}</style> {/* Inject Custom Styles */}
      <Modal
        title={`Review Checklist — ${checklist?.title || ""}`}
        open={open}
        onCancel={onClose}
        width={1150}
        bodyStyle={{ padding: "0 24px 24px" }}
        footer={[
          <Button
            key="submit-checker"
            disabled={!allDocsApproved}
            type="default"
            onClick={submitToCheckers}
            loading={isCheckerSubmitting}
            style={{
              backgroundColor: ACCENT_LIME,
              borderColor: ACCENT_LIME,
              color: PRIMARY_BLUE,
              fontWeight: "bold",
              borderRadius: 8,
              opacity: !allDocsApproved ? 0.6 : 1,
              cursor: !allDocsApproved ? "not-allowed" : "pointer",
            }}
          >
            Submit to Checker
          </Button>,
          <Button key="cancel" onClick={onClose}>
            Close
          </Button>,
          <Button
            key="submit"
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
            <Card
              className="checklist-info-card"
              size="small"
              title={
                <span style={{ color: PRIMARY_BLUE, fontSize: 14 }}>
                  Checklist Details
                </span>
              }
              style={{
                marginBottom: 18,
                marginTop: 24,
                borderRadius: 10,
                border: `1px solid #e0e0e0`,
              }}
            >
              <Descriptions size="middle" column={{ xs: 1, sm: 2, lg: 3 }}>
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

            {/* --- DOCUMENT INPUT SECTION (Add Functionality) --- */}
            <h3
              style={{
                margin: "16px 0 8px",
                color: PRIMARY_BLUE,
                fontWeight: "bold",
              }}
            >
              Add New Document +
            </h3>

            <DocumentInputSection
              uniqueCategories={uniqueCategories}
              selectedCategoryName={selectedCategoryName}
              setSelectedCategoryName={setSelectedCategoryName}
              newDocName={newDocName}
              setNewDocName={setNewDocName}
              handleAddNewDocument={handleAddNewDocument}
            />
            {/* --------------------------------------------------- */}

            <h3
              style={{
                margin: "16px 0 8px",
                color: PRIMARY_BLUE,
                fontWeight: "bold",
              }}
            >
              Required Documents
            </h3>

            <Table
              className="doc-table"
              rowKey="docIdx"
              size="middle"
              pagination={false}
              dataSource={docs}
              columns={columns}
              bordered={false}
            />
          </>
        )}
      </Modal>
      {/* Deferral Modal - UI/UX Enhanced */}
      <Modal
        title={
          <span style={{ color: PRIMARY_BLUE, fontWeight: "bold" }}>
            Request Deferral Reason
          </span>
        }
        open={deferralModal.open}
        onCancel={() => setDeferralModal({ open: false, docIdx: null })}
        footer={[
          <Button
            key="cancel-defer"
            onClick={() => setDeferralModal({ open: false, docIdx: null })}
            style={{ borderRadius: 6 }}
          >
            Cancel
          </Button>,
          <Button
            key="submit-defer"
            type="primary"
            onClick={submitDeferral}
            style={{
              backgroundColor: ACCENT_LIME,
              borderColor: ACCENT_LIME,
              color: PRIMARY_BLUE,
              fontWeight: "bold",
              borderRadius: 6,
            }}
          >
            Submit Deferral
          </Button>,
        ]}
      >
        <p style={{ marginBottom: 12, color: SECONDARY_PURPLE }}>
          Please clearly state the justification for requesting a deferral for
          this document.
        </p>
        <Input.TextArea
          rows={4}
          size="middle"
          value={deferralComment}
          onChange={(e) => setDeferralComment(e.target.value)}
          placeholder="Enter detailed deferral reason..."
          style={{ borderRadius: 8 }}
        />
      </Modal>
    </>
  );
};

export default ReviewChecklistModal;
