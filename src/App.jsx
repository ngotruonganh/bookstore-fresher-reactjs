import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAccountAction} from "./redux/account/accountSlice.jsx";

import Login from "./pages/login";
import Header from "./components/header";
import Register from "./pages/register";
import Admin from "./pages/admin";
import Home from "./pages/home";
import BookDetail from "./pages/bookDetail"
import Order from "./pages/order/index.jsx";
import {Col, Row} from "antd";
import Checkout from "./pages/checkout/index.jsx";
import OrderHistory from "./pages/orderHistory/index.jsx";
import TopHeader from "./components/header/topHeader.jsx";
import BottomHeader from "./components/header/bottomHeader.jsx";
import './styles/global.scss';
import ManageBooks from "./pages/admin/manageBooks.jsx";
import Dashboard from "./pages/admin/dashboard.jsx";
import ManageUsers from "./pages/admin/manageUsers.jsx";
import {callFetchAccount} from "./services/auth.jsx";

const AdminLayout = () => {
    return (
        <>
            <Row justify="center" style={{backgroundColor: "#f53d2d"}}>
                <Col xs={23} xl={18}>
                    <TopHeader/>
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

const Layout = () => {
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

const LayoutSecond = () => {
    return (
        <Row justify="center" align='middle' style={{height: '100vh'}}>
            <Col xs={23} md={20} xl={18}>
                <Outlet/>
            </Col>
        </Row>
    )
}

const LayoutThird = () => {
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
    const getAccount = async () => {
        const res = await callFetchAccount();
        if (res && res.data) {
            dispatch(getAccountAction(res.data.data.user));
        }
    }

    useEffect(() => {
        getAccount();
    }, []);

    const isAuthenticated = useSelector(state => state.account.isAuthenticated);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout/>,
            errorElement: <div>404</div>,
            children: [
                {index: true, element: <Home/>},
                {
                    path: ":id",
                    element: <BookDetail/>
                },
            ],
        },
        {
            path: "/admin/",
            element: <AdminLayout/>,
            children: [
                {index: true, element: <Dashboard/>},
                {
                    path: 'user',
                    element: <ManageUsers/>
                },
                {
                    path: 'book',
                    element: <ManageBooks/>
                }
            ]
        },
        {
            path: '/auth/',
            element: <LayoutSecond/>,
            children: [
                {index: true, element: <Login/>},
                {
                    path: "login",
                    element: <Login/>,
                },
                {
                    path: "register",
                    element: <Register/>,
                },
            ]
        },
        {
            path: '/action/',
            element: <LayoutThird/>,
            children: [
                {index: true, element: <Order/>},
                {
                    path: "order",
                    element: <Order/>
                },
                {
                    path: 'checkout',
                    element: <Checkout/>
                },
                {
                    path: 'order-history',
                    element: <OrderHistory/>
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
