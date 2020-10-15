const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const logger = require('../logger/winston');
const formidable = require('formidable');
const path = require('path');

const fileUpload = asyncHandler(async (req, res) => {
    let data = null;
    const form = new formidable.IncomingForm(); // 헤더를 만듬

    form.encoding = 'utf-8';        // 인코딩
    form.uploadDir = require('os').homedir() + path.sep + 'upload';
    form.multiples = false;          // 여러 파일
    form.keepExtensions = true;     // 확장자 표시

    console.log('### form.uploadDir >>> :', form.uploadDir);

    // 폴더 생성 체크
    if(!fs.existsSync(form.uploadDir)){
          fs.mkdirSync(form.uploadDir, 0755);
    }

    // form타입 필드(text 타입)
    form.on('field', function(field, value) {

    // form타입 필드(file 타입)
    }).on('file', function(field, file) {
        // console.log(req);
        let oldPath = file.path;
        // let newPath = form.uploadDir + path.sep + file.name;
        console.log(' ### oldPath >>> ', oldPath);
        console.log(' ### file.name >>> ', file.name);
        /*fs.rename(oldPath, newPath, function(err) {
            if(err) {
                res.status(200).send({
                    result: {
                      code: 999,
                      message: "error",
                      data : err.message
                    }
                });
            }
            fs.stat(newPath, function (err, stats) {
                if(err) {
                    res.status(200).send({
                        result: {
                          code: 999,
                          message: "error",
                          data : err.message
                        }
                    });
                }
            });
        });*/
        data = {
            file_seq: 1,                                                          // 파일일련번호
            atch_file_id: 'N',                                                    // 첨부파일ID
            file_save_path: 'FILE_SAVE_PATH 0',                                   // 파일저장경로
            save_file_nm: 'SAVE_FILE_NM 0',                                       // 저장파일명
            origin_file_nm: 'ORIGIN_FILE_NM 0',                                   // 원본파일명
            file_extsn: 'FILE_EXTSN 0',                                           // 파일확장자
            file_size: 1,                                                         // 파일크기(byte)
            reg_id: 'REG_ID 0',                                                   // 등록ID
            reg_dt: '2020-10-14 16:57:28',                                        // 등록일시
            upd_id: 'UPD_ID 0',                                                   // 수정ID
            upd_dt: '2020-10-14 16:57:28',                                        // 수정일시
        }
    }).on('progress', function(bytesReceived, bytesExpected) {
        let percent_complete = (bytesReceived / bytesExpected) * 100; 
        // console.log("============ progress ==================="); 
        // console.log("bytesReceiveed ==> ", bytesReceived, " ; bytesExpected ==> ", bytesExpected); 
        console.log(percent_complete.toFixed(2), "% uploaded...");

    }).on('end', function() {
        /*res.status(200).send({
            result: {
              code: 200,
              message: "success",
              data : data
            }
        });*/
    }).on('error', function(error) {
        res.status(500).send({
            result: {
              code: 999,
              message: "error",
              data : error.message
            }
        });
    });

    // end 이벤트 까지 전송된 후 최종 호출
    form.parse(req, (err, field, file) => {
        if(!err) {
            console.log('upload success!!');
            res.status(200).send({
                result: {
                  code: 200,
                  message: "success",
                  data : ""
                }
            });
        } else {
            console.log('upload fail!!');
            console.log(' err : ', err);
            res.status(500).send({
                result: {
                  code: 999,
                  message: "error",
                  data : err.message
                }
            });
        }
    });
});

module.exports = fileUpload;