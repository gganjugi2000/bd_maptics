const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const logger = require('../utils/logger/winston');
const formidable = require('formidable');
const path = require('path');

router.post('/upload', asyncHandler(async (req, res) => {
    let data = null;
    let fields = [];
    let files = [];
    let fields_array = [];
    let files_array = [];

    const form = new formidable.IncomingForm(); // 헤더를 만듬
    // 업로드 정보
    form.encoding = 'utf-8';        // 인코딩
    // form.uploadDir = require('os').homedir() + path.sep + 'upload';
    form.uploadDir = 'C:\\maptics_upload';
    form.multiples = false;          // 여러 파일
    form.keepExtensions = true;     // 확장자 표시

    // form타입 필드(text 타입)
    form.on('field', function(field, value) {
        fields.push([field, value]);
        fields_array.push(value);

    // form타입 필드(file 타입)
    }).on('file', function(field, file) {
        // let oldPath = file.path;
        // let newPath = form.uploadDir + path.sep + file.name;

        // fs.rename(oldPath, newPath, function(err) {
        //     if(err) {
        //         res.status(200).send({
        //             result: {
        //               code: 999,
        //               message: "error",
        //               data : err.message
        //             }
        //         });
        //     }
        //     fs.stat(newPath, function (err, stats) {
        //         if(err) {
        //             res.status(200).send({
        //                 result: {
        //                   code: 999,
        //                   message: "error",
        //                   data : err.message
        //                 }
        //             });
        //         }
        //     });
        // });
        files.push([field, file.name]);
        files_array.push(file.name);
        
    })
    // .on('progress', function(bytesReceived, bytesExpected) {
    //     let percent_complete = (bytesReceived / bytesExpected) * 100; 
    //     console.log("============ progress ==================="); 
    //     console.log("bytesReceiveed ==> ", bytesReceived, " ; bytesExpected ==> ", bytesExpected); 
    //     console.log(percent_complete.toFixed(2), "% uploaded...");

    // })
    .on('end', function() {
        fields = [];
        files = [];
        fields_array = [];
        files_array = [];

        res.status(200).send({
            result: {
              code: 200,
              message: "success",
              data : data
            }
        });
    }).on('error', function(error) {
        res.status(200).send({
            result: {
              code: 999,
              message: "error",
              data : error
            }
        });
        
    });

     // end 이벤트 까지 전송된 후 최종 호출
    form.parse(req, (err, field, file) => {
        if(!err) {
            console.log('field', field)
            console.log('file', file)
            for (const fi of Object.entries(file)) {
              console.log(fi)
            }
            console.log(' err : ', err);
            console.log('upload success!!');
        } else {
            console.log('field', field)
            console.log('file', file)
            for (const fi of Object.entries(file)) {
              console.log(fi)
            }
            console.log(' err : ', err);
            console.log('upload fail!!');
        }
    });
}));

module.exports = router; 