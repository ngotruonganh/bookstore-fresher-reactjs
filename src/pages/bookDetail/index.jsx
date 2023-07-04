import {Button, Col, Image, InputNumber, message, Row, Typography} from "antd";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {getBookById} from "../../services/useServer.jsx";
import {addToCart} from "../../redux/order/orderSlice.jsx";
import {useDispatch} from "react-redux";
import {convertVND} from "../../function/index.jsx";

const BookDetail = () => {
    const location = useLocation();
    let params = new URLSearchParams(location.search);
    const id = params?.get('id');

    const [bookDetail, setBookDetail] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();

    useEffect(() => {
        getBookDetail();
    }, [])

    const getBookDetail = async () => {
        const res = await getBookById(id);
        if (res && res.data) {
            setBookDetail([res.data.data]);
        }
    }

    const handleQuantity = (type) => {
        if(type === 'down'){
            setQuantity(quantity - 1);
        }
        if(type === 'up'){
            setQuantity(quantity + 1);
        }
    }

    const handleAddToCart = (quantity, item) => {
        if(quantity > item.quantity ) {
            message.error("sold out");
            return
        }
        dispatch(addToCart({_id: item._id, quantity, detail: item}));
    }

    const onChange = (value) => {
        if(value < 1) {
            return;
        }
        setQuantity(value);
    }
    return (
        <>
            {bookDetail && bookDetail.length > 0 && bookDetail.map((item) => {
                return (
                    <Row justify="center" key={item._id} style={{backgroundColor: "white", padding: "20px 30px"}}>
                        <Col xs={24} md={8}>
                            <Image src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item?.thumbnail}`} width={400} />
                        </Col>
                        <Col xs={24} md={16}>
                            <Typography.Title>
                                {item.mainText}
                            </Typography.Title>
                            <Typography.Paragraph>
                                {item.sold} Sold
                            </Typography.Paragraph>
                            <Typography.Title level={3} style={{fontWeight: "bold", color: "red", backgroundColor: "#F5F5F5", padding: '20px' }}>
                                {convertVND(item.price)}
                            </Typography.Title>
                            <div style={{marginTop: "20px"}}>
                                Quantity
                                <Button onClick={() => handleQuantity('down')} disabled={quantity < 2}>-</Button>
                                <InputNumber min={1} max={item.quantity} value={quantity} onChange={onChange} />
                                <Button onClick={() => handleQuantity('up')} disabled={quantity === item.quantity}>+</Button>
                                {item.quantity} are available
                            </div>
                            <div style={{marginTop: "25px"}}>
                                <Button style={{marginRight: "15px"}} danger onClick={() => handleAddToCart(quantity, item)}>
                                    Add To Cart
                                </Button>
                                {/*<Button type='primary' danger>Buy Now</Button>*/}
                            </div>
                        </Col>
                    </Row>
                )
            })}
        </>
    );
};

export default BookDetail;
