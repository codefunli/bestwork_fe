import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import './auth.scss';
import MLanguage from "../shared-components/language/m-language";

export default function AuthComponent() {
    const navigate = useNavigate();
    
    useEffect(() => {
        navigate("/login")
    },[])

    return (
        <div className="auth-wrapper">
            <MLanguage color="primary"/>
            <div className="login-wrapper">
                <Outlet/>
            </div>
        </div>
    )
}