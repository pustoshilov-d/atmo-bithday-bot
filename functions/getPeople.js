const api = require('vk-easy');
const getPeopleDB = require('../db/getPeopleDB.js');
const {EXTERNAL_DB_FLAG} = require('../config');

module.exports = async (date, chat) => {

    let res = await api('messages.getConversationMembers', {
        v:5.103,
        access_token: chat.group_token,
        peer_id: chat.chat_id_in_group,
        fields: 'bdate, sex, screen_name',
        group_id: chat.group_id,
    });

    let users = res.response.profiles;

    let people = new Map();

    for (const user of users){
        if (user.bdate !== undefined) {
            let bday = user.bdate.split('.')[0]+"."+user.bdate.split('.')[1];
            if (date === bday) {
                let sex =  user.sex === 2 ? "male" : "female";
                people.set(user.id, [user.first_name, sex, user.screen_name])
            }
        }
    }
    // console.log(people.values())

    if (EXTERNAL_DB_FLAG ==="true" && chat.external_db !== null){
        for (const user of await getPeopleDB(chat.external_db, date)){
            people.set(user.id_vk, [user.name, user.sex])
        }
    }

    // console.log(people.values())

    return people;
};