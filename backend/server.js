//req params Express: params is an object of the req object that contains route parameters.
//req query Express:query is a request object that is populated by request query strings that are found in a URL.
const express = require('express');
const app=express();
app.get('/',((req,res)=>{
    res.send("App is Running");
    res.end();
}))
app.listen(3000,(()=>{
    console.log("server successfully started.");
}))