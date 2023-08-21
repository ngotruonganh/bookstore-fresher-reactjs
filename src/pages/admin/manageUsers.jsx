import {Button, Col, Form, Input, message, Pagination, Row, Space, Table} from 'antd';
import {DeleteOutlined, EditOutlined, PlusCircleOutlined, ReloadOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import Loading from "../../components/loading/index.jsx";
import {deleteUser, getAllUser} from "../../services/user.jsx";
import ModalCreateUser from "./modalCreateUser.jsx";
import ModalUpdateUser from "./modalUpdateUser.jsx";

const ManageUser = () => {
    const [form] = Form.useForm();
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(1);
    const [data, setData] = useState([]);
    const pageSize = 5;
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [openModalCreateUser, setOpenModalCreateUser] = useState(false);
    const [updateItem, setUpdateItem] = useState({});
    const [openModalUpdateUser, setUpdateModalUpdateUser] = useState(false);

    const handleUpdateUser = (item) => {
        setUpdateItem(item);
        setUpdateModalUpdateUser(true);
    }

    const dataSource = data.map(item => {
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
                        <EditOutlined
                            style={{color: 'blue'}}
                            onClick={() => handleUpdateUser(record)}
                        />
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
        getUser()
    }, [currentPage, data]);

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

    const handleOpenModalCreateUser = () => {
        setOpenModalCreateUser(true);
    }
    const handleCloseModalCreateUser = () => {
        setOpenModalCreateUser(false);
    }
    const handleCloseModalUpdateUser = () => {
        setUpdateItem({});
        setUpdateModalUpdateUser(false);
    }
    const handleRefresh = () => {
        setFullName('');
        setEmail('');
        setPhone('');
        getUser();
    }
    return (
        <Row justify='space-between'>
            <Col>
                <Form
                    form={form}
                    layout='vertical'
                    onFinish={onFinish}
                    autoComplete="off"
                    initialValues={{
                        fullName: '',
                        email: '',
                        phone: ''
                    }}
                    style={{display: 'flex', alignItems: 'end'}}
                >
                    <Space>
                        <Form.Item
                        labelCol={{span: 24}}
                        name="fullName"
                        label="Full name"
                        >
                            <Input placeholder="Search by full name" />
                        </Form.Item>
                        <Form.Item
                            labelCol={{span: 24}}
                            name="email"
                            label="Email"
                        >
                            <Input placeholder="Search by email" />
                        </Form.Item>
                        <Form.Item
                            labelCol={{span: 24}}
                            name="phone"
                            label="Phone"
                        >
                            <Input placeholder="Search by phone" />
                        </Form.Item>
                        <Button type="primary" danger htmlType="submit">
                            Search
                        </Button>
                    </Space>
                </Form>
            </Col>
            <Col>
                <Space wrap>
                    <Button type="primary" danger onClick={handleOpenModalCreateUser}>
                        <PlusCircleOutlined />
                    </Button>
                    <Button type="primary" danger onClick={handleRefresh}>
                        <ReloadOutlined />
                    </Button>
                </Space>
            </Col>
            <ModalCreateUser
                openModalCreateUser={openModalCreateUser}
                onCloseModalCreateUser={handleCloseModalCreateUser}
            />
            <ModalUpdateUser
                openModalUpdateUser={openModalUpdateUser}
                onCloseModalUpdateUser={handleCloseModalUpdateUser}
                updateItem={updateItem}
            />
            <Col span={24}>
                {data && data.length > 0 ? (
                    <>
                        <Table
                            columns={columns}
                            dataSource={dataSource}
                            pagination={false}
                            style={{overflowX: "scroll"}}
                        />
                        <Pagination
                            style={{textAlign: "end", marginTop: "20px"}}
                            defaultCurrent={currentPage}
                            pageSize={pageSize}
                            total={total}
                            onChange={onChange}
                        />
                    </>
                ) : (
                    <Loading/>
                )}
            </Col>
        </Row>
    );
}
export default ManageUser;