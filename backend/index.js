const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors')
const User = require('./db/user')
const Product = require('./db/products')
require("./db/config")
const jwt=require('jsonwebtoken')
const jwtkey="any"



// mongoose.connect("mongodb+srv://siddhant:siddhantvats@cluster0.iigzhec.mongodb.net/UsersData?retryWrites=true&w=majority")

// const userschema= new mongoose.Schema({
//     name:String,
//     email:String,
//     password:String
// })
// const USER = mongoose.model('USER', userschema);







const app = express()

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173' }));
app.listen(3000)
//mongodb+srv://siddhant:siddhantvats@cluster0.iigzhec.mongodb.net/UsersData?retryWrites=true&w=majority


app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name: name, email: email, password: password })
    let result = await user.save()
    result = result.toObject()
    delete result.password
    res.json(result)
})


app.post('/addproduct', async (req, res) => {
    const { name, price, compnay, category, userid } = req.body;
    const product = new Product({ name: name, price: price, compnay: compnay, category: category, userid: userid })
    await product.save()
    res.json(product)
})


app.post('/login', async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select('-password')
        if (user) {
            res.send(user)
        } else {
            res.send({ result: 'Result Not Found' })
        }
    } else {
        res.send({ result: 'Result Not Found' })
    }
})



app.get('/products', async (req, res) => {
    const products = await Product.find();
    if (products.length > 0) {
        res.send(products)

    } else {
        res.send("No Products")
    }
})
app.get('/singleproduct/:id', async (req, res) => {
    Product.findById(req.params.id).then((item) => {
        res.json(item)
    }).catch((error) => {
        res.send(error).status(5000)
    })
})



app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id)
    res.json()
})


app.put('/updateproduct/:id', async (req, res) => {
   // const { name, price, compnay, category } = req.body;
    console.log(req.params.id)
    Product.updateOne({ _id: req.params.id }, {
        $set : req.body
        // $set: {
        //     name: name,
        //     compnay: compnay,
        //     category: category,
        //     price: price
        // }
    }).then((item) => {
        res.json(item)
    }).catch((error) => {
        res.send(error).status(5000)
    })
})



app.get('/search/:key',async(req,res)=>{
    await Product.find({
        $or:[
            {name:{$regex:req.params.key}},
            {compney:{$regex:req.params.key}},
        ]
    }).then((item)=>{
        res.json(item)
    })
})



app.get('/profile/:id',async(req,res)=>{
   console.log(req.params.id)
    Product.find({'userid' : req.params.id}).then((item) => {
        res.json(item)
    }).catch((error) => {
        res.send(error).status(5000)
    })
})