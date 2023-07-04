import {Col, Row, Typography} from "antd";
import {Link} from "react-router-dom";

const BottomHeader = () => {
    return (
        <Row justify="space-between" align="middle" style={{padding: "5px 0"}}>
            <Col span={24}>
                <Link to="/">
                    <Typography.Title level={3} style={{color: "white"}}>
                        Shop
                    </Typography.Title >
                </Link>
            </Col>
        </Row>
    );
};

export default BottomHeader;
