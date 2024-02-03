const express = require('express')
const requestIp = require('request-ip')
const app = express()

app.get('/', (req, res) => {
    const ipAddress = requestIp.getClientIp(req)
    res.send(`Hello there, your IP adress: ${ipAddress}`)
})

module.exports = app