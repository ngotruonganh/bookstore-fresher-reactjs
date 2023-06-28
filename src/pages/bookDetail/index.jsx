import {Button, Col, Image, Row, Typography} from "antd";
import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {getBookById} from "../../services/useServer.jsx";

const BookDetail = () => {
    const [bookDetail, setBookDetail] = useState([]);
    const location = useLocation();
    let params = new URLSearchParams(location.search);
    const id = params?.get('id');

    useEffect(() => {
        getBookDetail();
    }, [])

    const getBookDetail = async () => {
        const res = await getBookById(id);
        if (res && res.data) {
            setBookDetail([res.data.data]);
        }
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
                            <Typography.Paragraph style={{display: "flex"}}>
                                {item.quantity}
                            </Typography.Paragraph>
                            <div>
                                <Button>-</Button>
                                1
                                <Button>+</Button>
                            </div>
                            <Button type='dashed'>Add To Cart</Button>
                            <Button type='primary'>Buy Now</Button>
                        </Col>
                    </Row>
                )
            })}
        </>
    );
};

export default BookDetail;
