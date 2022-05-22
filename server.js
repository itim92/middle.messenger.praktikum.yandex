// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require("express");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "/dist")));

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "/dist/index.html"));
});

app.listen("3000");
