const db_mysql = require('./userDao');

exports.getUserList = async () => {
    const data = await db_mysql.getUserList();
    return data
}