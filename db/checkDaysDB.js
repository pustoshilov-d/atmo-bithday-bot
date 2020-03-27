const createPool = require('./dbConnection.js');

module.exports = async (dateStr) => {


    // await pool.connect(async function(err, client, done) {
    //     const sql = `SELECT * FROM days WHERE day = '${dateStr}'`;
    //     await pool.query(sql, async function(err, res) {
    //         await done();
    //         // if(err) return console.error(err);
    //
    //         console.log('Результат CheckDaysDB', res);
    //         await pool.end();
    //         return res.rowCount === 0;
    //     })
    // })

    try{
        const pool = await createPool();
        await pool.connect();
        const sql = `SELECT * FROM days WHERE day = '${dateStr}'`;
        let res = await pool.query(sql);
        console.log('Результат CheckDaysDB', res.rowCount);
        pool.end();
        return res.rowCount === 0;
    }
    catch (err) {
        console.log(err)
    }


};


