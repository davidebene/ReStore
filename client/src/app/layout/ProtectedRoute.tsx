import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";

const ProtectedRoute = ({ children, ...props } : any) => {
    const {user} = useAppSelector(state => state.account);
    if (!user) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
  };

export default ProtectedRoute;