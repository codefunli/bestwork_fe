import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './auth.scss';

export default function AuthComponent() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/login")
    },[])

    return (
        <div className="auth-wrapper">
            <Outlet/>
        </div>
    )
}