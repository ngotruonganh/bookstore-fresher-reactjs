import {Col, Divider, message, Popover, Row} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useSelector} from "react-redux";

const AccountOption = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const user = useSelector(state => state.account.user);
    const token = localStorage.getItem('access_token');
    const handleLogout = async () => {
        await localStorage.removeItem('access_token');
        message.success("Logout success");
        navigate('/auth/login');
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
                                {token ? (
                                        <Link to='/admin' style={{color: "black"}}>Admin</Link>) :
                                    (
                                        <Link to='/admin' style={{color: "black"}}>Admin</Link>
                                    )
                                }
                            </Col>
                            <Divider/>
                            <Col span={24}>
                                {token ? (
                                    <Link to='/action/order-history' style={{color: "black"}}>My Purchase</Link>
                                ) : (
                                    <Link to='/auth/login' style={{color: "black"}}>My Purchase</Link>
                                )
                                }
                            </Col>
                            <Divider/>
                            <Col span={24}>
                                {token ? (
                                        <Link onClick={handleLogout} style={{color: "black"}}>Logout</Link>
                                    ) :
                                    <Link to='/auth/login' style={{color: "black"}}>Login</Link>
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
                    <Link to='/auth/login' style={{color: 'white', cursor: 'pointer'}}>
                        <p style={{color: 'white', cursor: 'pointer'}}>Login</p>
                    </Link>
                    {/*<Link to='/auth/register' style={{color: 'white', cursor: 'pointer'}}>Sign up</Link>*/}
                </>
            )}
        </>
    );
};

export default AccountOption;
