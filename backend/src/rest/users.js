const express = require('express');
const router = express.Router();
const utils = require("../utils/jwt/utils");
const asyncHandler = require('express-async-handler');
const logger = require('../utils/logger/winston');
const userService = require('../service/user/userService');
const fileUpload = require('../utils/file/fileUpload');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

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
    });
});

// 사용자 정보 조회
router.get("/getInfoList/:cur/:page_size", asyncHandler(async (req, res) => {
    let start_offset = 0;                   // limit 변수
    let totalPageCount = 0;                 // 전체 게시물의 숫자
    // let page_list_size = 0;              // 페이지의 갯수 : 1 ~ n개 페이지
    let page_size = req.params.page_size;   // 페이지에 보여지는 로우 갯수(예. 페이지당 10개)
    let curPage = req.params.cur;           // 현재 페이지

    let data = await userService.getUserTotalCnt();   // 전체 게시물의 count
    totalPageCount = data[0].cnt;

    if (totalPageCount < 0) {
      totalPageCount = 0;
    }
    console.log("현재 페이지 : " + curPage, "전체 페이지 : " + totalPageCount);
    
    let totalPage = Math.ceil(totalPageCount / page_size);        // 전체 페이지수 100/50 = 2
    // if(totalPage < page_list_size) {
    //   page_list_size = totalPage;
    // }
    // let curSet = Math.ceil(curPage / page_list_size);          // 현재 셋트 번호
    // let startPage = ((curSet - 1) * page_size) + 1             // 현재 세트내 출력될 시작 페이지
    // let endPage = (startPage + page_list_size) - 1;            // 현재 세트내 출력될 마지막 페이지
    if (curPage < 0) {
      start_offset = 0;
    } else {
      start_offset = (curPage - 1) * page_size;
    }
    
    let resultData = await userService.getUserList(start_offset, page_size);
    res.status(200).send({
      result: {
        code: 200,
        message: "success",
        data : resultData,
        totalCount : totalPageCount,  // 총 카운트
        page_size: page_size          // 페이지에 보여지는 로우
      }
    });
}));

// 사용자 상세 조회
router.post('/getInfoDetail', asyncHandler(async (req, res) => {
    const { user_seq } = req.body;
    let data = null;
    if(user_seq) {
      data = await userService.getUserInfoDetail(user_seq);
    }
    res.status(200).send({result: {code: 200, message: "success", data : data}});
}));

// 사용자 정보 입력
router.post('/addInfo', asyncHandler(async (req, res) => {
    const form = new formidable.IncomingForm(); // 헤더를 만듬
    form.encoding = 'utf-8';          // 인코딩
    form.uploadDir = require('os').homedir() + path.sep + 'upload';
    form.multiples =  true;           // 여러 파일
    form.keepExtensions = true;       // 확장자 표시

    // 폴더 생성 체크
    if(!fs.existsSync(form.uploadDir)){
          fs.mkdirSync(form.uploadDir, 0755);
    }

    form.parse(req, async (err, field, file) => {
        if(!err) {
            const { user_id, password, comp_nm, comp_no, phone_no, addr, email_addr, mobphone_no, descp, use_yn } = field;
            let filePath = '';
            if(file.comp_img) { // front에서 넘어온 file name = comp_img
                filePath = file.comp_img.path.replace(/\\/g, '\\\\');
                console.log("filePath : " + filePath);
                await userService.addUserInfo(user_id, password, comp_nm, comp_no, phone_no, addr, email_addr, filePath, mobphone_no, descp, use_yn);
                res.status(200).send({result: {code: 200, message: "success", data : ""}});
            
            } else {
                console.log('front form에 comp_img 제외');
                console.log("filePath : " + filePath);
                await userService.addUserInfo(user_id, password, comp_nm, comp_no, phone_no, addr, email_addr, filePath, mobphone_no, descp, use_yn);
                res.status(200).send({result: {code: 200, message: "success", data : ""}});
            }
          
        } else {
            console.log('upload fail!!');
            res.status(500).send({result: {code: 999, message: "error", data : err.message}});
        
        }
    });
}));

// 사용자 정보 삭제
router.post('/removeInfo', asyncHandler(async (req, res) => {
    const { user_seq } = req.body;
    if(user_seq) {
        await userService.removeUserInfo(user_seq);
        res.status(200).send({result: {code: 200, message: "success", data : ""}});

    } else {
        res.status(500).send({result: {code: 999, message: "success", data : ""}});

    }
}));

// 사용자 정보 수정
router.post('/modifyInfo', asyncHandler(async (req, res) => {
    const form = new formidable.IncomingForm(); // 헤더를 만듬
    form.encoding = 'utf-8';        // 인코딩
    form.uploadDir = require('os').homedir() + path.sep + 'upload';
    form.multiples = true;         // 여러 파일
    form.keepExtensions = true;     // 확장자 표시

    // 폴더 생성 체크
    if(!fs.existsSync(form.uploadDir)){
        fs.mkdirSync(form.uploadDir, 0755);
    }

    form.parse(req, async (err, field, file) => {
        if(!err) {
            // console.log('modify upload success!!');
            const { user_seq, user_id, password, comp_nm, comp_no, phone_no, addr, email_addr, mobphone_no, descp, use_yn } = field;
            let dbPath = null;
            
            if(user_seq) {
                let userDetailRet = await userService.getUserInfoDetail(user_seq);
                dbPath = userDetailRet[0].comp_img;    // db에 저장된 old 경로 
                
                if(file.comp_img) { // front에서 넘어온 file name = comp_img 
                    console.log('업체 이미지 첨부 정상적으로 한경우!!');
                    let filePath = file.comp_img.path.replace(/\\/g, '\\\\');
                    let newPath = form.uploadDir + path.sep + file.comp_img.name;  // 수정 파일 upload 경로
                    console.log("dbPath : " + dbPath, "filePath : " + filePath, "newPath : " + newPath);
                    
                    // 기존의 파일은 삭제
                    fs.unlink(dbPath, function(err) {
                      if (err) throw err;
                      console.log('file deleted');
                    });

                    await userService.modifyUserInfo(user_seq, user_id, password, comp_nm, comp_no, phone_no, addr, email_addr, filePath, mobphone_no, descp, use_yn);
                    res.status(200).send({result: {code: 200, message: "success", data : ""}});

                } else {
                    console.log('front form에 comp_img 제외');
                    await userService.modifyUserInfo(user_seq, user_id, password, comp_nm, comp_no, phone_no, addr, email_addr, dbPath, mobphone_no, descp, use_yn);
                    res.status(200).send({result: {code: 200, message: "success", data : ""}});

                }
            } else {
                res.status(500).send({result: {code: 999, message: "error", data : 'user_seq is null'}});
            
            }
        } else {
            console.log('modify upload fail!!');
            res.status(500).send({result: {code: 999, message: "error", data : err.message}}).end();
        }
    });
}));

module.exports = router;