
const {home , urlgenerator , features} = require('../routes');



const middlewareroutes = [{
    name : '/' ,
    execute : home 
},{
    name : '/url' ,
    execute : urlgenerator ,
},{
    name :'/features',
    execute : features ,
}]

module.exports = middlewareroutes ;