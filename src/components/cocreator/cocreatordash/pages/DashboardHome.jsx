import React from "react";
import { Card, Row, Col, Typography } from "antd";

const DashboardHome = () => {
  return (
    <div>
      <Typography.Title level={3}>Dashboard Overview</Typography.Title>

      <Row gutter={24} style={{ marginTop: 20 }}>
        <Col span={6}>
          <Card bordered={false}>
            <h3>Active Checklists</h3>
            <p style={{ fontSize: 28, fontWeight: "bold" }}>12</p>
          </Card>
        </Col>

        <Col span={6}>
          <Card bordered={false}>
            <h3>Pending Review</h3>
            <p style={{ fontSize: 28, fontWeight: "bold" }}>4</p>
          </Card>
        </Col>

        <Col span={6}>
          <Card bordered={false}>
            <h3>Deferrals</h3>
            <p style={{ fontSize: 28, fontWeight: "bold" }}>2</p>
          </Card>
        </Col>

        <Col span={6}>
          <Card bordered={false}>
            <h3>Completed</h3>
            <p style={{ fontSize: 28, fontWeight: "bold" }}>19</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardHome;
