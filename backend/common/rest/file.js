const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const logger = require('../logger/winston');
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
    form.uploadDir = require('os').homedir() + path.sep + 'upload';
    // console.log('### uploadDir ### '+form.uploadDir);
    form.multiples = true;          // 여러 파일
    form.keepExtensions = true;     // 확장자 표시

    // form타입 필드(text 타입)
    form.on('field', function(field, value) {
    fields.push([field, value]);
    fields_array.push(value);

    // form타입 필드(file 타입)
    }).on('file', function(field, file) {

    console.log('### file.name >>>', file.name);
    let oldPath = file.path;
    let newPath = form.uploadDir + path.sep + file.name;

    fs.rename(oldPath, newPath, function(err) {
        if(err) {
            res.status(200).send({'code':'999','msg':err.message});
        }
        fs.stat(newPath, function (err, stats) {
            if(err) {
                res.status(200).send({'code':'999','msg':err.message});
            }
        });
    });
    files.push([field, file.name]);
    files_array.push(file.name);
        
    }).on('end', function() {
    data = {
        'field' : fields_array,
        'file' : files_array
    }
    res.status(200).send({'code':'200','msg':'success'});
    fields = [];
    files = [];
    fields_array = [];
    files_array = [];
    }).on('error', function(error) {
        console.log('error :'+error);
        res.status(200).send({'code':'999','msg':error.message});
    });

    // end 이벤트 까지 전송된 후 최종 호출
    form.parse(req, (err, field, file) => {
        // console.log('upload success!!');
        // res.writeHead(200, { 'content-type': 'application/json' });
        if(!err) {
            console.log('upload success!!');
        } else {
            console.log('upload fail!!');
        }
        res.end(JSON.stringify({ field, file }, null, 2));
    });
}));

module.exports = router; 