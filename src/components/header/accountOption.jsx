import {Col, Divider, message, Popover, Row, Typography} from "antd";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutAction} from "../../redux/account/accountSlice.jsx";
import {emptyCart} from "../../redux/order/orderSlice.jsx";

const linkAuth = {
    color: 'white',
    cursor: 'pointer',
}

const AccountOption = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isAuth = useSelector(state => state.account.isAuthenticated);
    const user = useSelector(state => state.account.user);
    const handleLogout = async () => {
        // await logout();
        localStorage.removeItem('access_token');
        message.success("Logout success");
        dispatch(logoutAction());
        dispatch(emptyCart());
        navigate('/auth');
        setOpen(false);
    }
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    return (
        <>
            {isAuth ? (
                <Popover
                    content={
                        <Row>
                            <Col span={24}>
                                <Link to='/admin' style={{color: "black"}}>Admin</Link>
                            </Col>
                            <Divider/>
                            <Col span={24}>
                                <Link to='/order/order-history' style={{color: "black"}}>My Purchase</Link>
                            </Col>
                            <Divider/>
                            <Col span={24}>
                                <Typography.Paragraph
                                    onClick={handleLogout}
                                    style={{cursor: 'pointer', color: "black"}}
                                >
                                    Logout
                                </Typography.Paragraph>
                            </Col>
                        </Row>
                    }
                    trigger="hover"
                    open={open}
                    onOpenChange={handleOpenChange}
                    placement='bottomRight'
                >
                    <Typography.Paragraph style={linkAuth}>{user.fullName}</Typography.Paragraph>
                </Popover>
            ) : (
                <>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Link to='/auth/register' style={linkAuth}>
                            Sign Up
                        </Link>
                        <Divider type='vertical' style={{backgroundColor: 'white'}}/>
                        <Link to='/auth' style={linkAuth}>
                            Login
                        </Link>
                    </div>
                </>
            )}
        </>
    );
};

export default AccountOption;
