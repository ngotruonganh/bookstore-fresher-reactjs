import { Col, Row} from "antd";
import AccountOption from "./accountOption.jsx";
import Language from "./language.jsx";

const TopHeader = () => {

    return (
        <Row justify="space-between" style={{marginTop: '5px'}}>
            <Col style={{color: "white"}}>
                Follow us on ...
            </Col>
            <Col>
                <Row align="middle" gutter={[8, 8]}>
                    <Col>
                        {/*<Language />*/}
                    </Col>
                    <Col>
                        <AccountOption />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default TopHeader;
