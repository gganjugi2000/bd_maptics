const mysql = require('../../db/mysql');
const { search } = require('../../rest/campaignReport');

exports.getCampaignReportTotalCnt = () => {
    const sql = ` select count(*) cnt from campaign_report `;
    return new Promise(resolve => {
        mysql.get_data('get_campaign_report_cnt', sql, (result) => {
            resolve(result);
        });
    });
}

exports.getCampaignReportList = (start_offset, page_size, searchQuery, sortQuery) => {
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
                    ,A.use_yn
                    ,C.send_success_cnt
                    ,C.send_fail_cnt
                    ,C.send_fail_rs
                    ,C.rct_complete_cnt
                    ,C.rct_fail_cnt
                    ,C.rct_fail_rs
                    ,C.rct_wait_cnt
                    ,C.rct_wait_rs
                from campaign A, advertiser B, campaign_report C 
                where 
                    A.use_yn = 'Y' and B.use_yn = 'Y' 
                and A.advts_id = B.advts_id  
                and A.id = C.cmpgn_id 
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
                query += "A.advts_nm like '%" + searchQuery.advts_nm + "%'";
        }
        // 캠페인 명
        if(searchQuery.cmpgn_title != null && searchQuery.cmpgn_title != undefined) {
            if(query != "") query += " OR ";
                query += "A.cmpgn_title like '%" + searchQuery.cmpgn_title + "%'";
        }
        // 발송 시작, 발송 종료
        if(searchQuery.send_start_dt != null && searchQuery.send_start_dt != undefined 
            && searchQuery.send_end_dt != null && searchQuery.send_end_dt != undefined) {
            if(query != "") query += " OR ";
                query += `( A.send_dt_ymd between '${searchQuery.send_start_dt} 00:00:00' and '${searchQuery.send_end_dt} 23:59:59' )`;
        } else if(searchQuery.send_start_dt != null && searchQuery.send_start_dt != undefined 
            && (searchQuery.send_end_dt == null || searchQuery.send_end_dt == undefined)) {
            if(query != "") query += " OR ";
                query += `( A.send_dt_ymd between '${searchQuery.send_start_dt} 00:00:00' and '${searchQuery.send_start_dt} 23:59:59' )`;

        } else if((searchQuery.send_start_dt == null && searchQuery.send_start_dt == undefined)
            && (searchQuery.send_end_dt != null && searchQuery.send_end_dt != undefined)) {
            if(query != "") query += " OR ";
                query += `( A.send_dt_ymd between '${searchQuery.send_end_dt} 00:00:00' and '${searchQuery.send_end_dt} 23:59:59' )`;
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
        mysql.get_data('get_campaign_report_list', sql_query, (result) => {
            resolve(result);
        });
    });
}

exports.getCampaignReportInfoDetail = (cmpgn_id) => {
    const sql = ` 
                select
                    A.id
                    ,A.send_mode
                    ,A.send_dt_ymd
                    ,A.send_dt_ap
                    ,A.send_dt_hh
                    ,A.send_dt_mm
                    ,A.cmpgn_title
                    ,A.mgs_title
                    ,A.msg_summary
                    ,B.cmpgn_id
                    ,B.send_success_cnt
                    ,B.send_fail_cnt
                    ,B.send_fail_rs
                    ,B.rct_complete_cnt
                    ,B.rct_fail_cnt
                    ,B.rct_fail_rs
                    ,B.rct_wait_cnt
                    ,B.rct_wait_rs
                from campaign A, campaign_report B 
                WHERE A.id = '${cmpgn_id}'
                `;
    return new Promise(resolve => {
        mysql.get_data('get_campaign_detail', sql, (result) => {
            resolve(result);
        });
    });
}