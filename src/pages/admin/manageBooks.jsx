import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Button, Col, Input, Pagination, Popconfirm, Row, Space, Table, Typography} from "antd";
import {useEffect, useState} from "react";
import Loading from "../../components/loading/index.jsx";
import DetailBookAdmin from "../../components/detailBook/index.jsx";
import {deleteBook, getAllBooks} from "../../services/book.jsx";
import BookModalCreate from "./modal.jsx";

const ManageBooks = () => {
    // modal view detail book
    const [openViewDetail, setOpenViewDetail] = useState(false);

    // modal create book
    const [openModalCreate, setOpenModalCreate] = useState(false);

    // paginate
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const [total, setTotal] = useState(1);

    // data
    const [data, setData] = useState([]);
    const [dataDetail, setDataDetail] = useState([]);

    // filter
    const [mainText, setMainText] = useState("");

    // crud
    const [idDelete, setIdDelete] = useState('');

    const [loading, setLoading] = useState(false);

    const showModalCreateBook = () => {
        setOpenModalCreate(true);
    };

    const onCloseModalCreate = () => {
        setOpenModalCreate(false);
    }

    // table
    const dataSource =  data.map(item => {
        return {
            key: item._id,
            _id: item._id,
            mainText: item.mainText,
            quantity: item.quantity,
            sold: item.sold,
            createdAt: item.createdAt,
            author: item.author,
            category: item.category,
            price: item.price,
            updatedAt: item.updatedAt,
        }
    });
    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
            render: (text, record) => {
                return (
                    <a onClick={() => handleViewDetail(record)}>
                        {record._id}
                    </a>
                )
            }
        },
        {
            title: 'Title', dataIndex: 'mainText', key: 'MainText',
            defaultSortOrder: 'descend',
            // sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Price', dataIndex: 'price', key: 'price',
        },
        {
            title: 'Quantity', dataIndex: 'quantity', key: 'quantity',
        },
        {
            title: 'Sold', dataIndex: 'sold', key: 'sold',
        },
        {
            title: 'Created At', dataIndex: 'createdAt', key: 'createdAt',
        },
        {
            title: 'Action', dataIndex: '', key: 'action', render: (_, record) => (
                <Space size="middle">
                    <a><EditOutlined/></a>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={confirmDeleteBook}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                        placement='topRight'
                    >
                        <DeleteOutlined style={{color: "red"}} onClick={() => setIdDelete(record._id)}/>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        setLoading(true);
        getAllBookAdmin()
        setLoading(false);
    }, [currentPage]);

    const handleViewDetail = (item) => {
        setDataDetail(item);
        setOpenViewDetail(true);
    }

    const onCloseViewDetail = () => {
        setOpenViewDetail(false);
    }

    const getAllBookAdmin = async () => {
        const query = `/api/v1/book?current=${currentPage}&pageSize=${pageSize}&sort=-createdAt&mainText=/${mainText}/i`;
        const res = await getAllBooks(query);
        if (res && res.data) {
            setCurrentPage(res.data.data.meta.current);
            setTotal(res.data.data.meta.total);
            setData(res.data.data.result);
        }
    }

    const confirmDeleteBook = async () => {
        await deleteBook(idDelete);
    }

    const handleChangeMainText = (e) => {
        setMainText(e.target.value);
    }

    const onChange = (currentPage) => {
        setCurrentPage(currentPage);
    };

    const handleSearch = async () => {
        if (!mainText) {
            return;
        }
        setLoading(true);
        await getAllBookAdmin();
        setCurrentPage(1);
        setLoading(false);
    }
    const [openAdd, setOpenAdd] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = () => {
        setOpenAdd(true);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpenAdd(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpenAdd(false);
    };
    return (
        <>
            <Col>
                <Row gutter={[8, 8]}>
                    <Col xs={24} md={4}>
                        <Input placeholder="Book name" onChange={handleChangeMainText}/>
                    </Col>
                    <Col xs={24} md={4}>
                        <Button
                            type="primary"
                            onClick={handleSearch}
                            disabled={!mainText ? true : false}
                        >
                            Search
                        </Button>
                    </Col>
                </Row>
                <Typography.Paragraph style={{marginTop: "30px"}}>
                    Table of all Book
                </Typography.Paragraph>
                <Row gutter={[8, 8]} justify={"end"}>
                    <Col>
                        <Button type="primary" onClick={showModalCreateBook}>Add</Button>
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
                {loading ?
                    <Loading/> : (
                        <>
                            <Table
                                columns={columns}
                                dataSource={dataSource}
                                pagination={false}
                            />
                            <Pagination
                                style={{textAlign: "end", marginTop: "20px"}}
                                defaultCurrent={currentPage}
                                pageSize={pageSize}
                                total={total}
                                onChange={onChange}
                            />
                        </>
                    )
                }
            </Col>
            <DetailBookAdmin
                open={openViewDetail}
                item={dataDetail}
                onClose={onCloseViewDetail}
            />
            <BookModalCreate
                openModalCreate={openModalCreate}
                onCloseModalCreate={onCloseModalCreate}
            />
        </>
    );
}
export default ManageBooks;