import { Outlet } from "react-router-dom";
import "./login.scss";

export default function AuthComponent() {
    return (
        <div className="login-wrapper">
            <div className="login-form-wrapper">
                <Outlet/>
            </div>
        </div>
    )
}