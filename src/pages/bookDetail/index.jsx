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

    let params = new URLSearchParams(location.search);
    const id = params?.get('id');

    const isAuth = useSelector(state => state.account.isAuthenticated);

    const [bookDetail, setBookDetail] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getBookDetail();
        setLoading(false);
    }, [])

    const getBookDetail = async () => {
        const res = await getBookById(id);
        if (res && res.data) {
            setBookDetail([res.data.data]);
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

    const handleAddToCart = (quantity, item) => {
        if (quantity > item.quantity) {
            message.error("Sold out");
            return;
        }
        if (!isAuth) {
            dispatch(addToTempCart({_id: item._id, quantity, detail: item}));
            navigate('/auth');
            return;
        }
        dispatch(addToCart({_id: item._id, quantity, detail: item}));
    }

    const handleBuyNow = (quantity, item) => {
        if (quantity > item.quantity) {
            message.error("Sold out");
            return;
        }
        if (!isAuth) {
            dispatch(addToTempCart({_id: item._id, quantity, detail: item}));
            navigate('/auth');
            return;
        }
        dispatch(addToTempCart({_id: item._id, quantity, detail: item}));
        dispatch(addTempCartToBuyNow({_id: item._id, quantity, detail: item}));
        navigate('/order/buy-now');
    }

    const onChange = (value) => {
        if (value < 1) {
            return;
        }
        setQuantity(value);
    }
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    {bookDetail && bookDetail.length > 0 && bookDetail.map(item => {
                        return (
                            <Row
                                key={item._id} gutter={[8, 8]} justify="center"
                                style={{backgroundColor: "white", padding: "20px 15px"}}
                            >
                                <Col xs={24} md={8}>
                                    <Image
                                        src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item.thumbnail}`}
                                        style={{width: '300px'}}
                                    />
                                </Col>
                                <Col xs={24} md={16}>
                                    <Typography.Title level={3}>
                                        {item.mainText}
                                    </Typography.Title>
                                    <Typography.Paragraph>
                                        Author: {item.author}
                                    </Typography.Paragraph>
                                    <Typography.Paragraph>
                                        {item.sold} Sold
                                    </Typography.Paragraph>
                                    <Typography.Title level={3} style={{
                                        fontWeight: "bold",
                                        color: "red",
                                        backgroundColor: "#F5F5F5",
                                        padding: '20px'
                                    }}>
                                        {convertVND(item.price)}
                                    </Typography.Title>
                                    <div style={{margin: "20px 0"}}>
                                        Quantity: &nbsp;
                                        <Button
                                            onClick={() => handleQuantity('down')}
                                            disabled={quantity === 1}
                                        >
                                            -
                                        </Button>
                                        <InputNumber min={1} max={item.quantity} value={quantity} onChange={onChange}/>
                                        <Button
                                            onClick={() => handleQuantity('up')}
                                            disabled={quantity === item.quantity}
                                        >
                                            +
                                        </Button>
                                    </div>
                                    <div>
                                        {item.quantity} are available
                                    </div>
                                    <div style={{marginTop: "25px"}}>
                                        <Button style={{marginRight: "15px"}} danger
                                                onClick={() => handleAddToCart(quantity, item)}>
                                            Add To Cart
                                        </Button>
                                        <Button type='primary' danger onClick={() => handleBuyNow(quantity, item)}>Buy Now</Button>
                                    </div>
                                </Col>
                            </Row>
                        )
                    })}
                </>
            )}
        </>
    );
};

export default BookDetail;
