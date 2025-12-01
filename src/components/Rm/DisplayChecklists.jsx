import React from "react";
import { Table, Tag } from "antd";

const DisplayChecklists = ({ checklists }) => {
  // Build table data with category grouping
  const tableData = [];
  checklists.forEach((cl, clIdx) => {
    const categoriesMap = {};

    // Group documents by category
    cl.documents.forEach((doc) => {
      if (!categoriesMap[doc.category]) categoriesMap[doc.category] = [];
      categoriesMap[doc.category].push(doc);
    });

    Object.keys(categoriesMap).forEach((category, catIdx) => {
      // Category row
      tableData.push({
        key: `checklist-${clIdx}-cat-${catIdx}`,
        category,
        checklistTitle: cl.title,
        isCategory: true,
        clIdx,
      });

      // Document rows
      categoriesMap[category].forEach((doc, docIdx) => {
        tableData.push({
          key: `checklist-${clIdx}-cat-${catIdx}-doc-${docIdx}`,
          docName: doc.name,
          status: doc.status,
          comment: doc.comment,
          loanType: doc.loanType,
          isCategory: false,
        });
      });
    });
  });

  const columns = [
    {
      title: "Category / Checklist",
      dataIndex: "category",
      render: (text, record) =>
        record.isCategory ? (
          <strong style={{ color: "#1890ff" }}>
            {record.checklistTitle} - {text}
          </strong>
        ) : (
          ""
        ),
    },
    {
      title: "Document",
      dataIndex: "docName",
      render: (text, record) => (!record.isCategory ? text : ""),
    },
    {
      title: "Loan Type",
      dataIndex: "loanType",
      render: (text, record) => (!record.isCategory ? text : ""),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) =>
        !record.isCategory ? (
          <Tag
            color={
              text === "uploaded"
                ? "green"
                : text === "pending"
                ? "orange"
                : text === "deferred"
                ? "volcano"
                : "blue"
            }
          >
            {text}
          </Tag>
        ) : (
          ""
        ),
    },
    {
      title: "Comment",
      dataIndex: "comment",
      render: (text, record) => (!record.isCategory ? text : ""),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      pagination={false}
      rowClassName={(record) =>
        record.isCategory ? "category-row" : "document-row"
      }
      expandable={{
        expandedRowRender: (record) =>
          record.isCategory ? <i style={{ paddingLeft: 20 }}>Documents</i> : null,
        rowExpandable: (record) => record.isCategory,
      }}
    />
  );
};

export default DisplayChecklists;
