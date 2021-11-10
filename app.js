const express = require ('express');
const mysql = require('mysql');
const path = require ('path');

//const dotenv = require('dotenv');
//dotenv.config({path: './.env'})

const app = express();


const db = mysql.createConnection({
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
    host: 'localhost',
    user:  'root',
    password: 'root',
    database: 'projeto'
});

/*
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));*/

app.use(express.static(__dirname + "/public"));


//Parse URL- encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: false}));
//Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.set('view engine', 'hbs');

db.connect((error) => {
    if(error){
        console.log(error)
    }else {
        console.log("MySQL Connected...")
    }
})


//Define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


app.listen(2000, () => {
    console.log("Server started on Port 2000");
})