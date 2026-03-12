import express from 'express'
import fs from 'fs'
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import authMiddleware from '../middleware/middleAuth.js'
export const auth = express.Router()

auth.post('/login', async (req, res)=>{

    try{
    const {agentCode , password} = req.body

    if(!agentCode  || !password){

       return res.status(404).json({
            error : 'missing fields'
            
        })

    }
    
    const data = JSON.parse(await fs.promises.readFile('data/users.json','utf8'))
   const user = data.find(u => u.agentCode === agentCode && u.password === password);
    
    

    if(!user){
       return res.status(404).json({error:'user not found'})
        
    }

    const token = jwt.sign({
        id: user.id,
        agentCode: user.agendCode, 
        fullName: user.fullName,
        role: user.role
}, process.env.SECRET_KEY, { expiresIn: '1h' })

   return res.status(200).json({token:token,user:[user.id, user.agentCode, user.fullName, user.role]})
}catch(err){ 
    console.log(err);
    res.status(404).json({error:err})
}

    
    
})


auth.get('/me', authMiddleware, (req, res) => {
    try {
        return res.status(200).json({ 
            user: req.payload 
        });

    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});
