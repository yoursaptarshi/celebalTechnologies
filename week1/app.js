//Install Node.js and build a simple "Hello World" application. Understand the basics of Node.js runtime and execute your application.

const http = require('http');
const port = 5000;

const server = http.createServer((req,res)=>{
    try {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    
    res.end('Hello World\n');
    } catch (error) {
        res.statusCode = 500;
        
        res.end(`Error encountered:${error.message}`)
    }
})


server.listen(port,()=>{
    console.info('Server is listining')
})