const express = require('express');

const app = express();

app.set("port", process.env.PORT || 8080);

app.get("/",(req,res)=>{
    res.send("Web chatting BE Server");
})

app.listen((app.get('port')),()=>{
    console.log("server start");
});