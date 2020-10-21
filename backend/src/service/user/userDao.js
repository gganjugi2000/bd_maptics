const mysql = require('../../db/mysql');

exports.getUserTotalCnt = () => {
    const sql = ` select count(*) cnt from user_info where use_yn = 'Y' `;
    return new Promise(resolve => {
        mysql.get_data('get_user_cnt', sql, (result) => {
            resolve(result);
        });
    });
}

exports.getUserList = (start_offset, page_size) => {
    const sql = ` 
                select
                    user_seq
                    , user_id
                    , password
                    , comp_nm
                    , comp_no
                    , phone_no
                    , addr
                    , email_addr
                    , comp_img
                    , mobphone_no
                    , descp
                    , use_yn
                    , reg_id
                    , reg_dt
                    , upd_id
                    , upd_dt
                    from user_info 
                where use_yn = 'Y' limit ${start_offset}, ${page_size} `;
    console.log(sql);
    return new Promise(resolve => {
        mysql.get_data('get_user_list', sql, (result) => {
            resolve(result);
        });
    });
}

exports.getUserInfoDetail = (user_seq) => {
    const sql = ` 
                select 
                    user_id
                    , password
                    , comp_nm
                    , comp_no
                    , phone_no
                    , addr
                    , email_addr
                    , comp_img
                    , mobphone_no
                    , descp
                    , use_yn
                    , reg_id
                    , reg_dt
                    , upd_id
                    , upd_dt
                from user_info WHERE user_seq = ${user_seq} 
                `;
    return new Promise(resolve => {
        mysql.get_data('get_user_detail', sql, (result) => {
            resolve(result);
        });
    });
}

exports.addUserInfo = (user_id, password, comp_nm, comp_no, phone_no, addr, email_addr, comp_img, mobphone_no, descp, use_yn) => {
    const sql = `
        INSERT INTO user_info (USER_ID, PASSWORD, COMP_NM, COMP_NO, PHONE_NO, ADDR, EMAIL_ADDR, COMP_IMG, MOBPHONE_NO, DESCP, USE_YN, REG_ID, REG_DT)
        VALUES ( '${user_id}', '${password}', '${comp_nm}', '${comp_no}', '${phone_no}', '${addr}', '${email_addr}', '${comp_img}', '${mobphone_no}', '${descp}', '${use_yn}', 'super', NOW()) `;
    return new Promise(resolve => {
        mysql.get_data('add_user', sql, (result) => {
            resolve(result);
        });
    });
}

exports.removeUserInfo = (user_seq) => {
    const sql = `
        UPDATE user_info SET use_yn = 'N' where user_seq = ${user_seq}
    `;
    return new Promise(resolve => {
        mysql.get_data('remove_user', sql, (result) => {
            resolve(result);
        });
    });
}

exports.modifyUserInfo = (user_seq, user_id, password, comp_nm, comp_no, phone_no, addr, email_addr, comp_img, mobphone_no, descp, use_yn) => {
    const sql = `
        UPDATE user_info
        SET
            user_id = '${user_id}', 
            password = '${password}', 
            comp_nm = '${comp_nm}', 
            comp_no = '${comp_no}', 
            phone_no = '${phone_no}', 
            addr = '${addr}', 
            email_addr = '${email_addr}', 
            comp_img = '${comp_img}', 
            mobphone_no = '${mobphone_no}', 
            descp = '${descp}', 
            upd_id = 'super', 
            upd_dt = NOW()
        where user_seq = ${user_seq}
    `;
    return new Promise(resolve => {
        mysql.get_data('modify_user', sql, (result) => {
            resolve(result);
        });
    });
}
