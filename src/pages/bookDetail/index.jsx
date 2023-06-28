import {Button, Col, Image, Row, Typography} from "antd";
import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {getBookById} from "../../services/useServer.jsx";
import {addToCart} from "../../redux/order/orderSlice.jsx";
import {useDispatch} from "react-redux";

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
            if(quantity === +bookDetail.quantity) return;
            setQuantity(quantity + 1);
        }
    }

    const handleChangeQuantity = (e) => {
        setQuantity(e.target.value)
    }

    const handleAddToCart = (quantity, item) => {
        dispatch(addToCart({_id: item._id, quantity, detail: item}));
    }
    return (
        <>
            {bookDetail && bookDetail.length > 0 && bookDetail.map((item) => {
                return (
                    <Row justify="center" key={item._id}>
                        <Col xs={24} md={8}>
                            <Image src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" width={400}/>
                        </Col>
                        <Col xs={24} md={10}>
                            <Typography.Title>
                                {item.mainText}
                            </Typography.Title>
                            <Typography.Paragraph>
                                {item.sold}
                            </Typography.Paragraph>
                            <Typography.Paragraph style={{fontWeight: "bold", color: "red"}}>
                                d{item.price}
                            </Typography.Paragraph>
                            <div>
                                Quantity
                                <Button onClick={() => handleQuantity('down')}>-</Button>
                                <input value={quantity} onChange={(e) => handleChangeQuantity(e)} />
                                <Button onClick={() => handleQuantity('up')}>+</Button>
                                {item.quantity} are available
                            </div>
                            <Button type='dashed' onClick={() => handleAddToCart(quantity, item)}>Add To Cart</Button>
                            <Button type='primary'>Buy Now</Button>
                        </Col>
                    </Row>
                )
            })}
        </>
    );
};

export default BookDetail;
