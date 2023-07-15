import {Col, Row} from "antd";
import './styles/global.scss';
import {useEffect} from "react";
import {
    createBrowserRouter,
    Navigate,
    Outlet,
    RouterProvider,
} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    TopHeader,
    BottomHeaderWithCart,
    BottomHeaderNoCart
} from "./components/header";
import ProtectedRoute from "./components/protectedRoute/index.jsx";
import Login from "./pages/login";
import Register from "./pages/register";
import Admin from "./pages/admin";
import Dashboard from "./pages/admin/dashboard.jsx";
import ManageUsers from "./pages/admin/manageUsers.jsx";
import ManageBooks from "./pages/admin/manageBooks.jsx";
import Home from "./pages/home";
import BookDetail from "./pages/bookDetail"
import Order from "./pages/order/index.jsx";
import OrderHistory from "./pages/orderHistory/index.jsx";
import Checkout from "./pages/checkout/index.jsx";
import NotFound from "./pages/notFound/index.jsx";

import {callFetchAccount} from "./services/auth.jsx";
import {getLoginAction, loginAction} from "./redux/account/accountSlice.jsx";

const MainLayout = () => {
    return (
        <>
            <Row justify="center" className='header'>
                <Col xs={23} xl={20}>
                    <TopHeader />
                    <BottomHeaderWithCart />
                </Col>
            </Row>
            <Row justify="center" style={{marginTop: "30px"}}>
                <Col xs={23} xl={20}>
                    <Outlet />
                </Col>
            </Row>
        </>
    )
}

const OrderLayout = () => {
    return (
        <>
            <Row justify="center" className='header'>
                <Col xs={23} xl={20}>
                    <TopHeader />
                    <BottomHeaderNoCart />
                </Col>
            </Row>
            <Row justify="center" style={{marginTop: "30px"}}>
                <Col xs={23} xl={20}>
                    <Outlet />
                </Col>
            </Row>
        </>
    )
}

const AuthLayout = () => {
    return (
        <Row justify="center" align='middle' style={{height: '100vh'}}>
            <Col xs={23} xl={20}>
                <Outlet />
            </Col>
        </Row>
    )
}

const AdminLayout = () => {
    return (
        <>
            <Row justify="center" className='header'>
                <Col xs={23} xl={20}>
                    <TopHeader />
                    <BottomHeaderNoCart />
                </Col>
            </Row>
            <Row gutter={[16, 16]} justify="center" style={{marginTop: "30px"}}>
                <Col span={5}>
                    <Admin />
                </Col>
                <Col span={18}>
                    <Outlet />
                </Col>
            </Row>
        </>
    )
}

export default function App() {
    const dispatch = useDispatch();
    const orderList = useSelector(state => state.order.cart);
    const buyNowItem = useSelector(state => state.order.cartBuyNow);

    const loginAccount = async () => {
        const res = await callFetchAccount();
        if (res && res.data) {
            dispatch(getLoginAction(res.data.data.user));
        }
    }
    const user = useSelector(state => state.account.isAuthenticated);

    useEffect(() => {
        loginAccount();
    }, [user]);

    const IsLogin = ({children}) => {
        const user = useSelector(state => state.account.isAuthenticated);
        if (!user) {
            return children;
        }
        return <Navigate to="/" replace />;
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout />,
            errorElement: <NotFound />,
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
            element: <AdminLayout />,
            errorElement: <NotFound />,
            children: [
                {
                    index: true, element:
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                },
                {
                    path: 'user',
                    element:
                        <ProtectedRoute>
                            <ManageUsers />
                        </ProtectedRoute>
                },
                {
                    path: 'book',
                    element:
                        <ProtectedRoute>
                            <ManageBooks />
                        </ProtectedRoute>
                }
            ]
        },
        {
            path: '/auth',
            element: <AuthLayout />,
            errorElement: <NotFound />,
            children: [
                {index: true,
                    element:
                        // <IsLogin>
                            <Login />
                        // </IsLogin>
                },
                {
                    path: "register",
                    element:
                        // <IsLogin>
                            <Register />
                        // </IsLogin>
                },
            ]
        },
        {
            path: '/order',
            element: <OrderLayout />,
            errorElement: <NotFound />,
            children: [
                {index: true, element:
                    <ProtectedRoute>
                        <Order />
                    </ProtectedRoute>
                },
                {
                    path: 'buy-now',
                    element:
                        <ProtectedRoute>
                            <Checkout orderList={buyNowItem} />
                        </ProtectedRoute>
                },
                {
                    path: 'checkout',
                    element:
                        <ProtectedRoute>
                            <Checkout orderList={orderList} />
                        </ProtectedRoute>
                },
                {
                    path: 'order-history',
                    element:
                        <ProtectedRoute>
                            <OrderHistory />
                        </ProtectedRoute>
                },
            ]
        }
    ]);

    return (
        <>
            {/*{isAuthenticated ? <RouterProvider router={router} /> : <Loading />*/}
            <RouterProvider router={router} />
        </>
    );
}
