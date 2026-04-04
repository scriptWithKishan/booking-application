import { useState } from "react"
import axios from "axios"

import { Input } from "../UI/Input/style"
import { Button } from "../UI/Button/style"
import { Card } from "../UI/Card/style"
import { TriangleAlert, BadgeCheck } from "lucide-react"

const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const signupUrl = `${import.meta.env.VITE_BACKEND_URI}/auth/signup`

        try {
            setLoading(true)
            const response = await axios.post(signupUrl, {
                username,
                password
            })
            setLoading(false)
            setError("")
            setUsername("")
            setPassword("")
            setSuccess(response.data.message)
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

            {success && 
                <Card backgroundColor="green" shadowSize="4" size="sm" className="text-white flex items-center gap-x-2">
                    <BadgeCheck />{success}
                </Card>
            }

            <Button disabled={loading} animated={!loading} className="cursor-pointer" textColor="white" backgroundColor="#0eb037" type="submit">Sign up</Button>
        </form>
    )
}

export default Register