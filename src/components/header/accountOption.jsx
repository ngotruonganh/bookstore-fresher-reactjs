import {Button, Col, Divider, message, Popover, Row, Space} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

const AccountOption = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');
    const handleLogout = async () => {
        await localStorage.removeItem('access_token');
        message.success("Logout success");
        navigate('/auth/login');
        setOpen(false);
    }
    const [open, setOpen] = useState(false);
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    return (
        <Popover
            content={
                <Row>
                    <Col span={24}>
                        {token ? (
                            <Link to='/action/order-history' style={{color: "black"}}>My Purchase</Link>
                            ) : (
                            <Link to='/auth/login' style={{color: "black"}}>My Purchase</Link>
                            )
                        }
                    </Col>
                    <Divider />
                    <Col span={24}>
                        {token ? (
                            <Link onClick={handleLogout} style={{color: "black"}}>Logout</Link>
                        ) :
                            <Link to='/auth/login' style={{color: "black"}}>Login</Link>
                        }
                    </Col>
                </Row>
            }
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
            style={{backgroundColor: "white", color: 'black'}}
        >
            <Button type="primary" style={{backgroundColor: 'transparent'}}>Account</Button>
        </Popover>
    );
};

export default AccountOption;
