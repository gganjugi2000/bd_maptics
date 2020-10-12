const express = require('express');

const { verifyToken } = require('../service/authService'); // 미들웨어 임포트
const jwt = require('jsonwebtoken') // 모듈 임포트

const router = express.Router();

// 로그인 라우터
router.post('/', async (req, res, next) => {
    const { email, password } = req.body;
    console.log('/////1 = ' + email);
    console.log('/////1 = ' + password);
    // 유저정보 db에서 가져와서 처리 부분
    if (email) {
        const token = jwt.sign({
            // 가져온 유저정보 셋팅 부분
            user_id: 'bdbd',
            email: 'bdbd@bluedigm.com'
        }, '8gEg+LpLUKVVddY', {
            expiresIn: '15m', // 유효기간 15분 => 15분 이후 토큰이 재발급 됨
            issuer: 'nodebird',
        });

        return res.status(200).json({
            resultCode: 200,
            message: "토큰 발행, 로그인 성공",
            token, // 발행된 jwt 토큰
        })
    } else {
        res.status(404).json({
            resultCode: 404,
            message: "사용자 데이터가 유효하지 않습니다."
        })
    }
});

router.get('/confirm', verifyToken, (req, res, next) => {
    res.json(req.decoded);
});

module.exports = router;