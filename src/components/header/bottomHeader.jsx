import {Col, Row, Typography} from "antd";
import {Link} from "react-router-dom";

const BottomHeader = () => {
    return (
        <Row justify="space-between" align="middle" style={{padding: "5px 0"}}>
            <Col span={24}>
                <Typography.Title level={3}>
                    <Link to="/" style={{color: "white"}}>
                        Shop
                    </Link>
                </Typography.Title>
            </Col>
        </Row>
    );
};

export default BottomHeader;
