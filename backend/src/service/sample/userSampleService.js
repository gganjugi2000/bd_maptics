const db_mysql = require('./userSampleDao');

exports.getUserList = async () => {
    const data = await db_mysql.getUserList();
    return data
}

exports.getUserInfoDetail = async (id) => {
    const data = await db_mysql.getUserInfoDetail(id);
    return data
}

exports.addUserInfo = async (user_id, user_name) => {
    const data = await db_mysql.addUserInfo(user_id, user_name);
    return data;
}

exports.removeUserInfo = async (id) => {
    if(id)
        await db_mysql.removeUserInfo(id);
}

exports.modifyUserInfo = async (id, user_name) => {
    if(id)
        await db_mysql.modifyUserInfo(id, user_name);
}