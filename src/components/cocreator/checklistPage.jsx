import React, { useState } from "react";
import { Table, Tag, Button, Typography, Modal, Spin, List } from "antd";
import {
  useGetChecklistsQuery,
  useCountChecklistsQuery,
  useGetChecklistByIdQuery,
} from "../../api/checklistApi";

const { Title, Text } = Typography;

const CheckListPage = () => {
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // FETCH PAGINATED CHECKLISTS
  const { data, isLoading } = useGetChecklistsQuery({
    page,
    limit: 6,
  });

  // COUNT TOTALS
  const { data: countData } = useCountChecklistsQuery();
  const total = countData?.total || 0;

  const checklists = data?.data || [];

  // FETCH SELECTED CHECKLIST DETAILS
  const { data: checklist, isLoading: detailsLoading } =
    useGetChecklistByIdQuery(selectedId, {
      skip: !selectedId,
    });

  const openModal = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedId(null);
    setModalOpen(false);
  };

  /** TABLE COLUMNS */
  const columns = [
    {
      title: "RM name",
      key: "applicant",
      render: (_, row) => (
        <div className="font-semibold text-gray-800 dark:text-gray-200">
          {row.applicantName}

          <div className="text-xs text-gray-600 dark:text-gray-400">
            RM: {row.rmId?.firstName} {row.rmId?.lastName}
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400">
            ID: {row.applicantId || "N/A"}
          </div>
        </div>
      ),
    },

    {
      title: "Loan Type",
      dataIndex: "loanType",
      key: "loanType",
      render: (type) => (
        <Tag color="blue" className="px-3 py-1 text-sm capitalize">
          {type}
        </Tag>
      ),
    },
    {
      title: "Documents Summary",
      key: "documents",
      render: (_, row) => {
        const documents = row.categories?.[0]?.documents || [];
        const submitted = documents.filter(
          (d) => d.status === "Submitted"
        ).length;
        const pending = documents.filter((d) => d.status === "Pending").length;
        const notActioned = documents.filter((d) => !d.status).length;

        return (
          <div className="space-y-1 text-sm">
            <div>Total: {documents.length}</div>
            <div className="text-green-600 dark:text-green-400">
              Submitted: {submitted}
            </div>
            <div className="text-yellow-600 dark:text-yellow-400">
              Pending: {pending}
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              Not Actioned: {notActioned}
            </div>
          </div>
        );
      },
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (d) => new Date(d).toLocaleString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_, row) => (
        <Button type="primary" onClick={() => openModal(row._id)}>
          View Details
        </Button>
      ),
    },
  ];

  // LOADING CHECKLISTS
  if (isLoading) return <p>Loading checklists...</p>;

  return (
    <div className="p-6 sm:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Title level={2} className="mb-6 text-gray-800 dark:text-gray-100">
        Loan Checklists
      </Title>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <Table
          columns={columns}
          loading={isLoading}
          dataSource={checklists}
          rowKey="_id"
          pagination={{
            current: page,
            total: total,
            pageSize: 10,
            onChange: (p) => setPage(p),
            showSizeChanger: false,
          }}
        />
      </div>

      {/* CHECKLIST DETAILS MODAL */}
      <Modal
        title="Checklist Details"
        open={modalOpen}
        onCancel={closeModal}
        footer={null}
        width={700}
      >
        {detailsLoading ? (
          <Spin size="large" />
        ) : checklist ? (
          <div>
            <Title level={5}>{checklist.loanType} — Checklist</Title>
            <Text type="secondary">Applicant: {checklist.rmId}</Text>

            <div className="mt-4">
              {checklist.categories?.map((category) => (
                <div
                  key={category.title}
                  className="mb-4 p-3 border rounded bg-gray-50"
                >
                  <Title level={5}>{category.title}</Title>

                  <List
                    dataSource={category.documents}
                    renderItem={(doc) => (
                      <List.Item>
                        <strong>{doc.name}</strong> —{" "}
                        <Text
                          type={
                            doc.status === "Submitted"
                              ? "success"
                              : doc.status === "Pending"
                              ? "warning"
                              : "secondary"
                          }
                        >
                          {doc.status || "Not Actioned"}
                        </Text>
                      </List.Item>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Text>No checklist details found.</Text>
        )}
      </Modal>
    </div>
  );
};

export default CheckListPage;
