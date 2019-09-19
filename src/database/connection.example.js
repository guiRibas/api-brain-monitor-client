import mysql from 'mysql2';

const dbConnPool = mysql.createPool({
    host: 'DBIP',
    user: 'DBUSER',
    password: 'DBPASS',
    database: 'DBNAME',
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});

const promisePool = dbConnPool.promise();

export default promisePool;
