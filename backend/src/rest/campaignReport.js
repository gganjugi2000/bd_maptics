const express = require('express');
const router = express.Router();
const utils = require("../utils/jwt/utils");
const asyncHandler = require('express-async-handler');
const logger = require('../utils/logger/winston');

const campaignReportService = require('../service/campaignReport/campaignReportService');
const fileUpload = require('../utils/file/fileUpload');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

// 캠페인 report List
router.get("/getList/:cur/:page_size", asyncHandler(async (req, res, next) => {
    let start_offset = 0;                   // limit 변수
    let totalPageCount = 0;                 // 전체 게시물의 숫자
    // let page_list_size = 0;              // 페이지의 갯수 : 1 ~ n개 페이지
    let page_size = req.params.page_size;   // 페이지에 보여지는 로우 갯수(예. 페이지당 10개)
    let curPage = req.params.cur;           // 현재 페이지

    let data = await campaignReportService.getCampaignTotalCnt();   // 전체 게시물의 count
    totalPageCount = data[0].cnt;

    if (totalPageCount < 0) {
      totalPageCount = 0;
    }
    console.log("현재 페이지 : " + curPage, "전체 페이지 : " + totalPageCount);
    
  if (curPage < 0) {
      start_offset = 0;
    } else {
      start_offset = (curPage - 1) * page_size;
    }
    
    let searchQuery = {};
    let sortQuery = {};
    // 광고주 아이디
    if(req.query["advts_id"] != null && req.query["advts_id"] != undefined && req.query["advts_id"] != '') {
        searchQuery["advts_id"] = req.query["advts_id"];
    }
    // 광고주 명
    if(req.query["advts_nm"] != null && req.query["advts_nm"] != undefined && req.query["advts_nm"] != '') {
        searchQuery.advts_nm = req.query["advts_nm"];
    }
    // 캠페인 명
    if(req.query["cmpgn_title"] != null && req.query["cmpgn_title"] != undefined && req.query["advts_mng_nm"] != '') {
        searchQuery.cmpgn_title = req.query["cmpgn_title"];
    }
    // 발송 시작일
    if(req.query["send_start_dt"] != null && req.query["send_start_dt"] != undefined && req.query["reg_start_dt"] != '') {
        searchQuery.send_start_dt = req.query["send_start_dt"];
    }
    // 발송 종료일
    if(req.query["send_end_dt"] != null && req.query["send_end_dt"] != undefined && req.query["reg_end_dt"] != '') {
        searchQuery.send_end_dt = req.query["send_end_dt"];
    }
    // sort
    if(req.query["sort"] != null && req.query["sort"] != undefined && req.query["sort"] != '') {
        sortQuery.sort = req.query["sort"];
    }

    console.log("campaign searchList req ============================ ")
    console.log(searchQuery)
    console.log(sortQuery)
    console.log("------------------------------------------------------ ")
    let resultData = await campaignReportService.getCampaignList(start_offset, page_size, searchQuery, sortQuery);
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


// 캠페인 상세 조회
router.post('/getInfoDetail', asyncHandler(async (req, res, next) => {
    let data = null;
    let acknlg_data = null;     // 승인 정보
    const { cmpgn_id } = req.body;
    let data_result = {};
    
    // try {
        if(cmpgn_id) {
            data = await campaignReportService.getCampaignInfoDetail(cmpgn_id);
            acknlg_data = await advertiserService.getCampaignAcknlgInfoDetail(cmpgn_id);   
        }
        console.log("get info data ======================================")
        console.log(data)
        console.log("----------------------------------------------------")
        if(data != null && data.length > 0) {
            let msgAppImgFilePath = '';     // msg_app_img_file - mms, rcs 첨부 이미지
            let rctTargetFilePath = '';     // rct_target_file - 수신대상 csv 파일
            let urlUploadFilePath = '';     // url_upload_file - url 업로드
            let cpNoUploadFilePath = '';    // cp_no_upload_file - 쿠폰번호 업로드

            // 광고주 image
            let advtsImgFilePath = data[0].advts_img;
            let advtsImgFile = "";
            if(advtsImgFilePath != null && advtsImgFilePath != undefined && advtsImgFilePath != "") {
                if(fs.existsSync(advtsImgFilePath)) {
                    advtsImgFile = fs.readFileSync(advtsImgFilePath,"base64");
                }
            }
            // 첨부 이미지
            let msgAppImgFilePath = data[0].msg_app_img;
            let msgAppImgFile = "";
            if(msgAppImgFilePath != null && msgAppImgFilePath != undefined && msgAppImgFilePath != "") {
                if(fs.existsSync(msgAppImgPath)) {
                    msgAppImgFile = fs.readFileSync(msgAppImgFilePath,"base64");
                }
            }

            for(let key in data[0]){
                if(key == "advts_img" && advtsImgFile != "") {
                    data_result[key] = "data:image/png;base64, " + advtsImgFile;
                } else if(key == "msg_app_img" && msgAppImgFile != "") {
                    data_result[key] = "data:image/png;base64, " + msgAppImgFile;
                } else {
                    data_result[key] = data[0][key];
                }
            }
        }
        console.log("data_result ============================= ")
        console.log(data_result);
        console.log("----------------------------------------- ")
        res.status(200).send({result: {code: 200, message: "success", data : data_result, acknlg: acknlg_data}});
    // } catch (err) {
    //     res.status(500).send({result: {code: 500, message: err.message, data : data}});
    // }
}));


module.exports = router;