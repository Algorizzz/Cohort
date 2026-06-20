const express = require('express');
const app =express();

const startTime = Date.now();
let totalRequests = 0;
let totaltime = 0;
app.use((req,res,next)=>{
    const start = Date.now();
    totalRequests++;
    res.on('finish',()=>{
        const end = Date.now();
        totaltime += (end - start);
    })
    next();
})
app.get('/req1',(req,res)=>{
    for(let i= 0;i<1000;i++){}
    res.send("hello from req1");
})
app.get('/req2',(req,res)=>{
    for(let i= 0;i<10000;i++){}
    res.send("hello from req2");
})
app.get('/totalrequests',(req,res)=>{
    res.send(`Total requests: ${totalRequests}`);
})
app.get('/averagetime',(req,res)=>{
    const averageTime = totaltime / totalRequests;
    res.send(`Average time per request: ${averageTime} ms`);
})
app.listen(3000);