const express = require("express");
const jwt = require("jsonwebtoken");
const jwtpassword = "secret123";
const app = express();
app.use(express.json());

//In memory DB
const ALL_USERS = [
    {
        username: "FranzKafka",
        email: "franz@gmail.com",
        password: "123"
    },
    {
        username: "Nakamura",
        email: "nakamura@gmail.com",
        password: "1234"
    },
    {
        username: "Dostoevsky",
        email: "dostoevsky@gmail.com",
        password: "12345"
    }
]


app.post('signin',(req,res)=>{
    const {username,password} = req.body;
    const userExists = ALL_USERS.find((user)=>user.username === username && user.password === password);
    if(!userExists){
        res.status(401).json({message:"Invalid username or password"});
    }
    const token = jwt.sign({username},jwtpassword);
    res.json({token});
});

app.get('users',(req,res)=>{
    try{
        const token = req.headers.authorization;
        const decoded = jwt.verify(token,jwtpassword);
        const username = decoded.username;

        res.json({
            users: ALL_USERS.filter((user)=>{
                return user.username != username;
            })
        })
        
    } catch (error) {
        res.status(401).json({message:"Invalid token"});
    }

})

app.listen(3000);