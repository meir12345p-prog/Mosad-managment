import express from 'express'
import cors from 'cors'
import { auth } from './routes/auto.js'
import { report } from './routes/report.js'
const app = express()
app.use(cors())
app.use(express.json())

app.use('/auth' , auth)
app.use('/report' , report)

app.listen(3021, ()=>{
    console.log('server running');
    
})