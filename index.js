const express = require('express')
const requestIp = require('request-ip')
const app = express()

app.get('/', (req, res) => {
    const ipAddress = requestIp.getClientIp(req)
    res.send(`Hello there, your IP address: ${ipAddress}`)
})


// Vulnerabilité 1
app.get('/api/vuln1', (req, res) => {
    res.send('API endpoint for first vulnerablity.')
})

// Vulnerabilité 2
app.get('/api/vuln2', (req, res) => {
    res.send('API endpoint for second vulnerablity.')
})

// Vulnerabilité 3
app.get('/api/vuln3', (req, res) => {
    res.send('API endpoint for third vulnerablity.')
})


module.exports = app