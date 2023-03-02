const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv').config();
const dateFormat = require('dateformat');

var studentRoute = require('./routes/student.route.js');
var todoRoute = require('./routes/todo.routes');

const app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,app-id,x-access-token");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/student',studentRoute);
app.use('/todo',todoRoute);

app.get('/', (req, res) => {
    res.send('Hi! Welcome To Our Project API');
});

app.listen(process.env.PORT, () => {
    let dateTime = dateFormat(
        new Date().toLocaleString('en-us', {
            timeZone: 'Asia/Calcutta',
        }),
        'dd-mm-yyyy H:MM:ss'
    )
    let serverData = {
        type: process.env.SERVER,
        name: process.env.NAME,
        port: process.env.PORT,
        dateTime: dateTime
    }
    console.log(serverData);
});