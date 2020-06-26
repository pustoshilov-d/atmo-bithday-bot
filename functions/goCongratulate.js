const {TIME} = require('../config');
const checkDaysDB = require('../db/checkDaysDB');

module.exports = async (hour, dateStr) =>{
    try{
        console.log('Текущий час',hour);
        if (hour < TIME) {return 1}
        else if(await checkDaysDB(dateStr)){return 0}
        else {return 2}
    }
    catch (e) {
        console.log("Ошибка в goCong", e)
    }
};
