//Set up a simple web server using Express.js that can handle basic routing and middleware. Implement routes to respond to at least two different endpoints


const express = require('express');
const path = require('path');

const app = express();

//serve the stack html files
app.use(express.static(path.join(__dirname,'views')));


//middlewares
app.use(express.json());
app.use(express.urlencoded({extendex:true}));



//routes
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','index.html'))
})
app.get('/me',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','profile.html'))
})

app.listen(5000,()=>{
    console.log(`Server is running on 5000`)
})