import {useSelector} from "react-redux";
import {Button, Col, Divider, Row, Typography} from "antd";

const Order = () => {
    const orderList = useSelector(state => state.order.cart);
    return (
        <>
            <Row align='middle' style={{marginTop: "10px", padding: '15px', backgroundColor: "white"}}>
                <Col span={10}>
                    <div>Product</div>
                </Col>
                <Col span={3}>
                    Unit Price
                </Col>
                <Col span={5} style={{justifyContent: "center"}}>
                    Quantity
                </Col>
                <Col span={4}>
                    Total Price
                </Col>
                <Col span={2} style={{justifyContent: 'center'}}>
                    Actions
                </Col>
            </Row>
            {orderList?.length === 0 && (
                <Row justify='center'>
                    <div>No</div>
                </Row>
            )}
            {orderList && orderList.length > 0 && orderList.map((item) => {
                return (
                    <Row key={item._id} align='middle' style={{marginTop: "10px", padding: '10px', backgroundColor: "white"}}>
                        <Col span={10}>
                            <div>{item.detail.mainText}</div>
                        </Col>
                        <Col span={3}>
                            ₫{item.detail.price}
                        </Col>
                        <Col span={5} style={{justifyContent: "center"}}>
                            <Button>-</Button>
                            {item.quantity}
                            <Button>+</Button>
                        </Col>
                        <Col span={4} style={{color: 'red'}}>
                            ₫{item.detail.price * item.quantity}
                        </Col>
                        <Col span={2} style={{justifyContent: 'center'}}>
                            <Typography.Paragraph>Delete</Typography.Paragraph>
                        </Col>
                        <Divider />
                    </Row>
                )
            })}
            <div style={{display:"flex", justifyContent: "end", alignItems: "center", margin: "10px"}}>
                <span style={{marginRight: "5px"}}>Total ({orderList?.length} item): </span>
                <span style={{marginRight: "10px", color: 'red'}}>₫39000</span>
                <Button type='primary' danger>Check Out</Button>
            </div>
        </>
    )
};

export default Order;
