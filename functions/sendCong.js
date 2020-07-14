const api = require('vk-easy');
const {TEST_TOKEN, TEST_GROUP, TEST_CHAT, TEST_PHOTO, TEST_FLAG} = require('../config');



module.exports = async (chat, text, buttonText) => {

    let keyboard = JSON.stringify({
        one_time: false,
        inline: true,
        buttons: [
            [{
                action: {
                    type: "text",
                    label: buttonText,
                    payload: {command: "congr"}
                },
                "color": "positive"
            }],
        ]});

    try{
        if (TEST_FLAG === 'true')  {

            const res = await api('messages.send', {
                v: 5.103,
                access_token: TEST_TOKEN,
                group_id: TEST_GROUP,
                peer_id: TEST_CHAT,
                random_id: Math.  floor(Math.random() * 999999999),
                message: text,
                keyboard: keyboard,
                attachment: chat.photo,
            });
            console.log('Результат sendCong', res)
        }
        else {
            api('messages.send', {
                v: 5.103,
                access_token: chat.group_token,
                group_id: chat.group_id,
                peer_id: chat.chat_id_in_group,
                random_id: Math.  floor(Math.random() * 999999999),
                message: text,
                // keyboard: keyboard,
                attachment: chat.photo,
            })
        }
    }
    catch (err) {
        console.log(err)
    }
}