// src/pages/CheckListPage.jsx
import React, { useState } from "react";
import { Tabs } from "antd";
import ActiveChecklists from "../../../components/cocreator/checklists/ActiveChecklists";
import DeferredChecklists from "../../../components/cocreator/checklists/DeferredChecklists";
import CompletedChecklists from "../../../components/cocreator/checklists/CompletedChecklists";

const CheckListPage = () => {
  const [activeTab, setActiveTab] = useState("active");

  return (
    <div className="p-6 sm:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          { key: "active", label: "Active Checklists", children: <ActiveChecklists /> },
          { key: "deferred", label: "Deferred", children: <DeferredChecklists /> },
          { key: "completed", label: "Completed", children: <CompletedChecklists /> },
        ]}
      />
    </div>
  );
};

export default CheckListPage;
