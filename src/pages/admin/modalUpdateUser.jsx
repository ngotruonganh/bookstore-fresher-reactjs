import {
    Col,
    Divider,
    Form,
    Input,
    message,
    Modal, notification,
    Row,
} from 'antd';
import { useEffect, useState } from 'react';
import { updateUser } from "../../services/user.jsx";
const ModalUpdateUser = ({openModalUpdateUser, onCloseModalUpdateUser, updateItem}) => {
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);

    useEffect(() => {
        form.setFieldsValue(updateItem);
    }, [updateItem]);

    const onFinish = async (values) => {
        setConfirmLoading(true);
        const res = await updateUser(updateItem._id, values.fullName,values.phone );
        setConfirmLoading(false);
        if (res && res.data) {
            message.success('Update user success');
            // setOpenModalCreateUser(false);
        }
        else {
            notification.error({
                message: 'Error',
                description: res.message
            })
        }
    };
    return (
        <>
            <Modal
                title='Update user'
                open={openModalUpdateUser}
                onOk={() => {form.submit()}}
                okType='danger'
                onCancel={onCloseModalUpdateUser}
                okText='Update'
                confirmLoading={confirmLoading}
                width='50vw'
                //do not close when click fetchBook
                maskClosable={false}
            >
                <Divider />
                <Form
                    form={form}
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                    initialValues={{
                        fullName: updateItem.fullName,
                        email: updateItem.email,
                        phone: updateItem.phone
                    }}
                >
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Full name"
                                name="fullName"
                                rules={[{ required: true, message: 'Please input your full name' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Email"
                                name="email"
                            >
                                <Input disabled/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
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

export default ModalUpdateUser;