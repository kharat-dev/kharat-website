const path  = require('path');
const fs  = require('fs');

let middlewares =[]

const routepath = path.join(__dirname);
    const routefiles = fs.readdirSync(routepath);
    for(const file of routefiles){

        if(file === path.basename(__filename)|| file === 'page.js') continue ;

        if(path.extname(file) === '.js'){
        
        middlewares.push(require(path.join(routepath , file)));
        }

    }

    console.log(middlewares);


module.exports = middlewares;



