import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const user = useSelector(state => state.account.isAuthenticated);
    if (user) {
        return children;
    }
    return <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
