const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

const cmmRoutes = require('./common/router');
const apiRoutes = require('./app/router');
const login = require('./common/router/api/auth');

app.use('/common', cmmRoutes);
app.use('/api', apiRoutes);
app.use('/login', login);

const port = normalizePort(process.env.PORT || '4000');
if (process.env.NODE_ENV === "production") {
    console.log('production');
    const server = app.listen(port, () => {
        console.log("Express server has started on port : "+port);
    })
} else {
    console.log('development');
    const server = app.listen(port, () => {
        console.log("Express server has started on port : "+port);
    })
}

function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
}