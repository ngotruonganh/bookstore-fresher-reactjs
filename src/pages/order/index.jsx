import {Button, Col, InputNumber, Modal, Result, Row, Typography} from "antd";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

import {deleteItem, emptyCart, updateQuantity} from "../../redux/order/orderSlice.jsx";
import {convertSlug, convertVND} from "../../function/index.jsx";

const Order = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderList = useSelector(state => state.order.cart);
    const [modalDeleteItem, setModalDeleteItem] = useState(false);
    const [modalDeleteAll, setModalDeleteAll] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (orderList && orderList.length > 0) {
            let sum = 0;
            orderList.map(item => {
                sum += item.quantity * item.detail.price;
            })
            setTotalPrice(sum);
        }
    }, [orderList]);

    const showModal = (id) => {
        setDeleteId(id);
        setModalDeleteItem(true);
    };

    const showModalDeleteAll = () => {
        setModalDeleteAll(true);
    }

    const handleOk = async () => {
        await dispatch(deleteItem(deleteId));
        setModalDeleteItem(false);
    };

    const handleDeleteAll = () => {
        dispatch(emptyCart());
        setModalDeleteAll(false);
    }

    const handleCancelDeleteAll = () => {
        setModalDeleteAll(false);
    }

    const handleCancel = () => {
        setDeleteId('');
        setModalDeleteItem(false);
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
                        <Col xs={24} xl={3} style={{textAlign: 'end'}}>
                            Actions
                        </Col>
                    </Row>
                    <Row justify='end' style={{padding: '5px'}}>
                        <Col>
                            <Typography.Paragraph onClick={showModalDeleteAll}>
                                Delete All
                            </Typography.Paragraph>
                        </Col>
                    </Row>
                    {orderList && orderList.length > 0 && orderList.map((item) => {
                        return (
                            <Row key={item._id} align='middle'
                                 style={{marginTop: "10px", padding: '0 20px', backgroundColor: "white"}}>
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
                                                 onChange={(value) => onChange(value, item)}
                                                 min={1}
                                                 max={item.detail.quantity}
                                    />
                                </Col>
                                <Col xs={14} xl={6} style={{color: 'red', textAlign: 'end'}}>
                                    {convertVND(item.quantity * item.detail.price)}
                                </Col>
                                <Col xs={24} xl={3} style={{textAlign: 'end'}}>
                                    <Typography.Paragraph
                                        onClick={() => showModal(item)}
                                    >
                                        Delete
                                    </Typography.Paragraph>
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
                    <Modal
                        title="Detele"
                        open={modalDeleteItem}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        Sure
                    </Modal>
                    <Modal
                        title='Delete all product'
                        open={modalDeleteAll}
                        onOk={handleDeleteAll}
                        onCancel={handleCancelDeleteAll}
                    >
                        Delete all your cart
                    </Modal>
                </>
            )}
        </>
    )
};

export default Order;
