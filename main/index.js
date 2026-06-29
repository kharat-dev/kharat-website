const express = require('express');
const page = require('./middleware');
const path  = require("path");
const fs = require("fs");

const app = express();
const port = 8000 ;
const middlewarepath = path.join(__dirname , 'middleware');
const middlewarefiles = fs.readdirSync(middlewarepath);
const middlewares = new Map();


app.set("trust proxy", true);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));




/*for(const file of page){    
app.use(file);
}*/
app.use(require('./middleware/page.js'));

app.use(require('./routes'));


app.listen(port , () => console.log("server started"));


