import {useEffect, useState} from "react";
import {Col, Pagination, Row, Tag, Typography} from "antd";
import {convertVND} from "../../function/index.jsx";
import {getHistoryOrder} from "../../services/book.jsx";
import Loading from "../../components/loading/index.jsx";

const OrderHistory = () => {
    const [order, setOrder] = useState([]);
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getOrder();
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
            {order && order.length > 0 ? (
                <>
                {order.map(item => {
                return (
                    <Row
                        key={item._id}
                        justify='end'
                        align='top'
                        style={{marginTop: "10px", padding: '10px', backgroundColor: "white"}}
                    >
                        <Col span={24} style={{textAlign: 'end'}}>
                            <Tag color='error'>
                                {item.type}
                            </Tag>
                            <Tag color="success">
                                COMPLETED
                            </Tag>
                        </Col>
                        <Col span={16}>
                            {item.detail.map(detail => {
                                return (
                                    <Row key={detail._id} justify='space-between' align='middle'>
                                        <Col span={22}>
                                            <Typography.Paragraph>
                                                {detail.bookName}
                                            </Typography.Paragraph>
                                        </Col>
                                        <Col span={2}>
                                            <Typography.Paragraph>
                                                x{detail.quantity}
                                            </Typography.Paragraph>
                                        </Col>
                                    </Row>
                                )
                            })}
                        </Col>
                        <Col span={8}>
                            <Typography.Paragraph>
                                {item.name}
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                {item.phone}
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                {item.address}
                            </Typography.Paragraph>
                        </Col>
                        <Col span={24} style={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
                            <span> Order Total: </span>
                            &nbsp;
                            <span
                                style={{justifyContent: "end", color: 'red', fontWeight: "bold", fontSize: '20px'}}
                            >
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

                ) : (
                    <Loading />
                )}

        </>
    );
};

export default OrderHistory;
