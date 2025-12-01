import React, { useEffect, useState } from "react";
import { Table, Button, Input, Tag, Upload, Modal, Space, Statistic, Row, Col } from "antd";
import { UploadOutlined, EyeOutlined } from "@ant-design/icons";
import { useGetChecklistsQuery, useUpdateChecklistMutation } from "../../api/checklistApi";

const RMChecklistDashboard = ({ userId }) => {
  const { data: checklists = [], isLoading, refetch } = useGetChecklistsQuery(userId);
  const [updateChecklist] = useUpdateChecklistMutation();
  const [tableData, setTableData] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);

  // Flatten checklists into table rows
  useEffect(() => {
    const flattened = checklists.flatMap((chkl) =>
      chkl.documents.map((doc, idx) => ({
        key: `${chkl._id}-${idx}`,
        checklistId: chkl._id,
        title: chkl.title,
        loanType: chkl.loanType,
        docName: doc.name,
        status: doc.status,
        comment: doc.comment,
        fileUrl: doc.fileUrl || "",
        activityLog: doc.activityLog || [],
      }))
    );
    setTableData(flattened);
  }, [checklists]);

  // Update status or comment
  const handleUpdate = async (row, field, value) => {
    const updatedRow = { ...row, [field]: value };
    const updatedData = tableData.map((r) => (r.key === row.key ? updatedRow : r));
    setTableData(updatedData);

    const checklist = checklists.find((c) => c._id === row.checklistId);
    if (!checklist) return;

    const updatedDocs = checklist.documents.map((d) =>
      d.name === row.docName ? { ...d, [field]: value } : d
    );

    try {
      await updateChecklist({ id: checklist._id, documents: updatedDocs }).unwrap();
      refetch();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleFileUpload = async (row, file) => {
    // For demonstration: just store file name, implement your backend upload here
    await handleUpdate(row, "fileUrl", file.name);
  };

  const columns = [
    { title: "Checklist", dataIndex: "title", key: "title", width: 200 },
    { title: "Loan Type", dataIndex: "loanType", key: "loanType", width: 150 },
    { title: "Document", dataIndex: "docName", key: "docName", width: 200 },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (text) => {
        let color = "gray";
        if (text === "approved") color = "green";
        else if (text === "uploaded") color = "blue";
        else if (text === "deferred") color = "orange";
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      width: 200,
      render: (text, record) => (
        <Input
          value={text}
          size="small"
          onChange={(e) => handleUpdate(record, "comment", e.target.value)}
        />
      ),
    },
    {
      title: "File",
      key: "file",
      width: 200,
      render: (_, record) => (
        <Space>
          <Upload
            showUploadList={false}
            beforeUpload={(file) => {
              handleFileUpload(record, file);
              return false; // prevent auto upload
            }}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
          {record.fileUrl && (
            <Button
              icon={<EyeOutlined />}
              onClick={() => setPreviewFile(record.fileUrl)}
            >
              Preview
            </Button>
          )}
        </Space>
      ),
    },
    {
      title: "Activity",
      key: "activity",
      render: (_, record) => (
        <Button
          onClick={() => Modal.info({
            title: "Activity Log",
            content: (
              <ul>
                {record.activityLog?.map((log, i) => (
                  <li key={i}>
                    {log.action} by {log.user} on {new Date(log.timestamp).toLocaleString()}
                  </li>
                ))}
              </ul>
            ),
          })}
        >
          View Logs
        </Button>
      ),
    },
  ];

  // Compute summary metrics
  const metrics = {
    total: checklists.length,
    pending: checklists.filter((c) => c.status === "pending").length,
    inProgress: checklists.filter((c) => c.status === "in_progress").length,
    submitted: checklists.filter((c) => c.status === "submitted").length,
    completed: checklists.filter((c) => c.status === "completed").length,
  };

  return (
    <div style={{ padding: 16 }}>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col><Statistic title="Total DCLs" value={metrics.total} /></Col>
        <Col><Statistic title="Pending" value={metrics.pending} /></Col>
        <Col><Statistic title="In Progress" value={metrics.inProgress} /></Col>
        <Col><Statistic title="Submitted" value={metrics.submitted} /></Col>
        <Col><Statistic title="Completed" value={metrics.completed} /></Col>
      </Row>

      <Table
        loading={isLoading}
        columns={columns}
        dataSource={tableData}
        pagination={{ pageSize: 10 }}
        bordered
        size="small"
      />

      <Modal
        open={!!previewFile}
        onCancel={() => setPreviewFile(null)}
        footer={null}
        width={800}
      >
        {previewFile && (
          <iframe
            src={previewFile}
            title="File Preview"
            style={{ width: "100%", height: "500px", border: "none" }}
          />
        )}
      </Modal>
    </div>
  );
};

export default RMChecklistDashboard;
