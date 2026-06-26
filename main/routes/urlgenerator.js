const {Router} = require('express');

const router = Router();

router.route('/').get((req , res)=>{
    res.send('home');
})
.post((req , res)=>{
    res.send('put req recievec');

});


module.exports =    router ;