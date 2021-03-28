const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log("middleware 1");
    next();
})

app.use((req, res, next) => {
    console.log("middleware 2");
    res.send("<p> Assignment complted </p>");
})

// app.use('/users', (req, res, next) => {
//     console.log("calling users");
// });


// app.use('/', (req, res, next) => {
//     console.log("calling / only");
// });


app.listen(5000);