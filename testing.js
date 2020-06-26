const {DATABASE_URL} = require('./config');
const {Pool, Client} = require('pg');



console.log('sql', DATABASE_URL);
let pool = new Client({
    connectionString: DATABASE_URL,
    ssl: {
        sslmode: 'require',
        rejectUnauthorized: false
    }
})



pool.connect();

pool.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
    console.log(err ? err.stack : res.rows[0].message) // Hello World!
    pool.end()
})