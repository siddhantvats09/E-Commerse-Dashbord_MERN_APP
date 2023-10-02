const mongoose=require("mongoose")

const productschema= new mongoose.Schema({
    name:String,
    price:String,
    compnay:String,
    category:String,
    userid:String
})

module.exports=mongoose.model('products',productschema)