import {Button, Checkbox, Col, Dropdown, Row, Space, Typography} from "antd";
import {useEffect, useState} from "react";
import {getAllBooks, getCategories} from "../../services/useServer.jsx";
import ProductItem from "../../components/productItem/index.jsx";
import PaginationComponent from "../../components/pagination/index.jsx";
import {DownOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const [listBook, setListBook] = useState([]);
    const [listCategories, setListCategories] = useState([]);
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(0);
    const [sort, setSort] = useState('sort=-sold');
    const [filerCategories, setFilterCategories] = useState('');

    useEffect(() => {
        getBooks();
        getAllCategories();
    }, [current, sort, filerCategories]);

    const getBooks = async () => {
        const query = `/api/v1/book?current=${current}&pageSize=5&${sort}&category=${filerCategories}`;
        const res = await getAllBooks(query);
        if (res && res.data) {
            setListBook(res.data.data.result);
            setTotal(res.data.data.meta.total);
        }
    }

    const getAllCategories = async () => {
        const res = await getCategories();
        if (res && res.data) {
            const list = res.data.data.map((item) => {
                return {value: item, label: item}
            })
            setListCategories(list);
        }
    }

    const onChange = (page) => {
        setCurrent(page);
    };
    const onChangeCheckbox = (checkedValues) => {
        const convert = checkedValues.join();
        setFilterCategories(convert);
    };

    const handleClear = () => {
        setFilterCategories('');
    }

    const ChangeSort = () => {
        setSort("sort=-sold");
        setCurrent(1);
    }
    const ChangeSortLatest = () => {
        setSort("sort=sold");
        setCurrent(1);
    }
    const items = [
        {
            key: 'sort=price',
            label: (
                <span style={sort === 'sort=price' ? {color: "red"} : {}}>
                    Price: Low to High
                </span>
            ),
        },
        {
            key: 'sort=-price',
            label: (
                <span style={sort === 'sort=-price' ? {color: "red"} : {}}>
                    Price: High to Low
                </span>
            ),
        }
    ]
    const menu = (e) => {
        setSort(e.key);
        setCurrent(1);
    }

    const navigate = useNavigate();

    const handleViewDetail = (id) => {
        navigate(`/book/${id}`);
    }
    return (
        <>
            <Row gutter={[16, 16]}>
                <Col span={6}>
                    <Typography.Paragraph>
                        All Categories
                    </Typography.Paragraph>
                    <Row>
                        <Checkbox.Group
                            style={{
                                width: '100%',
                            }}
                            onChange={onChangeCheckbox}
                        >
                            {listCategories.map((item) => {
                                return (
                                    <Col span={8}>
                                        <Checkbox value={item.value}>{item.label}</Checkbox>
                                    </Col>
                                )
                            })}

                        </Checkbox.Group>
                        <Button onClick={handleClear}>Clear All</Button>
                    </Row>
                </Col>
                <Col span={18}>
                    <Row gutter={[8, 8]}>
                        <Col span={24}>
                            Sort by
                            {sort === "sort=-sold" ?
                                <Button type="primary" onClick={ChangeSort}>Popular</Button> :
                                <Button onClick={ChangeSort}>Popular</Button>

                            }
                            {sort === "sort=sold" ?
                                <Button type="primary" onClick={ChangeSortLatest}>Latest</Button> :
                                <Button onClick={ChangeSortLatest}>Latest</Button>
                            }
                            <Dropdown
                                menu={{
                                    items,
                                    onClick: menu
                                }}
                            >
                                <Space>
                                    <Typography.Paragraph style={sort === "sort=price" || sort === "sort=-price" ? {color: "red"} : {}}>
                                        Price
                                    <DownOutlined/>
                                    </Typography.Paragraph>
                                </Space>
                            </Dropdown>
                            <Col span={24} style={{textAlign: "end"}}>
                                <PaginationComponent current={current} pageSize={5} total={total}
                                                     onChange={onChange}/>
                            </Col>
                        </Col>
                        {listBook.map((item) => {
                            return (
                                <Col key={item._id} onClick={() => handleViewDetail(item._id)}>
                                    <ProductItem product={item}/>
                                </Col>
                            )
                        })}
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default Home;
