const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser")
const mysql = require('mysql')
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
