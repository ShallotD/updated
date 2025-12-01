import React from "react";
import { Card, Typography } from "antd";

const Completed = () => {
  return (
    <div>
      <Typography.Title level={3}>Completed Checklists</Typography.Title>

      <Card style={{ marginTop: 20 }}>
        <h3>XYZ Holdings</h3>
        <p>Completed on: 2024-11-05</p>
      </Card>
    </div>
  );
};

export default Completed;
