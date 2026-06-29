const path  = require('path');
const fs  = require('fs');

let files ={}

const routepath = path.join(__dirname , ".." , 'routes');
    const routefiles = fs.readdirSync(routepath);
    for(const file of routefiles){
        const name = path.parse(file).name;
        const route = name === 'home' ? '/' :`/${name}`;
        files[route] = name;

    }

    
    const page = function final(req , res , next){
     
    res.locals.page = files[req.path] || "" ;
    
    next();
      
}

module.exports = page ;