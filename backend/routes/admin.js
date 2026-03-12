import express from 'express'
import authMiddleware from '../middleware/middleAuth.js'
import { atbash } from '../utiels/atbashPassword.js'
import fs from 'fs'
const admin = express()

let id = 3
admin.post('/users', authMiddleware , async (req , res)=>{
    try{
        if(req.payload.role.toLowerCase() !== 'admin'){
            return res.status(404).json({error : 'only access to admin'})

        }
    const {agentCode, fullName, role} = req.body  
    if(!agentCode || !fullName || !role){
        return res.status(500).json({error : 'missing fields'})
    }

    const usersData = JSON.parse(await fs.promises.readFile('data/users.json','utf8'))

    const newUser = {
        id : String(id),
        agentCode,
        fullName,
        role,
        password : atbash(fullName) ,
        createdAt : new Date().toDateString()
    }

    usersData.push(newUser)
    await fs.promises.writeFile('data/users.json' , JSON.stringify(usersData , null,2))

    res.status(201).json({user : newUser})
    id +=1

    }catch(err){
        console.log(err)
        res.status(500).json({error: 'server faild'})
        
    }
})

admin.get('/users' , authMiddleware , async (req , res)=>{

    try{
        const {role} = req.payload

        if(role.toLowerCase() !== 'admin'){
            return res.status(403).json({error:'access to admin only'})
        }

        const usersData = JSON.parse(await fs.promises.readFile('data/users.json','utf8'))

        res.status(200).json({users : usersData})


    }catch(err){
        console.log(err)
        res.status(500).json({error: 'server faild'})
        
    }

}
)

export default admin