/**
 * This is the entrance for Express app.
 *
 * @author Jacktator
 * @since 1.9.9
 */
const express = require('express');
const app = express();

app.get('/', (_, res) => {
    res.send('Hello World!')
});

module.exports = app;
