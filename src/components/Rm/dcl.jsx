import { useState } from "react";
import { Table, Button, Upload, Input, Form, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function DCL({ loan, onBack }) {
  if (!loan) return null;

  const isPending =
    loan.status === "Pending" ||
    loan.status === "Pending from RM" ||
    loan.status === "Pending from CO";

  const [documents, setDocuments] = useState([
    { category: "Identity Documents", name: "ID Proof", status: "Pending", comment: "Missing signature", uploadedFile: null, uploadDisabled: false, deferralRequested: false },
    { category: "Identity Documents", name: "Address Proof", status: "Submitted", comment: "Verified", uploadedFile: null, uploadDisabled: true, deferralRequested: false },
    { category: "Financial Statements", name: "Income Statement", status: "Pending from RM", comment: "Awaiting updated statement", uploadedFile: null, uploadDisabled: false, deferralRequested: false },
    { category: "Financial Statements", name: "Tax Return", status: "Sighted", comment: "Reviewed", uploadedFile: null, uploadDisabled: true, deferralRequested: false },
    { category: "Business Licenses", name: "Business License", status: "Deferred", comment: "Extension granted", uploadedFile: null, uploadDisabled: true, deferralRequested: false },
  ]);

  const [finalComment, setFinalComment] = useState("");
  const [activeDeferralIndex, setActiveDeferralIndex] = useState(null);
  const [deferralForm] = Form.useForm();

  // Handle file upload
  const handleUpload = (file, index) => {
    if (file.type !== "application/pdf") {
      message.error("Only PDF files are allowed.");
      return false;
    }
    const updatedDocs = [...documents];
    updatedDocs[index].uploadedFile = file;
    updatedDocs[index].uploadDisabled = true;
    updatedDocs[index].deferralRequested = true;
    setDocuments(updatedDocs);
    message.success(`File "${file.name}" uploaded for "${updatedDocs[index].name}"`);
    return false;
  };

  // Open deferral form
  const handleRequestDeferralClick = (index) => {
    setActiveDeferralIndex(index);
    const doc = documents[index];
    deferralForm.setFieldsValue({
      loanNo: loan.loanNo,
      dclNo: loan.dclNo || "",
      customer: loan.customer,
      document: doc.name,
      duration: "",
      reason: "",
    });
  };

  // Submit deferral form
  const handleDeferralSubmit = (values) => {
    const updatedDocs = [...documents];
    updatedDocs[activeDeferralIndex].deferralRequested = true;
    updatedDocs[activeDeferralIndex].uploadDisabled = true;
    setDocuments(updatedDocs);

    message.success(`Deferral requested for "${values.document}"`);
    deferralForm.resetFields();
    setActiveDeferralIndex(null);
  };

  // Render status with color
  const renderStatus = (status) => {
    let className = "";
    switch (status) {
      case "Pending":
      case "Pending from RM":
      case "Pending from CO":
        className = "text-yellow-600 font-semibold";
        break;
      case "Settled":
      case "Submitted":
        className = "text-green-600 font-semibold";
        break;
      case "Sighted":
        className = "text-blue-600 font-semibold";
        break;
      case "TBO":
      case "Deferred"
        className = "text-orange-600 font-semibold";
        break;
      case "Waived":
        className = "text-gray-500 font-semibold";
        break;
      default:
        className = "";
    }
    return <span className={className}>{status}</span>;
  };

  // Filter documents for non-pending view
  const displayedDocuments = isPending
    ? documents
    : documents.filter(
        (d) =>
          d.status !== "Pending" &&
          d.status !== "Pending from RM" &&
          d.status !== "Pending from CO"
      );

  // Define table columns
  const columns = [
    { title: "Document Category", dataIndex: "category", key: "category" },
    { title: "Document Name", dataIndex: "name", key: "name" },
    { title: "Status", dataIndex: "status", key: "status", render: renderStatus },
    { title: "Comment", dataIndex: "comment", key: "comment", render: text => <i>{text || "No comment"}</i> },
  ];

  if (isPending) {
    columns.push(
      {
        title: "Upload",
        key: "upload",
        render: (_, record, index) => {
          const isAllowed = record.status === "Pending" || record.status === "Pending from RM";
          if (!isAllowed) return "-";
          return (
            <Upload
              beforeUpload={(file) => handleUpload(file, index)}
              showUploadList={false}
              disabled={documents[index].uploadDisabled || documents[index].deferralRequested}
              accept="application/pdf"
            >
              <Button
                icon={<UploadOutlined />}
                disabled={documents[index].uploadDisabled || documents[index].deferralRequested}
                size="small"
              >
                Upload PDF
              </Button>
            </Upload>
          );
        },
      },
      {
        title: "Request Deferral",
        key: "deferral",
        render: (_, record, index) => {
          const isAllowed = record.status === "Pending" || record.status === "Pending from RM";
          if (!isAllowed) return "-";
          return (
            <Button
              size="small"
              type={documents[index].deferralRequested ? "primary" : "default"}
              onClick={() => handleRequestDeferralClick(index)}
              disabled={documents[index].deferralRequested}
            >
              {documents[index].deferralRequested ? "Deferral Requested" : "Request Deferral"}
            </Button>
          );
        },
      }
    );
  }

  const handleSubmitDCL = () => {
    if (!finalComment.trim()) {
      message.error("Comment here!");
      return;
    }
    message.success("DCL submitted successfully with comments!");
    onBack();
  };

  // Render deferral form
  if (activeDeferralIndex !== null) {
    const doc = documents[activeDeferralIndex];
    return (
      <div className="mt-4 p-4 bg-gray-50 rounded shadow max-w-md">
        <h3 className="mb-2 font-semibold text-sm">Request Deferral</h3>
        <Form form={deferralForm} layout="vertical" onFinish={handleDeferralSubmit}>
          <Form.Item name="loanNo" label="Loan Number">
            <Input disabled />
          </Form.Item>
          <Form.Item name="dclNo" label="DCL Number">
            <Input disabled />
          </Form.Item>
          <Form.Item name="customer" label="Customer Name">
            <Input disabled />
          </Form.Item>
          <Form.Item name="document" label="Document to be Deferred">
            <Input disabled />
          </Form.Item>
          <Form.Item name="duration" label="Duration" rules={[{ required: true }]}>
            <Input placeholder="e.g., 1 Month" />
          </Form.Item>
          <Form.Item name="reason" label="Reason" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit Deferral Request
            </Button>
            <Button className="ml-2" onClick={() => setActiveDeferralIndex(null)}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

  // Render main DCL table
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded shadow">
      <div className="flex justify-between items-start mb-4 text-sm">
        <div className="space-y-1">
          <p><strong>Customer Name:</strong> {loan.customer}</p>
          <p><strong>Customer Number:</strong> {loan.customerNo || "N/A"}</p>
          <p><strong>Loan Number:</strong> {loan.loanNo}</p>
          <p><strong>DCL Number:</strong> {loan.dclNo || "N/A"}</p>
          <p><strong>Loan Type:</strong> {loan.type}</p>
          <p><strong>Loan Amount:</strong> ${loan.amount.toLocaleString()}</p>
        </div>
        <Button size="small" onClick={onBack}>Back</Button>
      </div>

      <h3 className="mb-2 font-semibold text-sm">Documents</h3>

      <Table
        columns={columns}
        dataSource={displayedDocuments}
        pagination={false}
        rowKey={(record) => record.name}
        size="small"
      />

      {isPending && (
        <>
          <Input.TextArea
            rows={3}
            placeholder="Comment here!"
            className="mt-4 text-sm"
            value={finalComment}
            onChange={(e) => setFinalComment(e.target.value)}
          />
          <Button type="primary" className="mt-2" size="small" onClick={handleSubmitDCL}>
            Submit DCL
          </Button>
        </>
      )}
    </div>
  );
}
