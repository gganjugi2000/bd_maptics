const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('./src/utils/logger/winston');
require('express-async-errors');
const customErrHandler = require('./src/middleware/errorHandler');

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

const corsOptions = {
    origin: 'http://150.20.14.142:4000', // 허락하고자 하는 요청 주소
    credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
};
app.use(cors(corsOptions)); // config 추가

// middleware
const { verifyToken } = require("./src/middleware/jwtMiddleware");
app.use(verifyToken);

// router
const user = require('./src/rest/users');
const sample = require('./src/rest/sample');
const health = require('./src/rest/health');
// 광고주 관리
const advertiser = require('./src/rest/advertiser');


app.use('/user', user);
app.use('/sample', sample);
app.use('/health', health);

// 광고주 관리
app.use('/advertiser', advertiser);

// Custom Error Handling
app.use(customErrHandler);

// Express Error Handling
app.use((err, req, res, next) => {
    logger.error(err);
    res.status(err.status || 500).send({result: {code: err.status || 500, message: err.message, data : ""}});
});

// process
//   .on('unhandledRejection', (reason, p) => {
//     console.error(reason, 'Unhandled Rejection at Promise', p);
//   })
//   .on('uncaughtException', err => {
//     console.error(err, 'Uncaught Exception thrown');
//     process.exit(1);
//   });
  
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