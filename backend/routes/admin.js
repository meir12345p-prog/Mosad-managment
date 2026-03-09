import express from 'express'
import authMiddleware from '../middleware/middleAuth.js'
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs'
const admin = express()


admin.post('/', authMiddleware , async (req , res)=>{
    try{
        if(req.payload.role.toLowerCase() !== 'admin'){
            return res.status(404).json({error : 'only access to admin'})

        }
    const {agentCode, fullName, role} = req.body
    if(!agentCode || !fullName || role){
        return res.status(404).json({error : 'missing fields'})
    }

    const usersData = JSON.parse(await fs.promises.readFile('data/users.json','utf8'))

    const newUser = {
        id : uuidv4(),
        agentCode,
        fullName,
        role,
        password : '1',
        createdAt : new Date().toDateString()
    }

    userData.push(newUser)
    await fs.promises.writeFile('data/users.json' , JSON.stringify(usersData , null,2))

    res.status(201).json({user : newUser})


    }catch(err){
        console.log(err)
        res.status(500).json({error: 'server faild'})
        
    }
})

admin.get('/' , authMiddleware , async (req , res)=>{

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