import {Button, Col, Form, Input, message, Row, Typography} from 'antd';
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../services/auth.jsx";
import {loginAction} from "../../redux/account/accountSlice.jsx";
import {addTempCartToCart} from "../../redux/order/orderSlice.jsx";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        const res = await login(values.email, values.password);
        setLoading(false);
        if (res?.data) {
            localStorage.setItem('access_token', res.data.data.access_token);
            dispatch(loginAction(res.data.data.user));
            dispatch(addTempCartToCart());
            message.success('Login success');
            navigate('/');
        } else {
            message.error("Login failed");
        }
    };
    return (
        <Row justify='center'>
            <Col xs={23} xl={8}>
                <Typography.Title>
                    Sign in
                </Typography.Title>
                <Form
                    name="basic"
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    initialValues={{
                        email: 'user@gmail.com',
                        password: "123456"
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
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
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 0,
                            span: 24,
                        }}
                    >
                        <Button
                            htmlType="submit"
                            type="primary"
                            danger
                            loading={loading}
                            style={{width: "100%"}}
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <Link to='/'>
                    <Button
                        type="primary"
                        danger
                        style={{width: "100%"}}>
                        Go To Home
                    </Button>
                </Link>
                <div style={{textAlign: 'center', marginTop: '30px'}}>
                    <Typography.Paragraph>
                        New to Shop?&nbsp;
                        <Link to='/auth/register'>Sign Up</Link>
                    </Typography.Paragraph>
                </div>
            </Col>
        </Row>
    )
}
export default Login;