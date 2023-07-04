import {Badge, Col, Row, Typography} from "antd";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import TopHeader from "./topHeader.jsx";
import SearchField from "../search/index.jsx";

const Header = () => {
    const orderCount = useSelector(state => state.order.cart);
    const count = orderCount?.length;
    const token = localStorage.getItem('access_token');

    return (<>
            <TopHeader/>
            <Row justify="space-between" align="middle" style={{padding: "5px 0"}}>
                <Col span={4}>
                    <Link to="/">
                        <Typography.Title level={3} style={{color: "white"}}>
                            Shop
                        </Typography.Title >
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
                        {token ?
                                <Link to='/action/order'>
                                    <ShoppingCartOutlined style={{fontSize: '30px', color: "white"}}/>
                                </Link> :
                                <Link to='/auth/login'>
                                    <ShoppingCartOutlined style={{fontSize: '30px', color: "white"}}/>
                                </Link>
                        }
                    </Badge>
                </Col>
            </Row>
        </>);
};

export default Header;