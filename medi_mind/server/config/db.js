const mongoose=require('mongoose');
mongoose.set('strictQuery',false) 

const connectWithDb=()=>{
    mongoose.connect("mongodb+srv://miniprojectmsrit2024:miniproject@cluster0.6krxmi4.mongodb.net/Health?retryWrites=true&w=majority")
    .then(console.log("Connected With The databse !!!!!!!!"))
    .catch(error=>{
        console.log("Some Error Occured")
    })
}

module.exports=connectWithDb