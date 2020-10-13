const mysql = require('mysql');
const client = mysql.createPool(require('./config').getConfig().mysql);

exports.get_data = (func, query, callback) => {
    const start_time = new Date();
    client.getConnection(function(err, connection){
        connection.query(query, function selectCb(error, results, fields) {   
            if (process.env.NODE_ENV === "development") {
            }
            if (error) {
                connection.release();
                const end_time = new Date();
                callback(results);
                //오류내용 처리
                error["query"] = query;
                throw error;
            }
            connection.release();
            const end_time = new Date();
            console.log(func, query, results, start_time, end_time);
            // write_log(func, query, results, start_time, end_time);
            callback(results);
        });    
    });
}


exports.push_log = (userID, timeStamp, ip, type, action, detail, callback=()=>{}) => {
    const start_time = new Date();
    const params = detail.split('?');
    const param1 = action;
    const param2 = params[0];
    const param3 = params[1] || '';
    
    client.getConnection(function(err, connection){
        // insert statment
        // let query = `
        //     INSERT INTO user_log(user_id, timestamp, user_ip, action, detail)
        //     VALUES('${userID}', '${timeStamp}', '${ip}', '${action}', '${detail}')
        // `;
        let query = `
            INSERT INTO user_log(userId, time, clientIp, type, param1, param2, param3)
            VALUES('${userID}', '${timeStamp}', '${ip}', '${type}', '${param1}', '${param2}', '${param3}')
        `;
        connection.query(query, function selectCb(error, results, fields) {   
            if (error) {
                connection.release();
                const end_time = new Date();
                callback(results);
                //오류내용 처리
                error["query"] = query;
                throw error;
            }
            connection.release();
            const end_time = new Date();
            // write_log('push_log', query, results, start_time, end_time);
            callback(results);
        });  
    })
}

const write_log = (func, query, result, start_time, end_time) => {

    console.log("#####################################################################");
    console.log("      METHOD: "+ func);
    for(let i=0; i<query.split('\n').length; i++) {
        if(i==0) {
            console.log("       QUERY: "+ query.split('\n')[i]);
        } else {
            console.log("              "+ query.split('\n')[i]);
        }
    }
    //util.log("      RESULT: "+ result);
    console.log("ELAPSED TIME: "+ (end_time.getTime() - start_time.getTime() +' ms '));
    console.log("#####################################################################\n");
}

