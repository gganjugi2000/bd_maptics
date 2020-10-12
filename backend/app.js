const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const common = require('./common/rest/common');
const file = require('./common/rest/file');
const login = require('./common/rest/auth');

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/common', common);
app.use('/file', file);
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







/* bak
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const router = require('./common/route/router');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
*/
