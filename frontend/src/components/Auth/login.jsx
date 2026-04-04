import { useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { useNavigate } from "react-router"

import { Input } from "../UI/Input/style"
import { Button } from "../UI/Button/style"
import { Card } from "../UI/Card/style"
import { TriangleAlert } from "lucide-react"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const loginUrl = `${import.meta.env.VITE_BACKEND_URI}/auth/login`

        try {
            setLoading(true)
            const response = await axios.post(loginUrl, {
                username,
                password
            })
            Cookies.set('jwtToken', response.data.token, { expires: 7 })
            setLoading(false)
            setError("")
            navigate("/")
        } catch (err) {
            setError(err.response.data.message)
            setLoading(false)
        }
    }

    return (
        <form className="flex flex-col gap-y-2" onSubmit={handleSubmit}>

            <Input disabled={loading} type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <Input disabled={loading} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

            {error && 
                <Card backgroundColor="red" shadowSize="4" size="sm" className="text-white flex items-center gap-x-2">
                    <TriangleAlert />{error}
                </Card>
            }

            <Button disabled={loading} animated={!loading} className="cursor-pointer" textColor="white" backgroundColor="#0eb037" type="submit">Login</Button>
        </form>
    )
}

export default Login