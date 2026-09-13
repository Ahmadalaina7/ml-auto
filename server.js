/**
 * Plesk Node.js application startup file.
 * In Plesk: Application startup file = server.js (of app.js)
 */
try {
  require("dotenv").config();
} catch {
  // dotenv is optioneel; Next laadt .env zelf ook
}

const { createServer } = require("node:http");
const { parse } = require("node:url");
const next = require("next");

const port = Number(process.env.PORT) || 3000;
const hostname = "0.0.0.0";

const app = next({
  dev: false,
  hostname,
  port,
});

const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(port, hostname, () => {
      console.log(`MLAuto ready on http://${hostname}:${port}`);
    });
  })
  .catch((err) => {
    console.error("MLAuto failed to start:", err);
    process.exit(1);
  });
