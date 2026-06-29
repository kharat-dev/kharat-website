const fs = require("fs");
const path = require("path");
const router = require('express').Router();
const PASS = 'omkar16111678' ;

router.route('/').get((req, res) => {
    res.render("logs-login")
})
    .post((req, res) => {

     if (req.body.password !== PASS) {
        return res.status(401).send("Incorrect password");
    }

    const logs = JSON.parse(
        fs.readFileSync(
            path.join(__dirname, "..", "logs.json"),
            "utf8"
        )
    );

    res.render("logs", { logs });


});

module.exports = router ;