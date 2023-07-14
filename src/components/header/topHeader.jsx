import {Col, Row, Typography} from "antd";
import AccountOption from "./accountOption.jsx";
import {Link} from "react-router-dom";
import {MailOutlined} from "@ant-design/icons";

const TopHeader = () => {
    return (
        <Row
            justify="space-between"
            align='middle'
            style={{marginTop: '5px', padding: '5px 0'}}
        >
            <Col style={{display: 'flex', alignItems: 'center', color: "white"}}>
                <Typography.Paragraph style={{color: 'white'}}>
                    Contact me:&nbsp;
                </Typography.Paragraph>
                <Link to='mailto: ngotruonganh1901@gmail.com'>
                    <Typography.Paragraph
                        style={{color: 'white', textDecoration: 'underline'}}
                    >
                        <MailOutlined />
                    </Typography.Paragraph>
                </Link>
            </Col>
            <Col>
                <Row align="middle" gutter={[8, 8]}>
                    <Col>
                        {/*<Language />*/}
                    </Col>
                    <Col>
                        <AccountOption/>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default TopHeader;
