const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

//Call in the routes
const users = require('./routers/users')
const PORT = 3000

//DB Config
const db = process.env.MONGODB_URI

//Mongoose Connect
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database Connected'))
  .catch(err => console.log(err))

// Initializing express json Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

let options = {
  //specify options
  host: `localhost:${PORT}`
}

app.use('/api/v1', users)

app.listen(PORT, () => {
  console.log('Server Running!!!!')
})
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}