const express = require('express');
const app = express().router;

app.get('/', (req, res) => {
    res.send('one')
})

module.exports = app