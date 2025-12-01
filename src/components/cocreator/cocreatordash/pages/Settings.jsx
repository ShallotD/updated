import React from "react";
import { Typography, Card } from "antd";

const Settings = () => {
  return (
    <div>
      <Typography.Title level={3}>Settings</Typography.Title>

      <Card style={{ marginTop: 20 }}>
        <p>Theme Settings, User Preferences, etc…</p>
      </Card>
    </div>
  );
};

export default Settings;
