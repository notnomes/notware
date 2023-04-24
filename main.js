const chalk = require('chalk')
const express = require('express')
const app = express()
app.listen(4000, () => {
    console.clear();
    chalk.bgMagenta('Server working')
    runbot()
})