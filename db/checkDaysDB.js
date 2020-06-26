const createPool = require('./dbConnection.js');

module.exports = async (dateStr) => {

    const pool = await createPool();
    await pool.connect();
    const sql = `SELECT * FROM days WHERE day = '${dateStr}'`;
    let res = await pool.query(sql);
    console.log('Результат CheckDaysDB', res.rowCount);
    pool.end();
    return res.rowCount === 0;
};


