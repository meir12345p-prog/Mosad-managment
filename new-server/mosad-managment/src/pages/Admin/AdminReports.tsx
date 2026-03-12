import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import './AdminReports.css'

interface Reports {
  id : string,
  userId : string,
  agentCode : string,
  category : string,
  urgency : string ;
  message : string;
  createAt : string; 
}

const AdminReports : React.FC = () =>{
  
  const [category , setCategory] = useState('')
  const [urgency , setUrgency] = useState('')
  const [message , setMessage] = useState('')
  const [reports , setReports] = useState<Reports []>([])
  const [error , setError] = useState<string|null>(null)

  const navigate = useNavigate()

  useEffect( ()=>{

  const getReports = async ()=>{
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
    const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (urgency) params.append('urgency', urgency);
      if (message) params.append('message', message);
    
    
    const reports = await fetch(`http://localhost:3021/reports?${params.toString()}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        const data = await reports.json()

        if (!reports.ok) {
          throw new Error(data.error || 'Failed to fetch reports')
        }

        setReports(data)
        setError(null)
      } catch (err: any) {
        setError(err.message || 'Server error')
      }

}
    getReports()
  },[category,urgency,message])

 const back =() =>{
    navigate('/admin/dashboard')
  }
  

  return (
    <div>
      <div className='nav'>
      <h1>admin reports</h1>
       <button onClick={back}>Back</button>
       </div>
      <div className='search-card'>
        <input type="text" placeholder='' onChange={(e) => setMessage(e.target.value)} />
        <select onChange={(e)=>setCategory(e.target.value)}>
          <option value="" >all category</option>
          <option value="Security">Security</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Safety">Safety</option>
        </select>
        <select onChange={(e)=>setUrgency(e.target.value)}>
          <option value="">all urgency</option>
          <option value="extreme">extreme</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="low">low</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>UserID</th>
            <th>Category</th>
            <th>Urgency</th>
            <th>Message</th>
            <th>Create Date</th>
          </tr>
          </thead>
          <tbody>
            {Array.isArray(reports) &&reports.map((report:any) =>(
              <tr>
                <td>{report.id}</td>
                <td>{report.userId}</td>
                <td>{report.category}</td>
                <td>{report.urgency}</td>
                <td>{report.message}</td>
                <td>{report.createAt}</td>
              </tr>
            ))}
          </tbody>
        


      </table>
      {reports.length === 0 && <p>{error}</p>}
    </div>
  )


}
  

export default AdminReports
