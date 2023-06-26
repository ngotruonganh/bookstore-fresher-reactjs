import {Button, Col, Input, Pagination, Row, Space, Table, Typography} from 'antd';
import {useEffect, useState} from "react";
import {getAllUser} from "../../services/useServer.jsx";
import MenuAdmin from "../../components/menu/index.jsx";
import Loading from "../../components/loading/index.jsx";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

const content = (
    <div>
        <p>Content</p>
        <p>Content</p>
    </div>
);


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
    title: 'Action', key: 'action', render: (_, record) => (
        <Space size="middle">
            <a><EditOutlined/></a>
            <a>
                <DeleteOutlined style={{color: "red"}}/>
            </a>
        </Space>),
    },
];

const Admin = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(1);
    const [data, setData] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        getUser()
        setLoading(false);
    }, [currentPage]);

    const getUser = async () => {
        const query = `/api/v1/user?current=${currentPage}&pageSize=${pageSize}&fullName=/${fullName}/i&email=/${email}/i&phone=/${phone}/i`;
        const res = await getAllUser(query);
        if (res && res.data) {
            setCurrentPage(res.data.data.meta.current);
            setTotal(res.data.data.meta.total);
            setData(res.data.data.result);
        }
    }
    const handleChangeFullName = (e) => {
        setFullName(e.target.value)
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePhone = (e) => {
        setPhone(e.target.value);
    }

    const onChange = (currentPage) => {
        setCurrentPage(currentPage);
    };

    const handleSearch = async () => {
        if (!fullName && !email && !phone) {
            return;
        }
        setLoading(true);
        await getUser();
        setLoading(false);
    }

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col>
                    <MenuAdmin/>
                </Col>
                <Col flex="auto">
                    <Row gutter={[8, 8]}>
                        <Col xs={24} md={4}>
                            <Input placeholder="Full name" onChange={handleChangeFullName}/>
                        </Col>
                        <Col xs={24} md={4}>
                            <Input placeholder="Email" onChange={handleChangeEmail}/>
                        </Col>
                        <Col xs={24} md={4}>
                            <Input placeholder="Phone" onChange={handleChangePhone}/>
                        </Col>
                        <Col xs={24} md={4}>
                            <Button type="primary" onClick={handleSearch}
                                    disabled={(fullName === "" && email === "" && phone === "") ? true : false}>
                                Search
                            </Button>
                        </Col>
                    </Row>
                    <Typography.Paragraph style={{marginTop: "30px"}}>
                        Table of all users
                    </Typography.Paragraph>
                    <Row gutter={[8, 8]} justify={"end"}>
                        <Col>
                            <Button type="primary">Add</Button>
                        </Col>
                        <Col>
                            <Button type="primary">Import</Button>
                        </Col>
                        <Col>
                            <Button type="primary">Export</Button>
                        </Col>
                        <Col>
                            <Button type="primary">f5</Button>
                        </Col>
                    </Row>
                    {loading ? <Loading/> : (<>
                            <Table columns={columns} dataSource={data} pagination={false}
                                   style={{overflowX: "scroll"}}/>
                            <Pagination style={{textAlign: "end", marginTop: "20px"}}
                                        defaultCurrent={1} pageSize={pageSize} total={total} onChange={onChange}
                            />
                        </>)}
                </Col>
            </Row>
        </>
    );
}
export default Admin;