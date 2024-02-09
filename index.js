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
        res.status(400).send("Username and password are required for signing up")
    }

    const existing = users1.find((elem) => elem.username === username)
    if(existing){
        res.status(400).send("Username already exists")
    }

    users1.push({username, password, isAdmin: "false"})
    res.status(200).send("User created successfully")
})

app.post('/api/vuln1/login', (req, res) => {
    const {username, password} = req.body

    if(!username || !password){
        res.status(400).send("Username and password are required for logging in")
    }

    const auth = users1.find((elem) => elem.username === username)
    if(!auth || auth.password !== password){
        res.status(401).send("Invalid username or password")
    }
    
    res.status(200).send("Login successful")
})

app.get('/api/vuln1/test', (req, res) => {
    res.send(`${req.body}`)
})

app.get('/api/vuln1/admin', (req, res) => {
    const {username} = req.body
    if(!username){
        res.sendStatus(400)
    }

    else{
        const test = users1.find((elem) => elem.username === username)
    }
    if(!test || test.isAdmin === "false"){
        res.status(401).send("You don't have permission")
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