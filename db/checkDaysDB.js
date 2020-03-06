const createPool = require('./dbConnection.js');

module.exports = async (dateStr) => {
    var res = undefined;
    const pool = await createPool();
    const sql = `SELECT * FROM days WHERE day = '${dateStr}'`;
    try {
        res = await pool.query(sql);
    } catch (err) {
        console.log('CheckDaysDB ошибка ' + err)
    }
    await pool.end();

    console.log('Результат CheckDaysDB', res.rowCount);

    return res.rowCount === 0;
};
