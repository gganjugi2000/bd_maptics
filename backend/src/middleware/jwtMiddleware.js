const jwt = require('jsonwebtoken');
const jwt_secret = require('../config/config').getConfig().jwt_secret;
const utils = require('../utils/jwt/utils');

exports.verifyToken = (req, res, next) => {
	console.log('jwt middleware');
	try {
		//토큰 정상 처리 부분 - secret 키 처리 필요
		if (req.headers.authorization) {
			console.log('check token');
			const token = req.headers.authorization.split('Bearer ')[1];
			const decoded = jwt.verify(token, jwt_secret);

			// 유효시간 검증 및 재발급
			const now = Math.floor(Date.now() / 1000);
			if (decoded.exp - now < 60 * 5) {
				const reToken = utils.generateToken('temp@email.com');
				req.decode =  reToken;
				res.set('authorization', 'Bearer ' + reToken);
			}
		}
		return next();

	} catch (err) {
		if (err.name === 'TokenExpiredError') {
			return res.status(419).json({
				meesage: "토큰 만료"
			});
		}
		return res.status(401).json({
			message: "토큰이 유효하지 않습니다."
		})
	}
};


