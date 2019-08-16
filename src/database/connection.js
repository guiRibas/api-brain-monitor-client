import mysql from 'mysql2';

const dbConnPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ximobnet',
    database: 'monitoramento',
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});

const promisePool = dbConnPool.promise();

export default promisePool;