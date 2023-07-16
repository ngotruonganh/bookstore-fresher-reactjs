import {
    Col,
    Divider,
    Form,
    Input,
    InputNumber, message,
    Modal, notification,
    Row,
    Select
} from 'antd';
import { useEffect, useState } from 'react';
import {createBook, getCategories} from "../../services/book.jsx";
import {createUser} from "../../services/user.jsx";
const ModalCreateUser = ({openModalCreateUser, onCloseModalCreateUser}) => {
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);

    const onFinish = async (values) => {
        setConfirmLoading(true);
        const {fullName, password, email, phone} = values;
        const res = await createUser(fullName, password,email, phone );
        setConfirmLoading(false);
        if (res && res.data) {
            message.success('Create new user success');
            form.resetFields();
            // setOpenModalCreateUser(false);
        }
        else {
            notification.error({
                message: 'Error',
                description: res.message
            })
        }
    };

    const validateMessages = {
        required: 'Please input your ${label}',
        types: {
            email: '${label} is not a valid email!',
        },
    };
    return (
        <>
            <Modal
                title="Create user"
                open={openModalCreateUser}
                onOk={() => {form.submit()}}
                okType={'danger'}
                onCancel={onCloseModalCreateUser}
                okText={"Add"}
                confirmLoading={confirmLoading}
                width={"50vw"}
                //do not close when click fetchBook
                maskClosable={false}
            >
                <Divider />
                <Form
                    form={form}
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                    validateMessages={validateMessages}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Full name"
                                name="fullName"
                                rules={[{ required: true, message: 'Please input your full name' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        type: 'email'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Phone"
                                name="phone"
                                rules={[{ required: true, message: 'Please input phone!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

export default ModalCreateUser;