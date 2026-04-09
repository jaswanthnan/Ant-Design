import React, { useState, useEffect } from 'react';
import { ConfigProvider, Layout, Typography, Card, Table, Tag, Avatar, Space, Button, Form, Input, Select, message, Modal, Popconfirm } from 'antd';
import { UserOutlined, MailOutlined, PlusOutlined, EnvironmentOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Header, Content } = Layout;

export default function App() {
  const [candidates, setCandidates] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form] = Form.useForm();

  const fetchCandidates = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/candidates');
      if (!response.ok) throw new Error('Failed to fetch candidates');
      const data = await response.json();
      setCandidates(data);
    } catch (error) {
      console.error(error);
      message.error('Failed to load candidates from MongoDB. Ensure server is running.');
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleDeleteCandidate = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/candidates/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete');
      setCandidates(candidates.filter(c => c.key !== id));
      message.success('Candidate deleted successfully');
    } catch (error) {
      message.error('Failed to delete candidate');
    }
  };

  const handleAddCandidate = async (values) => {
    try {
      const candidateData = {
        name: values.name,
        email: values.email,
        role: values.role,
        status: values.status,
        location: values.location,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${values.name}`,
      };

      if (editingId) {
        const response = await fetch(`http://localhost:5000/api/candidates/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(candidateData),
        });
        if (!response.ok) throw new Error('Failed to update candidate');
        const updatedCandidate = await response.json();
        setCandidates(candidates.map(c => c.key === editingId ? updatedCandidate : c));
        message.success('Candidate updated successfully!');
      } else {
        const response = await fetch('http://localhost:5000/api/candidates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(candidateData),
        });
        if (!response.ok) throw new Error('Failed to add candidate');
        const newCandidate = await response.json();
        setCandidates([newCandidate, ...candidates]);
        message.success('Candidate saved to MongoDB!');
      }

      form.resetFields();
      setIsModalVisible(false);
      setEditingId(null);
    } catch (error) {
      console.error(error);
      message.error(`Failed to ${editingId ? 'update' : 'add'} candidate. Please try again.`);
    }
  };

  const columns = [
    {
      title: 'Candidate',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space size="middle">
          <Avatar src={record.avatar} icon={<UserOutlined />} size="large" className="bg-purple-200" />
          <div className="flex flex-col">
            <Text strong className="text-gray-800 text-sm tracking-tight">{text}</Text>
            <Text type="secondary" className="text-xs">{record.email}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => <Text className="font-medium text-gray-600 text-sm">{role}</Text>,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (loc) => (
        <Space className="text-gray-500 text-sm">
          <EnvironmentOutlined />
          <span>{loc}</span>
        </Space>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        let color = status === 'Offered' ? 'success' : status === 'Rejected' ? 'error' : 'processing';
        return (
          <Tag color={color} className="rounded-full px-3 py-1 font-semibold shadow-sm border-0 tracking-wide text-xs">
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => {
              setEditingId(record.key);
              form.setFieldsValue(record);
              setIsModalVisible(true);
            }} 
            className="text-blue-500 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md font-medium px-3 text-sm"
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete the candidate"
            description="Are you sure you want to delete this candidate?"
            onConfirm={() => handleDeleteCandidate(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />} 
              className="bg-red-50 hover:bg-red-100 rounded-md font-medium px-3 text-sm"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const filteredCandidates = candidates.filter(candidate => {
    const query = searchText.toLowerCase();
    return (
      candidate.name.toLowerCase().includes(query) ||
      candidate.role.toLowerCase().includes(query) ||
      candidate.location.toLowerCase().includes(query) ||
      candidate.status.toLowerCase().includes(query)
    );
  });

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#8b5cf6', // Matches Tailwind violet-500
          borderRadius: 8,
          colorBgContainer: '#ffffff',
          fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
          colorTextBase: '#1f2937', 
        },
        components: {
          Table: {
            headerBg: '#f3f4f6', // Matches Tailwind gray-100
            headerColor: '#4b5563', // Matches Tailwind gray-600
            rowHoverBg: '#f5f3ff', // Matches Tailwind violet-50
          },
          Card: {
            paddingLG: 24,
          }
        }
      }}
    >
      <Layout className="min-h-screen bg-gray-50 font-sans">
        <Header className="bg-white border-b border-gray-200 px-8 flex items-center shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600 shadow-md shadow-violet-200 flex items-center justify-center">
              <UserOutlined className="text-white text-xl" />
            </div>
            <Title level={3} className="!m-0 text-gray-800 tracking-tight">Candidate Management</Title>
          </div>
        </Header>

        <Content className="p-4 md:p-8 max-w-7xl mx-auto w-full">
          <Modal
            title={<span className="text-xl font-bold flex items-center text-gray-800"><PlusOutlined className="mr-2 text-violet-600" />{editingId ? 'Edit Candidate' : 'Add New Candidate'}</span>}
            open={isModalVisible}
            onCancel={() => { setIsModalVisible(false); form.resetFields(); setEditingId(null); }}
            footer={null}
            destroyOnClose
            centered
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleAddCandidate}
              requiredMark="optional"
              className="mt-6"
            >
              <Form.Item
                name="name"
                label={<span className="font-medium text-gray-700">Full Name</span>}
                rules={[
                  { required: true, message: 'Please enter candidate name' },
                  { min: 3, message: 'Name must be at least 3 characters' }
                ]}
              >
                <Input placeholder="John Doe" prefix={<UserOutlined className="text-gray-400 mr-1" />} size="large" className="rounded-lg bg-gray-50/50 hover:bg-white focus:bg-white" />
              </Form.Item>

              <Form.Item
                name="email"
                label={<span className="font-medium text-gray-700">Email Address</span>}
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input placeholder="john@example.com" prefix={<MailOutlined className="text-gray-400 mr-1" />} size="large" className="rounded-lg bg-gray-50/50 hover:bg-white focus:bg-white" />
              </Form.Item>

              <Form.Item
                name="role"
                label={<span className="font-medium text-gray-700">Position / Role</span>}
                rules={[{ required: true, message: 'Please select a role' }]}
              >
                <Select placeholder="Select position" size="large" className="rounded-lg">
                  <Select.Option value="Frontend Engineer">Frontend Engineer</Select.Option>
                  <Select.Option value="Backend Developer">Backend Developer</Select.Option>
                  <Select.Option value="Fullstack Developer">Fullstack Developer</Select.Option>
                  <Select.Option value="UI/UX Designer">UI/UX Designer</Select.Option>
                  <Select.Option value="Product Manager">Product Manager</Select.Option>
                </Select>
              </Form.Item>

              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  name="location"
                  label={<span className="font-medium text-gray-700">Location</span>}
                  rules={[{ required: true, message: 'Required' }]}
                >
                  <Input placeholder="City, Country" size="large" className="rounded-lg bg-gray-50/50 hover:bg-white focus:bg-white" />
                </Form.Item>
                
                <Form.Item
                  name="status"
                  label={<span className="font-medium text-gray-700">Status</span>}
                  rules={[{ required: true, message: 'Required' }]}
                >
                  <Select placeholder="Status" size="large" className="rounded-lg">
                    <Select.Option value="Applied">Applied</Select.Option>
                    <Select.Option value="Interviewing">Interviewing</Select.Option>
                    <Select.Option value="Offered">Offered</Select.Option>
                    <Select.Option value="Rejected">Rejected</Select.Option>
                  </Select>
                </Form.Item>
              </div>

              <Form.Item className="mb-0 mt-6">
                <Button type="primary" htmlType="submit" block size="large" className="font-bold tracking-wide shadow-lg shadow-violet-200 h-12 rounded-lg">
                  {editingId ? 'Save Changes' : 'Submit Candidate'}
                </Button>
              </Form.Item>
            </Form>
          </Modal>

          <Card 
            className="shadow-xl shadow-gray-200/50 border-0" 
            styles={{ body: { padding: 0 } }}
          >
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white rounded-t-xl flex-wrap gap-4">
              <div className="flex items-center space-x-3">
                <span className="text-xl font-bold text-gray-900 tracking-tight">Candidate Pipeline</span>
                <Tag className="rounded-full px-4 py-1 m-0 font-bold bg-violet-100 text-violet-700 border-0 shadow-sm">
                  {filteredCandidates.length} Total
                </Tag>
              </div>
              <div className="flex items-center space-x-4">
                <Input
                  placeholder="Search candidates..."
                  prefix={<SearchOutlined className="text-gray-400" />}
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                  className="max-w-xs rounded-lg hover:bg-gray-50 focus:bg-white"
                  size="large"
                  allowClear
                />
                <Button 
                  type="primary" 
                  size="large" 
                  icon={<PlusOutlined />} 
                  className="font-bold rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  onClick={() => setIsModalVisible(true)}
                >
                  Add Candidate
                </Button>
              </div>
            </div>
            <Table 
              columns={columns} 
              dataSource={filteredCandidates} 
              pagination={{ pageSize: 6, className: 'mr-6 mb-4' }}
              className="w-full text-base"
              rowClassName="hover:bg-violet-50 transition-colors"
            />
          </Card>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
