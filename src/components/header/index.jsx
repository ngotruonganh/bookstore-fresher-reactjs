import {Badge, Button, Col, Divider, Image, Popover, Row, Typography} from "antd";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import TopHeader from "./topHeader.jsx";
import SearchField from "../search/index.jsx";
import {convertVND} from "../../function/index.jsx";

const Header = () => {
    const order = useSelector(state => state.order.cart);
    const count = order?.length;
    const token = localStorage.getItem('access_token');

    const content = (
        <>
            {count === 0 ? (
                <Row justify='center' align='middle' style={{width: '400px', height: '200px'}}>
                    No Products Yet
                </Row>
            ) : (
                <>
                    {order && order.length >= 0 && order.slice(0, 3).map(item => {
                        return (
                            <Row key={item._id} justify='space-between' align='middle' style={{maxWidth: '400px'}}>
                                <Col>
                                    <Image
                                        src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item.detail.thumbnail}`}
                                        style={{width: '60px'}}
                                    />
                                </Col>
                                <Col span={15}>
                                    {item.detail.mainText}
                                </Col>
                                <Col style={{color: 'red', fontWeight: 'bold'}}>{convertVND(item.detail.price)}</Col>
                                <Divider/>
                            </Row>
                        )
                    })}
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        {count > 3 ?
                            <p>{count - 3} More Products In Cart</p> :
                            <p></p>
                        }
                        <Button type='primary' danger>
                            <Link to='/order'>
                                View My Shopping Cart
                            </Link>
                        </Button>
                    </div>
                </>
            )}
        </>
    )

    return (
        <>
            <TopHeader/>
            <Row justify="space-between" align="middle" style={{padding: "5px 0"}}>
                <Col span={4}>
                    <Link to="/">
                        <Typography.Title level={3} style={{color: "white"}}>
                            Shop
                        </Typography.Title>
                    </Link>
                </Col>
                <Col flex="auto">
                    <SearchField/>
                </Col>
                <Col span={3} style={{display: "flex", justifyContent: "center"}}>
                    <Badge
                        count={count}
                        showZero
                    >
                        <Popover content={content} placement="bottomRight">
                            <Link to='/order'>
                                <ShoppingCartOutlined style={{fontSize: '30px', color: "white"}}/>
                            </Link>
                        </Popover>
                    </Badge>
                </Col>
            </Row>
        </>
    );
};

export default Header;