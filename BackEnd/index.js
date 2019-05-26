const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser")
const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const app=express()

app.use(cors())
app.use(bodyParser.json())

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'iohbank'
})

conn.connect()


app.post("/Login",(req,res)=>{
    conn.query('SELECT FName, LName, Username, Password FROM clientinfo WHERE Username = ? AND Password = ?', [
        req.body.user,
        req.body.password
    ], (err, results) => {
        res.json({
            user: results
        })
        // if(results.length === 1) {
        //     res.json({
        //         name: results[0].FName + ' ' + results[0].LName,
        //         status: 'found'
        //     })
        // } else {
        //     res.json({
        //         status: 'not found'
        //     })
        // }
    })
})

/*app.post('/api/dashboard',verifyToken,(req,res)=>{
    jwt.verify(req.token, 'secretkey',(err, authData)=>{
        if(err){
            res.sendStatus(404);
        }else{
            res.json({
                message: 'Hello',
                authData
            });
        }
    });
});

app.post('/api/login', (req,res)=> {
    const user={
        id: 1,
        username: 'Timeskype3',
        email: 'mewti@hotmail.com'
    }
    jwt.sign({user},'secretkey',(err,token)=>{
        res.json({
            token
        });
    });
});
//Format of Token
//Authorization : Bearer <access_token>

function verifyToken(req,res,next){
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    //Check if bearer is undifined
    if(typeof bearerHeader !== 'undefined'){
        //Split at the space
        const bearer = bearerHeader.split(' ');
        //Get token from array
        const bearerToken = bearer[1];
        //Set thetoken
        req.token = bearerToken;
        //Next
        next();
    } else{
        //Forbiden
        res.sendStatus(403);
    }
}*/



/*
register
POST /register
fname
lname
citizen_id
*/
app.post('/register', (req, res) => {
    const fname = req.body.fname
    const lname = req.body.lname
    const citizen_id = req.body.citizen_id
    /* sql 
        conn.query('INSERT INTO')
    */
})

app.listen(3000,()=>console.log('Connected to port 3000'))
