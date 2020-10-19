const express = require('express');
const router = express.Router();
const utils = require("../utils/jwt/utils");
const asyncHandler = require('express-async-handler');
const logger = require('../utils/logger/winston');
const userService = require('../service/sample/userSampleService');

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

  return res.status(200).set('authorization', 'Bearer ' + token).json({
    success: true
  })
});

// 사용자 정보 조회
router.get('/getInfoList', asyncHandler(async (req, res) => {
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

// 사용자 상세 조회
router.post('/getInfoDetail', asyncHandler(async (req, res) => {
  const { id } = req.body;
  let data = null;
  if(id) {
    data = await userService.getUserInfoDetail(id);
  }
  res.status(200).send({
    result: {
      code: 200,
      message: "success",
      data : data
    }
  });
}));

// 사용자 정보 입력
router.post('/addInfo', asyncHandler(async (req,res) => {
  const { user_id, user_name } = req.body;
  let data = null;
  if(user_id) {
    data = await userService.addUserInfo(user_id, user_name);
  }
  console.log('### 사용자 정보 입력 result >>>',data);
  res.status(200).send({
    result: {
      code: 200,
      message: "success",
      data : ""
    }
  });
}));

// 사용자 정보 입력 multipart
router.post('/addMultiInfo', asyncHandler(async (res, req) => {
  let data = null;
  let result = null;
  //try { // async 메소드인 경우 express의 next로 에러처리
    console.log('### req.body >>>', req.body);
    const { user_id, user_name } = req.body;
    if(user_id) {
      data = await userService.addUserInfo(user_id, user_name);
    }
    console.log('### data >>>', result);
    await fileUpload(res, req);
  // } catch (error) {
  //   next(error);
  // }
}));

// 사용자 정보 삭제
router.post('/removeInfo', asyncHandler(async (req,res) => {
  const { id } = req.body;
  let data = null;
  if(id) {
    await userService.removeUserInfo(id);
  }

  data = await userService.getUserList();
  res.status(200).send({
    result: {
      code: 200,
      message: "success",
      data : ""
    }
  });
}));

// 사용자 정보 수정
router.post('/modifyInfo', asyncHandler(async (req,res) => {
  const { id, user_name } = req.body;
  let data = null;
  if(id) {
    await userService.modifyUserInfo(id, user_name);
  }
 
  data = await userService.getUserList();
  res.status(200).send({
    result: {
      code: 200,
      message: "success",
      data : ""
    }
  });
}));

module.exports = router;