const authService = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    try {
        //토큰 정상 처리 부분 - secret 키 처리 필요
        req.decoded = authService.verify(req.headers.authorization, '8gEg+LpLUKVVddY')
        return next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(419).json({
                resultCode: 419,
                meesage: "토큰 만료"
            });
        }

        return res.status(401).json({
            resultCode: 401,
            message: "토큰이 유효하지 않습니다."
        })
    }
}