const {DATABASE_URL} = require('./config');
const {Pool} = require('pg');

main();

async function main() {

    console.log('sql');
    let pool = new Pool({
        connectionString: DATABASE_URL,
        ssl: {
            sslmode: 'require',
            rejectUnauthorized: false
        }
    })

    console.log('sql2', pool);

    console.log(pool.connect());
    console.log('sql2', pool);
    const sql = `SELECT * FROM days`;
    console.log(sql)
    let res = pool.query(sql);
    console.log('Результат CheckDaysDB', res)
}