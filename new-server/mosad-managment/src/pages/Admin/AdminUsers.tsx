import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import axios, { AxiosError } from 'axios'
import type { User } from '../../types/auth';
import './AdminUsers.css'
interface users {
  agentCode : string;
  fullName : string ;
  roll : string;
  token : string
  user : User
}


const AdminReports : React.FC = () =>{
  const [agentCode , setAgentCode] = useState<string>('')
  const [fullName , setFullName] = useState<string>('')
  const [role , setRole] = useState<string>('')
  const [users , setUsers] = useState<any[]>([])
  const [error , setError] = useState<string|null>(null)

  const navigate = useNavigate()

  useEffect( ()=>{

  const getUsers = async ()=>{
  if(!localStorage.getItem('token')){
    navigate('/')
  }
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  const checkUser = user ? JSON.parse(user) : null

  if(checkUser[3] !== 'admin'){
    navigate('/agent/dashboard')
  }

  try
  
  {

      
    const reports = await fetch(`http://localhost:3021/admin/users`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        const data = await reports.json()
        console.log(data.users);
        
        
        if (!reports.ok) {
          throw new Error(data.error || 'Failed to fetch reports')
        }

        setUsers(data.users)
        setError(null)
      } catch (err: any) {
        setError(err.message || 'Server error')
      }

}
    getUsers()
  },[])

  const handleSubmit = async (e:React.FormEvent) =>{
        e.preventDefault()
        setError(null)
    

    try{
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      const checkUser = user ? JSON.parse(user) : null

    if(checkUser[3] !== 'admin'){
      navigate('/agent/dashboard')
  }

        const res = await axios.post<users>('http://localhost:3021/admin/users',
        {  agentCode,
          fullName,
          role} ,{headers : {Authorization : `Bearer ${token}`}}
            
        )

        const newUser = res.data.user
        console.log(newUser);
        
        setUsers((user) => [...user , newUser])
        
        setAgentCode('')
        setFullName('')
        setRole('')
    }catch(err){
        const errorServer = err as AxiosError <{error:string}>
        setError(errorServer.response?.data?.error || 'faild to add user')
    }
}

 const back =() =>{
    navigate('/admin/dashboard')
  }
  return (
    <div>
      <div className='nav'>
      <h1>admin reports</h1>
       <button onClick={back}>Back</button>
       </div>
      <section className='flex-users'>
      <div className='user-card'>
        <form className="login" onSubmit={handleSubmit}>
        <label>Agent Code: </label>
        <input type="text" placeholder='enter agent code' onChange={(e) => setAgentCode(e.target.value)} />
        <label>Agent Name: </label>
        <input type="text" placeholder='enter full name' onChange={(e) => setFullName(e.target.value)} />
        <label>Agent Role: </label>
        <select value={role} onChange={(e)=>setRole(e.target.value)}>
          <option value="">select Roll</option>
          <option value="admin">Admin</option>
          <option value="agent">Agent</option>
        </select>
        {error && (<div className="err-button" >{error}</div>)}<div>
            <button className="login-btn" type="submit">Create</button>
        </div>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>agentCode</th>
            <th>fullName</th>
            <th>role</th>
            <th>createdAt</th>
          </tr>
          </thead>
          <tbody>
            {Array.isArray(users) &&users.map((user:any) =>(
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.agentCode}</td>
                <td>{user.fullName}</td>
                <td>{user.role}</td>
                <td>{user.createdAt}</td>
                <td>{user.createAt}</td>
              </tr>
            ))}
          </tbody>
      </table>
       </section>
    </div>
  )


}
  

export default AdminReports
