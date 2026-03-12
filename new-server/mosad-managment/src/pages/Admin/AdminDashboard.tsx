
import { useNavigate } from 'react-router'
import './AdminDashboard.css'
import { useEffect } from 'react'
const AdminDashboard : React.FC = ()=> {
  const userData = localStorage.getItem('user')
  const checkUser = userData ? JSON.parse(userData) : null

  const navigate = useNavigate()

  useEffect(()=>{
    if(!localStorage.getItem('token')){
      navigate('/')
    }

  },[])
  const toUsers = () => {
    navigate('/admin/users')

  }

  const toReports =() =>{
    navigate('/admin/reports')
  }

  return (
    <div>
      <h1>Welcome Admin {checkUser[2]}</h1>
      <div className='admin-btn'>
        <div>

           <button className='btn' onClick={toUsers}>Users</button>
        </div>
   
        <button className='btn' onClick={toReports}>Report</button>
      </div>
    </div>
  )

}
export default AdminDashboard
