const mysql = require('../../db/mysql');
const { search } = require('../../rest/advertiser');

exports.getAdvertiserTotalCnt = () => {
    const sql = ` select count(*) cnt from advertiser where use_yn = 'Y' `;
    return new Promise(resolve => {
        mysql.get_data('get_advertiser_cnt', sql, (result) => {
            resolve(result);
        });
    });
}

exports.getAdvertiserList = (start_offset, page_size, searchQuery, sortQuery) => {
    let sql_query = "";
    const sql = ` 
                select
                    advts_id
                    , advts_nm
                    , advts_mng_nm
                    , advts_img
                    , email_addr
                    , phone_no
                    , descp
                    , use_yn
                    , reg_id
                    , reg_dt
                    , upd_id
                    , upd_dt
                    from advertiser 
                where use_yn = 'Y' 
                `;
    sql_query = sql_query.concat(sql);

    if(Object.keys(searchQuery).length !== 0) {
        sql_query = sql_query.concat("AND ( ");

        let query = "";
        // advts_id: "",       // 광고주 아이디
        if(searchQuery.advts_id != null && searchQuery.advts_id != undefined) {
            query += "advts_id like '%" + searchQuery.advts_id + "%'";
        }
        // advts_nm = "",      // 광고주 명
        if(searchQuery.advts_nm != null && searchQuery.advts_nm != undefined) {
            if(query != "") query += " OR ";
            query += "advts_nm like '%" + searchQuery.advts_nm + "%'";
        }
        // advts_mng_nm = "",  // 담당자 명
        if(searchQuery.advts_mng_nm != null && searchQuery.advts_mng_nm != undefined) {
            if(query != "") query += " OR ";
            query += "advts_mng_nm like '%" + searchQuery.advts_mng_nm + "%'";
        }
        // reg_start_dt = "",  // 등록 시작일, reg_end_dt = ""     // 등록 종료일
        if(searchQuery.reg_start_dt != null && searchQuery.reg_start_dt != undefined 
            && searchQuery.reg_end_dt != null && searchQuery.reg_end_dt != undefined) {
            if(query != "") query += " OR ";
            query += `( reg_dt between '${searchQuery.reg_start_dt} 00:00:00' and '${searchQuery.reg_end_dt} 23:59:59' )`;
        } else if(searchQuery.reg_start_dt != null && searchQuery.reg_start_dt != undefined 
            && (searchQuery.reg_end_dt == null || searchQuery.reg_end_dt == undefined)) {
            if(query != "") query += " OR ";
            query += `( reg_dt between '${searchQuery.reg_start_dt} 00:00:00' and '${searchQuery.reg_start_dt} 23:59:59' )`;

        } else if((searchQuery.reg_start_dt == null && searchQuery.reg_start_dt == undefined)
            && (searchQuery.reg_end_dt != null && searchQuery.reg_end_dt != undefined)) {
            if(query != "") query += " OR ";
            query += `( reg_dt between '${searchQuery.reg_end_dt} 00:00:00' and '${searchQuery.reg_end_dt} 23:59:59' )`;
        }

        // 공통으로 searchQuery 변경 음... date type...
        // let i = 0;
        // 
        // for (var q in searchQuery) {
        //     if(q.indexOf("_dt") < 1) {
        //         search_query += q + " like '%" + searchQuery[q] + "'%'" 
        //         if (obj.hasOwnProperty(i)) {
        //             result += objName + "." + i + " = " + obj[i] + "\n";
        //         }
        //         if (i !== searchQuery.length - 1) {
        //             result += " OR ";
        //         }
        //         console.log(search_query);
        //         i++;
        //     }
        // }

        sql_query = sql_query.concat(query);
        sql_query = sql_query.concat(" ) ");
    }

    const orderByDesc = " order by reg_dt desc";
    const orderByAsc = " order by reg_dt asc";
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
        mysql.get_data('get_advertiser_list', sql_query, (result) => {
            resolve(result);
        });
    });
}

