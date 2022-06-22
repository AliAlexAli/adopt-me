import { useContext } from "react";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const AuthPages = () => {
    const context = useOutletContext()
    const isLoggedin = useContext(AuthContext).isLoggedin

    if (isLoggedin) return <Outlet context={context} />
    return <Navigate to="/bejelentkezes" />
}

export default AuthPages;