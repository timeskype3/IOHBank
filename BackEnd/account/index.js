const mysql = require('mysql')
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'iohbank'
})
const express = require('express')
const app = express.Router()

app.post('/', (req, res) => {
    const account = [
        "AccountType",
        "ClientID",
        "Balance",
        "Bank"
    ]

    const values = account.map(account => req.body[account])
    conn.query(
        "INSERT INTO accountinfo (" + account.join(', ') + ") VALUES (" + '?'.repeat(account.length).split('').join(', ') + ")",
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

app.get('/read/:id',(req, res) => {
    conn.query('SELECT * FROM accountinfo WHERE ClientID = ?', [
        req.params.id
    ], (err, results) => {
        if(err) return res.sendStatus(500)
        res.json(results)
    })
})

module.exports = app