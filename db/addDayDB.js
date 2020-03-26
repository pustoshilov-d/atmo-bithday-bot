const createPool = require('./dbConnection.js');

module.exports = async (dateStr) => {
    try{
        const pool = await createPool();
        await pool.connect();
        const sql = `INSERT INTO days (day) VALUES ('${dateStr}')`;
        await pool.query(sql);
        console.log('\nДата добавлена')
    }
    catch (err) {
        console.log(err)
    }
};
