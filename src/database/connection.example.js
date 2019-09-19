import mysql from 'mysql2';

const dbConnPool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Brain.19',
    database: 'brain',
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});

const promisePool = dbConnPool.promise();

export default promisePool;
