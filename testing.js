const {DATABASE_URL} = require('./config');
const {Pool, Client} = require('pg');



console.log('sql', DATABASE_URL);
let pool = new Client({
    connectionString: 'postgres://xuxjeghczikrhq:95c79dffb6232fcb4d10adfe999a499b3057a60cd651cce3e69005314d1a9f41@ec2-176-34-123-50.eu-west-1.compute.amazonaws.com:5432/d3gl4rnjqtbtfs',
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