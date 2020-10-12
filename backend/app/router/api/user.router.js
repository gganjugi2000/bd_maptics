const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const resp = require('../../../utils/responseHandler');
const logger = require('../../../common/logger/winston');
const commonService = require('../../../common/service/commonService');    // 구조를 잡기위한 임시 테스트용 경로

router.get('/info', asyncHandler(async (req, res) => {
  console.log('api users info called!');
  let data = null;
  data = await commonService.getUserList();
  res.status(200).send({
    result: {
      code: 200,
      message: "success",
      data : data
    }
  });
}));

module.exports = router; 