const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();
const HTTP_PORT = process.env.HTTP_PORT || 5050;
const TrackingService = require('./routes/TrackingRoute')
const mongoose = require('mongoose');

app.use(express.json());
app.use(cors({
    origin:['http://localhost:3000','https://ordertracking-app.vercel.app'],
    credentials:true,
}));
app.use('/',TrackingService)

app.get('/',(req,res)=>{
    res.json("Hello To Order Tracking App")
});


// Connect to MongoDB
mongoose.connect(process.env.URI,{useNewUrlParser:true}) // return new connection
const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("MongoDB database connection established successfully");
    app.listen(HTTP_PORT,()=>{console.log(`Listening to Port${HTTP_PORT}`)});
})

connection.once('error',(err)=>{
    console.log(err);
})




