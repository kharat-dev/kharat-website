const mongoose =  require("mongoose");
const urlschema = mogngoose.model({
    url : String ,
    urlrdr : { String , unique : true } ,
    clicks : String  ,
});

module.exports = urlschema ;