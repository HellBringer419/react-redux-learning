const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shops');

const app = express();
console.info("App READY");

app.use(bodyParser.urlencoded({ extended: false}));
app.use('/admin', adminRoutes);
app.use('/', shopRoutes);

app.use((req, res, next) => {
    res.status(404).send("<center> <h1> 404 - Not Found </h1> </center>");
})

app.listen(5000);