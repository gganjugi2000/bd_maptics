const mysql = require('../db/mysql');

exports.getUserList = () => {
    const sql = `select * from users`;
    return new Promise(resolve => {
        mysql.get_data('user_info', sql, (result) => {
            resolve(result);
        });
    });
}