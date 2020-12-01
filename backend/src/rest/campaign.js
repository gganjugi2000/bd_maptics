const express = require('express');
const router = express.Router();
const utils = require("../utils/jwt/utils");
const asyncHandler = require('express-async-handler');
const logger = require('../utils/logger/winston');

const campaignService = require('../service/campaign/campaignService');
const fileUpload = require('../utils/file/fileUpload');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
// const util = require('util');

// 캠페인 List
router.get("/getList/:cur/:page_size", asyncHandler(async (req, res, next) => {
    let start_offset = 0;                   // limit 변수
    let totalPageCount = 0;                 // 전체 게시물의 숫자
    // let page_list_size = 0;              // 페이지의 갯수 : 1 ~ n개 페이지
    let page_size = req.params.page_size;   // 페이지에 보여지는 로우 갯수(예. 페이지당 10개)
    let curPage = req.params.cur;           // 현재 페이지

    let data = await campaignService.getCampaignTotalCnt();   // 전체 게시물의 count
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
    // 광고주 아이디
    if(req.query["advts_id"] != null && req.query["advts_id"] != undefined && req.query["advts_id"] != '') {
        searchQuery["advts_id"] = req.query["advts_id"];
    }
    // 광고주 명
    if(req.query["advts_nm"] != null && req.query["advts_nm"] != undefined && req.query["advts_nm"] != '') {
        searchQuery.advts_nm = req.query["advts_nm"];
    }
    // 캠페인 명
    if(req.query["cmpgn_title"] != null && req.query["cmpgn_title"] != undefined && req.query["cmpgn_title"] != '') {
        searchQuery.cmpgn_title = req.query["cmpgn_title"];
    }
    // 등록 시작일
    if(req.query["reg_start_dt"] != null && req.query["reg_start_dt"] != undefined && req.query["reg_start_dt"] != '') {
        searchQuery.reg_start_dt = req.query["reg_start_dt"];
    }
    // 등록 종료일
    if(req.query["reg_end_dt"] != null && req.query["reg_end_dt"] != undefined && req.query["reg_end_dt"] != '') {
        searchQuery.reg_end_dt = req.query["reg_end_dt"];
    }
    // 발송 시작일
    if(req.query["send_start_dt"] != null && req.query["send_start_dt"] != undefined && req.query["send_start_dt"] != '') {
        searchQuery.send_start_dt = req.query["send_start_dt"];
    }
    // 발송 종료일
    if(req.query["send_end_dt"] != null && req.query["send_end_dt"] != undefined && req.query["send_end_dt"] != '') {
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
    let resultData = await campaignService.getCampaignList(start_offset, page_size, searchQuery, sortQuery);
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
            data = await campaignService.getCampaignInfoDetail(cmpgn_id);
            acknlg_data = await campaignService.getCampaignAcknlgInfoDetail(cmpgn_id);   
        }
        
        if(data != null && data.length > 0) {
            let msgAppImgFilePath = '';     // msg_app_img_file - mms, rcs 첨부 이미지
            let rctTargetFilePath = '';     // rct_target_file - 수신대상 csv 파일
            let urlUploadFilePath = '';     // url_upload_file - url 업로드
            let cpNoUploadFilePath = '';    // cp_no_upload_file - 쿠폰번호 업로드

            // 광고주 image
            let advtsImgFilePath = data[0].advts_img;
            let advtsImgFile = "";
            if(advtsImgFilePath != null && advtsImgFilePath != undefined && advtsImgFilePath != "") {
                console.log("get info data @@@@@@@@@@@@@@@@@@@@@@@@ ======================================")
                console.log(data)
                console.log("----------------------------------------------------")

                if(fs.existsSync(advtsImgFilePath)) {
                    advtsImgFile = fs.readFileSync(advtsImgFilePath,"base64");
                }
            }

            console.log("get info data @@@@@@@@@@@@@@@@@@@@@@@@ 222222 ======================================")
            console.log(data)
            console.log("----------------------------------------------------")
            // 첨부 이미지
            msgAppImgFilePath = data[0].msg_app_img;
            let msgAppImgFile = "";
            if(msgAppImgFilePath != null && msgAppImgFilePath != undefined && msgAppImgFilePath != "") {
                if(fs.existsSync(msgAppImgFilePath)) {
                    msgAppImgFile = fs.readFileSync(msgAppImgFilePath,"base64");
                }
            }
            console.log("get info data @@@@@@@@@@@@@@@@@@@@@@@@ 33333 ======================================")
            console.log(data)
            console.log("----------------------------------------------------")
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

// 캠페인 정보 입력
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
            const { cmpgn_code, cmpgn_title, cmpgn_pps, advts_id, send_req_cnt, send_dt_ymd, send_dt_ap, send_dt_hh, send_dt_mm, use_cm, send_mode, mgs_title, msg_summary, msg_app_img, sender_no, rct_target, link_ps_url_1, link_ps_yn_1, link_ps_url_2, link_ps_yn_2, link_ps_url_3, link_ps_yn_3, url_upload, url_upload_cv, cp_no_upload } = field;
            let msgAppImgFilePath = '';     // msg_app_img_file - mms, rcs 첨부 이미지
            let rctTargetFilePath = '';     // rct_target_file - 수신대상 csv 파일
            let urlUploadFilePath = '';     // url_upload_file - url 업로드
            let cpNoUploadFilePath = '';    // cp_no_upload_file - 쿠폰번호 업로드
            // TO-DO :: campaign code 
            // campaign code 를 별도로 관리할지... 아님 삭제
            let cmpgnCode = "ABCDE";
            if(file.msg_app_img_file) {
                msgAppImgFilePath = file.msg_app_img_file.path.replace(/\\/g, '\\\\');
                console.log("msgAppImgFilePath : " + msgAppImgFilePath);
            }
            if(file.rct_target_file) {
                rctTargetFilePath = file.rct_target_file.path.replace(/\\/g, '\\\\');
                console.log("rctTargetFilePath : " + rctTargetFilePath);
            }
            if(file.url_upload_file) {
                urlUploadFilePath = file.url_upload_file.path.replace(/\\/g, '\\\\');
                console.log("urlUploadFilePath : " + urlUploadFilePath);
            }
            if(file.cp_no_upload_file) {
                cpNoUploadFilePath = file.cp_no_upload_file.path.replace(/\\/g, '\\\\');
                console.log("cpNoUploadFilePath : " + cpNoUploadFilePath);
            }

            await campaignService.addCampaignInfo(cmpgnCode, cmpgn_title, cmpgn_pps, advts_id, send_req_cnt, send_dt_ymd, send_dt_ap, send_dt_hh, send_dt_mm, use_cm, send_mode, mgs_title, msg_summary, msgAppImgFilePath, sender_no, rctTargetFilePath, link_ps_url_1, link_ps_yn_1, link_ps_url_2, link_ps_yn_2, link_ps_url_3, link_ps_yn_3, urlUploadFilePath, url_upload_cv, cpNoUploadFilePath);
            res.status(200).send({result: {code: 200, message: "success", data : ""}});
            // res.end(util.inspect({fields: fields, files: files}));
        } else {
            console.log('upload fail!!');
            res.status(500).send({result: {code: 999, message: "error", data : err.message}});
        
        }
    });

    // TO-DO : 업로드 파일의 저장 위치 변경
    // end - 모든 request를 받고, 디스크에 모든 파일를 쓴후 발생하는 event
    form.on('end', function(fields, files) { 
        console.log("end ====================================================")
        console.log(this.openedFiles); 
        console.log(" 총 업로드 파일 갯수 == ", this.openedFiles.length); 
        for(var i = 0; i < this.openedFiles.length; i++) { 
            // Temporary location of our uploaded file 
            var temp_path = this.openedFiles[i].path; 
            // The file name of the uploaded file
            var file_name = this.openedFiles[i].name; 
            // Location where we want to copy the uploaded file 
            // var new_location = './files/'; 
            console.log("temp_path == ", temp_path); 
            console.log("file_name == ", file_name); 
            console.log(this.openedFiles[i]); 
            // temp_path 로 받은 파일을, 원래 이름으로 변경하여 이동시킨다. 
            // fs.move(temp_path, new_location + file_name, function (err) { 
            // if (err) { 
            //     console.error(err); 
            // } else { 
            //     console.log("success!") 
            // } 
    }});

}));

