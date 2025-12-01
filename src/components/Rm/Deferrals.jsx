import { Table, Input, Button, Form } from "antd";
import { useState, useEffect } from "react";

const Deferrals = ({ activeTab, prefill, onBack }) => {
  const [deferrals, setDeferrals] = useState([
    {
      loanNo: "LN001",
      customer: "John Doe",
      document: "ID Proof",
      duration: "1 Month",
      reason: "Incomplete info",
      status: "Pending",
      dclNo: "DCL1001",
    },
    {
      loanNo: "LN002",
      customer: "Mary Jane",
      document: "Business License",
      duration: "2 Weeks",
      reason: "Need updated license",
      status: "Approved",
      dclNo: "DCL1002",
    },
  ]);

  const [form] = Form.useForm();

  // Add new deferral
  const handleCreateDeferral = (values) => {
    const newDeferral = { ...values, status: "Pending" };
    setDeferrals([newDeferral, ...deferrals]);
    form.resetFields();
  };

  // Prefill form if "Create Deferral" tab is active
  useEffect(() => {
    if (activeTab === "Create Deferral" && prefill) {
      form.setFieldsValue(prefill);
    }
  }, [activeTab, prefill, form]);

  // Create Deferral Form
  if (activeTab === "Create Deferral") {
    return (
      <div>
        <Button size="small" onClick={onBack}>
          Back
        </Button>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateDeferral}
          className="max-w-md mt-2"
        >
          <Form.Item name="loanNo" label="Loan Number" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="dclNo" label="DCL Number" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="customer" label="Customer Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="document"
            label="Document to be Deferred"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="duration" label="Duration" rules={[{ required: true }]}>
            <Input placeholder="e.g., 1 Month" />
          </Form.Item>

          <Form.Item name="reason" label="Reason" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit Deferral Request
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

  // Pending Approval Table
  if (activeTab === "Pending Approval") {
    return (
      <Table
        columns={[
          { title: "Loan Number", dataIndex: "loanNo", key: "loanNo" },
          { title: "DCL Number", dataIndex: "dclNo", key: "dclNo" },
          { title: "Customer Name", dataIndex: "customer", key: "customer" },
          { title: "Document", dataIndex: "document", key: "document" },
          { title: "Duration", dataIndex: "duration", key: "duration" },
          { title: "Reason", dataIndex: "reason", key: "reason" },
          {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
              <span className={status === "Approved" ? "text-green-600" : "text-yellow-600"}>
                {status}
              </span>
            ),
          },
        ]}
        dataSource={deferrals.map((d) => ({ ...d, key: d.loanNo + d.document }))}
        size="small"
        pagination={{ pageSize: 10 }}
      />
    );
  }

  return null;
};

export default Deferrals;
