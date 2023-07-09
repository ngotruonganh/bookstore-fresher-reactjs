import {useEffect, useState} from "react";
import {Col, Pagination, Row, Tag} from "antd";
import {convertVND} from "../../function/index.jsx";
import {getHistoryOrder} from "../../services/book.jsx";

const OrderHistory = () => {
    const [order, setOrder] = useState([]);
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        getOrder();
        setLoading(false);
    }, [current]);

    const getOrder = async () => {
        const query = `/api/v1/order?current=${current}&pageSize=${pageSize}&sort=-createdAt`;
        const res = await getHistoryOrder(query);
        if (res && res.data) {
            setOrder(res.data.data.result);
            setTotal(res.data.data.meta.total)
        }
    }
    const onChange = (page) => {
        setCurrent(page);
    };
    return (
        <>
            {order.map(item => {
                return (
                    <Row key={item._id} justify='space-between' align='middle'
                         style={{marginTop: "10px", padding: '10px', backgroundColor: "white"}}>
                        <Col>
                            Shop
                        </Col>
                        <Col>
                            <Tag color="success">
                                COMPLETED
                            </Tag>
                        </Col>
                        <Col span={24}>
                            <Row justify='space-between'>
                                <Col>
                                </Col>
                                <Col>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} style={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
                            <span> Order Total: </span>
                            &nbsp;
                            <span style={{justifyContent: "end", color: 'red', fontWeight: "bold", fontSize: '20px'}}>
                                {convertVND(item.totalPrice)}
                            </span>
                        </Col>
                    </Row>
                )
            })}
            <Row justify="center" style={{margin: "20px 0"}}>
                <Pagination current={current} pageSize={pageSize} total={total} onChange={onChange}/>
            </Row>
        </>
    );
};

export default OrderHistory;
