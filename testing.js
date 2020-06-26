const {DATABASE_URL} = require('./config');
const {Pool} = require('pg');

main();

async function main() {
    try {
        console.log('sql');
        let pool = new Pool({
            connectionString: DATABASE_URL,
            ssl: {
                sslmode: 'require',
                rejectUnauthorized: false
            }
        })
        function sayHi() {
            return console.log('Привет');
        }


        var promise = new Promise((resolve, reject) => {

            setTimeout(() => {
                reject(new Error("время вышло!"));
            }, 1000);

        });
        promise
            .then(
                result => console.log("Fulfilled: " + result),
                error => console.log("Rejected: " + error.message) // Rejected: время вышло!
            );


        pool.connect().then((res, err) => {
            console.log("Результат коннект", res, err)
        });

        pool.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
            console.log(err ? err.stack : res.rows[0].message) // Hello World!
            pool.end()
        })
    }
    catch (e) {
        console.log(e)
    }
}