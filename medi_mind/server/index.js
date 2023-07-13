const express=require('express')
const app=express();
const fileupload=require('express-fileupload')
require('dotenv').config()
const connectWithDb=require('./config/db')

app.use(fileupload({
    useTempFiles:true,
    tempFileDir:"/tmp/"                         // thes files are important to upload the image on the net and get the url
}))

app.use(express.json())

connectWithDb()

app.listen(8000,()=>{
    console.log("Server is running on PORT 8000")
})

const user=require('./routes/user')
const record=require('./routes/record')
app.use("/api/user",user)
app.use("/api/record",record)