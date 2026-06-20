//signin/signup/users functionality while using mongodb as database
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const jwtpasword = "pass123";
const app = express();
app.use(express.json());

mongoose.connect("mongodb url")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("Mongo Error:", err));

const User = mongoose.model("UsersApp",{
    username:String,
    email:String,
    password:String
})
app.post("/signup",async(req,res)=>{
    const {username,email,password} = req.body;
    //check if user alread exists in the database
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message:"User already exists"});
    }
    //create new user
    const newUser = new User({username,email,password});
    newUser.save()
    .then(()=>{
        return res.status(201).json({message:"User created successfully"});
    })
    .catch((err)=>{
        return res.status(500).json({message:"Error creating user",error:err});
    })
})

app.post('/signin',async(req,res)=>{
    const {username,password} = req.body;
    const existingUser = await User.findOne({username,password});
    if(!existingUser){
        return res.status(400).json({message:"Invalid credentials"});
    }
    const token = jwt.sign({username},jwtpasword);
    return res.status(200).json({message:"Signin successful",token});
});

app.get('/users',async(req,res)=>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    try{
        const decoded = jwt.verify(token,jwtpasword);
        const users = awaitUser.find()
        return res.status(200).json({
            users
        });
    }
    catch{
        return res.status(401).json({message:"Invalid token"});
    }
})

app.listen(3000);