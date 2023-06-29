import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Divider, InputNumber, Modal, Row, Typography} from "antd";

import {deleteItem, updateQuantity} from "../../redux/order/orderSlice.jsx";

const Order = () => {
    const orderList = useSelector(state => state.order.cart);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const [deleteId, setDeleteId] = useState('');

    const showModal = (id) => {
        setDeleteId(id);
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        await dispatch(deleteItem(deleteId));
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setDeleteId('');
        setIsModalOpen(false);
    };
    const onChange = (value, item) => {
        console.log(value);
        if(isNaN(value)) return;
        else {
            dispatch(updateQuantity({_id: item._id, quantity: value, detail: item}));
        }
    }
    return (
        <>
            <Row align='middle' style={{marginTop: "10px", padding: '15px', backgroundColor: "white"}}>
                <Col span={10}>
                    <div>Product</div>
                </Col>
                <Col span={3}>
                    Unit Price
                </Col>
                <Col span={5} style={{justifyContent: "center"}}>
                    Quantity
                </Col>
                <Col span={4}>
                    Total Price
                </Col>
                <Col span={2} style={{justifyContent: 'center'}}>
                    Actions
                </Col>
            </Row>
            {orderList?.length === 0 && (
                <Row justify='center'>
                    <div>No</div>
                </Row>
            )}
            {orderList && orderList.length > 0 && orderList.map((item) => {
                return (
                    <Row key={item._id} align='middle' style={{marginTop: "10px", padding: '10px', backgroundColor: "white"}}>
                        <Col span={10}>
                            <div>{item.detail.mainText}</div>
                        </Col>
                        <Col span={3}>
                            ₫{item.detail.price}
                        </Col>
                        <Col span={5} style={{justifyContent: "center"}}>
                            <InputNumber defaultValue={item.quantity} onChange={(value) => onChange(value, item)} min={1} max={item.detail.quantity}/>
                        </Col>
                        <Col span={4} style={{color: 'red'}}>
                            ₫{item.detail.price * item.quantity}
                        </Col>
                        <Col span={2} style={{justifyContent: 'center'}}>
                            <Typography.Paragraph onClick={()=> showModal(item)}>Delete</Typography.Paragraph>
                        </Col>
                        <Divider />
                    </Row>
                )
            })}
            <div style={{display:"flex", justifyContent: "end", alignItems: "center", margin: "10px"}}>
                <span style={{marginRight: "5px"}}>Total ({orderList?.length} item): </span>
                <span style={{marginRight: "10px", color: 'red'}}>₫39000</span>
                <Button type='primary' danger>Check Out</Button>
            </div>
            <Modal title="Detele" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                Sure
            </Modal>
        </>
    )
};

export default Order;
