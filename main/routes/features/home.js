const router = require('express').Router();


router.route('/').get((req , res)=>
{
    res.render('features/index');
})

module.exports = router ;