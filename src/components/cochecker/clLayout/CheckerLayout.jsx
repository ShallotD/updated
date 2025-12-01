import React, { useState } from "react";
import { Menu } from "antd";
import {
  CheckCircle,
  Clock,
  FileBarChart,
  Settings,
} from "lucide-react";
import {
  BellOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";

// Existing components (functionality unchanged)
// import CompletedChecklists from "../../cocreator/checklists/CompletedChecklists";
import CombinedCharts from "../../stats";
// import DeferredChecklists from "../../cocreator/checklists/DeferredChecklists";
// import ActiveChecklists from "../../cocreator/checklists/ActiveChecklists";
import Hero from "../../../pages/Hero";
import BaseChecklistTable from "./Checkertable";

/* ---------------------------------------------------------------------- */
/*  Enhanced SIDEBAR — NCBA-grade, sleek, modern corporate UI            */
/* ---------------------------------------------------------------------- */
const Sidebar = ({ selectedKey, setSelectedKey, collapsed, toggleCollapse }) => {
  const handleClick = (e) => setSelectedKey(e.key);

  return (
    <div
      style={{
        width: collapsed ? 80 : 260,
        background: "#2B1C67",
        color: "white",
        transition: "0.25s ease",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        boxShadow: "2px 0 10px rgba(0,0,0,0.15)",
      }}
    >
      {/* Brand */}
      <div
        style={{
          padding: collapsed ? "20px 0" : "25px 20px",
          fontSize: collapsed ? 28 : 24,
          fontWeight: "bold",
          letterSpacing: collapsed ? 2 : 1,
          textAlign: collapsed ? "center" : "left",
        }}
      >
        {collapsed ? "NC" : "NCBA Checker Portal"}
      </div>

      {/* Menu */}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={handleClick}
        style={{
          background: "transparent",
          borderRight: "none",
          fontSize: 15,
        }}
        inlineCollapsed={collapsed}
        items={[
          {
            key: "completed",
            icon: <CheckCircle size={20} />,
            label: "Completed Checklists",
          },
          {
            key: "deferred",
            icon: <Clock size={20} />,
            label: "Deferred Checklists",
          },
          {
            key: "reports",
            icon: <FileBarChart size={20} />,
            label: "Reports & Analytics",
          },
          {
            key: "checklists",
            icon: <Settings size={20} />,
            label: "Checklists",
          },
           {
            key: "action",
            icon: <Settings size={20} />,
            label: "All Checklists",
          },
        ]}
      />

      {/* Collapse Button */}
      <div
        style={{
          marginTop: "auto",
          padding: 20,
          textAlign: "center",
        }}
      >
        <button
          onClick={toggleCollapse}
          style={{
            width: "100%",
            padding: "8px 0",
            borderRadius: 6,
            border: "none",
            background: "#fff",
            color: "#2B1C67",
            fontWeight: 600,
            cursor: "pointer",
            transition: "0.2s",
          }}
        >
          {collapsed ? "Expand" : "Collapse"}
        </button>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------- */
/*  Enhanced NAVBAR — clean, polished, corporate-grade                   */
/* ---------------------------------------------------------------------- */
const Navbar = ({ toggleSidebar }) => {
  return (
    <div
      style={{
        height: 65,
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 25px",
        boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <MenuOutlined
        onClick={toggleSidebar}
        style={{
          fontSize: 24,
          cursor: "pointer",
          color: "#2B1C67",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 25 }}>
        <BellOutlined
          style={{
            fontSize: 22,
            cursor: "pointer",
            color: "#2B1C67",
          }}
        />
        <UserOutlined
          style={{
            fontSize: 22,
            cursor: "pointer",
            color: "#2B1C67",
          }}
        />
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------- */
/*  Main Layout — cleaner, more enterprise, improved spacing & look      */
/* ---------------------------------------------------------------------- */
const CheckerLayout = () => {
  const [selectedKey, setSelectedKey] = useState("completed");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  const renderContent = () => {
    switch (selectedKey) {
      case "completed":
        return <CompletedChecklists />;
      case "reports":
        return <CombinedCharts />;
      case "deferred":
        return <DeferredChecklists />;
      case "checklists":
        return <Hero />;
        case "action":
        return <BaseChecklistTable />;
      default:
        return <ActiveChecklists />;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "#f4f5f9",
      }}
    >
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
            padding: "25px",
            flex: 1,
            overflowY: "auto",
            background: "#f4f6ff",
          }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default CheckerLayout;
