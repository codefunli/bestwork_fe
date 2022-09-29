import { Outlet } from "react-router-dom";
import './auth.scss';

export default function AuthComponent() {
    return (
        <div className="auth-wrapper">
            <Outlet/>
        </div>
    )
}