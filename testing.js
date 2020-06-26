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

    pool.connect().then(res=>{
        console.log("Результат коннект", res)
    });

    const sql = `SELECT * FROM days`;
    console.log(sql)
    pool.query(sql).then(res =>{
        console.log(res)
    });

}