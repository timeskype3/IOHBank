const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const app = express.Router()

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

app.get('/', (req, res) => {
    conn.query('SELECT c.FName, c.LName, COUNT(*) as CountOfAccount FROM clientinfo c JOIN accountinfo a ON c.ClientID=a.ClientID GROUP BY c.ClientID',
        (err, results) => {
            if (err) return releaseEvents.sendStatus(500)
            res.json(results)
        })
})


module.exports = app