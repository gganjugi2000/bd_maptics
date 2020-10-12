const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

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

const cmmRoutes = require('./common/router');
const fileUpRouter = require('./common/router/api/file');
const apiRoutes = require('./app/router');
const login = require('./common/router/api/auth');

app.use('/common', cmmRoutes);
app.use("/file", fileUpRouter);
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