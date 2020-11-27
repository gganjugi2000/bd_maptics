const mysql = require('../../db/mysql');
const { search } = require('../../rest/campaign');

exports.getCampaignTotalCnt = () => {
    const sql = ` select 
                    count(A.id) cnt 
                  from campaign A, advertiser B  
                  where 
                    A.use_yn = 'Y' and B.use_yn = 'Y' 
                    and A.advts_id = B.advts_id 
                `;
    return new Promise(resolve => {
        mysql.get_data('get_campaign_cnt', sql, (result) => {
            resolve(result);
        });
    });
}

exports.getCampaignList = (start_offset, page_size, searchQuery, sortQuery) => {
    let sql_query = "";
    const sql = ` 
                select
                    A.id
                    ,A.cmpgn_code
                    ,A.cmpgn_title
                    ,A.cmpgn_pps
                    ,A.advts_id
                    ,B.advts_nm 
                    ,A.send_req_cnt
                    ,CONCAT(A.send_dt_ymd, ' ', case A.send_dt_ap when 'am' then '오전' when 'pm' then '오후' else '-' end, ' ',A.send_dt_hh,':',A.send_dt_mm) send_dt
                    ,A.send_dt_ymd
                    ,A.send_dt_ap
                    ,A.send_dt_hh
                    ,A.send_dt_mm
                    ,A.use_cm
                    ,A.send_mode
                    ,A.mgs_title
                    ,A.msg_summary
                    ,A.msg_app_img
                    ,A.sender_no
                    ,A.rct_target
                    ,A.link_ps_url_1
                    ,A.link_ps_yn_1
                    ,A.link_ps_url_2
                    ,A.link_ps_yn_2
                    ,A.link_ps_url_3
                    ,A.link_ps_yn_3
                    ,A.url_upload
                    ,A.url_upload_cv
                    ,A.cp_no_upload
                    ,A.use_yn
                    ,A.reg_id
                    ,A.reg_dt
                    ,A.upd_id
                    ,A.upd_dt
                from campaign A, advertiser B
                where 
                    A.use_yn = 'Y' and B.use_yn = 'Y' 
                    and A.advts_id = B.advts_id  
                `;
    sql_query = sql_query.concat(sql);

    if(Object.keys(searchQuery).length !== 0) {
        sql_query = sql_query.concat("AND ( ");

        let query = "";
        // 광고주 아이디
        if(searchQuery.advts_id != null && searchQuery.advts_id != undefined) {
            query += "A.advts_id like '%" + searchQuery.advts_id + "%'";
        }
        // 광고주 명
        if(searchQuery.advts_nm != null && searchQuery.advts_nm != undefined) {
            if(query != "") query += " OR ";
                query += "B.advts_nm like '%" + searchQuery.advts_nm + "%'";
        }
        // 캠페인 명
        if(searchQuery.cmpgn_title != null && searchQuery.cmpgn_title != undefined) {
            if(query != "") query += " OR ";
                query += "A.cmpgn_title like '%" + searchQuery.cmpgn_title + "%'";
        }
        // 등록 시작,  등록 종료
        if(searchQuery.reg_start_dt != null && searchQuery.reg_start_dt != undefined 
            && searchQuery.reg_end_dt != null && searchQuery.reg_end_dt != undefined) {
            if(query != "") query += " OR ";
                query += `( A.reg_dt between '${searchQuery.reg_start_dt} 00:00:00' and '${searchQuery.reg_end_dt} 23:59:59' )`;
        } else if(searchQuery.reg_start_dt != null && searchQuery.reg_start_dt != undefined 
            && (searchQuery.reg_end_dt == null || searchQuery.reg_end_dt == undefined)) {
            if(query != "") query += " OR ";
                query += `( A.reg_dt between '${searchQuery.reg_start_dt} 00:00:00' and '${searchQuery.reg_start_dt} 23:59:59' )`;

        } else if((searchQuery.reg_start_dt == null && searchQuery.reg_start_dt == undefined)
            && (searchQuery.reg_end_dt != null && searchQuery.reg_end_dt != undefined)) {
            if(query != "") query += " OR ";
                query += `( A.reg_dt between '${searchQuery.reg_end_dt} 00:00:00' and '${searchQuery.reg_end_dt} 23:59:59' )`;
        }
        // 발송 시작, 발송 종료
        // STR_TO_DATE(LEFT(A.send_dt_ymd,LOCATE(' ',A.send_dt_ymd)),'%Y%m%d')
        if(searchQuery.send_start_dt != null && searchQuery.send_start_dt != undefined 
            && searchQuery.send_end_dt != null && searchQuery.send_end_dt != undefined) {
            if(query != "") query += " OR ";
                query += `( STR_TO_DATE(A.send_dt_ymd,'%Y-%m-%d') between '${searchQuery.send_start_dt} 00:00:00' and '${searchQuery.send_end_dt} 23:59:59' )`;
        } else if(searchQuery.send_start_dt != null && searchQuery.send_start_dt != undefined 
            && (searchQuery.send_end_dt == null || searchQuery.send_end_dt == undefined)) {
            if(query != "") query += " OR ";
                query += `( STR_TO_DATE(A.send_dt_ymd,'%Y-%m-%d') between '${searchQuery.send_start_dt} 00:00:00' and '${searchQuery.send_start_dt} 23:59:59' )`;

        } else if((searchQuery.send_start_dt == null && searchQuery.send_start_dt == undefined)
            && (searchQuery.send_end_dt != null && searchQuery.send_end_dt != undefined)) {
            if(query != "") query += " OR ";
                query += `( STR_TO_DATE(A.send_dt_ymd,'%Y-%m-%d') between '${searchQuery.send_end_dt} 00:00:00' and '${searchQuery.send_end_dt} 23:59:59' )`;
        }

        sql_query = sql_query.concat(query);
        sql_query = sql_query.concat(" ) ");
    }

    const orderByDesc = " order by A.reg_dt desc";
    const orderByAsc = " order by A.reg_dt asc";
    if(Object.keys(sortQuery).length !== 0) {
        if(sortQuery.sort != null && sortQuery.sort != undefined && sortQuery.sort == "asc") {
            sql_query = sql_query.concat(orderByAsc);
        } else {
            sql_query = sql_query.concat(orderByDesc);
        }
    } else {
        sql_query = sql_query.concat(orderByDesc)
    }

    const limit = ` limit ${start_offset}, ${page_size} `;
    sql_query = sql_query.concat(limit);

    return new Promise(resolve => {
        mysql.get_data('get_campaign_list', sql_query, (result) => {
            resolve(result);
        });
    });
}

