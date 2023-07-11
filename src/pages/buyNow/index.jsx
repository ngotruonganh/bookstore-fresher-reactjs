import {Button, Col, Form, Input, InputNumber, message, Row, Typography} from "antd";
import {convertVND} from "../../function/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {emptyCart} from "../../redux/order/orderSlice.jsx";
import {useNavigate} from "react-router-dom";
import TextArea from "antd/es/input/TextArea.js";
import {checkout} from "../../services/book.jsx";

const BuyNow = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const buyNowItem = useSelector(state => state.order.cartBuyNow);
    const account = useSelector(state => state.account.user);

    useEffect(() => {
        let sum = 0;
        buyNowItem.map(item => {
            sum += item.quantity * item.detail.price;
        })
        setTotalPrice(sum);
    }, []);


    const onCheckout = async (values) => {
        const detailOrder = buyNowItem.map(item => {
            return {
                bookName: item.detail.mainText,
                quantity: item.quantity,
                _id: item._id
            }
        })
        const data = {
            name: values.name,
            address: values.address,
            phone: values.phone,
            totalPrice: totalPrice,
            detail: detailOrder
        }
        const res = await checkout(data);
        if (res && res.data) {
            message.success('success');
            dispatch(emptyCart());
            navigate('/order/order-history');
        }
    };
    const onCheckoutFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    return (
        <>
            <Row align='middle' style={{marginTop: "10px", padding: '15px', backgroundColor: "white"}}>
                <Col xs={12} xl={10} style={{textAlign: "start"}}>
                    Product
                </Col>
                <Col xs={12} xl={3} style={{textAlign: "end"}}>
                    Unit Price
                </Col>
                <Col xs={12} xl={7} style={{textAlign: "center"}}>
                    Quantity
                </Col>
                <Col xs={12} xl={4} style={{textAlign: "end"}}>
                    Total Price
                </Col>
            </Row>
            {buyNowItem && buyNowItem.length > 0 && buyNowItem.map((item) => {
                return (
                    <Row key={item._id} align='middle'
                         style={{marginTop: "10px", padding: '10px', backgroundColor: "white"}}>
                        <Col xs={12} xl={10} style={{textAlign: "start"}}>
                            <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item?.detail?.thumbnail}`}
                                 style={{width: '100px'}} alt={item.detail.mainText}/>
                            <div>{item.detail.mainText}</div>
                        </Col>
                        <Col xs={12} xl={3} style={{textAlign: "end"}}>
                            {convertVND(item.detail.price)}
                        </Col>
                        <Col xs={12} xl={7} style={{textAlign: "center"}}>
                            {item.quantity}
                        </Col>
                        <Col xs={12} xl={4} style={{color: 'red', textAlign: "end", fontWeight: "bold"}}>
                            {convertVND(item.quantity * item.detail.price)}
                        </Col>
                    </Row>
                )
            })}
            <Row justify={"end"}>
                <Col xs={24} xl={6}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 24,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                        initialValues={{
                            name: account.fullName,
                            phone: account.phone,
                        }}
                        onFinish={onCheckout}
                        onFinishFailed={onCheckoutFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Full name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your address!',
                                },
                            ]}
                        >
                            <TextArea/>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 0,
                                span: 24,
                            }}
                        >
                            <Typography.Title level={2}
                                              style={{color: "red"}}>{convertVND(totalPrice)}</Typography.Title>
                            <Button htmlType="submit" type='primary' danger style={{width: "100%"}}>
                                Checkout
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default BuyNow;
