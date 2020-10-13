const express = require('express');
const router = express.Router();
const utils = require("../utils/jwt/utils");
const asyncHandler = require('express-async-handler');
const logger = require('../utils/logger/winston');
const userService = require('../service/user/userService');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

// 로그인 처리
router.post('/login', function(req, res) {
  let {email, password} = req.body;
  // 유저로그인 작업

  //임시 - token 발급
  const token = utils.generateToken(email);

  return res.status(200).json({
    success: true,
    email,
    password,
    token
  })
});

// 사용자 정보를 db에서 획득
router.get('/info', asyncHandler(async (req, res) => {
  console.log('api users info called!');
  let data = null;
  data = await userService.getUserList();
  res.status(200).send({
    result: {
      code: 200,
      message: "success",
      data : data
    }
  });
}));

module.exports = router;