exports.getCampaignInfoDetail = (cmpgn_id) => {
    const sql = ` 
                select
                    A.id
                    ,A.cmpgn_code
                    ,A.cmpgn_title
                    ,A.cmpgn_pps
                    ,A.advts_id
                    ,B.advts_nm 
                    ,B.advts_mng_nm 
                    ,B.email_addr 
                    ,B.phone_no 
                    ,B.advts_img 
                    ,A.send_req_cnt
                    ,A.send_dt_ymd
                    ,A.send_dt_ap
                    ,A.send_dt_hh
                    ,A.send_dt_mm
                    ,A.use_cm
                    ,A.send_mode
                    ,A.mgs_title
                    ,A.msg_summary
                    ,A.msg_app_img
                    ,A.sender_no
                    ,A.rct_target
                    ,A.link_ps_url_1
                    ,A.link_ps_yn_1
                    ,A.link_ps_url_2
                    ,A.link_ps_yn_2
                    ,A.link_ps_url_3
                    ,A.link_ps_yn_3
                    ,A.url_upload
                    ,A.url_upload_cv
                    ,A.cp_no_upload
                    ,A.use_yn
                    ,A.reg_id
                    ,A.reg_dt
                    ,A.upd_id
                    ,A.upd_dt
                from campaign A, advertiser B
                WHERE 
                    A.use_yn = 'Y' and B.use_yn = 'Y' 
                and A.advts_id = B.advts_id  
                and A.id = '${cmpgn_id}'
                `;
    return new Promise(resolve => {
        mysql.get_data('get_campaign_detail', sql, (result) => {
            resolve(result);
        });
    });
}

exports.getCampaignAcknlgInfoDetail = (cmpgn_id) => {
    const sql = ` 
                select
                    id
                    ,cmpgn_id
                    ,acknlg_yn
                    ,rej_rs
                    ,reg_id
                    ,reg_dt
                    ,upd_id
                    ,upd_dt
                from campaign_acknlg WHERE cmpgn_id = '${cmpgn_id}'
                `;
    return new Promise(resolve => {
        mysql.get_data('get_campaign_acknlg_detail', sql, (result) => {
            resolve(result);
        });
    });
}

exports.getCampaignAcknlgInfoDetail = (cmpgn_id) => {
    const sql = ` 
                select
                    id
                    ,cmpgn_id
                    ,acknlg_yn
                    ,rej_rs
                    ,reg_id
                    ,reg_dt
                    ,upd_id
                    ,upd_dt
                from campaign_acknlg WHERE cmpgn_id = '${cmpgn_id}'
                `;
    return new Promise(resolve => {
        mysql.get_data('get_campaign_acknlg_detail', sql, (result) => {
            resolve(result);
        });
    });
}

