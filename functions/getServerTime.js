const api = require('vk-easy');
const {TEST_TOKEN} = require('../config');

module.exports = async () => {
    let res = await api('utils.getServerTime', {
        v: 5.103,
        access_token: TEST_TOKEN,
    });

    return new Date(res.response * 1000);


        // console.log(res.response);
        // let dateStr = (date.getDate()).toString() + '.' + (date.getMonth() + 1).toString() + '.' + (date.getFullYear()).toString();
        // console.log('Сегодня ', dateStr);
        
        //
        // let server_time = date.getHours() + 3;

};

