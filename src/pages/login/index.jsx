import {Button, Checkbox, Col, Form, Input, message, Row, Typography} from 'antd';
import {login} from "../../services/useServer.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginAction} from "../../redux/account/accountSlice.jsx";
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
        let res = await login(values.username, values.password);
        setLoading(false);
        if(res?.data){
            localStorage.setItem("access_token", res.data.data.access_token);
            console.log("user", res)
            dispatch(loginAction(res.data.data.user));
            message.success("Success");
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
            <Col xs={6}>
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
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="username"
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
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 0,
                            span: 24,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 0,
                            span: 24,
                        }}
                    >
                        <Button type="primary" htmlType="submit" loading={loading} style={{width: "100%"}}>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}
export default Login;