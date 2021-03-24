const path = require('path');

const express = require('express');
const { static } = require('express');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', (req, res, next) => {
    console.log("calling users");
    res.sendFile(path.join(__dirname, "views", "users.html"));
});


app.use('/', (req, res, next) => {
    console.log("calling / only");
    res.sendFile(path.join(__dirname, "views", "index.html"));
});


app.listen(5000);