import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";


const AgentCsvUpload : React.FC = () =>{


    const [csv , setCsv] = useState<File | null>(null)
    const [error , setError] = useState<string |null>(null)
    const [flag , setFlag] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault()
        setError(null)
        setFlag(false)

        if(!localStorage.getItem('token')){
            navigate('/')
        }

        try{
            if(csv){
            const token = localStorage.getItem('token')

            const formData = new FormData()
            formData.append('file' , csv)

            const res = await axios.post('http://localhost:3021/reports/csv',formData,
                {headers : {Authorization : `Bearer ${token}`}}
            )
            setFlag(res.data.message)
            setError(null)}
        }catch(err){
         const   errorServer = err as AxiosError <{error:string}>
         setError(errorServer.response?.data.error || 'faild to upload csv')

        }
        
    }

    const back = ()=>{
        navigate('/agent/dashboard')
    }



    return (
        <div>
             <div className="nav">
            <h1>Ready to add your report agent Jon english</h1>
            <button onClick={back}>back</button>
        </div>
        <br></br>
            <form className="search-card" >
                 <input type="file"onChange={(e:React.ChangeEvent<HTMLInputElement,HTMLInputElement>) => {if(e.target.files!==null && e.target.files[0] !== null){setCsv(e.target.files[0])}}}  />
                 <button type="submit" onClick={(e) => handleSubmit(e)} >Send</button>
                 {error && (<div className="err-button" >{error}</div>)}
                 {flag && (<div className="flag">upload file</div>)}
            </form>
           
        </div>
    )
}

export default AgentCsvUpload