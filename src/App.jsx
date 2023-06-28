import {
    createBrowserRouter,
    RouterProvider,
    Outlet
} from "react-router-dom";
import {useEffect} from "react";
import {callFetchAccount} from "./services/useServer.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getAccountAction} from "./redux/account/accountSlice.jsx";

import Login from "./pages/login";
import Header from "./components/header";
import Footer from "./components/footer";
import Register from "./pages/register";
import Admin from "./pages/admin";
import Home from "./pages/home";
import BookDetail from "./pages/bookDetail"
import Loading from "./components/loading";
import Order from "./pages/order/index.jsx";

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default function App() {
    const dispatch = useDispatch();
    const getAccount = async () => {
        const res = await callFetchAccount();
        if(res && res.data){
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
            element: <Layout />,
            errorElement: <div>404</div>,
            children: [
                {index: true, element: <Home />},
                {
                    path: "admin",
                    element: <Admin />,
                },
                {
                    path: "login",
                    element: <Login />,
                },
                {
                    path: "register",
                    element: <Register />,
                },
                {
                    path: ":id",
                    element: <BookDetail />
                },
                {
                    path: "order",
                    element: <Order />
                }
            ],
        },
    ]);

    return (
        <>
            {/*{isAuthenticated ? <RouterProvider router={router} /> : <Loading />*/}
            <RouterProvider router={router} />
        </>
    );
}
