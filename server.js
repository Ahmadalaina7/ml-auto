/**
 * Plesk Node.js application startup file.
 * Startbestand voor de Node.js-app in Plesk (Application Startup File = server.js).
 */
const { createServer } = require("node:http");
const { parse } = require("node:url");
const next = require("next");

const port = Number(process.env.PORT) || 3000;
const hostname = process.env.HOSTNAME || "0.0.0.0";

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
      console.log(`MLAuto listening on http://${hostname}:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start MLAuto:", err);
    process.exit(1);
  });
