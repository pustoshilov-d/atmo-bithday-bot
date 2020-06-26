const createPool = require('./dbConnection.js');

module.exports = async (dateStr) => {

    try{
        const pool = await createPool();
        await pool.connect();
        const sql = `SELECT * FROM days WHERE day = '${dateStr}'`;
        console.log(sql)
        let res = await pool.query(sql);
        console.log('Результат CheckDaysDB', res)
        console.log('Результат CheckDaysDB', res.rowCount);
        pool.end();
        return res.rowCount === 0;
    }
    catch (err) {
        console.log(err)
    }


};


