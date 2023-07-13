const mongoose=require("mongoose")
const BigPromise=require('../middleware/bigpromise')
const User=require('../models/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const fileupload=require('express-fileupload')


exports.signup=BigPromise(async (req,res)=>{
    
    console.log("req.files!!!!!!!!!!!!!!!!!!!!!!!!  ",req.body)
    console.log("req.files!!!!!!!!!!!!!!!!!!!!!!!!  ",req.file)
    const {name,email,password}=req.body

    const user1=await User.findOne({email:email})
    const url="https://media.istockphoto.com/id/587805156/vector/profile-picture-vector-illustration.jpg?s=612x612&w=0&k=20&c=gkvLDCgsHH-8HeQe7JsjhlOY6vRBJk_sKW9lyaLgmLo=";
    if(user1){
        return res.status(400).json({
            message:"User ALREADY EXSIST"
        })
    }
    if(!name || !email || !password){
       return res.status(401).json({
        success:true,
        message:"Please Provide The required Information"
       })
    }
    
   const user= await  User.create({
        name,
        email,
        password,
        url
    })

    const token=user.getJwtToken()

    res.status(200).json({
        success:true,
        user,
        token
    })
    
})

exports.signIn=BigPromise(async (req,res)=>{

    const {email,password}=req.body
    console.log("password "+password)

    const user=await User.findOne({email:email}).select("+password") 

    if(!user)
    {
        return res.status(401).json({
            message:"User does not exsist Plz Signup"
        })
    }

    if(!await  bcrypt.compare(password,user.password)){
       
        return res.status(401).json({
            message:"Password does not match "
        })
    }
    const token=user.getJwtToken()
    res.status(200).json({
        user,
        token
    })
    
})

exports.profile=BigPromise(async(req,res)=>{
    
    const token=req.params.token;
    const decode=jwt.verify(token,process.env.JWT_SECRET)
    // console.log(decode) 
    
    const user=await User.findById(decode.id);

    res.status(200).json({
        user
    })
})

// exports.edit=BigPromise(async(req,res)=>{
//     try{
//     const token=req.params.token;
//     const decode=jwt.verify(token,process.env.JWT_SECRET)
//     // console.log(decode) 
//     const user=await User.findByIdAndUpdate(decode.id,req.body,{
//         new:true
//     });
//     console.log(user);
//     res.status(200).json({
        
//     })
//     }
//     catch(error)
//     {
//         console.log(error);
//     }
// })
exports.edit=BigPromise(async(req,res)=>{
    try{
    const token=req.params.token;
    const decode=jwt.verify(token,process.env.JWT_SECRET)
    // console.log(decode) 
    const user=await User.findByIdAndUpdate(decode.id,req.body,{
        new:true
    });
    console.log(user);
    res.status(200).json({
        
    })
    }
    catch(error)
    {
        console.log(error);
    }
})
exports.imageadd=BigPromise(async(req,res)=>{
    try{
    const token=req.params.token;
    const decode=jwt.verify(token,process.env.JWT_SECRET)
    const id=decode.id
    // console.log(decode) 
    
    const user=await User.findByIdAndUpdate(id,
        {
          url:req.body.url
        });
    console.log(user);
    console.log("--------------");
    res.status(200).json({
        
    })
    }
    catch(error)
    {
        console.log(error);
    }
})

