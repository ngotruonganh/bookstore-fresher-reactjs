import {Button, Col, Form, Input, message, Row, Typography} from 'antd';
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginAction} from "../../redux/account/accountSlice.jsx";
import {login} from "../../services/auth.jsx";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const access_token = localStorage.getItem("access_token");
        if (access_token) {
            navigate("/");
        }
    }, []);

    const onFinish = async (values) => {
        setLoading(true);
        let res = await login(values.email, values.password);
        setLoading(false);
        if (res?.data) {
            localStorage.setItem("access_token", res.data.data.access_token);
            dispatch(loginAction(res.data.data.user));
            message.success("Login success");
            navigate("/");
        } else {
            message.error("Error");
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    return (
        <Row justify={"center"}>
            <Col xs={24} xl={6}>
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
                        remember: true,
                        email: 'user@gmail.com',
                        password: "123456"
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
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

                    {/*<Form.Item*/}
                    {/*    name="remember"*/}
                    {/*    valuePropName="checked"*/}
                    {/*    wrapperCol={{*/}
                    {/*        offset: 0,*/}
                    {/*        span: 24,*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <Checkbox>Remember me</Checkbox>*/}
                    {/*</Form.Item>*/}

                    <Form.Item
                        wrapperCol={{
                            offset: 0,
                            span: 24,
                        }}
                    >
                        <Button type="primary" danger htmlType="submit" loading={loading} style={{width: "100%"}}>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <Link to='/'>
                    <Button type="primary" danger style={{width: "100%"}}>
                        Go To Home
                    </Button>
                </Link>
                <div style={{textAlign: 'center', marginTop: '30px'}}>
                    <span>
                        New to Shop?&nbsp;
                        <Link to='/auth/register'>Sign Up</Link>
                    </span>
                </div>
            </Col>
        </Row>
    )
}
export default Login;