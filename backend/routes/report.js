
import express from 'express'
import authMiddleware from "../middleware/middleAuth.js";
import upload from "../utiels/image.js";
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';
import csvUpload from '../utiels/uploadCsv.js';
import { readCsvBuffer } from '../utiels/csvHelper.js';

const report = express()

report.post('/',authMiddleware, upload.single('image') , async (req, res) => {

    try{
        const {report} = req.body
        const image = req.image
        console.log(report,image);
        
        const {category , urgency , message} = JSON.parse(report)
        console.log(category , urgency , message);
        
        

        if(!category || !urgency || !message){
            if(req.file){
                await fs.promises.unlink(req.file.path)
                
            }
            return res.status(404).json({error:'missing fields'})
        }

        const newReport = {
            id: uuidv4(),
            userId: req.payload.id,
            category,
            urgency,
            message,
            imagePath : req.file ? req.file.path : null,
            sourceType:'form',
            createAt : new Date().toDateString()
        }
        const reports = JSON.parse(await fs.promises.readFile('data/report.json','utf8'))
        reports.push(newReport)
        await fs.promises.writeFile('data/report.json',JSON.stringify(reports , null,2))

        res.status(201).json({report:newReport})


    }catch(err){
        console.log(err);
        
       res.status(404).json({error:err.message}) 
    }
});


report.post('/csv' , authMiddleware , csvUpload.single('file') , async (req , res) =>{
    try{
        console.log(req.file);
        
        if(!req.file){
            return res.status(404).json({error:'there is no file csv'})
        }

        const csvReports = await  readCsvBuffer(req.file.buffer)

        const Reports = csvReports.map(report => ({
            id : uuidv4(),
            userId: req.payload.id,
            category : report.category,
            urgency : report.urgency,
            message : report.message,
            imagePath : null,
            sourceType:'csv',
            createAt : new Date().toDateString()
        }))
        console.log(Reports);
        

        const dataRports =await JSON.parse(await fs.promises.readFile('data/report.json','utf8'))
        const newDataReports = [...Reports , ...dataRports]
        await fs.promises.writeFile('data/report.json', JSON.stringify(newDataReports , null,2))

        res.status(201).json({
            count : csvReports.length,
            reports : Reports
        })

    }catch(err){
        console.log(err);
        res.status(404).json({error: 'csv upload faild'})
    }
} )

report.get('/' , authMiddleware , async (req , res) =>{
    try{
    const dataRports = JSON.parse(await fs.promises.readFile('data/report.json','utf8'))
    const { id , role} = req.payload
    const {category , urgency , message} = req.query;
    let reports = dataRports 

    if(role === 'agent'){
        reports = dataRports.filter(r => r.userId === id)
    }

    else if(role === 'admin'){
        if(category){
            reports = dataRports.filter(r => r.category === category)
        }
         if(urgency){
            reports = dataRports.filter(r => r.urgency === urgency)
        } 
        if(message){
            reports = dataRports.filter(r => r.message === message)
        }
    }
    console.log(reports);
    

    res.status(200).json(reports)
}catch(err){
    console.log(err)
    res.status(500).json({error:'faild to get reports'});
    
}




})

report.get('/:id',authMiddleware,async (req , res) =>{

    try{
        const reportId = req.params.id
        const { id , role} = req.payload
        console.log(req.payload);
        
        

        const dataRports = JSON.parse(await fs.promises.readFile('data/report.json','utf8'))
        
        const report = dataRports.filter(r => r.userId === reportId )

        if(!report){
           return res.status(400).json({error:'report not found'})
        }

        if(role === 'agent' && report.userId !== id){
            return res.status(401).json({error : 'u dont have accses to this file'})
        }

        res.status(200).json({report})



    }catch(err){
        console.log(err);
        res.status(404).json({error:'faild to send request to the server'})
        
    }

})



export default report