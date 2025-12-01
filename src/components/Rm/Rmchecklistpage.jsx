import React, { useState } from "react";
import { Table, Tag, Button, Modal, Select, Input, Space, Divider } from "antd";
import { useGetChecklistsQuery, useUpdateChecklistMutation } from "../../api/checklistApi";

const { Option } = Select;

const RMChecklistModal = ({ checklist, open, onClose }) => {
  const [docs, setDocs] = useState(checklist.documents.map(doc => ({ ...doc })));
  const [updateChecklist] = useUpdateChecklistMutation();

  const handleStatusChange = (idx, value) => {
    const updated = [...docs];
    updated[idx].status = value;
    setDocs(updated);
  };

  const handleCommentChange = (idx, value) => {
    const updated = [...docs];
    updated[idx].comment = value;
    setDocs(updated);
  };

  const handleSave = async () => {
    try {
      await updateChecklist({
        checklistId: checklist._id,
        documents: docs,
        status: "rm_review",
      }).unwrap();
      alert("Checklist updated!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update checklist.");
    }
  };

  return (
    <Modal
      title={`Checklist Review: ${checklist.title}`}
      open={open}
      onCancel={onClose}
      width={900}
      footer={null}
      bodyStyle={{ padding: 16 }}
    >
      <Space direction="vertical" size={12} style={{ width: "100%" }}>
        {docs.map((doc, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 8,
              border: "1px solid #f0f0f0",
              borderRadius: 4,
            }}
          >
            <div style={{ flex: 2, fontSize: 12 }}>
              <strong>{doc.name}</strong>
              <Input.TextArea
                rows={1}
                value={doc.comment}
                onChange={e => handleCommentChange(idx, e.target.value)}
                placeholder="Comment"
                style={{ fontSize: 12, marginTop: 4 }}
              />
            </div>
            <div style={{ flex: 1, fontSize: 12 }}>
              <Select
                value={doc.status}
                onChange={val => handleStatusChange(idx, val)}
                style={{ width: "100%", fontSize: 12 }}
                size="small"
              >
                <Option value="pending">Pending</Option>
                <Option value="uploaded">Uploaded</Option>
                <Option value="approved">Approved</Option>
                <Option value="deferred">Deferred</Option>
              </Select>
            </div>
          </div>
        ))}

        <Button type="primary" size="small" onClick={handleSave}>
          Save Updates
        </Button>
      </Space>
    </Modal>
  );
};

const RMChecklistsPage = ({ rmId }) => {
  const { data: checklists = [], refetch } = useGetChecklistsQuery();
  const [selectedChecklist, setSelectedChecklist] = useState(null);

  // Filter checklists assigned to this RM
  const myChecklists = checklists.filter(c => c.assignedToRM === rmId);

  const columns = [
    { title: "Title", dataIndex: "title", key: "title", width: 200, render: text => <span style={{ fontSize: 12 }}>{text}</span> },
    { title: "Loan Type", dataIndex: "loanType", key: "loanType", width: 150, render: text => <span style={{ fontSize: 12 }}>{text}</span> },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: status => {
        const color =
          status === "co_creator_review" ? "orange" :
          status === "rm_review" ? "blue" :
          status === "completed" ? "green" :
          "gray";
        return <Tag color={color} style={{ fontSize: 12 }}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "# Documents",
      dataIndex: "documents",
      key: "documents",
      width: 120,
      render: docs => <span style={{ fontSize: 12 }}>{docs.length}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button size="small" type="link" onClick={() => setSelectedChecklist(record)}>
          Review
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 16 }}>
      <Divider style={{ fontSize: 14 }}>Checklists Assigned to Me</Divider>

      <Table
        columns={columns}
        dataSource={myChecklists}
        rowKey={record => record._id}
        pagination={{ pageSize: 5 }}
        size="small"
        bordered
      />

      {selectedChecklist && (
        <RMChecklistModal
          checklist={selectedChecklist}
          open={!!selectedChecklist}
          onClose={() => { setSelectedChecklist(null); refetch(); }}
        />
      )}
    </div>
  );
};

export default RMChecklistsPage;