exports.addCampaignInfo = (cmpgn_code, cmpgn_title, cmpgn_pps, advts_id, send_req_cnt, send_dt_ymd, send_dt_ap, send_dt_hh, send_dt_mm, use_cm, send_mode, mgs_title, msg_summary, msg_app_img, sender_no, rct_target, link_ps_url_1, link_ps_yn_1, link_ps_url_2, link_ps_yn_2, link_ps_url_3, link_ps_yn_3, url_upload, url_upload_cv, cp_no_upload, reg_id, upd_id) => {    
    const sql = `
        INSERT INTO campaign (cmpgn_code, cmpgn_title, cmpgn_pps, advts_id, send_req_cnt, send_dt_ymd, send_dt_ap, send_dt_hh, send_dt_mm, use_cm, send_mode, mgs_title, msg_summary, msg_app_img, sender_no, rct_target, link_ps_url_1, link_ps_yn_1, link_ps_url_2, link_ps_yn_2, link_ps_url_3, link_ps_yn_3, url_upload, url_upload_cv, cp_no_upload, use_yn, reg_id, reg_dt, upd_id, upd_dt)
        VALUES ( '${cmpgn_code}', '${cmpgn_title}', '${cmpgn_pps}', '${advts_id}', '${send_req_cnt}', '${send_dt_ymd}', '${send_dt_ap}', '${send_dt_hh}', '${send_dt_mm}', '${use_cm}', '${send_mode}', '${mgs_title}', '${msg_summary}', '${msg_app_img}', '${sender_no}', '${rct_target}', '${link_ps_url_1}', '${link_ps_yn_1}', '${link_ps_url_2}', '${link_ps_yn_2}', '${link_ps_url_3}', '${link_ps_yn_3}', '${url_upload}', '${url_upload_cv}', '${cp_no_upload}', 'Y', 'super', NOW(), 'super', NOW()) `;
    return new Promise(resolve => {
        mysql.get_data('add_campaign', sql, (result) => {
            resolve(result);
        });
    });
}

exports.addCampaignAcknlgInfo = (cmpgn_id, acknlg_yn, rej_rs, reg_id, upd_id) => {    
    const sql = `
        INSERT INTO campaign (cmpgn_id, acknlg_yn, rej_rs, reg_id, reg_dt, upd_id, upd_dt)
        VALUES ( '${cmpgn_id}', '${acknlg_yn}', '${rej_rs}', 'super', NOW(), 'super', NOW()) `;
    return new Promise(resolve => {
        mysql.get_data('add_campaign_acknlg', sql, (result) => {
            resolve(result);
        });
    });
}

exports.removeCampaignInfo = (cmpgn_id) => {
    const sql = `
        DELETE FROM campaign WHERE id = '${cmpgn_id}'
    `;
    return new Promise(resolve => {
        mysql.get_data('remove_campaign', sql, (result) => {
            resolve(result);
        });
    });
}

exports.modifyCampaignInfo = (cmpgn_id, cmpgn_title, cmpgn_pps, advts_id, send_req_cnt, send_dt_ymd, send_dt_ap, send_dt_hh, send_dt_mm, use_cm, send_mode, mgs_title, msg_summary, msg_app_img, sender_no, rct_target, link_ps_url_1, link_ps_yn_1, link_ps_url_2, link_ps_yn_2, link_ps_url_3, link_ps_yn_3, url_upload, url_upload_cv, cp_no_upload, upd_id) => {
    const sql = `
        UPDATE campaign
        SET
            cmpgn_title = '${cmpgn_title}', 
            cmpgn_pps = '${cmpgn_pps}', 
            advts_id = '${advts_id}', 
            send_req_cnt = '${send_req_cnt}', 
            send_dt_ymd = '${send_dt_ymd}', 
            send_dt_ap = '${send_dt_ap}', 
            send_dt_hh = '${send_dt_hh}', 
            send_dt_mm = '${send_dt_mm}', 
            use_cm = '${use_cm}', 
            send_mode = '${send_mode}', 
            mgs_title = '${mgs_title}', 
            msg_summary = '${msg_summary}', 
            msg_app_img = '${msg_app_img}', 
            sender_no = '${sender_no}', 
            rct_target = '${rct_target}', 
            link_ps_url_1 = '${link_ps_url_1}', 
            link_ps_yn_1 = '${link_ps_yn_1}', 
            link_ps_url_2 = '${link_ps_url_2}', 
            link_ps_yn_2 = '${link_ps_yn_2}', 
            link_ps_url_3 = '${link_ps_url_3}', 
            link_ps_yn_3 = '${link_ps_yn_3}', 
            url_upload = '${url_upload}', 
            url_upload_cv = '${url_upload_cv}', 
            cp_no_upload = '${cp_no_upload}',
            upd_id = 'super', 
            upd_dt = NOW()
        where id = '${cmpgn_id}'
    `;
    return new Promise(resolve => {
        mysql.get_data('modify_campaign', sql, (result) => {
            resolve(result);
        });
    });
}


