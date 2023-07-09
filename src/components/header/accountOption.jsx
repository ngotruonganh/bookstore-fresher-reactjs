import {Col, Divider, message, Popover, Row, Typography} from "antd";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutAction} from "../../redux/account/accountSlice.jsx";

const AccountOption = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const user = useSelector(state => state.account.user);
    const token = localStorage.getItem('access_token');
    const dispatch = useDispatch();
    const handleLogout = async () => {
        // await logout();
        localStorage.removeItem('access_token');
        message.success("Logout success");
        dispatch(logoutAction());
        navigate('/auth');
        setOpen(false);
    }
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    return (
        <>
            {token ? (
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
                                {token ? (
                                        <Typography.Paragraph onClick={handleLogout} style={{color: "black"}}>Logout</Typography.Paragraph>
                                    ) :
                                    <Link to='/auth' style={{color: "black"}}>Login</Link>
                                }
                            </Col>
                        </Row>
                    }
                    trigger="hover"
                    open={open}
                    onOpenChange={handleOpenChange}
                    placement='bottomRight'
                >
                    <p style={{color: 'white', cursor: 'pointer'}}>{user.fullName}</p>
                </Popover>
            ) : (
                <>
                    <Link to='/auth' style={{color: 'white', cursor: 'pointer'}}>
                        <p style={{color: 'white', cursor: 'pointer'}}>Login</p>
                    </Link>
                    {/*<Link to='/auth/register' style={{color: 'white', cursor: 'pointer'}}>Sign up</Link>*/}
                </>
            )}
        </>
    );
};

export default AccountOption;
