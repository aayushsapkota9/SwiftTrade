const express = require('express')
require('dotenv').config()
const app = express()
const connection = require('./db/connection')
connection()
const userRoute = require("./routes/users")
app.use(express.json())
const cors = require('cors')
app.use(cors())

app.use("/", userRoute);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on ${process.env.PORT}`)
})