import {Button, Col, Divider, Form, Input, message, Row, Skeleton, Typography} from "antd";
import {convertVND} from "../../function/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {checkout} from "../../services/useServer.jsx";
import {useEffect, useState} from "react";
import {emptyCart} from "../../redux/order/orderSlice.jsx";
import {useNavigate} from "react-router-dom";
import TextArea from "antd/es/input/TextArea.js";
import loading from "../../components/loading/index.jsx";

const Checkout = () => {
    const orderList = useSelector(state => state.order.cart);
    const account = useSelector(state => state.account.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [sum, setSum] = useState(0);

    const onCheckout = async (values) => {
        let temp = 0;
        orderList.map(item => {
            temp += item.quantity * item.detail.price;
        })
        setSum(temp);
        const detailOrder = orderList.map(item => {
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
            totalPrice: sum,
            detail: detailOrder
        }
        const res = await checkout(data);
        if(res && res.data){
            message.success('success');
            dispatch(emptyCart());
            navigate('/');
        }
    };
    const onCheckoutFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if(orderList && orderList.length > 0) {
            let sum = 0;
            orderList.map(item => {
                sum += item.quantity * item.detail.price;
            })
            setTotalPrice(sum);
        }
        else {
            setTotalPrice(convertVND(0));
        }
    }, [orderList]);
    return (
        <>
            <Row align='middle' style={{marginTop: "10px", padding: '15px', backgroundColor: "white"}}>
                <Col xs={12} xl={10} style={{textAlign: "start"}}>
                    <div>Product</div>
                </Col>
                <Col xs={12} xl={3} style={{textAlign: "end"}}>
                    Unit Price
                </Col>
                <Col xs={12}  xl={7} style={{textAlign: "center"}}>
                    Quantity
                </Col>
                <Col xs={12} xl={4} style={{textAlign: "end"}}>
                    Total Price
                </Col>
            </Row>
            {orderList && orderList.length > 0 && orderList.map((item) => {
                return (
                    <Row key={item._id} align='middle' style={{marginTop: "10px", padding: '10px', backgroundColor: "white"}}>
                        <Col xs={12} xl={10} style={{textAlign: "start"}}>
                            <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item?.detail?.thumbnail}`} style={{width: '100px'}} alt={item.detail.mainText}/>
                            <div>{item.detail.mainText}</div>
                        </Col>
                        <Col xs={12} xl={3} style={{textAlign: "end"}}>
                            {convertVND(item.detail.price)}
                        </Col>
                        <Col xs={12}  xl={7} style={{textAlign: "center"}}>
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
                            name: 'user',
                            phone: '123456',
                            address: 'Ho Chi Minh'
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
                           <Input />
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
                                    message: 'Please input your phone!',
                                },
                            ]}
                        >
                            <TextArea />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 0,
                                span: 24,
                            }}
                        >
                            <Typography.Title level={2} style={{color: "red"}}>{convertVND(totalPrice)}</Typography.Title>
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

export default Checkout;
