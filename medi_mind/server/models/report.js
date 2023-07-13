const mongoose=require('mongoose');
const User=require('./user')

const reportSchema=mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    report:[
        {
            url:{
                type:String
            }
        }
    ]
})

module.exports=mongoose.model('Reports',reportSchema);