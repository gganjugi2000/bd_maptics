const express = require('express');
const router = express.Router();
const utils = require("../utils/jwt/utils");
const asyncHandler = require('express-async-handler');
const logger = require('../utils/logger/winston');

const advertiserService = require('../service/advertiser/advertiserService');
const fileUpload = require('../utils/file/fileUpload');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

/* GET advertiser listing. */
router.get('/', function(req, res) {
    res.send('respond with a resource');
});


// 광고주 List
router.get("/getList/:cur/:page_size", asyncHandler(async (req, res, next) => {
    let start_offset = 0;                   // limit 변수
    let totalPageCount = 0;                 // 전체 게시물의 숫자
    // let page_list_size = 0;              // 페이지의 갯수 : 1 ~ n개 페이지
    let page_size = req.params.page_size;   // 페이지에 보여지는 로우 갯수(예. 페이지당 10개)
    let curPage = req.params.cur;           // 현재 페이지

    let data = await advertiserService.getAdvertiserTotalCnt();   // 전체 게시물의 count
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
    
    let searchQuery = {};
    let sortQuery = {};
    // advts_id: "",       // 광고주 아이디
    if(req.query["advts_id"] != null && req.query["advts_id"] != undefined && req.query["advts_id"] != '') {
        searchQuery["advts_id"] = req.query["advts_id"];
    }
    // advts_nm = "",      // 광고주 명
    if(req.query["advts_nm"] != null && req.query["advts_nm"] != undefined && req.query["advts_nm"] != '') {
        searchQuery.advts_nm = req.query["advts_nm"];
    }
    // advts_mng_nm = "",  // 담당자 명
    if(req.query["advts_mng_nm"] != null && req.query["advts_mng_nm"] != undefined && req.query["advts_mng_nm"] != '') {
        searchQuery.advts_mng_nm = req.query["advts_mng_nm"];
    }
    // reg_start_dt = "",  // 등록 시작일
    if(req.query["reg_start_dt"] != null && req.query["reg_start_dt"] != undefined && req.query["reg_start_dt"] != '') {
        searchQuery.reg_start_dt = req.query["reg_start_dt"];
    }
    // reg_end_dt = ""     // 등록 종료일
    if(req.query["reg_end_dt"] != null && req.query["reg_end_dt"] != undefined && req.query["reg_end_dt"] != '') {
        searchQuery.reg_end_dt = req.query["reg_end_dt"];
    }

    // sort
    if(req.query["sort"] != null && req.query["sort"] != undefined && req.query["sort"] != '') {
        sortQuery.sort = req.query["sort"];
    }

    console.log("advertiser searchList req ============================ ")
    console.log(searchQuery)
    console.log(sortQuery)
    console.log("------------------------------------------------------ ")
    let resultData = await advertiserService.getAdvertiserList(start_offset, page_size, searchQuery, sortQuery);
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

// 광고주 검색 List
router.get("/getSearchList/:cur/:page_size", asyncHandler(async (req, res, next) => {
    let start_offset = 0;                   // limit 변수
    let totalPageCount = 0;                 // 전체 게시물의 숫자
    // let page_list_size = 0;              // 페이지의 갯수 : 1 ~ n개 페이지
    let page_size = req.params.page_size;   // 페이지에 보여지는 로우 갯수(예. 페이지당 10개)
    let curPage = req.params.cur;           // 현재 페이지

    let data = await advertiserService.getAdvertiserTotalCnt();   // 전체 게시물의 count
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
    
    let searchQuery = {};
    let sortQuery = {};
    // 광고주 검색 키워드
    if(req.query["search_value"] != null && req.query["search_value"] != undefined && req.query["search_value"] != '') {
        searchQuery["search_value"] = req.query["search_value"];
    }

    // sort
    if(req.query["sort"] != null && req.query["sort"] != undefined && req.query["sort"] != '') {
        sortQuery.sort = req.query["sort"];
    }

    let resultData = await advertiserService.getAdvertiserSearchList(start_offset, page_size, searchQuery, sortQuery);
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


// 광고주 상세 조회
router.post('/getInfoDetail', asyncHandler(async (req, res, next) => {
    let data = null;
    const { advts_id } = req.body;
    let data_result = {};
    // try {
        if(advts_id) {
            data = await advertiserService.getAdvertiserInfoDetail(advts_id);
        }
        console.log("get info data ======================================")
        console.log(data)
        console.log("----------------------------------------------------")
        if(data != null && data.length > 0) {
            let imgPath = data[0].advts_img;
            let imgFile = "";
            if(imgPath != null && imgPath != undefined && imgPath != "") {
                if(fs.existsSync(imgPath)) {
                    imgFile = fs.readFileSync(imgPath,"base64");
                }
            }
            console.log("data check ============================= ")
            console.log(data);
            for(let key in data[0]){
                console.log("key --- ")
                console.log(key);
                if(key == "advts_img" && imgFile != null && imgFile != "") {
                    data_result[key] = "data:image/png;base64, " + imgFile;
                } else {
                    data_result[key] = data[0][key];
                }
            }
        }

        res.status(200).send({result: {code: 200, message: "success", data : data_result}});
    // } catch (err) {
    //     res.status(500).send({result: {code: 500, message: err.message, data : data}});
    // }
}));

// 광고주 정보 입력
router.post('/addInfo', asyncHandler(async (req, res, next) => {
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
            const { advts_id, advts_nm, advts_mng_nm, advts_img, email_addr, phone_no, descp } = field;
            let filePath = '';

            if(file.advts_img_file) { // front에서 넘어온 file name = advts_img_file
                filePath = file.advts_img_file.path.replace(/\\/g, '\\\\');
                console.log("filePath : " + filePath);
                await advertiserService.addAdvertiserInfo(advts_id, advts_nm, advts_mng_nm, filePath, email_addr, phone_no, descp);
                res.status(200).send({result: {code: 200, message: "success", data : ""}});
            
            } else {
                console.log('front form에 advts_img_file 제외');
                console.log("filePath : " + filePath);
                await advertiserService.addAdvertiserInfo(advts_id, advts_nm, advts_mng_nm, filePath, email_addr, phone_no, descp);
                res.status(200).send({result: {code: 200, message: "success", data : ""}});
            }
          
        } else {
            console.log('upload fail!!');
            res.status(500).send({result: {code: 999, message: "error", data : err.message}});
        
        }
    });
}));

// 광고주 정보 삭제
router.post('/removeInfo', asyncHandler(async (req, res, next) => {
    const { advts_id } = req.body;
    if(advts_id) {
        await advertiserService.removeAdvertiserInfo(advts_id);
        res.status(200).send({result: {code: 200, message: "success", data : ""}});

    } else {
        res.status(500).send({result: {code: 999, message: "success", data : ""}});

    }
}));

// 광고주 정보 수정
router.post('/modifyInfo', asyncHandler(async (req, res, next) => {
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
            const { advts_id, advts_nm, advts_mng_nm, email_addr, phone_no, descp } = field;
            let dbPath = null;
            
            if(advts_id) {
                let advertiserDetailRet = await advertiserService.getAdvertiserInfoDetail(advts_id);
                dbPath = advertiserDetailRet[0].advts_img;    // db에 저장된 old 경로 
                if(dbPath) {
                    dbPath = dbPath.replace(/\\/g, '\\\\');
                }
                if(file.advts_img_file) { // front에서 넘어온 file name = advts_img_file 
                    console.log('업체 이미지 첨부 정상적으로 한경우!!');
                    let filePath = file.advts_img_file.path.replace(/\\/g, '\\\\');
                    let newPath = form.uploadDir + path.sep + file.advts_img_file.name;  // 수정 파일 upload 경로
                    
                    console.log("dbPath : " + dbPath, "filePath : " + filePath, "newPath : " + newPath);
                    console.log("====================================================");
                    console.log("수정 체크 file.advts_img_file ===========================================");
                    console.log(file.advts_img_file)
                    console.log("----------------------------------------------------");
                    console.log(filePath);    
                    console.log(newPath); 
                    console.log("=====================================================")               
                    // 기존의 파일은 삭제
                    fs.unlink(dbPath, function(err) {
                      if (err) throw err;
                      console.log('file deleted');
                    });

                    await advertiserService.modifyAdvertiserInfo(advts_id, advts_nm, advts_mng_nm, filePath, email_addr, phone_no, descp);
                    res.status(200).send({result: {code: 200, message: "success", data : ""}});

                } else {
                    console.log('front form에 advts_img_file 제외');
                    await advertiserService.modifyAdvertiserInfo(advts_id, advts_nm, advts_mng_nm, dbPath, email_addr, phone_no, descp);
                    res.status(200).send({result: {code: 200, message: "success", data : ""}});

                }
            } else {
                res.status(500).send({result: {code: 999, message: "error", data : 'advts_id is null'}});
            
            }
        } else {
            console.log('modify upload fail!!');
            res.status(500).send({result: {code: 999, message: "error", data : err.message}}).end();
        }
    });
}));

// 광고주 id 중복 체크
router.post('/checkAdvertiserId', asyncHandler(async (req, res, next) => {
    let data = null;
    const { advts_id } = req.body;
    let existCount = -1;
    // try {
        if(advts_id) {
            data = await advertiserService.checkAdvertiserId(advts_id);
            console.log(data)
            console.log(data.length)

            if (data != null && data != undefined) {
                existCount = data.length;
            }
        }
        console.log(existCount)
        console.log("-------------------------------------------------------------------")
        res.status(200).send({result: {code: 200, message: "success", data : data, exist : existCount}});
    // } catch (err) {
    //     res.status(500).send({result: {code: 500, message: err.message, data : data}});
    // }
}));

module.exports = router;