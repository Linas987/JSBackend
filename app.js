//Modules
//const os =require('os')
//const names=require('./data')
//const sayHi=require('./utils')

//sayHi(names.singlePerson.name)
//const user=os.userInfo().username
//sayHi(user)

//const {write}=require('./FS/Async')
//const _=require('./events/event-emitter')

//connect to db
//const mon=require('mongoose');
import session from 'express-session';
import { join } from 'path';
import cors from "cors";

import express from "express";
import pkg from 'body-parser';
import 'dotenv/config';
const { json, urlencoded } = pkg;

const app = express();
app.use(express.static("public"));

const corsOptions ={ origin:'*', credentials:true,
    //Access-Control-Allow-Credentials : true
//optionSuccessStatus:200
}
    app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// parse requests of content-type: application/json
app.use(json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

// login route
app.get("/", (req, res) => {
    res.sendFile(join(__dirname + '/login.html'));
});

// login route
app.get("/register", (req, res) => {
    res.sendFile(join(__dirname + '/register.html'));
});

import usersRoutes from "./user/users.routes.js";

// Use the imported routes in your Express app
usersRoutes(app);

// set port, listen for requests
app.listen(process.env.PORT, () => {
    console.log("Server is running on port "+process.env.PORT);
});

//HTTP

//const server = http.createServer()
// server.on('request', (req, res) => {
//     res.end('Welcome')
// })
/*
const http =require('http');

const server=http.createServer((req,res)=> {
    if(req.url==='/users'){
        //user.getAll();
        res.end(`Welcome :)`)
    }
    else if(req.url==='/about'){
        res.end(`<h1>history</h1>`)
    }
    else{res.end(`<h1>Oops!</h1>
    <p>we can't find the data</p>
    <a href="/">back home</a>`)}
})
server.listen(5000)
*/
