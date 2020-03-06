const createPool = require('./dbConnection.js');

module.exports = async (dateStr) => {
    var res = undefined;
    const pool = await createPool();
    const sql = `INSERT INTO days (day) VALUES ('${dateStr}')`;
    try {
        res = await pool.query(sql);
    } catch (err) {
        console.log('AddkDayDB ошибка ' + err)
    }
    await pool.end();
};
