
// export default ChecklistsTablel;
import { Table, Tag, Button, Modal, List } from "antd";
import { useState } from "react";
import { useGetChecklistsQuery } from "../../api/checklistApi";

const ChecklistsTablel = () => {
  const { data, isLoading, isError } = useGetChecklistsQuery();
  const [selectedChecklist, setSelectedChecklist] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (checklist) => {
    setSelectedChecklist(checklist);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedChecklist(null);
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Assigned RM",
      dataIndex: "assignedToRM",
      key: "assignedToRM",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color="blue">{status}</Tag>,
    },
    {
      title: "Documents",
      dataIndex: "documents",
      key: "documents",
      render: (docs) => <span>{docs.length}</span>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleView(record)}>
          View
        </Button>
      ),
    },
  ];

  if (isError) return <p style={{ color: "red" }}>Failed to load checklists.</p>;

  return (
    <>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={data || []}
        rowKey="_id"
        bordered
      />

      {/* Modal for viewing checklist details */}
      <Modal
        title={selectedChecklist?.title || "Checklist Details"}
        visible={isModalOpen}
        onCancel={handleClose}
        footer={[
          <Button key="close" onClick={handleClose}>
            Close
          </Button>,
        ]}
        width={600}
      >
        {selectedChecklist && (
          <div>
            <p><strong>Created By:</strong> {selectedChecklist.createdBy}</p>
            <p><strong>Assigned RM:</strong> {selectedChecklist.assignedToRM}</p>
            <p><strong>Status:</strong> {selectedChecklist.status}</p>
            <p><strong>Documents:</strong></p>
            <List
              size="small"
              bordered
              dataSource={selectedChecklist.documents}
              renderItem={(doc, index) => (
                <List.Item key={index}>
                  <strong>{doc.name}</strong> - {doc.status}{" "}
                  {doc.status === "deferred" && `(Reason: ${doc.deferralReason})`}
                </List.Item>
              )}
            />
          </div>
        )}
      </Modal>
    </>
  );
};

export default ChecklistsTablel;
