/**
 * This is the entrance for Serverless app. A wrapper for Express app.
 *
 * @author Jacktator
 * @since 1.9.9
 */
const serverless = require('serverless-http');
const expApp = require('./app');

module.exports.handler = serverless(expApp);

