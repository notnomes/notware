const chalk = require('chalk');
const express = require('express');
require('dotenv').config();
const {send, client} = require('./discord/main');
const app = express();
const session = require('express-session');
const login = require('./routes/main')
app.use('/', login)
app.listen(4000, async () => {
    console.clear();
    client.login(process.env.TOKEN)
    await send('I am here :smile:');
    setTimeout(async () => {
        await send(`Time is ${Date.now}`)
        eval('console.log("one")')
    }, 1000);
    await send('i love nigers :skull:').then(async() => {
        await send('i mean snigers :smile:')
    })
});