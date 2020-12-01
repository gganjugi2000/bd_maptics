const db_mysql = require('./campaignDao');

exports.getCampaignTotalCnt = async () => {
    const data = await db_mysql.getCampaignTotalCnt();
    return data
}

exports.getCampaignList = async (start_offset, page_size, searchQuery, sortQuery) => {
    const data = await db_mysql.getCampaignList(start_offset, page_size, searchQuery, sortQuery);
    return data
}

exports.getCampaignInfoDetail = async (cmpgn_id) => {
    const data = await db_mysql.getCampaignInfoDetail(cmpgn_id);
    return data
}

exports.getCampaignAcknlgList = async (cmpgn_id) => {
    const data = await db_mysql.getCampaignAcknlgList(cmpgn_id);
    return data
}

exports.getCampaignAcknlgInfoDetail = async (cmpgn_id) => {
    const data = await db_mysql.getCampaignAcknlgInfoDetail(cmpgn_id);
    return data
}

exports.addCampaignInfo = async (cmpgn_code, cmpgn_title, cmpgn_pps, advts_id, send_req_cnt
    , send_dt_ymd, send_dt_ap, send_dt_hh, send_dt_mm, use_cm, send_mode
    , mgs_title, msg_summary, msg_app_img, org_msg_app_img_nm, msg_app_img_ext, msg_app_img_size
    , sender_no, rct_target, org_rct_target_nm, rct_target_ext, rct_target_size
    , link_ps_url_1, link_ps_yn_1, link_ps_url_2, link_ps_yn_2, link_ps_url_3, link_ps_yn_3
    , url_upload, org_url_upload_nm, url_upload_ext, url_upload_size, url_upload_cv
    , cp_no_upload, org_cp_no_upload_nm, cp_no_upload_ext, cp_no_upload_size, reg_id, upd_id) => {

    await db_mysql.addCampaignInfo(cmpgn_code, cmpgn_title, cmpgn_pps, advts_id, send_req_cnt
        , send_dt_ymd, send_dt_ap, send_dt_hh, send_dt_mm, use_cm, send_mode
        , mgs_title, msg_summary, msg_app_img, org_msg_app_img_nm, msg_app_img_ext, msg_app_img_size
        , sender_no, rct_target, org_rct_target_nm, rct_target_ext, rct_target_size
        , link_ps_url_1, link_ps_yn_1, link_ps_url_2, link_ps_yn_2, link_ps_url_3, link_ps_yn_3
        , url_upload, org_url_upload_nm, url_upload_ext, url_upload_size, url_upload_cv
        , cp_no_upload, org_cp_no_upload_nm, cp_no_upload_ext, cp_no_upload_size, reg_id, upd_id);
}

exports.addCampaignAcknlgInfo = async (cmpgn_id, acknlg_yn, rej_rs, reg_id, upd_id) => {
    await db_mysql.addCampaignAcknlgInfo(cmpgn_id, acknlg_yn, rej_rs, reg_id, upd_id);
}

exports.removeCampaignInfo = async (cmpgn_id) => {
    if(cmpgn_id)
        await db_mysql.removeCampaignInfo(cmpgn_id);
}

exports.modifyCampaignInfo = async (cmpgn_id, cmpgn_title, cmpgn_pps, advts_id, send_req_cnt
    , send_dt_ymd, send_dt_ap, send_dt_hh, send_dt_mm, use_cm, send_mode, mgs_title, msg_summary
    , msg_app_img, org_msg_app_img_nm, msg_app_img_ext, msg_app_img_size
    , sender_no, rct_target, org_rct_target_nm, rct_target_ext, rct_target_size
    , link_ps_url_1, link_ps_yn_1, link_ps_url_2, link_ps_yn_2, link_ps_url_3, link_ps_yn_3
    , url_upload, org_url_upload_nm, url_upload_ext, url_upload_size, url_upload_cv
    , cp_no_upload, org_cp_no_upload_nm, cp_no_upload_ext, cp_no_upload_size, upd_id) => {

    if(cmpgn_id)
        await db_mysql.modifyCampaignInfo(cmpgn_id, cmpgn_title, cmpgn_pps, advts_id, send_req_cnt
            , send_dt_ymd, send_dt_ap, send_dt_hh, send_dt_mm, use_cm, send_mode
            , mgs_title, msg_summary, msg_app_img, org_msg_app_img_nm, msg_app_img_ext, msg_app_img_size
            , sender_no, rct_target, org_rct_target_nm, rct_target_ext, rct_target_size
            , link_ps_url_1, link_ps_yn_1, link_ps_url_2, link_ps_yn_2, link_ps_url_3, link_ps_yn_3
            , url_upload, org_url_upload_nm, url_upload_ext, url_upload_size, url_upload_cv
            , cp_no_upload, org_cp_no_upload_nm, cp_no_upload_ext, cp_no_upload_size, upd_id);
}

