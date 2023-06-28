import {Badge, Col, Row} from "antd";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const Header = () => {
    const orderCount = useSelector(state => state.order.cart);
    const count = orderCount?.length;
    return (
        <Row justify="space-evenly" style={{marginTop: "20px", marginBottom: "20px"}}>
            <Link to="/">Logo</Link>
            <Col>
                <Badge count={count}>
                    <Link to='/order'>
                        Gio hang
                    </Link>
                </Badge>
            </Col>
        </Row>
    );
};

export default Header;