const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const addDayDB = require('./db/addDayDB');
const goCongratulate = require('./functions/goCongratulate.js');
const getServerTime = require('./functions/getServerTime.js');
const getChats = require('./db/getChats.js');
const getPeople = require('./functions/getPeople.js');
const getCong = require('./db/getCong.js');
const sendCong = require('./functions/sendCong.js');

const {TEST_FLAG} = require('./config');

console.log('Hello');
main();


async function main() {
    const time = await getServerTime();

    console.log('\nСейчас ', time);
    const dateStr =  (time.getDate()).toString() + '.' + (time.getMonth()+1).toString() + '.' + (time.getFullYear()).toString();

    const goCode = await goCongratulate(time.getHours()+3, dateStr);

    if (goCode === 0 || TEST_FLAG === '1') {
        console.log('Сайчас можно поздравлять');

        for (const curChat of  await getChats()) {
            // console.log(curChat);

            console.log('\nРаботаем с: ', curChat.organization);

            const dateStr = (time.getDate()).toString() + '.' + (time.getMonth()+1).toString().toString();
            const people = await getPeople(dateStr, curChat);

            if (people.size === 0) {
                console.log('Сегодня нет ДР(');
            }
            else {
                console.log("ДР у: ", people.values());

                let sex = people.size === 1 ? people.values().next().value[1] : "plural";

                let text = '';
                for (const  [id_vk, value] of people) {
                    text += '@id' + id_vk + '(' + value[0] + '), ';
                }
                text = text.slice(0, -2).replace(/,\s([^,]+)$/, ' и $1');

                text += await getCong(sex, curChat.congr_pack);
                console.log('Отправляем поздравление: ', text);

                await sendCong(curChat,text);
            }
        }
        await addDayDB(dateStr);
    }
    else if (goCode === 2) {console.log('Уже поздравляли')}
    else (console.log('Ещё не время для поздравлений'))
}
