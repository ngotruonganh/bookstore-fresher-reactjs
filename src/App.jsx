import {Col, Row} from "antd";
import './styles/global.scss';
import {createBrowserRouter, Navigate, Outlet, RouterProvider} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import Header from "./components/header";
import BottomHeader from "./components/header/bottomHeader.jsx";
import TopHeader from "./components/header/topHeader.jsx";
import Login from "./pages/login";
import Register from "./pages/register";
import Admin from "./pages/admin";
import Home from "./pages/home";
import BookDetail from "./pages/bookDetail"
import Order from "./pages/order/index.jsx";
import Checkout from "./pages/checkout/index.jsx";
import OrderHistory from "./pages/orderHistory/index.jsx";
import ManageBooks from "./pages/admin/manageBooks.jsx";
import Dashboard from "./pages/admin/dashboard.jsx";
import ManageUsers from "./pages/admin/manageUsers.jsx";

import {callFetchAccount} from "./services/auth.jsx";
import {getAccountAction} from "./redux/account/accountSlice.jsx";

const AdminLayout = () => {
    return (
        <>
            <Row justify="center" style={{backgroundColor: "#f53d2d"}}>
                <Col xs={23} xl={18}>
                    <TopHeader/>
                    <BottomHeader />
                </Col>
            </Row>
            <Row gutter={[16, 16]} justify="center" style={{marginTop: "30px"}}>
                <Col span={5}>
                    <Admin/>
                </Col>
                <Col span={17}>
                    <Outlet/>
                </Col>
            </Row>
        </>
    )
}

const MainLayout = () => {
    return (
        <>
            <Row justify="center" style={{backgroundColor: "#f53d2d"}}>
                <Col xs={23} xl={18}>
                    <Header/>
                </Col>
            </Row>
            <Row justify="center" style={{marginTop: "30px"}}>
                <Col xs={23} xl={18}>
                    <Outlet/>
                </Col>
            </Row>
            {/*<Row justify="center" style={{backgroundColor: "#f53d2d"}}>*/}
            {/*    <Col xs={23} xl={18}>*/}
            {/*        <Footer />*/}
            {/*    </Col>*/}
            {/*</Row>*/}
        </>
    )
}

const AuthLayout = () => {
    return (
        <Row justify="center" align='middle' style={{height: '100vh'}}>
            <Col xs={23} md={20} xl={18}>
                <Outlet/>
            </Col>
        </Row>
    )
}

const OrderLayout = () => {
    return (
        <>
            <Row justify="center" style={{backgroundColor: "#f53d2d"}}>
                <Col xs={23} xl={18}>
                    <TopHeader/>
                    <BottomHeader/>
                </Col>
            </Row>
            <Row justify="center" style={{marginTop: "30px"}}>
                <Col xs={23} xl={18}>
                    <Outlet/>
                </Col>
            </Row>
            {/*<Row justify="center" style={{backgroundColor: "#f53d2d"}}>*/}
            {/*    <Col xs={23} xl={18}>*/}
            {/*        <Footer />*/}
            {/*    </Col>*/}
            {/*</Row>*/}
        </>
    )
}

export default function App() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.account.isAuthenticated);
    const ProtectedRoute = ({ user, children }) => {
        if (!user) {
            return <Navigate to="/auth/" replace />;
        }
        return children;
    }

    const IsLogin = ({ user, children }) => {
        if (user) {
            return <Navigate to="/" replace />;
        }
        return children;
    }

    const getAccount = async () => {
        const res = await callFetchAccount();
        if (res && res.data) {
            dispatch(getAccountAction(res.data.data.user));
        }
    }

    useEffect(() => {
        getAccount();
    }, []);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout />,
            errorElement: <div>404</div>,
            children: [
                {index: true, element: <Home />},
                {
                    path: ":id",
                    element: <BookDetail />
                },
            ],
        },
        {
            path: "/admin",
            element:
                <ProtectedRoute user={user}>
                    <AdminLayout />
                </ProtectedRoute>,
            errorElement: <div>404</div>,
            children: [
                {index: true, element: <Dashboard />},
                {
                    path: 'user',
                    element:
                        <ProtectedRoute user={user}>
                            <ManageUsers />
                        </ProtectedRoute>
                },
                {
                    path: 'book',
                    element:
                        <ProtectedRoute user={user}>
                            <ManageBooks />
                        </ProtectedRoute>
                }
            ]
        },
        {
            path: '/auth',
            element: <AuthLayout />,
            errorElement: <div>404</div>,
            children: [
                {index: true,
                    element:
                        <IsLogin user={user}>
                            <Login />
                        </IsLogin>
                    },
                {
                    path: "register",
                    element:
                        <IsLogin user={user}>
                            <Register />
                        </IsLogin>
                    ,
                },
            ]
        },
        {
            path: '/order',
            element: <OrderLayout />,
            errorElement: <div>404</div>,
            children: [
                {index: true, element:
                    <ProtectedRoute user={user}>
                        <Order/>
                    </ProtectedRoute>
                },
                {
                    path: 'checkout',
                    element:
                        <ProtectedRoute user={user}>
                            <Checkout/>
                        </ProtectedRoute>
                },
                {
                    path: 'order-history',
                    element:
                        <ProtectedRoute user={user}>
                            <OrderHistory />
                        </ProtectedRoute>
                },
            ]
        }
    ]);

    return (
        <>
            {/*{isAuthenticated ? <RouterProvider router={router} /> : <Loading />*/}
            <RouterProvider router={router}/>
        </>
    );
}
