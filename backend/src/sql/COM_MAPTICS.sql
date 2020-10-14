CREATE TABLE USER_INFO
(
    `USER_SEQ`      INT             NOT NULL    AUTO_INCREMENT COMMENT '사용자SEQ', 
    `USER_ID`       VARCHAR(20)     NOT NULL    COMMENT '사용자ID', 
    `PASSWORD`      TEXT            NOT NULL    COMMENT '비밀번호', 
    `COMP_NM`       VARCHAR(100)    NOT NULL    COMMENT '상호명', 
    `COMP_NO`       VARCHAR(45)     NULL        COMMENT '사업자 번호', 
    `PHONE_NO`      VARCHAR(45)     NULL        COMMENT '전화번호', 
    `ADDR`          VARCHAR(255)    NOT NULL    COMMENT '주소', 
    `EMAIL_ADDR`    VARCHAR(100)    NOT NULL    COMMENT '이메일 주소', 
    `ATCH_FILE_ID`  CHAR(20)        NULL        COMMENT '업체 이미지', 
    `MOBPHONE_NO`   VARCHAR(20)     NULL        COMMENT '핸드폰 번호', 
    `DESCP`           TEXT            NULL        COMMENT '비고', 
    `USE_YN`        CHAR(1)         NOT NULL    COMMENT '사용여부', 
    `REG_ID`        VARCHAR(20)     NOT NULL    COMMENT '등록ID', 
    `REG_DT`        DATETIME        NOT NULL    COMMENT '등록일시', 
    `UPD_ID`        VARCHAR(20)     NULL        COMMENT '수정ID', 
    `UPD_DT`        DATETIME        NULL        COMMENT '수정일시', 
    PRIMARY KEY (USER_SEQ, USER_ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE USER_INFO COMMENT '사용자정보';


CREATE TABLE COM_FILE
(
    `ATCH_FILE_ID`  CHAR(20)    NOT NULL    COMMENT '첨부파일ID', 
    `USE_YN`        CHAR(1)     NOT NULL    COMMENT '사용여부', 
    `CREATE_DT`     DATETIME    NOT NULL    COMMENT '생성일시', 
    PRIMARY KEY (ATCH_FILE_ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE COM_FILE COMMENT '파일 속성';


CREATE TABLE COM_FILE_DETAIL
(
    `FILE_SEQ`        INT             NOT NULL    AUTO_INCREMENT COMMENT '파일일련번호', 
    `ATCH_FILE_ID`    CHAR(20)        NOT NULL    COMMENT '첨부파일ID', 
    `FILE_SAVE_PATH`  VARCHAR(255)    NOT NULL    COMMENT '파일저장경로', 
    `SAVE_FILE_NM`    VARCHAR(255)    NOT NULL    COMMENT '저장파일명', 
    `ORIGIN_FILE_NM`  VARCHAR(255)    NOT NULL    COMMENT '원본파일명', 
    `FILE_EXTSN`      VARCHAR(20)     NULL        COMMENT '파일확장자', 
    `FILE_SIZE`       INT             NULL        COMMENT '파일크기(byte)', 
    `REG_ID`          VARCHAR(20)     NOT NULL    COMMENT '등록ID', 
    `REG_DT`          DATETIME        NOT NULL    COMMENT '등록일시', 
    `UPD_ID`          VARCHAR(20)     NULL        COMMENT '수정ID', 
    `UPD_DT`          DATETIME        NULL        COMMENT '수정일시', 
    PRIMARY KEY (FILE_SEQ, ATCH_FILE_ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE COM_FILE_DETAIL
    ADD CONSTRAINT FK_COM_FILE_DETAIL_ATCH_FILE_ID_COM_FILE_ATCH_FILE_ID FOREIGN KEY (ATCH_FILE_ID)
        REFERENCES COM_FILE (ATCH_FILE_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;