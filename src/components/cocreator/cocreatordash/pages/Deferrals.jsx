import React from "react";
import { Card, Typography } from "antd";

const Deferrals = () => {
  return (
    <div>
      <Typography.Title level={3}>Deferrals</Typography.Title>

      <Card style={{ marginTop: 20 }}>
        <h3>Audited Financial Statements 2024</h3>
        <p>Client: ABC Corporation</p>
        <p>RM: Sarah Johnson</p>
        <p><b>Reason:</b> Awaiting auditor confirmation</p>
      </Card>
    </div>
  );
};

export default Deferrals;
