const express = require("express");
const{z}= require("zod");
const app = express();
app.use(express.json());
const schema = z.object({
    email : z.string().email().endsWith(".com"),
    password : z.string().min(6),
    country : z.literal("IN").or(z.literal("US"))
})
//global middleware , to parse body of request

//dummy way to do authorization, for 1 user db
const authmiddleware = (req,res,next)=>{
    const username = req.headers.username;
    const password = req.headers.password;
    if(!(username == "shirkos" && password == "921342")){
        res.status(401).json({message:"unauthorized"});
    }
    else{
        next();
    }
}
const inputValidater = (req,res,next)=>{
    const email = req.headers.email;
    const password = req.headers.password;
    const country = req.headers.country;
    const response = schema.safeParse({
        email,
        password,
        country
    });
    if(!response.success){
        res.status(403).json({message:"Wrong Inputs"});
    }
    else{
        next();
    }

}
app.get('/',authmiddleware,inputValidater,(req,res)=>{
    res.json({message:"hello"});
})

//global catch error handler
app.use((err,req,res,next)=>{
    res.status(500).json({message:"something went wrong"});
})
app.listen(3000);