import {
    createBrowserRouter,
    RouterProvider,
    Outlet
} from "react-router-dom";
import Login from "./pages/login/index.jsx";
import Header from "./components/header/index.jsx";
import Footer from "./components/footer/index.jsx";

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
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            errorElement: <div>404</div>,
            children: [
                {index: true, element: <div>Home1</div>},
                {
                    path: "contacts",
                    element: <div>contact</div>,
                },
                {
                    path: "/login",
                    element: <Login />,
                },
            ],
        },
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}
