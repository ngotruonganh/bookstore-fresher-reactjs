import {Button, Col, Form, Input, Row, Typography} from 'antd';
import {Link} from "react-router-dom";
import {register} from "../../services/auth.jsx";

const onFinish = async (values) => {
    console.log('Success:', values);
    let res = await register(values.fullName, values.email, values.password, values.phone);
    console.log(res);
    if (res) {
        alert("/");
    }

};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const Register = () => (
    <Row justify={"center"}>
        <Col xs={22} xl={6}>
            <Typography.Title>
                Sign up
            </Typography.Title>
            <Form
                name="basic"
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Full name"
                    name="fullName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your full name!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

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
                    label="Phone"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone!',
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
                    <Button type="primary" danger htmlType="submit" loading={false}
                            style={{width: "100%", marginTop: "30px"}}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
            <div style={{textAlign: 'center'}}>
                <span>
                    Have an account?&nbsp;
                    <Link to='/auth'>Log In</Link>
                </span>
            </div>
        </Col>
    </Row>
);
export default Register;