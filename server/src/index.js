const express = require('express')
require('dotenv').config()
const connection = require('./db/connection')
connection()
const app = express()
const Users = require('./models/users')
app.use(express.json())

app.post('/register', async (req, res) => {
    await Users.create(req.body)
    res.json({
        msg: "You are successfully registered"
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on ${process.env.PORT}`)
})