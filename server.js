const express=require("express")
const mongoose=require("mongoose")
require('dotenv').config()
const User=require('./models/user')
const bcrypt=require('bcryptjs')

const app=express()
const PORT=3000

//Home page api
app.get('/',(req,res)=>{
    res.send("<h1 align=center>Welcome to the MERN stack week 2 session</h1>")
})

//Registration page

app.post('/register',async(req,res)=>{
    const {username,email,password}=req.body
    try{
        const hashedpassword=await bcrypt.hash(password,10)
        const user=new User({username,email,password:hashedpassword})
        await user.save()
        res.json({message: "User Registred.."})
        console.log("User Registration completed...")
    }
    catch(err)
    {
        console.log(err)
    }
})

//Login page apui

app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try{
        const user = await User.findOne({email});
        if(!user|| !(await bcrypt.compare(password,user.password)))
        {
            return res.status(400).json({message: "Invalid Credentials"});
        }
    res.json({message: "Login Successful",username: user.username});

    }
    catch(err)
    {
        console.log(err)
    }
})

mongoose.connect(process.env.MONGO_URL).then( 
    ()=> console.log("DB connected successfully...")
).catch(
    (err)=>console.log(err)
)

app.listen(PORT,(err)=>{
    if(err)
    {
        console.log(err)
    }
    console.log("server is running on port :"+PORT)
})