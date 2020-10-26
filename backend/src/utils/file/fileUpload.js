// const asyncHandler = require('express-async-handler');
const fs = require('fs');
const logger = require('../logger/winston');
const formidable = require('formidable');
const path = require('path');

const fileUpload =  function(req, res) {
    const form = new formidable.IncomingForm();
    form.uploadDir = require('os').homedir() + path.sep + 'upload';
    form.multiples =  true;
    form.keepExtensions = true;
    
    form.parse(req, function(err, fields, files) {
  	    if(files.comFile){		    // input name = 'comFile'
			fs.readFile(files.comFile.path, function(err, data){
		  		fs.writeFile(path.join(uploadDir, 'uploaded_images',files.comFile.name.replace(/\s+/g, "")),
					data,
					'utf8', 
					function (err) {
						if (err){
							res.status(500).send({result: {code: 999, message: "error", data : error.message}}).end();
						} else {
							res.status(200).send({result: {code: 200,message: "success", data : data}}).end();
						}
				});
			});
		} else {
			res.status(500).send({result: {code: 999, message: "error", data : 'file is empty'}}).end();
		}
  });
};
module.exports = fileUpload;

/*
const fileUpload = asyncHandler(async (req, res) => {
    const form = new formidable.IncomingForm(); // 헤더를 만듬

    form.encoding = 'utf-8';        // 인코딩
    form.uploadDir = require('os').homedir() + path.sep + 'upload';
    form.multiples = true;          // 여러 파일
    form.keepExtensions = true;     // 확장자 표시

    // 폴더 생성 체크
    if(!fs.existsSync(form.uploadDir)){
          fs.mkdirSync(form.uploadDir, 0755);
    }

    // form타입 필드(text 타입)
    form.on('field', function(field, value) {

    // form타입 필드(file 타입)
    }).on('file', function(field, file) {
        let oldPath = file.path;
        let newPath = form.uploadDir + path.sep + file.name;
        console.log(' ### oldPath >>> ', oldPath);
        console.log(' ### newPath >>> ', newPath);
        // fs.rename(oldPath, newPath, function(err) {
        //     if(err) {
        //         res.status(500).send({result: {code: 999, message: "error", data : err.message}});
        //     }
        //     fs.stat(newPath, function (err, stats) {
        //         if(err) {
        //             res.status(500).send({result: {code: 999, message: "error", data : err.message}});
        //         }
        //     });
        // });
    }).on('progress', function(bytesReceived, bytesExpected) {
        let percent_complete = (bytesReceived / bytesExpected) * 100; 
    }).on('end', function() {
        // res.status(200).send({result: {code: 200,message: "success", data : data}});
    }).on('error', function(error) {
        res.status(500).send({result: {code: 999, message: "error", data : error.message}});
    });

    // end 이벤트 까지 전송된 후 최종 호출
    form.parse(req, (err, field, file) => {
        if(!err) {
            console.log('upload success!!');
            res.status(200).send({result: {code: 200, message: "success", data : ""}});
        } else {
            console.log('upload fail!!');
            res.status(500).send({result: {code: 999, message: "error", data : err.message}});
        }
    });
});

module.exports = fileUpload;

const getImages = function(req, res) {
	fs.readdir(path.join(config.rootPath,"uploaded_images"), function(err, files) {
		files.forEach(function(f) {
			var stat = fs.stat(path.join(config.rootPath,"uploaded_images", f));
			console.log(stat);
		});
		if(err) {
			console.log(err);
			res.end(err);
		}	
		res.json(files);
	});
};

module.exports.delete = function(fileName){
	fs.unlink(path.join(path.rootPath,"uploaded_images", fileName), function(err) {
		if(err) {
			res.json({
				result : false,
				err : err
			});
		}
		else {
			res.json({
				result : true,
				err : null
			});
		}

	});
};
*/
