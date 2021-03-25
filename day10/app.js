const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shops');

const InvalidController = require('./controllers/invalid');

const app = express();
console.info("App READY");

app.use(bodyParser.urlencoded({ extended: false}));
app.use('/admin', adminRoutes);
app.use('/', shopRoutes);

app.use(InvalidController.notFound);

app.listen(5000);