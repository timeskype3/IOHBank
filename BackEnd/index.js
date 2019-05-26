const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser")
const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const app=express()

const SECRET_KEY = ''

app.use(cors())
app.use(bodyParser.json())

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'iohbank'
})

conn.connect()


// app.post("/Login",(req,res)=>{
//     conn.query('SELECT FName, LName, Username, Password FROM clientinfo WHERE Username = ? AND Password = ?', [
//         req.body.user,
//         req.body.password
//     ], (err, results) => {
//         res.json({
//             user: results
//         })
//         // if(results.length === 1) {
//         //     res.json({
//         //         name: results[0].FName + ' ' + results[0].LName,
//         //         status: 'found'
//         //     })
//         // } else {
//         //     res.json({
//         //         status: 'not found'
//         //     })
//         // }
//     })
// })

app.post('/dashboard',verifyToken,(req,res)=>{
    res.json(req.user)
});

app.post('/login', (req,res)=> {
    conn.query('SELECT ClientID, FName, LName, Email FROM clientinfo WHERE Username = ? AND Password = ?', [
        req.body.user,
        req.body.password
    ], (err, results) => {
        if(!err&&results.length===1){
            jwt.sign({
                id: results[0].ClientID,
                name: [results[0].FName, results[0].LName].join(' '),
                email: results[0].Email,
            },'secretkey',(err,token)=>{
                res.json({
                    token
                });
            });
        }else{
            res.sendStatus(403)
        }
    })
});

app.get('/auth', verifyToken, (req, res) => {
   res.sendStatus(200)
})
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

        /* verify */
        jwt.verify(bearerToken, 'secretkey', (err, authData)=>{
            if(err){
                res.sendStatus(403);
            }else{
                req.user = authData
                next();
            }
        });
        //Next
    } else{
        //Forbiden
        res.sendStatus(403);
    }
}



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
