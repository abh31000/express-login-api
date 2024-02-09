const express = require('express')
const requestIp = require('request-ip')
const app = express()

app.get('/', (req, res) => {
    const ipAddress = requestIp.getClientIp(req)
    res.send(`Hello there, your IP address: ${ipAddress}`)
})


// Vulnerabilité 1
let users1 = [{username: "admin", password:"admin123", isAdmin: "true"}]
app.get('/api/vuln1', (req, res) => {
    res.send('API endpoint for first vulnerablity.')
})

app.post('/api/vuln1/signup', (req, res) => {
    const {username, password} = req.body

    if(!username || !password){
        res.status(400).json({error: "Username and password are required for signing up"})
    }

    const existing = users1.find((elem) => elem.username === username)
    if(existing){
        res.status(400).json({error: "Username already exists"})
    }

    users1.push({username, password, isAdmin: "false"})
    res.status(200).json({message: "User created successfully"})
})

app.post('/api/vuln1/login', (req, res) => {
    const {username, password} = req.body

    if(!username || !password){
        res.status(400).json({error: "Username and password are required for logging in"})
    }

    const auth = users1.find((elem) => elem.username === username)
    if(!auth || auth.password !== password){
        res.status(401).json({error: "Invalid username or password"})
    }
    
    res.status(200).json({message: "Login successful"})
})

app.get('/api/vuln1/admin', (req, res) => {
    const {username} = req.body
    const test = users1.find((elem) => elem.username === username)
    if(!test || test.isAdmin === "false"){
        res.status(401).json({error: "You don't have permission"})
    }
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