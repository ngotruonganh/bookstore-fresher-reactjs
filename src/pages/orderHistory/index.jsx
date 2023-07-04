import {getHistoryOrder} from "../../services/useServer.jsx";
import {useEffect, useState} from "react";
import {Col, Pagination, Row, Skeleton} from "antd";
import {convertVND} from "../../function/index.jsx";
import loading from "../../components/loading/index.jsx";

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
        const query = `/api/v1/order?current=${current}&pageSize=${pageSize}`;
        const res =  await getHistoryOrder(query);
        if(res && res.data){
            setOrder(res.data.data.result);
            setTotal(res.data.data.meta.total)
        }
    }
    const onChange = (page) => {
        setCurrent(page);
    };

    return (
        <>
            <Skeleton loading={loading}/>
            <Row align='middle' style={{marginTop: "10px", padding: '10px', backgroundColor: "white"}}>
                <Col xs={8} xl={4}>
                    Name
                </Col>
                <Col xs={8} xl={3}>
                    Phone
                </Col>
                <Col xs={8} xl={3}>
                    address
                </Col>
                <Col xs={24} xl={9} style={{justifyContent: "center"}}>
                    Detail
                </Col>
                <Col xs={24} xl={5} style={{justifyContent: "center"}}>
                    Total Price
                </Col>
            </Row>
            {order.map((item) => {
                return (
                    <Row key={item._id} align='middle' style={{marginTop: "10px", padding: '10px', backgroundColor: "white"}}>
                        <Col xs={8} xl={4}>
                            {item.name}
                        </Col>
                        <Col xs={8} xl={3}>
                            {item.phone}
                        </Col>
                        <Col xs={8} xl={3}>
                            {item.address}
                        </Col>
                        <Col xs={24} xl={9}>
                            <Row>
                                <Col key={item.detail._id} span={24}>
                                    {item.detail.quantity}
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24} xl={5} style={{justifyContent: "end", color: 'red', fontWeight: "bold"}}>
                            {convertVND(item.totalPrice)}
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
