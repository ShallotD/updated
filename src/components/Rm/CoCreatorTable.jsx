import React from "react";
import { Table, Tag, Button, Space } from "antd";
import { useGetChecklistsQuery } from "../../api/checklistApi";

const ChecklistsTable = ({ userId, role }) => {
  // Fetch checklists for this user
  const { data: checklists = [], isLoading, isError } = useGetChecklistsQuery(userId);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Loan Type",
      dataIndex: "loanType",
      key: "loanType",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "blue";
        if (status === "co_creator_review") color = "orange";
        else if (status === "rm_review") color = "purple";
        else if (status === "approved") color = "green";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          {role === "rm" && record.status === "co_creator_review" && (
            <Button type="primary">Review</Button>
          )}
          {role === "co_creator" && record.status === "co_creator_review" && (
            <Button type="default" disabled>
              Pending
            </Button>
          )}
        </Space>
      ),
    },
  ];

  if (isLoading) return <p>Loading checklists...</p>;
  if (isError) return <p>Error loading checklists.</p>;

  return (
    <Table
      dataSource={checklists.map((c) => ({ ...c, key: c._id }))}
      columns={columns}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default ChecklistsTable;
