const fs = require("fs");
const path = require("path");
const { UAParser } = require("ua-parser-js");

module.exports = function logger(req, res, next) {

    const ip = req.ip;
    const ua = req.get("User-Agent") || "";

    // Ignore localhost
    if (ip === "::1" || ip === "127.0.0.1")
        return next();

    // Ignore anything except GET
    if (req.method !== "GET")
        return next();

    // Ignore favicon
    if (req.originalUrl === "/favicon.ico")
        return next();

    // Ignore missing User-Agent
    if (!ua)
        return next();

    // Ignore bots, crawlers and health checks
    if (
        /bot|spider|crawler|render|uptime|monitor|curl|wget|Go-http-client|python|axios|node-fetch|Postman|insomnia/i.test(ua)
    )
        return next();

    const parser = new UAParser(ua);
    const result = parser.getResult();

    const log = {
        time: new Date().toISOString(),

        ip,

        browser: result.browser.name || "Unknown",
        browserVersion: result.browser.version || "Unknown",

        os: result.os.name || "Unknown",
        osVersion: result.os.version || "Unknown",

        device: result.device.type || "desktop",
        deviceVendor: result.device.vendor || "Unknown",
        deviceModel: result.device.model || "Unknown",

        cpu: result.cpu.architecture || "Unknown",

        method: req.method,
        url: req.originalUrl,

        language: req.get("Accept-Language") || "Unknown",
        referer: req.get("Referer") || null,

        host: req.hostname,
        protocol: req.protocol
    };

    const logfile = path.join(__dirname, "..", "logs.json");

    let logs = [];

    if (fs.existsSync(logfile)) {
        try {
            logs = JSON.parse(fs.readFileSync(logfile, "utf8"));
        } catch {
            logs = [];
        }
    }

    logs.push(log);

    fs.writeFileSync(logfile, JSON.stringify(logs, null, 4));

    next();
};