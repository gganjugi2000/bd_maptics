exports.getConfig = () => {
    let config;
    if (process.env.NODE_ENV === "production") {
        config = {
            'mysql': {
                'host': '',
                'port': '3306',
                'user': '',
                'password': '',
                'database': '',
                'multipleStatements': true,
                'connectionLimit': 20,
                'waitForConnection': false
            },
        }
    } else {
        config = {
            'mysql': {
                'host': '150.20.14.75',
                'port': '3306',
                'user': 'bd_maptics',
                'password': 'Bluedigm1!',
                'database': 'bd_maptics',
                'multipleStatements': true,
                'connectionLimit': 20,
                'waitForConnection': false
            },
        }
    }

    return config;
}

