/**
 * This is the entrance for Express app.
 *
 * @author Jacktator
 * @since 1.9.9
 */
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

/**
 * Middlewares to parse JSON body and cookies
 */
app.use(bodyParser.json({ strict: false }));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

/**
 * Import API Methods
 */
const schoolsAPI = require('./schools');

app.get('/', (_, res) => {
    // TODO: Currently this renders a simple HelloWorld. Change it to Angular Static files in the future.
    res.send('Hello World!')
});

// Create School endpoint
app.post('/schools', schoolsAPI.createSchool);

// Get User endpoint
// app.get('/schools/:userId', function (req, res) {
//     const params = {
//         TableName: USERS_TABLE,
//         Key: {
//             userId: req.params.userId,
//         },
//     }
//
//     dynamoDb.get(params, (error, result) => {
//         if (error) {
//             console.log(error);
//             res.status(400).json({ error: 'Could not get user' });
//         }
//         if (result.Item) {
//             const {userId, name} = result.Item;
//             res.json({ userId, name });
//         } else {
//             res.status(404).json({ error: "User not found" });
//         }
//     });
// })

module.exports = app;
