const express = require('express');
const router = express.Router();

const resp = require('../../../utils/responseHandler');

const logger = require('../../../common/logger/winston');
const commonService = require('../../../common/service/commonService');    // 구조를 잡기위한 임시 테스트용 경로

router.get('/info', (req, res) => {
    console.log('router api users info called');
    let data = commonService.getUserList();
    res.status(200).send(data);
});

router.get('/infotest', (req, res) => {
  console.log('infotest api users info called');
  let data = commonService.getUserList();
  res.status(200).send({
    result: {
      code: 200,
      message: "success",
      data : data
    }
  });
});

module.exports = router; 