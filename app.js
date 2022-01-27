const express = require ('express');
const app = express();


app.set('view engine', 'hbs');

//Parse URL- encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: false}));
//Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(express.static(__dirname + "/public"));

//Define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(2000, () => {
    console.log("Server started on Port 2000");
})