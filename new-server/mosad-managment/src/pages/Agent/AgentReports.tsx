
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface Report {
  id: string;
  userId: string;
  category: string;
  urgency: string;
  message: string;
  createAt: string;
}

const MyReports : React.FC = () =>{

    const [reports , setReports] = useState<Report[]>([])
    const [error , setError] = useState<string| null>(null)
     const navigate = useNavigate()
    useEffect(()=>{

        const getReports = async ()=>{
            const token = localStorage.getItem('token')

       

            try{
         const res = await fetch(`http://localhost:3021/reports`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
         const data = await  res.json()
         if (!res.ok) {
          throw new Error(data.error || 'Failed to fetch reports');
        }
    
         setReports(Array.isArray(data) ? data : [])
        
         
        
        }catch(err : any){  
            setError(err.message || 'server error')
        }

         
         
        }

        getReports()
    },[])
 console.log(reports);
    const back =() =>{
    navigate('/agent/dashboard')
  }

    return(
        <div>
        <div className="nav">
            <h1>Welcome agent Jon english</h1>
            <button onClick={back}>back</button>
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
            <th>Image</th>
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
                <td>{report.imagePath ? (
    <img 
    height={75}
    width={120}
    src={`http://localhost:3021/${report.imagePath}`}
    alt="image"
    />
  ) : (
    <span>No Image</span>
  )}</td>
              </tr>
            ))}
          </tbody>
      </table>
      {error && (<div className="err-button" >{error}</div>)}
        
        
        </div>
    )

}

export default MyReports