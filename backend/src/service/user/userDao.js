const mysql = require('../../db/mysql');

exports.getUserList = () => {
    const sql = `select * from users`;
    return new Promise(resolve => {
        mysql.get_data('get_user', sql, (result) => {
            resolve(result);
        });
    });
}

exports.getUserInfoDetail = (id) => {
    const sql = `select * from users WHERE id = ${id}`;
    return new Promise(resolve => {
        mysql.get_data('get_user_detail', sql, (result) => {
            resolve(result);
        });
    });
}

exports.addUserInfo = (user_id, user_name) => {
    const sql = `
        INSERT INTO users (USER_ID, USER_NAME)
        VALUES ( '${user_id}', '${user_name}') `;
    return new Promise(resolve => {
        mysql.get_data('add_user', sql, (result) => {
            resolve(result);
        });
    });
}

exports.removeUserInfo = (id) => {
    const sql = `
        DELETE FROM users WHERE id = ${id}
    `;
    return new Promise(resolve => {
        mysql.get_data('remove_user', sql, (result) => {
            resolve(result);
        });
    });
}

exports.modifyUserInfo = (id, user_name) => {
    const sql = `
        UPDATE users SET user_name = '${user_name}' where id = ${id}
    `;
    return new Promise(resolve => {
        mysql.get_data('modify_user', sql, (result) => {
            resolve(result);
        });
    });
}