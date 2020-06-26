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

    await pool.connect();
    console.log('sql2', pool);
    const sql = `SELECT * FROM days`;
    console.log(sql)
    let res = await pool.query(sql);
    console.log('Результат CheckDaysDB', res)
}