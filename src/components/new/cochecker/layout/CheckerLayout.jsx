import React, { useState } from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  TeamOutlined,
  SettingOutlined,
  BellOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import CombinedCharts from "../../../stats";
// import Creatchecklistpage from "../creatorpage";
// import CompletedChecklists from "../checklists/CompletedChecklists";
// import DeferredChecklists from "../checklists/DeferredChecklists";
// import ActiveChecklists from "../checklists/ActiveChecklists";
// import ChecklistModal from "../checklists/ChecklistModal";
// import ChecklistDrawerCO from "../checklists/ChecklistDrawerCO";
// import ChecklistActionDrawerRM from "../checklists/ChecklistActionDrawerRM";
// import ChecklistTableCO from "../checklists/ChecklistTableCO";
// import ChecklistTableRM from "../checklists/ChecklistTableRM";
// import COChecklistPage from "../checklists/COChecklistPage";
// import RMChecklistPage from "../checklists/RMChecklistPage";
// import DashboardCo from "../checklists/dashboard";
import BaseChecklistTableCo from "../cochecker";
// import RMUpload from "../../Rm/RmUpload";
// import ChecklistsTablel from "../../Rm/checkpage";
// import RMUploadd from "../../Rm/rmTbb";
import CoChecklistPage from "../CoChecklistPage";
import { useSelector } from "react-redux";

// Sidebar Component
const Sidebar = ({
  selectedKey,
  setSelectedKey,
  collapsed,
  toggleCollapse,
}) => {
  const handleClick = (e) => {
    setSelectedKey(e.key);
  };

  return (
    <div
      style={{
        width: collapsed ? 80 : 250,
        background: "#3A2A82",
        paddingTop: 20,
        transition: "width 0.2s",
        color: "white",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: 22,
          marginBottom: 35,
          fontWeight: "bold",
        }}
      >
        {collapsed ? "N" : "CO Checker Dashboard"}
      </h2>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={handleClick}
        style={{ background: "#3A2A82" }}
        inlineCollapsed={collapsed}
        items={[
          // { key: "reports", icon: <SettingOutlined />, label: "Reports" },
          {
            key: "creatchecklist",
            icon: <ClockCircleOutlined />,
            label: "Create checklist",
          },
          {
            key: "checklistss",
            icon: <ClockCircleOutlined />,
            label: "checklists",
          },
          { key: "reports", icon: <SettingOutlined />, label: "Reports" },
        ]}
      />

      <div
        style={{
          position: "absolute",
          bottom: 20,
          width: "100%",
          textAlign: "center",
        }}
      >
        <button
          onClick={toggleCollapse}
          style={{
            background: "#fff",
            color: "#3A2A82",
            border: "none",
            borderRadius: 4,
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          {collapsed ? "Expand" : "Collapse"}
        </button>
      </div>
    </div>
  );
};

// Navbar Component
const Navbar = ({ toggleSidebar }) => {
  return (
    <div
      style={{
        height: 60,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div onClick={toggleSidebar} style={{ cursor: "pointer" }}>
        <MenuOutlined style={{ fontSize: 24 }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <BellOutlined style={{ fontSize: 20, cursor: "pointer" }} />
        <UserOutlined style={{ fontSize: 20, cursor: "pointer" }} />
      </div>
    </div>
  );
};

// Checkout Layout Component
const CheckerLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderContent = () => {
    switch (selectedKey) {
      // case "dashboard":
      //   return <DashboardCo />;
      case "creatchecklist":
        return <CoChecklistPage userId={userId} />;
      // case "active":
      //   return < />;
      // case "c":
      //   return <DeferredChecklists />;
      // case "completed":
      //   return <CompletedChecklists />;
      case "create checklist":
        // return <ChecklistModal/>
        return <ChecklistDrawerCO />;
      case "checklistss":
        // return <ChecklistModal/>
        return <BaseChecklistTableCo userId={userId} />;
      case "rms":
        return <Hero />;
      // case "rm checklistdrawer":
      //   return <ChecklistActionDrawerRM />;
      // case "co checklist":
      //   return <COChecklistPage />;
      // case "rm checklist":
      //   return <RMChecklistPage />;
      case "reports":
        return <CombinedCharts />;
      default:
        return <h1>Dashboard Content</h1>;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <Sidebar
        selectedKey={selectedKey}
        setSelectedKey={setSelectedKey}
        collapsed={sidebarCollapsed}
        toggleCollapse={toggleSidebar}
      />

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar toggleSidebar={toggleSidebar} />
        <div
          style={{
            padding: 20,
            flex: 1,
            overflowY: "auto",
            background: "#f0f2f5",
          }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default CheckerLayout;
