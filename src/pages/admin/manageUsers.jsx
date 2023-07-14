import {Button, Col, Form, Input, message, Pagination, Row, Space, Table, Typography} from 'antd';
import {useEffect, useState} from "react";
import Loading from "../../components/loading/index.jsx";
import {DeleteOutlined, EditOutlined, PlusCircleOutlined, ReloadOutlined} from "@ant-design/icons";
import {deleteUser, getAllUser} from "../../services/user.jsx";
import {deleteBook} from "../../services/book.jsx";

const content = (
    <div>
        <p>Content</p>
        <p>Content</p>
    </div>
);

const ManageUser = () => {
    const [form] = Form.useForm();
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(1);
    const [data, setData] = useState([]);
    const pageSize = 5;
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);


    const dataSource =  data.map(item => {
        return {
            key: item._id,
            _id: item._id,
            fullName: item.fullName,
            email: item.email,
            phone: item.phone,
            createdAt: item.createdAt,
        }
    });

    const columns = [
        {
            title: 'Id', dataIndex: '_id', key: '_id', render: (text) => <a>{text}</a>,
        },
        {
            title: 'Full name', dataIndex: 'fullName', key: 'fullName',
        },
        {
            title: 'Email', dataIndex: 'email', key: 'email',
        },
        {
            title: 'Phone', dataIndex: 'phone', key: 'phone',
        },
        {
            title: 'Created At', dataIndex: 'createdAt', key: 'createdAt',
        },
        {
            title: 'Action', key: 'action', render: (_, record) => (
                <Space size="middle">
                    <span>
                        <EditOutlined style={{color: 'blue'}}/>
                    </span>
                    <span>
                        <DeleteOutlined
                            style={{color: "red"}}
                            onClick={() => handleDeleteUser(record._id)}
                        />
                    </span>
                </Space>
            ),
        },
    ];

    const handleDeleteUser = async (id) => {
        await deleteUser(id);
        message.success('Delete success');
    }

    useEffect(() => {
        setLoading(true);
        getUser()
        setLoading(false);
    }, [currentPage]);

    const getUser = async () => {
        const query = `/api/v1/user?current=${currentPage}&pageSize=${pageSize}&sort=-createdAt&fullName=/${fullName}/i&email=/${email}/i&phone=/${phone}/i`;
        const res = await getAllUser(query);
        if (res && res.data) {
            setCurrentPage(res.data.data.meta.current);
            setTotal(res.data.data.meta.total);
            setData(res.data.data.result);
        }
    }

    const onChange = (currentPage) => {
        setCurrentPage(currentPage);
    };

    const onFinish = (values) => {
        setFullName(values.fullName);
        setEmail(values.email);
        setPhone(values.phone);
        getUser();
    };
    return (
        <>
            <Col>
                <Row gutter={[8, 8]} justify='space-between'>
                    <Col>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                name="fullName"
                                label="Full name"
                            >
                                <Input placeholder="input placeholder" />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="Email"
                            >
                                <Input placeholder="input placeholder" />
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                label="Phone"
                            >
                                <Input placeholder="input placeholder" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" danger htmlType="submit">
                                    Search
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col>
                        <Space wrap>
                            <Button type="primary" danger >
                                <PlusCircleOutlined />
                            </Button>
                            <Button type="primary" danger>
                                <ReloadOutlined />
                            </Button>
                        </Space>
                    </Col>
                </Row>
                {loading ? <Loading/> : (<>
                    <Table columns={columns} dataSource={dataSource} pagination={false}
                           style={{overflowX: "scroll"}}/>
                    <Pagination
                        style={{textAlign: "end", marginTop: "20px"}}
                        defaultCurrent={currentPage}
                        pageSize={pageSize}
                        total={total}
                        onChange={onChange}
                    />
                </>)}
            </Col>
        </>
    );
}
export default ManageUser;