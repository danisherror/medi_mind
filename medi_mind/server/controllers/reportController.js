const mongoose=require('mongoose')
const Record=require('../models/report')
const BigPromise=require('../middleware/bigpromise')
const jwt=require('jsonwebtoken')
const User=require('../models/user')

exports.addRecord=BigPromise(async(req,res)=>{
    const token=req.params.token;
    const decode=jwt.verify(token,process.env.JWT_SECRET);

    console.log("Decode "+decode);
    const id=decode.id;

    const {report}=req.body;
    
    console.log("Report!!!!!!!! "+report)
    const recordExsist=await Record.findOne({user:id})

    if(recordExsist){
        // console.log("Record Exsist")
        const record=recordExsist.report
        const nreport=report;
        console.log(nreport);
        console.log("-----------------");
        console.log("Record "+record);
        //console.log("report "+report.Record);
        const arr=[]
        for(let i=0;i<record.length;i++)
        {   console.log(record[i])
            arr.push(record[i]);
        }
        console.log("-----------------");
        for(let j=0;j<nreport.length;j++)
        {      console.log(nreport[j])
               arr.push(nreport[j])
        }
            // console.log("Array "+arr)
        const newData={
            user:id,
            report:arr
        }

        await Record.findByIdAndUpdate(recordExsist._id,newData)

        res.status(200).json({
            success:true
        })
    }
    else{
        const report1=await Record.create({
            user:id,
            report:report
        })
        res.status(200).json(report1)
    }  
})


exports.recordview=BigPromise(async(req,res)=>{
    
    const token=req.params.token;
    const decode=jwt.verify(token,process.env.JWT_SECRET)
    //console.log(decode) 
    const id=decode.id;
   
    const recordExsist=await Record.findOne({user:id})

    console.log("-------------------------------")
    console.log(recordExsist)
    res.status(200).json(
        recordExsist.report
    )
})
// router.get("/getdata",async(req,res)=>{
//     try {
        
//         const diseasedata = await disease.find();
//         res.status(201).json(diseasedata)
//         console.log(diseasedata);
//     } catch (error) {
//         res.status(422).json(error);
//     }
// })