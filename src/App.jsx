import {
    createBrowserRouter,
    RouterProvider,
    Outlet
} from "react-router-dom";
import Login from "./pages/login/index.jsx";
import Header from "./components/header/index.jsx";
import Footer from "./components/footer/index.jsx";
import Register from "./pages/register/index.jsx";
import axios from "./services/Axios.js";
import {useEffect} from "react";
import {callFetchAccount} from "./services/useServer.js";
import {useDispatch, useSelector} from "react-redux";
import {getAccountAction} from "./redux/account/accountSlice.js";
import Loading from "./components/loading/index.jsx";
import Admin from "./pages/admin/index.jsx";
import Home from "./pages/home/index.jsx";

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
                    path: "/login",
                    element: <Login />,
                },
                {
                    path: "/register",
                    element: <Register />,
                },
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
