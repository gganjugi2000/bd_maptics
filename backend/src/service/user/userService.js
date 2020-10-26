const db_mysql = require('./userDao');

exports.getUserTotalCnt = async () => {
    const data = await db_mysql.getUserTotalCnt();
    return data
}

exports.getUserList = async (start_offset, page_size) => {
    const data = await db_mysql.getUserList(start_offset, page_size);
    return data
}

exports.getUserInfoDetail = async (user_seq) => {
    const data = await db_mysql.getUserInfoDetail(user_seq);
    return data
}

exports.addUserInfo = async (user_id, password, comp_nm, comp_no, phone_no, addr, email_addr, comp_img, mobphone_no, descp, use_yn) => {
    await db_mysql.addUserInfo(user_id, password, comp_nm, comp_no, phone_no, addr, email_addr, comp_img, mobphone_no, descp, use_yn);
}

exports.removeUserInfo = async (user_seq) => {
    if(user_seq)
        await db_mysql.removeUserInfo(user_seq);
}

exports.modifyUserInfo = async (user_seq, user_id, password, comp_nm, comp_no, phone_no, addr, email_addr, comp_img, mobphone_no, descp, use_yn) => {
    if(user_seq)
        await db_mysql.modifyUserInfo(user_seq, user_id, password, comp_nm, comp_no, phone_no, addr, email_addr, comp_img, mobphone_no, descp, use_yn);
}