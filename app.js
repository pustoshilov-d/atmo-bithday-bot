const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const api = require('vk-easy');

const {PORT, CONFIRMATION, USER} = require('./config');
const {TOKEN, GROUP, CHAT, CHAT_TEST, PHOTO} = require('./config');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const messages = [', поздравляем тебя с Днём Рождения!',
    ', у тебя ДР. Это так круто!'];
const keyboard = JSON.stringify({
    one_time: true,
    // inline: true,
    buttons: [
        [{
            action: {
                type: "open_link",
                link: 'http://vk.me/shva20',
                label: "Задать вопрос организаторам",
                payload: {command: "ask_org"}
            },
            // "color": "secondary"
        }],
    ]});

(function(){
    api('messages.getConversationMembers', {
        v:5.103,
        access_token: TOKEN,
        peer_id: CHAT,
        fields: 'bdate',
        group_id: GROUP,
    }).then(res => {
        let Users = res.response.profiles;

        api('utils.getServerTime', {
            v:5.103,
            access_token: TOKEN,
        }).then(res => {
            // console.log(res.response);
            let date = new Date(res.response * 1000);

            Users[0].bdate = '4.3'; // удалить
            let users_with_bday = [];
            Users.forEach(user => {
                if(user.bdate !== undefined){
                    // console.log(user.bdate.split('.'), '@id'+user.id+'('+user.first_name+')');

                    if (date.getDay()+1=== parseInt(user.bdate.split('.')[0]) && date.getMonth()+1 === parseInt(user.bdate.split('.')[1])) {
                        users_with_bday.push('@id'+user.id+'('+user.first_name+')');
                        // console.log('True')
                    }
                    // else{console.log('False')}

                    let text = '';

                }
            });
            console.log(users_with_bday);

            let text = users_with_bday.join(', ').replace(/,\s([^,]+)$/, ' и $1') ;
            text += messages[Math.floor((Math.random()*messages.length))];
            if (users_with_bday.length > 1) {
                text = text.replace('тебя', 'вас').replace('тебе', 'вам');
            }
            console.log(text);

            api('messages.send', {
                v:5.103,
                access_token: TOKEN,
                group_id: GROUP,
                peer_id: CHAT_TEST,
                random_id:  Math.floor(Math.random()*999999999),
                message: text,
                // keyboard: keyboard,
                attachment: PHOTO,
            }).then(console.log)

        });
    });

setTimeout(arguments.callee, 60000);

})();