const {DATABASE_URL} = require('./config');
const {Pool} = require('pg');

main();

async function main() {
    try {
        console.log('sql');
        let pool = new Pool({
            connectionString: DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        })



        pool.connect()

        pool.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
            console.log(err ? err.stack : res.rows[0].message) // Hello World!
            pool.end()
        })
    }
    catch (e) {
        console.log(e)
    }
}