import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, InputNumber, Modal, Result, Row, Typography} from "antd";

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
        if (orderList && orderList.length > 0) {
            let sum = 0;
            orderList.map(item => {
                sum += item.quantity * item.detail.price;
            })
            setTotalPrice(sum);
        } else {
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
        if (isNaN(value)) return;
        else {
            dispatch(updateQuantity({_id: item._id, quantity: value, detail: item}));
        }
    }

    const handleViewDetail = (book) => {
        const slug = convertSlug(book.mainText);
        navigate(`/${slug}?id=${book._id}`);
    }
    const handleCheckOut = () => {
        navigate('/order/checkout');
    }
    return (
        <>
            {orderList?.length === 0 ? (
                <Result
                    status="404"
                    title="404"
                    subTitle="Go home and buy something."
                    extra={
                        <Link to='/'>
                            <Button type="primary" danger>
                                Go Shopping Now
                            </Button>
                        </Link>
                    }
                />
            ) : (
                <>
                    <Row align='middle' style={{marginTop: "10px", padding: '15px', backgroundColor: "white"}}>
                        <Col xs={14} xl={5} style={{textAlign: "start"}}>
                            <div>Product</div>
                        </Col>
                        <Col xs={10} xl={4} style={{textAlign: 'end'}}>
                            Unit Price
                        </Col>
                        <Col xs={10} xl={6} style={{textAlign: "center"}}>
                            Quantity
                        </Col>
                        <Col xs={14} xl={6} style={{textAlign: "end"}}>
                            Total Price
                        </Col>
                        <Col xs={24} xl={3} style={{textAlign: 'center'}}>
                            Actions
                        </Col>
                    </Row>
                    {orderList && orderList.length > 0 && orderList.map((item) => {
                        return (
                            <Row key={item._id} align='middle'
                                 style={{marginTop: "10px", padding: '10px', backgroundColor: "white"}}>
                                <Col xs={14} xl={5} style={{textAlign: "start"}}>
                                    <img onClick={() => handleViewDetail(item)}
                                         src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item?.detail?.thumbnail}`}
                                         style={{width: '100px'}}
                                         alt={item.mainText}
                                    />
                                    <div>{item.detail.mainText}</div>
                                </Col>
                                <Col xs={10} xl={4} style={{textAlign: 'end'}}>
                                    {convertVND(item.detail.price)}
                                </Col>
                                <Col xs={10} xl={6} style={{textAlign: "center"}}>
                                    <InputNumber defaultValue={item.quantity}
                                                 onChange={(value) => onChange(value, item)} min={1}
                                                 max={item.detail.quantity}/>
                                </Col>
                                <Col xs={14} xl={6} style={{color: 'red', textAlign: 'end'}}>
                                    {convertVND(item.quantity * item.detail.price)}
                                </Col>
                                <Col xs={24} xl={3} style={{textAlign: 'center'}}>
                                    <Typography.Paragraph onClick={() => showModal(item)}>Delete</Typography.Paragraph>
                                </Col>
                            </Row>
                        )
                    })}
                    <div style={{display: "flex", justifyContent: "end", alignItems: "center", margin: "10px"}}>
                        <span style={{marginRight: "5px"}}>Total ({orderList?.length} item): </span>
                        <span style={{marginRight: "10px", color: 'red'}}>{convertVND(totalPrice)}</span>
                        <Button type='primary' danger onClick={handleCheckOut} disabled={orderList.length <= 0}>
                            Check Out
                        </Button>
                    </div>
                    <Modal title="Detele" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        Sure
                    </Modal>
                </>
            )}
        </>
    )
};

export default Order;
