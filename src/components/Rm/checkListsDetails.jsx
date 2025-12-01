
// import React from "react";
// import { Card, Tag, Divider } from "antd";
// import { useGetChecklistByDclNoQuery } from "../../api/checklistApi";

// const ChecklistDetails = ({ dclNo }) => {
//   const { data: checklist, isLoading, isError } = useGetChecklistByDclNoQuery(dclNo);

//   if (isLoading) return <p>Loading...</p>;
//   if (isError || !checklist) return <p>Error loading checklist</p>;

//   const statusColor = {
//     pending: "orange",
//     uploaded: "blue",
//     approved: "green",
//     deferred: "red",
//     "co_creator_review": "purple",
//     "rm_review": "gold",
//   };

//   return (
//     <Card style={{ marginTop: 20 }} title={`Checklist Details — DCL: ${dclNo}`}>
      
//       {/* BASIC INFO */}
//       <h3>General Information</h3>
//       <p><strong>Title:</strong> {checklist.title}</p>
//       <p><strong>Created By:</strong> {checklist.createdBy?.name || checklist.createdBy}</p>
//       <p><strong>Assigned RM:</strong> {checklist.assignedToRM?.name || checklist.assignedToRM}</p>
//       <p><strong>Co-Creator:</strong> {checklist.assignedToCoCreator?.name || checklist.assignedToCoCreator}</p>

//       <p>
//         <strong>Status:</strong>{" "}
//         <Tag color={statusColor[checklist.status] || "default"}>
//           {checklist.status}
//         </Tag>
//       </p>

//       <Divider />

//       {/* DOCUMENT LIST */}
//       <h3>Documents ({checklist.documents.length})</h3>

//       {checklist.documents.map((doc, idx) => (
//         <Card
//           key={idx}
//           size="small"
//           style={{ marginBottom: 15 }}
//           title={`Document ${idx + 1}: ${doc.name}`}
//         >
//           <p>
//             <strong>Status: </strong>
//             <Tag color={statusColor[doc.status] || "default"}>{doc.status}</Tag>
//           </p>

//           {doc.fileUrl && (
//             <p>
//               <strong>File: </strong>
//               <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
//                 Open Document
//               </a>
//             </p>
//           )}

//           {doc.status === "deferred" && (
//             <p style={{ color: "red" }}>
//               <strong>Deferral Reason:</strong> {doc.deferralReason}
//             </p>
//           )}
//         </Card>
//       ))}
//     </Card>
//   );
// };

// export default ChecklistDetails;

import React from "react";
import { Card, Tag, Divider, Row, Col, Descriptions, Typography, Space } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { useGetChecklistByDclNoQuery } from "../../api/checklistApi";

const { Title, Text } = Typography;

const ChecklistDetails = ({ dclNo }) => {
  const { data: checklist, isLoading, isError } = useGetChecklistByDclNoQuery(dclNo);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !checklist) return <p>Error loading checklist</p>;

  const statusColor = {
    pending: "orange",
    uploaded: "blue",
    approved: "green",
    deferred: "red",
    co_creator_review: "purple",
    rm_review: "gold",
  };

  return (
    <Card
      style={{
        marginTop: 20,
        borderRadius: 10,
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        padding: 10,
      }}
      bodyStyle={{ padding: 24 }}
      title={
        <Space direction="vertical" size={0}>
          <Title level={4} style={{ marginBottom: 0 }}>
            DCL #{dclNo}
          </Title>
          <Text type="secondary" style={{ fontSize: 13 }}>
            Document Checklist Summary
          </Text>
        </Space>
      }
    >
      {/* BASIC INFO */}
      <Descriptions
        bordered
        size="middle"
        column={2}
        labelStyle={{ fontWeight: 600, width: 180 }}
      >
        <Descriptions.Item label="Title">
          {checklist.title}
        </Descriptions.Item>

        <Descriptions.Item label="Status">
          <Tag
            color={statusColor[checklist.status] || "default"}
            style={{ padding: "4px 10px", fontSize: 13 }}
          >
            {checklist.status.toUpperCase()}
          </Tag>
        </Descriptions.Item>

        <Descriptions.Item label="Created By">
          {checklist.createdBy?.name || checklist.createdBy}
        </Descriptions.Item>

        <Descriptions.Item label="Assigned RM">
          {checklist.assignedToRM?.name || checklist.assignedToRM}
        </Descriptions.Item>

        <Descriptions.Item label="Assigned Co-Checker">
          {checklist.assignedToCoCchecker?.name }
        </Descriptions.Item>
      </Descriptions>

      <Divider style={{ marginTop: 40 }}>Document Information</Divider>

      <Row gutter={[16, 16]}>
        {checklist.documents.map((doc, idx) => (
          <Col xs={24} md={12} lg={8} key={idx}>
            <Card
              size="small"
              style={{
                borderRadius: 8,
                height: "100%",
                border: "1px solid #f0f0f0",
              }}
              title={
                <Space>
                  <FileTextOutlined />
                  {doc.name}
                </Space>
              }
            >
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text strong>Status:</Text>
                <Tag
                  color={statusColor[doc.status] || "default"}
                  style={{ padding: "4px 12px" }}
                >
                  {doc.status.toUpperCase()}
                </Tag>

                {doc.fileUrl ? (
                  <>
                    <Text strong>File:</Text>
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontWeight: 500 }}
                    >
                      Open Document
                    </a>
                  </>
                ) : (
                  <Text type="secondary" italic>
                    No file uploaded
                  </Text>
                )}

                {doc.status === "deferred" && (
                  <>
                    <Text strong style={{ color: "#d4380d" }}>
                      Deferral Reason:
                    </Text>
                    <Text type="danger">{doc.deferralReason}</Text>
                  </>
                )}
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default ChecklistDetails;
