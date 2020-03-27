const createPool = require('./dbConnection.js');

module.exports = async (db_name, date) => {

    try{
        const pool = await createPool();
        await pool.connect();
        const sql = `SELECT * FROM ${db_name} WHERE bday = '${date}'`;
        let res = await pool.query(sql);
        console.log('Результат getPeopleDB', res.rowCount);
        pool.end();
        return res.rows;
    }
    catch (err) {
        console.log(err)
    }


};


