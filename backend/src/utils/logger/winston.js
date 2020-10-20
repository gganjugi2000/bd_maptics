let winston = require('winston');
let winstonDaily = require('winston-daily-rotate-file');
const { combine, timestamp, printf } = winston.format;
const fs = require('fs');
const path = require('path');

// 로그 디렉토리 체크
const logDir = require('os').homedir() + path.sep + "maptics_log";
// console.log('### logDir ### '+logDir);
// custom log format 정의
const logFormat = printf(info => {
  console.log('########### info instanceof Error >>>>>>>>>', info instanceof Error);

  if (info instanceof Error) {
      info.message = `${info.message} - ${info.stack}`;
  }
  // return `${JSON.stringify(info, null, '\n')}`;
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    // info 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: 'info',
      datePattern: 'YYYY-MM-DD',      // 일 단위로 rolling
      dirname: logDir,
      filename: '%DATE%.log',
      maxSize: '20m',                 // 20MB
      maxFiles: 10,                   // 20mb의 파일을 10개 가지고 있겠다.
      zippedArchive: false,
    }),
    // error 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',      // 일 단위로 rolling
      dirname: logDir + '/error',
      filename: '%DATE%.error.log',
      maxSize: '20m',                 // 20MB
      maxFiles: 10,                   // 20mb의 파일을 10개 가지고 있겠다.
      zippedArchive: false,
    }),
  ],
});

module.exports = logger;