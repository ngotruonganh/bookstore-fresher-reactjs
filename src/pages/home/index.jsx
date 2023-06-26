import {Checkbox, Col, Row, Typography} from "antd";
import {useEffect, useState} from "react";
import {getAllBooks, getCategories} from "../../services/useServer.js";
import ProductItem from "../../components/productItem/index.jsx";
import PaginationComponent from "../../components/pagination/index.jsx";

const Home = () => {
    const [listBook, setListBook] = useState([]);
    const [listCategories, setListCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getBooks();
        getAllCategories();
    }, [currentPage]);

    const getBooks = async () => {
        const query = `/api/v1/book?current=${currentPage}&pageSize=8`;
        const res = await getAllBooks(query);
        if (res && res.data) {
            setListBook(res.data.data.result);
            setTotal(res.data.data.meta.total);
        }
        console.log("book", res);
        console.log(listBook);
    }

    const getAllCategories = async () => {
        const res = await getCategories();
        if (res && res.data) {
            const list = res.data.data.map((item) => {
                return {value: item , label: item}
            })
            setListCategories(list);
        }
        console.log("cetegi", res);
        console.log(listCategories);
    }

    const onChange = (page) => {
        setCurrentPage(page);
    };
    const onChangeCheckbox = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };


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
                    </Row>
                </Col>
                <Col span={18}>
                    <Row gutter={[8, 8]}>

                {listBook.map((item) => {
                    return (
                        <Col key={item.id}>
                            <ProductItem product={item}/>
                        </Col>
                    )
                })}
                        <Col span={24} style={{textAlign: "center"}}>

                    <PaginationComponent defaultCurrent={currentPage} pageSize={8} total={total} onChange={onChange}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default Home;
