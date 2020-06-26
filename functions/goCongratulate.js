const {TIME} = require('../config');
const checkDaysDB = require('../db/checkDaysDB');

module.exports = async (hour, dateStr) =>{
    console.log('Текущий час',hour);
    let result;
    if (hour < TIME) {result = 1}
    else if(await checkDaysDB(dateStr)){result = 0}
    else {result = 2}
    console.log(result)
    return result
};
