import {Pagination, Space, Table, Tag} from 'antd';
import {useEffect, useState} from "react";
import {getAllUser} from "../../services/useServer.js";
const columns = [
    {
        title: 'Id',
        dataIndex: '_id',
        key: '_id',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Full name',
        dataIndex: 'fullName',
        key: 'fullName',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const Admin = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(1);
    const [data, setData] = useState([]);
    useEffect(() => {
        getUser();
    }, [currentPage]);

    const getUser = async () => {
        const res = await getAllUser(currentPage, 3);
        console.log("data: ", res);
        if(res && res.data) {
            setCurrentPage(res.data.data.meta.current);
            setTotal(res.data.data.meta.total);
            setData(res.data.data.result);
        }
    }

    const onChange = (currentPage) => {
        setCurrentPage(currentPage);
    };

    return (
        <>
            <Table columns={columns} dataSource={data} />
            <Pagination defaultCurrent={1} pageSize={3} total={total} onChange={onChange}/>
        </>
    );
}
export default Admin;