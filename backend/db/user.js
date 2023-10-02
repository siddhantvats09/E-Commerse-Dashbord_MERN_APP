const mongoose=require("mongoose")

const userschema= new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

module.exports=mongoose.model('users',userschema)