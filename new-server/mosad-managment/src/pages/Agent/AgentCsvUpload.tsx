import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";


const AgentCsvUpload : React.FC = () =>{


    const [csv , setCsv] = useState<File | null>(null)
    const [error , setError] = useState<string |null>(null)
    const navigate = useNavigate()

    const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault

    

        try{
            const token = localStorage.getItem('token')

            const formData = new FormData()
            formData.append('file' , JSON.stringify(csv))

            const res = await axios.post('http://localhost:3021/reports/csv',formData,
                {headers : {Authorization : `Bearer ${token}`}}
            )
            console.log(res , csv);
            
            setError(null)
        }catch(err){
         const   errorServer = err as AxiosError <{error:string}>
         setError(errorServer.response?.data.error || 'faild to upload csv')

        }
        
    }



    return (
        <div>
            <form action="">
                 <input type="file"onChange={(e:React.ChangeEvent<HTMLInputElement,HTMLInputElement>) => {if(e.target.files!==null && e.target.files[0] !== null){setCsv(e.target.files[0])}}}  />
                 <button type="submit" onClick={(e) => handleSubmit(e)} >Send</button>
                 {error && (<div className="err-button" >{error}</div>)}
            </form>
           
        </div>
    )
}

export default AgentCsvUpload