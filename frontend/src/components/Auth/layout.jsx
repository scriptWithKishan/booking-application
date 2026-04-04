import { Navigate, Outlet, useNavigate, useLocation } from "react-router"
import Cookies from "js-cookie"

import { Button } from "../UI/Button/style"
import { Card } from "../UI/Card/style"

import './style.css'

const AuthLayout = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const showLogin = location.pathname === "/login"

    const handleLogin = () => {
        navigate("/login")
    }

    const handleSignUp = () => {
        navigate("/sign-up")
    }

    const jwtToken = Cookies.get('jwtToken')

    if (jwtToken) {
        return <Navigate to="/" />
    }

    return (
        <div className="login-background min-h-screen bg-[#fcfcfc] flex items-center justify-center">
            <div className="flex flex-col gap-y-2">
                <div className="flex items-center gap-x-2">
                    <Button disabled={showLogin} animated={!showLogin} onClick={handleLogin} size="sm" className="cursor-pointer">
                        Login
                    </Button>
                    <Button disabled={!showLogin} animated={showLogin} onClick={handleSignUp} size="sm" className="cursor-pointer">
                        Sign up
                    </Button>
                </div>
                <Card size="xl">
                    <h1 className="text-2xl font-extrabold mb-2">{showLogin ? "Login" : "Sign up"}</h1>
                    <Outlet />
                </Card>
            </div>
        </div>
    )
}

export default AuthLayout