exports.getAdvertiserSearchList = (start_offset, page_size, searchQuery, sortQuery) => {
    let sql_query = "";
    const sql = ` 
                select
                    advts_id
                    , advts_nm
                    , advts_mng_nm
                    , advts_img
                    , email_addr
                    , phone_no
                    , descp
                    , use_yn
                    , reg_id
                    , reg_dt
                    , upd_id
                    , upd_dt
                    from advertiser 
                where use_yn = 'Y' 
                `;
    sql_query = sql_query.concat(sql);

    if(Object.keys(searchQuery).length !== 0) {
        sql_query = sql_query.concat("AND ( ");

        let query = "";
        // 광고주 검색 키워드
        if(searchQuery.search_value != null && searchQuery.search_value != undefined) {
            query += "advts_id like '%" + searchQuery.search_value + "%'";
        
            if(query != "") query += " OR ";
                query += "advts_nm like '%" + searchQuery.search_value + "%'";
        
            if(query != "") query += " OR ";
                query += "advts_mng_nm like '%" + searchQuery.search_value + "%'";
        }
        
        sql_query = sql_query.concat(query);
        sql_query = sql_query.concat(" ) ");
    }

    const orderByDesc = " order by reg_dt desc";
    const orderByAsc = " order by reg_dt asc";
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
        mysql.get_data('get_advertiser_search_list', sql_query, (result) => {
            resolve(result);
        });
    });
}

exports.getAdvertiserInfoDetail = (advts_id) => {
    const sql = ` 
                select
                    advts_id
                    , advts_nm
                    , advts_mng_nm
                    , advts_img
                    , email_addr
                    , phone_no
                    , descp
                    , use_yn
                    , reg_id
                    , reg_dt
                    , upd_id
                    , upd_dt
                from advertiser WHERE advts_id = '${advts_id}'
                `;
    return new Promise(resolve => {
        mysql.get_data('get_advertiser_detail', sql, (result) => {
            resolve(result);
        });
    });
}

exports.addAdvertiserInfo = (advts_id, advts_nm, advts_mng_nm, advts_img, email_addr, phone_no, descp, reg_id, upd_id) => {    
    const sql = `
        INSERT INTO advertiser (advts_id, advts_nm, advts_mng_nm, advts_img, email_addr, phone_no, descp, use_yn, reg_id, reg_dt, upd_id, upd_dt)
        VALUES ( '${advts_id}', '${advts_nm}', '${advts_mng_nm}', '${advts_img}', '${email_addr}', '${phone_no}', '${descp}', 'Y', 'super', NOW(), 'super', NOW()) `;
    return new Promise(resolve => {
        mysql.get_data('add_advertiser', sql, (result) => {
            resolve(result);
        });
    });
}

exports.removeAdvertiserInfo = (advts_id) => {
    const sql = `
        DELETE FROM advertiser WHERE advts_id = '${advts_id}'
    `;
    return new Promise(resolve => {
        mysql.get_data('remove_advertiser', sql, (result) => {
            resolve(result);
        });
    });
}

exports.modifyAdvertiserInfo = (advts_id, advts_nm, advts_mng_nm, advts_img, email_addr, phone_no, descp, upd_id) => {
    const sql = `
        UPDATE advertiser
        SET
            advts_nm = '${advts_nm}', 
            advts_mng_nm = '${advts_mng_nm}', 
            advts_img = '${advts_img}', 
            email_addr = '${email_addr}', 
            phone_no = '${phone_no}', 
            descp = '${descp}', 
            email_addr = '${email_addr}', 
            upd_id = 'super', 
            upd_dt = NOW()
        where advts_id = '${advts_id}'
    `;
    return new Promise(resolve => {
        mysql.get_data('modify_advertiser', sql, (result) => {
            resolve(result);
        });
    });
}

exports.checkAdvertiserId = (advts_id) => {
    const sql = ` 
                select
                    advts_id
                    , advts_nm
                    , advts_mng_nm
                    , advts_img
                    , email_addr
                    , phone_no
                    , descp
                    , use_yn
                    , reg_id
                    , reg_dt
                    , upd_id
                    , upd_dt
                    from advertiser 
                where advts_id = '${advts_id}' `;
    return new Promise(resolve => {
        mysql.get_data('check_advertiser_id', sql, (result) => {
            resolve(result);
        });
    });
}

