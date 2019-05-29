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

app.get('/transfer/read/:id',(req, res) => {
    conn.query(
        'SELECT * FROM accountinfo a, clientinfo c WHERE a.clientid = c.clientid AND a.AccountID = ?', [
        req.params.id
    ], (err, results) => {
        if(err) return res.sendStatus(500)
        res.json(results)
    })
})

app.get('/transfer/checkmoney/:id',(req, res) => {
    conn.query(
        'SELECT Balance FROM accountinfo WHERE AccountID = ?', [
        req.params.id
    ], (err, results) => {
        if(err) return res.sendStatus(500)
        res.json(results)
    })
})

app.post('/transfer/bill', (req, res) => {
    const account = [
        "AccountID",
        "AccountIDRecive",
        "Money",
        "Date",
        "Memo",
        "Star"
    ]

    const values = account.map(account => req.body[account])
    conn.query(
        "INSERT INTO ordertransaction (" + account.join(', ') + ") VALUES (" + '?'.repeat(account.length).split('').join(', ') + ")",
        values,
        (err, results) => {
            if(err){
                console.log(err)
                res.sendStatus(406)
            }else{
                console.log("Save bill")
                res.sendStatus(201)
            }
        }
    ) 
})
app.post('/payment/orderbill', (req, res) => {
    const account = [
        "AccountID",
        "PaymentID",
        "Date",
        "Memo",
        "Star"
    ]

    const values = account.map(account => req.body[account])
    conn.query(
        "INSERT INTO orderbill (" + account.join(', ') + ") VALUES (" + '?'.repeat(account.length).split('').join(', ') + ")",
        values,
        (err, results) => {
            if(err){
                console.log(err)
                res.sendStatus(406)
            }else{
                console.log("Save payment bill")
                res.sendStatus(201)
            }
        }
    ) 
})

app.post('/transfer/send', (req, res) => {
    conn.query(
        "UPDATE accountinfo SET Balance = Balance - ? WHERE AccountID = ?",[
            req.body.Balance,
            req.body.AccountID,
        ],(err) => {
            if(err){
                console.log(err)
                res.sendStatus(406)
            }else{
                console.log("Send OK")
                res.sendStatus(200)
            }
        }
    ) 
})


app.post('/transfer/receive', (req, res) => {
    conn.query(
        "UPDATE accountinfo SET Balance = Balance + ? WHERE AccountID = ?",[
            req.body.Balance,
            req.body.AccountID,
        ],(err) => {
            if(err){
                console.log(err)
                res.sendStatus(406)
            }else{
                console.log("Recieve OK")
                res.sendStatus(200)
            }
        }
    ) 
})


app.get('/payment/:id',(req, res) => {
    conn.query(
        "SELECT b.PaymentID , b.CustomerName, b.CustomerAddress, b.Total , b.EXP,b.Type,f.Name, f.Contract FROM billpamentdata b JOIN formalaccount f ON b.FormalAccountID = f.FormalAccountID WHERE b.PaymentID = ?", [
        req.params.id
    ], (err, results) => {
        if(err) return res.sendStatus(500)
        res.json(results)
    })
})


module.exports = app