// 캠페인 정보 삭제
router.post('/removeInfo', asyncHandler(async (req, res, next) => {
    const { cmpgn_id } = req.body;
    if(cmpgn_id) {
        await campaignService.removeCampaignInfo(cmpgn_id);
        res.status(200).send({result: {code: 200, message: "success", data : ""}});

    } else {
        res.status(500).send({result: {code: 999, message: "success", data : ""}});

    }
}));

// 캠페인 정보 수정
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
            const { cmpgn_id, cmpgn_title, cmpgn_pps, advts_id, send_req_cnt, send_dt_ymd, send_dt_ap, send_dt_hh, send_dt_mm, use_cm, send_mode, mgs_title, msg_summary, msg_app_img, del_msg_app_img, sender_no, rct_target, link_ps_url_1, link_ps_yn_1, link_ps_url_2, link_ps_yn_2, link_ps_url_3, link_ps_yn_3, url_upload, url_upload_cv, cp_no_upload, upd_id } = field;

            let msgAppImgFilePath = '';     // msg_app_img_file - mms, rcs 첨부 이미지
            let rctTargetFilePath = '';     // rct_target_file - 수신대상 csv 파일
            let urlUploadFilePath = '';     // url_upload_file - url 업로드
            let cpNoUploadFilePath = '';    // cp_no_upload_file - 쿠폰번호 업로드
            
            if(cmpgn_id) {
                let campaignDetailRet = await campaignService.getCampaignInfoDetail(cmpgn_id);
                console.log("campaignDetailRet @@@@@@@@@@@@@@@@@@@@@@@@ ======================================")
                console.log(campaignDetailRet)
                console.log("----------------------------------------------------")
                if(campaignDetailRet[0].advts_img) {
                    advtsImgFilePath = campaignDetailRet[0].advts_img.replace(/\\/g, '\\\\');
                }
                if(campaignDetailRet[0].msg_app_img) {
                    msgAppImgFilePath = campaignDetailRet[0].msg_app_img.replace(/\\/g, '\\\\');
                }
                if(campaignDetailRet[0].rct_target) {
                    rctTargetFilePath = campaignDetailRet[0].rct_target.replace(/\\/g, '\\\\');
                }
                if(campaignDetailRet[0].url_upload) {
                    urlUploadFilePath = campaignDetailRet[0].url_upload.replace(/\\/g, '\\\\');
                }
                if(campaignDetailRet[0].cp_no_upload) {
                    cpNoUploadFilePath = campaignDetailRet[0].cp_no_upload.replace(/\\/g, '\\\\');
                }

                // 기존 이미지 삭제
                if(del_msg_app_img == 'true'){
                    if(msgAppImgFilePath != null && msgAppImgFilePath != undefined && msgAppImgFilePath != "") {
                        if(fs.existsSync(msgAppImgFilePath)) {
                            fs.unlink(msgAppImgFilePath, function(err) {
                                if (err) throw err;
                                console.log('file deleted');
                            });
                        }
                    }
                    msgAppImgFilePath = "";
                }
                
                if(file.msg_app_img_file) {
                    // 기존 파일 존재시 삭제
                    if(msgAppImgFilePath != null && msgAppImgFilePath != "" && msgAppImgFilePath != 'undefiled') {
                        if(fs.existsSync(msgAppImgFilePath)) {
                            fs.unlink(msgAppImgFilePath, function(err) {
                                if (err) throw err;
                                console.log('file deleted');
                            });
                        }
                    }
                    
                    // 수정 파일 upload 경로
                    msgAppImgFilePath = form.uploadDir + path.sep + file.msg_app_img_file.name;  
                    msgAppImgFilePath = file.msg_app_img_file.path.replace(/\\/g, '\\\\');
                    console.log("msgAppImgFilePath : " + msgAppImgFilePath);
                }
                if(file.rct_target_file ) {
                    // 기존 파일 존재시 삭제
                    if(rctTargetFilePath != null && rctTargetFilePath != "" && msgAppImgFilePath != 'undefiled') {
                        if(fs.existsSync(rctTargetFilePath)) {
                            fs.unlink(rctTargetFilePath, function(err) {
                                if (err) throw err;
                                console.log('file deleted');
                            });
                        }
                    }
                    
                    // 수정 파일 upload 경로
                    rctTargetFilePath = form.uploadDir + path.sep + file.rct_target_file.name;  
                    rctTargetFilePath = file.rct_target_file.path.replace(/\\/g, '\\\\');
                    console.log("rctTargetFilePath : " + rctTargetFilePath);
                }
                if(file.url_upload_file) {
                    // 기존 파일 존재시 삭제
                    if(urlUploadFilePath != null && urlUploadFilePath != "" && msgAppImgFilePath != 'undefiled') {
                        if(fs.existsSync(rctTargetFilePath)) {
                            fs.unlink(urlUploadFilePath, function(err) {
                                if (err) throw err;
                                console.log('file deleted');
                            });
                        }
                    }
                    
                    // 수정 파일 upload 경로
                    urlUploadFilePath = form.uploadDir + path.sep + file.url_upload_file.name;  
                    urlUploadFilePath = file.url_upload_file.path.replace(/\\/g, '\\\\');
                    console.log("urlUploadFilePath : " + urlUploadFilePath);
                }
                if(file.cp_no_upload_file) {
                    // 기존 파일 존재시 삭제
                    if(cpNoUploadFilePath != null && cpNoUploadFilePath != "" && msgAppImgFilePath != 'undefiled') {
                        if(fs.existsSync(rctTargetFilePath)) {
                            fs.unlink(cpNoUploadFilePath, function(err) {
                                if (err) throw err;
                                console.log('file deleted');
                            });
                        }
                    }
                    
                    // 수정 파일 upload 경로
                    cpNoUploadFilePath = form.uploadDir + path.sep + file.cp_no_upload_file.name;  
                    cpNoUploadFilePath = file.cp_no_upload_file.path.replace(/\\/g, '\\\\');
                    console.log("cpNoUploadFilePath : " + cpNoUploadFilePath);
                }

                console.log("================================================================================")
                console.log("campaignDetailRet @@@@@@@@@@@@@@@@@@@@@@@@ ======================================")
                console.log(msgAppImgFilePath)
                console.log(rctTargetFilePath)
                console.log(urlUploadFilePath)
                console.log(cpNoUploadFilePath)
                console.log("----------------------------------------------------")

                await campaignService.modifyCampaignInfo(cmpgn_id, cmpgn_title, cmpgn_pps, advts_id, send_req_cnt, send_dt_ymd, send_dt_ap, send_dt_hh, send_dt_mm, use_cm, send_mode, mgs_title, msg_summary, msgAppImgFilePath, sender_no, rctTargetFilePath, link_ps_url_1, link_ps_yn_1, link_ps_url_2, link_ps_yn_2, link_ps_url_3, link_ps_yn_3, urlUploadFilePath, url_upload_cv, cpNoUploadFilePath);
                    res.status(200).send({result: {code: 200, message: "success", data : ""}});

            } else {
                res.status(500).send({result: {code: 999, message: "error", data : 'advts_id is null'}});
            
            }
        } else {
            console.log('modify upload fail!!');
            res.status(500).send({result: {code: 999, message: "error", data : err.message}}).end();
        }
    });
}));


module.exports = router;