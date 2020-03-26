const createPool = require('./dbConnection.js');

module.exports = async (sex, db_name) => {

    try{
        const pool = await createPool();
        await pool.connect();
        const sql = `SELECT ${sex} FROM ${db_name} ORDER BY RANDOM() LIMIT 1`;
        let res = await pool.query(sql);
        console.log('Результат getCong', res.rowCount);
        return res.rows[0][sex];
    }
    catch (err) {
        console.log(err)
    }

};


