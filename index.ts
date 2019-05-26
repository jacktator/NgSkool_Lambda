/**
 * This is the grand entrance for ExpressJS app.
 *
 * @author Jacktator
 * @since 1.9.9
 */
const serverless = require('serverless-http');
const express = require('express');
const app = express();

app.get('/', (_, res) => {
    res.send('Hello World!')
});

module.exports.handler = serverless(app);

