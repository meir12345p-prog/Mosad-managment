import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
interface Report {
  category : string;
  urgency : string ;
  message : string;

  
}

const AgentAddReports : React.FC = ()=> {

    const [category , setCategory] = useState('')
    const [urgency , setUrgency] = useState('')
    const [message , setMessage] = useState('')
    const [file , setFile] = useState<File| string>('')
    const [error , setError] = useState<any|null>(null)
    const navigate = useNavigate()
 

  useEffect(()=>{
    if(!localStorage.getItem('token')){
      navigate('/')
    }

  },[])

   const back =() =>{
    navigate('/agent/dashboard')
  }

    const handleSubmit = async (e:React.FormEvent) =>{
        e.preventDefault()
        setError(null)
    

    try{
        const report : Report = {
            category : category,
            urgency : urgency,
            message : message
        }
        const formData = new FormData()
        formData.append('image', file)
        formData.append('report' , JSON.stringify(report))

      const token = localStorage.getItem('token')
        const res = await axios.post<Report>('http://localhost:3021/reports', formData,
            {headers : {Authorization : `Bearer ${token}`}}
            
        )
         const data = res.data
         console.log(data);
         
        
        setCategory('')
        setUrgency('')
        setMessage('')
        setError(null)
        alert("Report created successfully!")
    }catch(err){
        const errorServer = err as AxiosError <{error:string}>
        setError(errorServer.response?.data?.error || 'faild to add report')
    }
}
  
  return (
    <div>
      <div className="nav">
            <h1>Ready to add your report agent Jon english</h1>
            <button onClick={back}>back</button>
        </div>
        <div >
        <form className="login" onSubmit={handleSubmit}>
       <div className='search-card'>
        <label>Category :</label>
        <select onChange={(e)=>setCategory(e.target.value)}>
          <option value="" disabled >Select category</option>
          <option value="Security">Security</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Safety">Safety</option>
        </select>
        <label>Urgency :</label>
        <select onChange={(e)=>setUrgency(e.target.value)}>
          <option value="" disabled>Select urgency</option>
          <option value="extreme">extreme</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="low">low</option>
        </select>
        <label>Message :</label>
         <input height={170} type="text" placeholder='message...' onChange={(e) => setMessage(e.target.value)} />
         <label>Chose your file :</label>
         <input type="file" onChange={(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => { if (e.target.files !== null && e.target.files[0] !== null) { setFile(e.target.files[0]) }}} />
         <button className='login-btn' type='submit'> Create </button>
      </div>
        </form>
        {error && (<div className="err-button" >{error}</div>)}
      </div>
      
    </div>
  )

}
export default AgentAddReports