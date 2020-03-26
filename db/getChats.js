const createPool = require('./dbConnection.js');

module.exports = async () => {

    try{
        const pool = await createPool();
        await pool.connect();
        const sql = `SELECT * FROM chats`;
        let res = await pool.query(sql);
        console.log('Результат getChats', res.rowCount);
        return res.rows;
    }
    catch (err) {
        console.log(err)
    }


};


