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
const getButton = require('./db/getButton')

const {TEST_FLAG, TEST_DATE} = require('./config');

console.log('Hello');
// console.log('Test mode', TEST_FLAG === 'true');
main();
console.log('heroku logs -n 1500');


async function main() {
    const time = await getServerTime();

    console.log('\nСейчас ', time);
    const fullDateStr =  (time.getDate()).toString() + '.' + (time.getMonth()+1).toString() + '.' + (time.getFullYear()).toString();
    let dateStr = (time.getDate()).toString() + '.' + (time.getMonth()+1).toString().toString();
    if (TEST_FLAG === 'true' && TEST_DATE !== "") {dateStr = TEST_DATE}

    const goCode = await goCongratulate(time.getHours()+3, fullDateStr);
    console.log("goCode: ", goCode);

    if (goCode === 0 || TEST_FLAG === 'true') {
        console.log('Сайчас можно поздравлять');

        for (const curChat of  await getChats()) {

            console.log('\nРаботаем с: ', curChat.organization);

            const people = await getPeople(dateStr, curChat);

            if (people.size === 0) console.log('Сегодня нет ДР(');
            else {
                console.log("ДР у: ", people.values());

                let sex = people.size === 1 ? people.values().next().value[1] : "plural";

                let text = '';
                for (const  [id_vk, value] of people) {
                    text += '@id' + id_vk + '(' + value[0] + '), ';
                }
                text = text.slice(0, -2).replace(/,\s([^,]+)$/, ' и $1');

                text += await getCong(sex, curChat.congr_pack);

                let buttonNames = '';
                for (const  [id_vk, value] of people) {
                    buttonNames += '@' + value[2] + ', ';
                }
                buttonNames = buttonNames.slice(0, -2).replace(/,\s([^,]+)$/, ' и $1');
                let buttonText = await getButton(sex, curChat.buttons_pack);
                let button = ''

                if ((buttonText + buttonNames + ' 🎉').length < 40) {
                        button = buttonText + buttonNames + ' 🎉'
                    }
                else if (("Поздравляю " + buttonNames + ' 🎉').length < 40) {
                    button = "Поздравляю " + buttonNames + ' 🎉'
                }
                else {
                    button = buttonText + ' 🎉'
                }

                console.log('Отправляем поздравление: ', text, '/n', button);
                await sendCong(curChat,text, button);
            }
        }
        if (TEST_FLAG !== 'true') {await addDayDB(fullDateStr)}
    }
    else if (goCode === 2) {console.log('Уже поздравляли')}
    else {(console.log('Ещё не время для поздравлений'))}
}
