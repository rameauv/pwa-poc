const server = require('./server')
const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser");
const app = express()
const port = 3000

app.use(cors({
  origin: '*'
}))

app.use(bodyParser.json())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

server(app, '/')
