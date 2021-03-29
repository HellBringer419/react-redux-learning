const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shops');
const invalidRoutes = require('./routes/invalid');

// const InvalidController = require('./normal_controllers/invalid');
const getController = require('./controllers/get');

const app = express();
console.info("App READY");

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/admin', adminRoutes);
app.use('/', shopRoutes);

app.use('/error', invalidRoutes);
app.use(getController.notFound);

app.listen(5000);