import {Button, Col, Divider, Form, Input, message, Row} from "antd";
import {convertVND} from "../../function/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {checkout} from "../../services/useServer.jsx";
import {useState} from "react";
import {emptyCart} from "../../redux/order/orderSlice.jsx";
import {useNavigate} from "react-router-dom";

const Checkout = () => {
    const orderList = useSelector(state => state.order.cart);
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
            message.success('sucess');
            dispatch(emptyCart());
            navigate('/');
        }
    };
    const onCheckoutFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    return (
        <>
            {orderList && orderList.length > 0 && orderList.map((item) => {
                return (
                    <Row key={item._id} align='middle' style={{marginTop: "10px", padding: '10px', backgroundColor: "white"}}>
                        <Col span={10}>
                            <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item?.detail?.thumbnail}`} style={{width: '100px'}}/>
                            <div>{item.detail.mainText}</div>
                        </Col>
                        <Col span={3}>
                            {convertVND(item.detail.price)}
                        </Col>
                        <Col span={5} style={{justifyContent: "center"}}>
                            Amount: {item.quantity}
                        </Col>
                        <Col span={4} style={{color: 'red'}}>
                            {convertVND(item.quantity * item.detail.price)}
                        </Col>
                        <Divider />
                    </Row>
                )
            })}
            <Row justify={"end"}>
                <Col span={8}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 24,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                        initialValues={{
                            // name: user.fullName,
                            // phone: user.phone
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
                            <Input />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 0,
                                span: 24,
                            }}
                        >
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
