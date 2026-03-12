import { useNavigate } from 'react-router'
import { useEffect } from 'react'
const AgentDashboard : React.FC = ()=> {
  const userData = localStorage.getItem('user')
  const checkUser = userData ? JSON.parse(userData) : null

  const navigate = useNavigate()

  useEffect(()=>{
    if(!localStorage.getItem('token')){
      navigate('/')
    }

  },[])
  const toMe = () => {
    navigate('/agent/my')

  }

  const toReports =() =>{
    return navigate('/agent/reports')
    
  }

  const toUplaodFile = () =>{
    navigate('/agent/reports/csv')
  }

  return (
    <div>
      <h1>Welcome {checkUser[2]}</h1>
      <div className='admin-btn'>
          <button className='btn' onClick={toMe}>My Reports</button>
          <button className='btn' onClick={toReports}>Add Reports</button>
          <button className='btn' onClick={toUplaodFile}>Add csv file</button>
      </div>
    </div>
  )

}
export default AgentDashboard
