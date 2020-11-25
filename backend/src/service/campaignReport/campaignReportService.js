const db_mysql = require('./campaignReportDao');

exports.getCampaignReportTotalCnt = async () => {
    const data = await db_mysql.getCampaignReportTotalCnt();
    return data
}

exports.getCampaignReportList = async (start_offset, page_size, searchQuery, sortQuery) => {
    const data = await db_mysql.getCampaignReportList(start_offset, page_size, searchQuery, sortQuery);
    return data
}

exports.getCampaignReportInfoDetail = async (cmpgn_id) => {
    const data = await db_mysql.getCampaignReportInfoDetail(cmpgn_id);
    return data
}