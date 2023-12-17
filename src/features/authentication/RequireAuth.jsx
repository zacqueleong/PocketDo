import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function RequireAuth({ children }) {
    const token = useContext(AuthContext).token;
    // Navigate back to login page if no token detected
    if (!token) {
        return <Navigate to="/login" replace />
    }
    return children; 
}

export default RequireAuth;