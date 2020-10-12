const mysql = require('./mysql');

exports.getUserList = async () => {
    const sql = `select * from users`;
    return new Promise(resolve => {
        mysql.get_data('user_info', sql, (result) => {
            resolve(result);
        });
    });
}
