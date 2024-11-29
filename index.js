const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())
app.use(cors())

const { dbURL } = require('./config/dbConfig')

let userRouter = require('./routes/userRouter')

app.use('/', userRouter)

const PORT = process.env.PORT

app.get('/', (req, res) => {
    res.send("<h1>Welcome to server</h1>")
})

mongoose.connect(dbURL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})

app.listen(PORT, () => console.log(`App running on port ${PORT}`))