const express = require('express');
const app = express();
//in memory
var users = [{
    name:"RasAl",
    kidneys:[{
        healthy:true
    },{
        healthy:false
    }]
}]
app.use(express.json());
app.get('/',(req,res)=>{
    const user = users[0];
    const numberOfKidneys = user.kidneys.length;
    let healthyKidneys =0;
    for(let i=0;i<numberOfKidneys;i++){
        if(user.kidneys[i].healthy){
            healthyKidneys++;
        }
    }
    const UnhealthyKidneys = numberOfKidneys - healthyKidneys;
    res.json({
        numberOfKidneys,
        healthyKidneys,
        UnhealthyKidneys
    })
})

app.post('/addKidney',(req,res)=>{
    const ishealthy = req.body.ishealthy;
    users[0].kidneys.push({healthy:ishealthy});
    res.json({
        message:"Kidney added successfully"
    })
})

app.put('/updateKidney',(req,res)=>{
    //only if astleast 1 bad kidney is there
    if(atleastOneUnhealthyKidney() == false){
        res.status(411).json({message:"No unhealthy kidneys to update"});
        return;
    }
    for(let i=0;i<users[0].kidneys.length;i++){
        users[0].kidneys[i].healthy =true;
    }
    res.json({message:"All kidneys updated to healthy"});
})

app.delete('/deleteUnhealthyKidneys',(req,res)=>{
    //only if astleast 1 bad kidney is there
    if(atleastOneUnhealthyKidney() == false){
        res.status(411).json({message:"No unhealthy kidneys to delete"});
        return;
    }
    let newKidneys = [];
    for(let i=0;i<users[0].kidneys.length;i++){
        if(users[0].kidneys[i].healthy){
            newKidneys.push(users[0].kidneys[i]);
        }
    }
    users[0].kidneys = newKidneys;
    res.json({message:"All unhealthy kidneys deleted"});
})
function atleastOneUnhealthyKidney(){
    for(let i=0;i<users[0].kidneys.length;i++){
        if(!users[0].kidneys[i].healthy){
            return true;
        }
    }
    return false;
}
app.listen(3000);
