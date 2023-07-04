import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Divider, InputNumber, Modal, Row, Typography} from "antd";

import {deleteItem, updateQuantity} from "../../redux/order/orderSlice.jsx";
import {Link, useNavigate} from "react-router-dom";
import {convertSlug, convertVND} from "../../function/index.jsx";

const Order = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderList = useSelector(state => state.order.cart);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState('');
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
        if(isNaN(value)) return;
        else {
            dispatch(updateQuantity({_id: item._id, quantity: value, detail: item}));
        }
    }

    const handleViewDetail = (book) => {
        console.log("click");
        const slug = convertSlug(book.mainText);
        navigate(`/${slug}?id=${book._id}`);
    }
    const handleCheckOut = () => {
        navigate('/checkout');
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
                            <img onClick={() => handleViewDetail(item)} src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item?.detail?.thumbnail}`} style={{width: '100px'}}/>
                            <div>{item.detail.mainText}</div>
                        </Col>
                        <Col span={3}>
                            {convertVND(item.detail.price)}
                        </Col>
                        <Col span={5} style={{justifyContent: "center"}}>
                            <InputNumber defaultValue={item.quantity} onChange={(value) => onChange(value, item)} min={1} max={item.detail.quantity}/>
                        </Col>
                        <Col span={4} style={{color: 'red'}}>
                            {convertVND(item.quantity * item.detail.price)}
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
                <span style={{marginRight: "10px", color: 'red'}}>{convertVND(totalPrice)}</span>
                <Button type='primary' danger onClick={handleCheckOut}>Check Out</Button>
            </div>
            <Modal title="Detele" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                Sure
            </Modal>
        </>
    )
};

export default Order;
