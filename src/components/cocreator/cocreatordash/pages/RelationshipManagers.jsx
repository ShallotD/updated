import React from "react";
import { Table, Typography } from "antd";

const RelationshipManagers = () => {
  const data = [
    { name: "Sarah Johnson", clients: 24 },
    { name: "Michael Chen", clients: 18 },
  ];

  const columns = [
    { title: "Relationship Manager", dataIndex: "name" },
    { title: "Clients Assigned", dataIndex: "clients" },
  ];

  return (
    <div>
      <Typography.Title level={3}>Relationship Managers</Typography.Title>
      <Table dataSource={data} columns={columns} rowKey="name" style={{ marginTop: 20 }} />
    </div>
  );
};

export default RelationshipManagers;
