const {Pool, Client} = require('pg');

console.log('start');

let pool = new Client({
    connectionString: 'postgres://xuxjeghczikrhq:95c79dffb6232fcb4d10adfe999a499b3057a60cd651cce3e69005314d1a9f41@ec2-176-34-123-50.eu-west-1.compute.amazonaws.com:5432/d3gl4rnjqtbtfs',
    ssl: {
        sslmode: 'require',
        rejectUnauthorized: false
    }
})
console.log('create');

pool.connect();
console.log('connect');

pool.query('SELECT \'message\'', (err, res) => {
    console.log("end")
    console.log(err ? err : res.rows[0]) // Hello World!
    pool.end()
})