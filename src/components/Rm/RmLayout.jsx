import React, { useState } from "react";
import { Menu } from "antd";
import { BellOutlined, UserOutlined, MenuOutlined } from "@ant-design/icons";

import { ClipboardList, Settings } from "lucide-react";
// import CoCreatorTable from "./CoCreatorTable";
import ChecklistsTablel from "./checkpage";
// import ChecklistsTable from "../cocreator/checklists/ChecklistsTable";
// import RMUploadd from "./rmTbb";
// import CreateChecklistPage from "./rmTbb";
import CreateChecklistPage from "../new/Rm/RmChecklistPage.jsx";
// import CreateChecklisttPage from "./Cochecklistpage.jsx";
// import CoChecklistPage from "./Cochecklistpage.jsx";
// import RMChecklistsPage from "./Rmchecklistpage.jsx";
// import RMChecklistTablee from "./RmChecklistt.jsx";
// import RMChecklistDashboard from "./RmChecklistmatrix.jsx";
import RMReviewPage from "./RMReviewPage.jsx";
// import SpecificRMReviewPage from "./SpecificRmReviewPage.jsx";
// import CustomerList from "./CustomerList.jsx";
// import DCL from "./dcl.jsx";
// import Reports from "./reports.jsx";
// import Deferrals from "./Deferrals.jsx";
import RMReviewerPage from "./RMReviewPage.jsx";
// import RmlistPage from "./rmtabble.jsx";

const Sidebar = ({
  selectedKey,
  setSelectedKey,
  collapsed,
  toggleCollapse,
}) => {
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
      {/* Logo / Brand */}
      <div
        style={{
          padding: collapsed ? "20px 0" : "25px 20px",
          fontSize: collapsed ? 28 : 24,
          fontWeight: "bold",
          letterSpacing: collapsed ? 2 : 1,
          textAlign: collapsed ? "center" : "left",
        }}
      >
        {collapsed ? "RM" : "RM Dashboard"}
      </div>

      {/* MENU */}
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
            key: "myqueue",
            label: "My Queue",
            icon: <ClipboardList size={20} />,
          },

         

          {
            key: "review",
            label: "Review Checklist",
            icon: <ClipboardList size={20} />,
          },

          {
            key: "active",
            label: "Active",
            icon: <ClipboardList size={20} />,
          },

          // {
          //   key: "checklistsAvailable",
          //   label: "checklists Available",
          //   icon: <ClipboardList size={20} />,
          // },

          // {
          //   key: "customerlist",
          //   label: "My queue",
          //   icon: <Settings size={20} />,
          // },
          // {
          //   key: "dcl",
          //   label: "dcl",
          //   icon: <Settings size={20} />,
          // },
          // {
          //   key: "report",
          //   label: "report",
          //   icon: <Settings size={20} />,
          // },
          // {
          //   key: "defferal",
          //   label: "defferal",
          //   icon: <Settings size={20} />,
          // },
          // {
          //   key: "customerlist",
          //   label: "My queue",
          //   icon: <Settings size={20} />,
          // },
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
          style={{ fontSize: 22, cursor: "pointer", color: "#2B1C67" }}
        />
        <UserOutlined
          style={{ fontSize: 22, cursor: "pointer", color: "#2B1C67" }}
        />
      </div>
    </div>
  );
};

const RmLayout = ({ userId }) => {
  const [selectedKey, setSelectedKey] = useState("checklists");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  const renderContent = () => {
    switch (selectedKey) {
      case "myqueue":
        return <CreateChecklistPage userId={userId}/>;
      // case "active":
      //   return <SpecificRMReviewPage />;

      case "review":
        return <RMReviewerPage />;

      case "active":
        return <RMReviewPage rmId={userId} />;

        //   case "customerlist":
        // return <CustomerList />;

        // case "dcl":
        // return <RmlistPage/>;
        // case "report":
        // return <Reports />;
        // case "defferal":
        // return <Deferrals />;

      default:
        return <h1 style={pageStyle}>Users</h1>;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "#f4f6ff",
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

/* Shared Page Style */
const pageStyle = {
  fontSize: 28,
  fontWeight: "bold",
  color: "#2B1C67",
};

export default RmLayout;
