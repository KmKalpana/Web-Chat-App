//req params Express: params is an object of the req object that contains route parameters.
//req query Express:query is a request object that is populated by request query strings that are found in a URL.
const express = require('express');
const app=express();
const { chats } =require('./data/data');
const connectDb=require('./config/db');
const {Notfound, ErrorHandler}=require('./middleware/ErrorMiddleware');
const dotenv=require('dotenv');
const userRoutes=require('./routes/userRoutes');
const chatRoutes=require('./routes/chatRoutes');
dotenv.config();
connectDb();
app.use(express.json());
app.get('/',((req,res)=>{
    res.send("App is Running successfully.");
    res.end();
    }))
app.get('/api/chat',((req,res)=>{
    res.send(chats);
    console.log(chats);
}))
app.use('/api/user',userRoutes);
app.use('/api/chats',chatRoutes);
app.use(Notfound);
app.use(ErrorHandler);
const PORT=process.env.PORT || 5000;
app.listen(PORT,(()=>{
    console.log(`server successfully started on Port ${PORT}`);
}))