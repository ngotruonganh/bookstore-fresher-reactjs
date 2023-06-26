import {Button, Col, Image, Row, Typography} from "antd";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getBookById} from "../../services/useServer.jsx";

const BookDetail = () => {
    const [bookDetail, setBookDetail] = useState([]);
    const params = useParams();

    useEffect(() => {
        getBookDetail();
    }, [])

    const getBookDetail = async () => {
        const res = await getBookById(params.id);
        console.log("res: ", res);
        if (res && res.data) {
            setBookDetail(res.data.data);
            console.log("book: ", bookDetail);
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
                                {item.price}
                            ss</Typography.Paragraph>
                            <Typography.Paragraph style={{display: "flex"}}>
                                Quantity
                                <Button>-</Button>
                                1
                                <Button>+</Button>
                            </Typography.Paragraph>
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
