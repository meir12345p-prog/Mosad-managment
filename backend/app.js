import express from 'express'
import cors from 'cors'
import { auth } from './routes/auto.js'
import  report  from './routes/report.js'
import admin from './routes/admin.js'
const app = express()
app.use(cors())
app.use(express.json())
app.use('./images' , express.static('images'))
app.use('/auth' , auth)
app.use('/reports' , report)
app.use('/admin', admin)

app.listen(3021, ()=>{
    console.log('server running');
    
})