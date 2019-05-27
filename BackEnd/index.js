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
            },'CPE231',{expiresIn:'15m'},(err,token)=>{
                res.json({
                    token
                });
            });
        }else{
            res.sendStatus(403)
        }
    })
});

app.post('/dashboard',verifyToken,(req,res)=>{
    res.json(req.user)
});

app.get('/auth', verifyToken, (req, res) => {
   res.sendStatus(200)
})

app.get('/profile', verifyToken, (req, res) => {
    conn.query('SELECT * FROM clientinfo WHERE ClientID = ?', [
        req.user.id
    ], (err, results) => {
        if(err) return res.sendStatus(500)
        res.json(results[0])
    })
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
        jwt.verify(bearerToken, 'CPE231', (err, authData)=>{
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

app.post('/register', (req, res) => {
    const fields = [
        "FName",
        "LName",
        "Gender",
        "DateOfBirth",
        "Nationality",
        "IDCardNumber",
        "BloodType",
        "Email",
        "Tel",
        "Username",
        "Password"
    ]

    const values = fields.map(field => req.body[field])
    conn.query(
        "INSERT INTO clientinfo(" + fields.join(', ') + ") VALUES (" + '?'.repeat(fields.length).split('').join(', ') + ")",
        values,
        (err, results) => {
            if(err){
                console.log(err)
                res.sendStatus(406)
            }else{
                console.log("1 record inserted")
                res.sendStatus(201)
            }
        }
    ) 
})

app.listen(3000,()=>console.log('Connected to port 3000'))
