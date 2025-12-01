import React from "react";
import { Table, Tag, Typography } from "antd";

const Checklists = () => {
  const data = [
    {
      id: "DCL-001",
      customer: "ABC Manufacturers",
      rm: "Sarah Johnson",
      status: "Pending Review"
    },
    {
      id: "DCL-002",
      customer: "Prime Logistics",
      rm: "Michael Chen",
      status: "Submitted"
    },
  ];

  const columns = [
    { title: "Checklist ID", dataIndex: "id" },
    { title: "Customer", dataIndex: "customer" },
    { title: "RM", dataIndex: "rm" },
    {
      title: "Status",
      dataIndex: "status",
      render: (s) => <Tag color="blue">{s}</Tag>
    },
  ];

  return (
    <div>
      <Typography.Title level={3}>Document Checklists</Typography.Title>
      <Table dataSource={data} columns={columns} rowKey="id" style={{ marginTop: 20 }} />
    </div>
  );
};

export default Checklists;
