import {DeleteOutlined, EditOutlined, PlusCircleOutlined, ReloadOutlined} from "@ant-design/icons";
import {Button, Col, Input, Pagination, Popconfirm, Row, Space, Table} from "antd";
import {useEffect, useState} from "react";
import {deleteBook, getAllBooks} from "../../services/book.jsx";
import Loading from "../../components/loading/index.jsx";
import DetailBookAdmin from "../../components/detailBook/index.jsx";
import BookModalCreate from "./modal.jsx";

const {Search} = Input;

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
    const [mainText, setMainText] = useState('');

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
                        <DeleteOutlined
                            style={{color: "red"}}
                            onClick={() => setIdDelete(record._id)}
                        />
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

    const handleReload = () => {
        setLoading(true);
        setMainText('');
        setCurrentPage(1);
        getAllBookAdmin();
        setLoading(false);
    }

    const confirmDeleteBook = async () => {
        await deleteBook(idDelete);
    }

    const onChange = (currentPage) => {
        setCurrentPage(currentPage);
    };

    const handleSearch = async (value) => {
        setLoading(true);
        setMainText(value);
        await getAllBookAdmin();
        setCurrentPage(1);
        setLoading(false);
    }
    return (
        <>
            <Col>
                <Row gutter={[8, 8]}
                     justify='space-between'
                     style={{marginTop: '15px', marginBottom: '15px'}}
                >
                    <Col>
                        <Search
                            placeholder="Input search text"
                            onSearch={handleSearch}
                            style={{
                                width: 200,
                            }}
                        />
                    </Col>
                    <Col>
                        <Space wrap>
                            <Button type="primary" danger onClick={showModalCreateBook}>
                                <PlusCircleOutlined />
                            </Button>
                            <Button type="primary" danger onClick={handleReload}>
                                <ReloadOutlined />
                            </Button>
                        </Space>
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
                                defaultCurrent={currentPage}
                                pageSize={pageSize}
                                total={total}
                                onChange={onChange}
                                style={{textAlign: "end", marginTop: "20px"}}
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