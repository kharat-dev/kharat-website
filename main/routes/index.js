const path = require("path");
const fs = require("fs");
const router = require("express").Router();

function mount(router, route, file) {
    router.use(route, require(file));
}

for (const file of fs.readdirSync(__dirname)) {
    if (file === path.basename(__filename)) continue;

    const filepath = path.join(__dirname, file);

    if (fs.statSync(filepath).isDirectory()) {
        mount(router, `/${file}`, filepath);
    } else if (path.extname(file) === ".js") {
        const name = path.parse(file).name;
        mount(router, name === "home" ? "/" : `/${name}`, filepath);
    }
}

module.exports = router;
