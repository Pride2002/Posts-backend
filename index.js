const dns = require('dns');

dns.setServers(['1.1.1.1', '8.8.8.8']);

const express = require('express');

const connectDB = require('./db');

require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to the Posts API');

})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})

connectDB();  
