import {Button, Col, Image, InputNumber, message, Row, Typography} from "antd";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {addTempCartToBuyNow, addToCart, addToTempCart} from "../../redux/order/orderSlice.jsx";
import {useDispatch, useSelector} from "react-redux";
import {convertVND} from "../../function/index.jsx";
import {getBookById} from "../../services/book.jsx";
import Loading from "../../components/loading/index.jsx";

const BookDetail = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const params = new URLSearchParams(location.search);
    const id = params?.get('id');

    const isAuth = useSelector(state => state.account.isAuthenticated);

    const [bookDetail, setBookDetail] = useState({});
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        getBookDetail();
    }, []);

    const getBookDetail = async () => {
        const res = await getBookById(id);
        if (res && res.data) {
            setBookDetail(res.data.data);
        }
    }

    const handleQuantity = (type) => {
        if (type === 'down') {
            setQuantity(quantity - 1);
        }
        if (type === 'up') {
            setQuantity(quantity + 1);
        }
    }

    const handleAddToCart = () => {
        if (quantity > bookDetail.quantity) {
            message.error("Sold out");
            return;
        }
        if (!isAuth) {
            dispatch(addToTempCart({_id: bookDetail._id, quantity, detail: bookDetail}));
            navigate('/auth');
            return;
        }
        dispatch(addToCart({_id: bookDetail._id, quantity, detail: bookDetail}));
    }

    const handleBuyNow = () => {
        if (quantity > bookDetail.quantity) {
            message.error("Sold out");
            return;
        }
        if (!isAuth) {
            dispatch(addToTempCart({_id: bookDetail._id, quantity, detail: bookDetail}));
            navigate('/auth');
            return;
        }
        dispatch(addToTempCart({_id: bookDetail._id, quantity, detail: bookDetail}));
        dispatch(addTempCartToBuyNow({_id: bookDetail._id, quantity, detail: bookDetail}));
        navigate('/order/buy-now');
    }

    const onChangeQuantity = (value) => {
        if (value < 1) {
            return;
        }
        setQuantity(value);
    }
    return (
        <>
            {bookDetail && bookDetail._id ? (
                <Row
                    gutter={[8, 8]} justify="center"
                    style={{backgroundColor: "white", padding: "20px 15px"}}
                >
                    <Col xs={24} md={8}>
                        <Image
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${bookDetail.thumbnail}`}
                            style={{width: '300px'}}
                        />
                    </Col>
                    <Col xs={24} md={16}>
                        <Typography.Title level={3}>
                            {bookDetail.mainText}
                        </Typography.Title>
                        <Typography.Paragraph>
                            Author: {bookDetail.author}
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            {bookDetail.sold} Sold
                        </Typography.Paragraph>
                        <Typography.Title level={3} style={{
                            fontWeight: "bold",
                            color: "red",
                            backgroundColor: "#F5F5F5",
                            padding: '20px'
                        }}>
                            {convertVND((bookDetail.price))}
                        </Typography.Title>
                        <div style={{margin: "20px 0"}}>
                            Quantity: &nbsp;
                            <Button
                                onClick={() => handleQuantity('down')}
                                disabled={quantity === 1}
                            >
                                -
                            </Button>
                            <InputNumber min={1} max={bookDetail.quantity} value={quantity} onChange={onChangeQuantity}/>
                            <Button
                                onClick={() => handleQuantity('up')}
                                disabled={quantity === bookDetail.quantity}
                            >
                                +
                            </Button>
                        </div>
                        <div>
                            {bookDetail.quantity} are available
                        </div>
                        <div style={{marginTop: "25px"}}>
                            <Button
                                danger
                                style={{marginRight: "15px"}}
                                onClick={handleAddToCart}
                            >
                                Add To Cart
                            </Button>
                            <Button
                                type='primary'
                                danger
                                onClick={handleBuyNow}
                            >
                                Buy Now
                            </Button>
                        </div>
                    </Col>
                </Row>
            ) : (
                <Loading />
            )}
        </>

    );
};

export default BookDetail;
