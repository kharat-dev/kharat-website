const express = require('express');
const router = require('./routes');

const path  = require("path");
const fs = require("fs");


const app = express();
const port = 8000 ;
const middlewarepath = path.join(__dirname , 'middleware');
const middlewarefiles = fs.readdirSync(middlewarepath);
const middlewares = new Map();


app.set('view engine' , 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routes'));


/* for(const file of middlewarefiles){
    const middleware = require(path.join(middlewarepath , file));
    for(const route of middleware){
        if(route.name && route.execute){
       middlewares.set(route.name , route.execute) ;
    }else{
        console.log("middleware not loaded ");
    }
    }
    
}
for(const [name , execute] of middlewares){    
app.use(name , execute);
}
 */

app.listen(port , () => console.log("server started"));


