const db_mysql = require('../db/common');


exports.getUserList = async () => {
    const data = await db_mysql.getUserList();
    return data
}