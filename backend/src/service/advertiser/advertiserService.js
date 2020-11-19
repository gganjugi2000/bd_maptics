const db_mysql = require('./advertiserDao');

exports.getAdvertiserTotalCnt = async () => {
    const data = await db_mysql.getAdvertiserTotalCnt();
    return data
}

exports.getAdvertiserList = async (start_offset, page_size, searchQuery, sortQuery) => {
    const data = await db_mysql.getAdvertiserList(start_offset, page_size, searchQuery, sortQuery);
    return data
}

exports.getAdvertiserInfoDetail = async (advts_id) => {
    const data = await db_mysql.getAdvertiserInfoDetail(advts_id);
    return data
}

exports.addAdvertiserInfo = async (advts_id, advts_nm, advts_mng_nm, advts_img, email_addr, phone_no, descp, use_yn, reg_id, reg_dt, upd_id, upd_dt) => {
    await db_mysql.addAdvertiserInfo(advts_id, advts_nm, advts_mng_nm, advts_img, email_addr, phone_no, descp, use_yn, reg_id, reg_dt, upd_id, upd_dt);
}

exports.removeAdvertiserInfo = async (advts_id) => {
    if(advts_id)
        await db_mysql.removeAdvertiserInfo(advts_id);
}

exports.modifyAdvertiserInfo = async (advts_id, advts_nm, advts_mng_nm, advts_img, email_addr, phone_no, descp, use_yn, upd_id, upd_dt) => {
    if(advts_id)
        await db_mysql.modifyAdvertiserInfo(advts_id, advts_nm, advts_mng_nm, advts_img, email_addr, phone_no, descp, use_yn, upd_id, upd_dt);
}

exports.checkAdvertiserId = async (advts_id) => {
    const data = await db_mysql.checkAdvertiserId(advts_id);
    return data
}