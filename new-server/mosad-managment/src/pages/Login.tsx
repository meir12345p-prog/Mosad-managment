import React, {  useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate  } from "react-router-dom";
import type { loginType } from "../types/auth"; 
import './Login.css'


const Login : React.FC = ()=>{
    const [agentCode , setAgentCode] = useState<string>('')
    const [password , setPassword] = useState<string>('')
    const [error , setError] = useState<string|null>(null)

    const navigate = useNavigate();

    const handleSubmit = async (e:React.FormEvent) =>{
        e.preventDefault()
        setError(null)
    

    try{

        const res = await axios.post<loginType>('http://localhost:3021/auth/login',{
            agentCode,
            password
        })

        localStorage.setItem('token' , res.data.token)
        localStorage.setItem('user',JSON.stringify(res.data.user))
        const dataUser = res.data.user 
        
        if(dataUser[3] === 'admin'){
            navigate('/admin/dashboard')
        }
        if(dataUser[3] === 'agent'){
                navigate('/agent/dashboard')
        }

        

    }catch(err){
        const errorServer = err as AxiosError <{error:string}>
        setError(errorServer.response?.data?.error || 'Login failed')
    }
}

return (
    <div className="login-container">
        <h2>login page</h2>
        <div className="login-card">
        <form className="login" onSubmit={handleSubmit}>
            
         <div className="input">
        <label>Agent Name: </label>
        <input
         type="text" 
         value={agentCode}
         onChange={(e)=>setAgentCode(e.target.value)}
        /></div>
        <div className="input">
            <label>Password : </label>
            <input 
            type="text"
            value={password}
            onChange={(e) =>setPassword(e.target.value)}
             />
        </div>
        <div>
            <button className="login-btn" type="submit">Login</button>
        </div>
         {error && (<div className="err-button" >{error}</div>)}
        </form>
        </div>
       
    </div>
    
    
)
}

export default Login