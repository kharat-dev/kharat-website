
const router = require("express").Router();
const fs = require("fs");
const path = require("path");

function mount(route, filepath) {
    router.use(route, require(filepath));
}

const files = fs.readdirSync(__dirname);

for (const file of files) {
    if (file === path.basename(__filename)) continue;
    if (path.extname(file) !== ".js") continue;

    const filepath = path.join(__dirname, file);
    const name = path.parse(file).name;

    mount(
        name === "home" ? "/" : `/${name}`,
        filepath
    );
}

module.exports = router;

