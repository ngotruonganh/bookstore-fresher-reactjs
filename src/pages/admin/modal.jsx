import {
    Col,
    Divider,
    Form,
    Input,
    InputNumber, message,
    Modal,
    Row,
    Select
} from 'antd';
import { useEffect, useState } from 'react';
import {createBook, getCategories} from "../../services/book.jsx";
const BookModalCreate = ({openModalCreate, onCloseModalCreate}) => {
    const [confirmLoading, setConfirmLoading] = useState(false);


    const [isSubmit, setIsSubmit] = useState(false);

    const [listCategory, setListCategory] = useState([])
    const [form] = Form.useForm();


    const [loading, setLoading] = useState(false);
    const [loadingSlider, setLoadingSlider] = useState(false);

    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const fetchCategory = async () => {
            const res = await getCategories();
            console.log(res);
            if (res && res.data) {
                const categories = res.data.data.map(item => {
                    return { label: item, value: item }
                })
                setListCategory(categories);
            }
        }
        fetchCategory();
    }, [])

    const [et, set] = useState('');

    const onFinish = async (values) => {
        // setConfirmLoading(true);
        console.log(values);
        const res = await createBook('abc', ['s'], values.mainText,values.author, values.price, 0, values.quantity, values.category);
        // setConfirmLoading(false);
        if (res && res.data) {
            message.success('success');
            // form.resetFields();
            // setOpenModalCreate(false);
            // await props.fetchBook()
        }
        // else {
        //     notification.error({
        //         message: 'Đã có lỗi xảy ra',
        //         description: res.message
        //     })
        // }
        // setIsSubmit(false)
    };


    // const getBase64 = (img, callback) => {
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => callback(reader.result));
    //     reader.readAsDataURL(img);
    // };
    //
    // const beforeUpload = (file) => {
    //     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    //     if (!isJpgOrPng) {
    //         message.error('You can only upload JPG/PNG file!');
    //     }
    //     const isLt2M = file.size / 1024 / 1024 < 2;
    //     if (!isLt2M) {
    //         message.error('Image must smaller than 2MB!');
    //     }
    //     return isJpgOrPng && isLt2M;
    // };
    //
    //
    //
    // const handleChange = (info, type) => {
    //     if (info.file.status === 'uploading') {
    //         type ? setLoadingSlider(true) : setLoading(true);
    //         return;
    //     }
    //     if (info.file.status === 'done') {
    //         // Get this url from response in real world.
    //         getBase64(info.file.originFileObj, (url) => {
    //             type ? setLoadingSlider(false) : setLoading(false);
    //             setImageUrl(url);
    //         });
    //     }
    // };
    //
    //
    // const handleUploadFile = ({ file, onSuccess, onError }) => {
    //     setTimeout(() => {
    //         onSuccess("ok");
    //     }, 1000);
    // };
    return (
        <>
            <Modal
                title="Create book"
                open={openModalCreate}
                onOk={() => {form.submit()}}
                onCancel={onCloseModalCreate}
                okText={"Add"}
                confirmLoading={confirmLoading}
                width={"50vw"}
                //do not close when click fetchBook
                // maskClosable={false}
            >
                <Divider />
                <Form
                    form={form}
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Row gutter={15}>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Book name"
                                name="mainText"
                                rules={[{ required: true, message: 'Input book name' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Author"
                                name="author"
                                rules={[{ required: true, message: 'Input author' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Price"
                                name="price"
                                rules={[{ required: true, message: 'Input price!' }]}
                            >
                                <InputNumber
                                    min={0}
                                    style={{ width: '100%' }}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    addonBefore="đ"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label='Category'
                                name="category"
                                rules={[{ required: true, message: 'Input Category!' }]}
                            >
                                <Select
                                    defaultValue={null}
                                    showSearch
                                    allowClear
                                    options={listCategory}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Quantity"
                                name="quantity"
                                rules={[{ required: true, message: 'Input quantity!' }]}
                            >
                                <InputNumber min={1} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        {/*<Col span={12}>*/}
                        {/*    <Form.Item*/}
                        {/*        labelCol={{ span: 24 }}*/}
                        {/*        label="Ảnh Thumbnail"*/}
                        {/*        name="thumbnail"*/}
                        {/*    >*/}
                        {/*        <Upload*/}
                        {/*            name="thumbnail"*/}
                        {/*            listType="picture-card"*/}
                        {/*            className="avatar-uploader"*/}
                        {/*            maxCount={1}*/}
                        {/*            multiple={false}*/}
                        {/*            // customRequest={handleUploadFile}*/}
                        {/*            // beforeUpload={beforeUpload}*/}
                        {/*            // onChange={handleChange}*/}
                        {/*        >*/}
                        {/*            <div>*/}
                        {/*                {loading ? <LoadingOutlined /> : <PlusOutlined />}*/}
                        {/*                <div style={{ marginTop: 8 }}>Upload</div>*/}
                        {/*            </div>*/}
                        {/*        </Upload>*/}
                        {/*    </Form.Item>*/}

                        {/*</Col>*/}
                        {/*<Col span={12}>*/}
                        {/*    <Form.Item*/}
                        {/*        labelCol={{ span: 24 }}*/}
                        {/*        label="Ảnh Slider"*/}
                        {/*        name="slider"*/}
                        {/*    >*/}
                        {/*        <Upload*/}
                        {/*            multiple*/}
                        {/*            name="slider"*/}
                        {/*            listType="picture-card"*/}
                        {/*            className="avatar-uploader"*/}
                        {/*            // customRequest={handleUploadFile}*/}
                        {/*            beforeUpload={beforeUpload}*/}
                        {/*            onChange={(info) => handleChange(info, 'slider')}*/}
                        {/*        >*/}
                        {/*            <div>*/}
                        {/*                {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}*/}
                        {/*                <div style={{ marginTop: 8 }}>Upload</div>*/}
                        {/*            </div>*/}
                        {/*        </Upload>*/}
                        {/*    </Form.Item>*/}
                        {/*</Col>*/}
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

export default BookModalCreate;