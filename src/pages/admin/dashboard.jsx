import {Col, Divider, Image, Row, Statistic, Typography} from "antd";
import {useEffect, useState} from "react";
import CountUp from 'react-countup';
import {convertVND} from "../../function/index.jsx";
import {getDashboard} from "../../services/useServer.jsx";
import {getAllBooks} from "../../services/book.jsx";

const formatter = (value) => <CountUp end={value} separator=","/>;
const MyComponent = () => {
    const [allUser, setAllUser] = useState(0);
    const [allOrder, setAllOrder] = useState(0);
    const [totalBook, setTotalBook] = useState(0);
    const [topBookSale, setTopBookSale] = useState([]);

    useEffect(() => {
        getDashboardAdmin();
        getTotalBook();
    }, [allUser, allOrder, topBookSale, totalBook]);

    const getDashboardAdmin = async () => {
        const res = await getDashboard();
        if (res && res.data) {
            setAllUser(res.data.data.countUser);
            setAllOrder(res.data.data.countOrder);
        }
    }

    const getTotalBook = async () => {
        const query = `/api/v1/book?current=1&pageSize=10&sort=-sold`;
        const res = await getAllBooks(query);
        if (res && res.data) {
            setTotalBook(res.data.data.meta.total);
            setTopBookSale(res.data.data.result);
        }
    }

    return (
        <div style={{backgroundColor: "white", padding: '50px'}}>
            <Row gutter={[32, 32]} justify='center'>
                <Col sx={24} xl={8}>
                    <Statistic title="All users" value={allUser} formatter={formatter} style={{fontWeight: 'bold'}}/>
                </Col>
                <Col sx={24} xl={8}>
                    <Statistic title="All order" value={allOrder} formatter={formatter} style={{fontWeight: 'bold'}}/>
                </Col>
                <Col sx={24} xl={8}>
                    <Statistic title="Total book" value={totalBook} formatter={formatter} style={{fontWeight: 'bold'}}/>
                </Col>
                <Divider/>
            </Row>
            <Typography.Title level={3}>Top 3 Book sale</Typography.Title>
            <Row gutter={[32, 32]}>
                {topBookSale.slice(0, 3).map(item => {
                    return (
                        <Col key={item._id}>
                            <Image src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item.thumbnail}`}
                                   style={{width: '150px'}}/>
                            <Typography.Paragraph>{item.mainText}</Typography.Paragraph>
                            <Typography.Paragraph>{item.sold}</Typography.Paragraph>
                            <Typography.Paragraph style={{color: 'red'}}>{convertVND(item.price)}</Typography.Paragraph>
                        </Col>
                    )
                })}
            </Row>
        </div>
    );
};

export default MyComponent;
