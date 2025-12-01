// export default ChecklistsTableRMM;
import { useState, useMemo } from "react";
import {
  Table,
  Tag,
  Button,
  Input,
  Select,
  Space,
  Tooltip,
  Progress,
  Dropdown,
} from "antd";
import { MoreOutlined } from "@ant-design/icons";

const { Search } = Input;

const ChecklistsTableRMM = ({ checklists, onOpenDrawer }) => {
  const [page, setPage] = useState(1);
  const [rmFilter, setRmFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [searchText, setSearchText] = useState("");

  // -------------------------------
  // SEARCH + FILTER
  // -------------------------------
  const filteredData = useMemo(() => {
    return checklists
      .filter((item) =>
        searchText
          ? item.applicantName.toLowerCase().includes(searchText.toLowerCase())
          : true
      )
      .filter((item) => (rmFilter ? item.rmId?._id === rmFilter : true))
      .filter((item) => {
        if (!statusFilter) return true;
        const docs = item?.categories?.[0]?.documents || [];
        return docs.some((d) => d.status === statusFilter);
      });
  }, [checklists, rmFilter, statusFilter, searchText]);

  const rmOptions = Array.from(
    new Map(
      checklists
        .filter((i) => i.rmId)
        .map((i) => [
          i.rmId._id,
          {
            label: `${i.rmId.firstName} ${i.rmId.lastName}`,
            value: i.rmId._id,
          },
        ])
    ).values()
  );

  const columns = [
    {
      title: "Applicant",
      render: (_, row) => (
        <div style={{ fontWeight: 600 }}>
          {row.applicantName}
          <div style={{ fontSize: 12, color: "#8c8c8c" }}>
            RM:{" "}
            {row.rmId
              ? `${row.rmId.firstName} ${row.rmId.lastName}`
              : "Unknown RM"}
          </div>
        </div>
      ),
    },

    {
      title: "Loan Type",
      dataIndex: "loanType",
      render: (type) => (
        <Tag color="purple" style={{ fontWeight: 600 }}>
          {type}
        </Tag>
      ),
    },

    {
      title: "Progress",
      render: (_, row) => {
        const docs = row.categories?.[0]?.documents || [];
        const submitted = docs.filter((d) => d.status === "Submitted").length;
        const percent = docs.length
          ? Math.round((submitted / docs.length) * 100)
          : 0;

        return <Progress percent={percent} size="small" strokeColor="#1890ff" />;
      },
    },

    {
      title: "Deferred Docs",
      render: (_, row) => {
        const docs = row.categories?.[0]?.documents || [];
        const deferred = docs.filter((d) => d.status === "Deferred").length;

        return (
          <Tag color="orange" style={{ fontWeight: 600 }}>
            {deferred}
          </Tag>
        );
      },
    },

    {
      title: "Created",
      dataIndex: "createdAt",
      render: (d) => new Date(d).toLocaleString(),
    },

    {
      title: "Actions",
      render: (_, row) => (
        <Dropdown
          trigger={["click"]}
          menu={{
            items: [
              {
                key: "view",
                label: "View Checklist",
                onClick: () => onOpenDrawer(row),
              },
            ],
          }}
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <Space className="mb-4" wrap>
        <Search
          placeholder="Search applicant..."
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />

        <Select
          placeholder="Filter by RM"
          style={{ width: 180 }}
          allowClear
          onChange={setRmFilter}
          options={rmOptions}
        />

        <Select
          placeholder="Filter by Status"
          allowClear
          style={{ width: 180 }}
          onChange={setStatusFilter}
          options={[
            { label: "Submitted", value: "Submitted" },
            { label: "Pending", value: "Pending" },
            { label: "Not Actioned", value: "Not Actioned" },
          ]}
        />
      </Space>

      <Table
        columns={columns}
        rowKey="_id"
        dataSource={filteredData}
        pagination={{
          current: page,
          pageSize: 6,
          onChange: setPage,
        }}
        bordered
      />
    </>
  );
};

export default ChecklistsTableRMM;
