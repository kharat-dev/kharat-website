const { Router } = require("express");
const logger = require("../middleware/logger");

const router = Router();

router.route("/")
    .get(
        logger,
        (req, res) => {
            res.render("home");
        }
    );

module.exports = router;