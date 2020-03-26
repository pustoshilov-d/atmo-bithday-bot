const {TIME} = require('../config');
const checkDaysDB = require('../db/checkDaysDB');

module.exports = async (hour, dateStr) =>{
    console.log('Текущий час',hour);

    if (hour <= TIME) {return 1}
    else {
        if(await checkDaysDB(dateStr)){return 0}
        else {return 2}
    }

};
