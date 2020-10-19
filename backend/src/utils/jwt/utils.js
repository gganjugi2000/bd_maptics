const jwt = require('jsonwebtoken');
const jwt_secret = require('../../config/config').getConfig().jwt_secret;

exports.generateToken = (email) =>{
	let token = null;
	try{
		if (email) {
			token = jwt.sign({
				// 가져온 유저정보 셋팅 부분
				email: email
			}, jwt_secret, {
				expiresIn: '15m', // 유효기간 15분 => 15분 이후 토큰이 재발급 됨
			});
			return token
		}
	}catch (err) {
		return null;
	}
	return token;
};
