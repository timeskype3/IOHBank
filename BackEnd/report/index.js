const express = require("express");
const app = express.Router()
const mysql = require('mysql')

const SECRET_KEY = ''

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'iohbank'
})

conn.connect()

app.get('/accountcount', (req, res) => {
    conn.query('SELECT c.FName, c.LName, COUNT(*) as CountOfAccount FROM clientinfo c JOIN accountinfo a ON c.ClientID=a.ClientID GROUP BY c.ClientID',
        (err, results) => {
            if (err) return res.status(400).send(String(err))
            res.json(results)
        })
})


app.get('/closecount', (req, res) => {

    conn.query('SELECT COUNT(*) as count FROM closeaccount',
        (err, results) => {
            if (err) return res.status(400).send(String(err))
            res.json(results)
        })
})

app.get('/churncount', (req, res) => {

    conn.query('SELECT NewBank, COUNT(*) as count FROM closeaccount GROUP BY NewBank',
        (err, results) => {
            if (err) return res.status(400).send(String(err))
            res.json(results)
        })
})

app.get('/transfer', (req, res) => {

    conn.query('SELECT Bank , COUNT(*) as count FROM ordertransaction o JOIN accountinfo a ON o.AccountIDRecive = a.AccountID GROUP BY Bank',
        (err, results) => {
            if (err) return res.status(400).send(String(err))
            res.json(results)
        })
})

app.get('/billing', (req, res) => {

    conn.query(`SELECT Type ,COUNT(*) as count FROM billpamentdata WHERE billpamentdata.Status = 'Paid'  GROUP BY Type`,
        (err, results) => {
            if (err) return res.status(400).send(String(err))
            res.json(results)
        })
})

app.get('/promo', (req, res) => {

    conn.query(`SELECT Type ,COUNT(*) as count FROM billpamentdata WHERE billpamentdata.Status = 'Paid'  GROUP BY Type`,
        (err, results) => {
            if (err) return res.status(400).send(String(err))
            res.json(results)
        })
})

app.get('/transferstar', (req, res) => {

    conn.query(`SELECT star, COUNT(*) as Count FROM ordertransaction GROUP BY Star`,
        (err, results) => {
            if (err) return res.status(400).send(String(err))
            res.json(results)
        })
})

app.get('/paymentstar', (req, res) => {

    conn.query(`SELECT star, COUNT(*) as Count FROM orderbill GROUP BY Star`,
        (err, results) => {
            if (err) return res.status(400).send(String(err))
            res.json(results)
        })
})

app.get('/promostar', (req, res) => {

    conn.query(`SELECT star, COUNT(*) as Count FROM promotionusing GROUP BY Star`,
        (err, results) => {
            if (err) return res.status(400).send(String(err))
            res.json(results)
        })
})

app.get('/bankbalance', (req, res) => {

    conn.query(`SELECT Bank , SUM(Balance) as summy FROM accountinfo GROUP BY Bank`,
        (err, results) => {
            if (err) return res.status(400).send(String(err))
            res.json(results)
        })
})

app.get('/dailytransaction', (req, res) => {

    conn.query(`SELECT ordertransaction.date ,SUM(ordertransaction.Money) as summy FROM ordertransaction GROUP BY Date`,
        (err, results) => {
            if (err) return res.status(400).send(String(err))
            console.log(results)
            const data = results.map(e => {
                return {
                    // date: String(e.date.getDate()) + '-' + String(e.date.getMonth()) + '-' +String(e.date.getYear()),
                    date: `${e.date.getDate()}-${e.date.getMonth()+1}-${e.date.getFullYear()}`,
                    summy: e.summy
                }
            })
            res.json(data)
        })
})

app.get('/customerbyages', (req, res) => {

    conn.query(`SELECT FLOOR(DATEDIFF('2019-05-30',DateOfBirth)/365.25) AS DateDiff,COUNT(*) AS MyCount FROM clientinfo GROUP BY DateDiff; `,
        (err, results) => {
            if (err) return res.status(400).send(String(err))
            res.json(results)
        })
})

app.get('/bloodtype', (req, res) => {

    conn.query(`SELECT Bloodtype , COUNT(*) as count FROM clientinfo GROUP BY Bloodtype; `,
        (err, results) => {
            if (err) return res.status(400).send(String(err))
            res.json(results)
        })
})

app.get('/national', (req, res) => {

    conn.query(`SELECT clientinfo.Nationality ,COUNT(*) as count 
    FROM clientinfo
    WHERE clientinfo.Nationality IS NOT NULL
    GROUP BY clientinfo.Nationality
    ; `,
        (err, results) => {
            if (err) return res.status(400).send(String(err))
            res.json(results)
        })
})

app.get('/notpaid', (req, res) => {

    conn.query(`SELECT type ,COUNT(*) as count
    FROM billpamentdata
    WHERE billpamentdata.Status = 'Not paid'
    GROUP BY type; `,
        (err, results) => {
            if (err) return res.status(400).send(String(err))
            res.json(results)
        })
})

app.get('/moneybyaccount', (req, res) => {

    conn.query(`SELECT c.FName,c.LName,b.AccountTypeName,a.bank,SUM(a.Balance) AS AllBalance
    FROM clientinfo c,accountinfo a,accounttype b
    WHERE c.clientID = a.clientID AND b.AccountType = a.AccountType
    GROUP By c.clientid,a.AccountType,a.Bank
    ORDER BY a.bank
    ; `,
        (err, results) => {
            if (err) return res.status(400).send(String(err))
            res.json(results)
        })
})














module.exports = app