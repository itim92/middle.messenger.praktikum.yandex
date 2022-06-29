// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require("express");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");

const hostname = "0.0.0.0"; // сервер запустим на всех интерфейсах
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, "/dist")));

app.get("/*", (req, res) => {
    const indexHTML = path.join(__dirname, "/dist/index.html");

    fs.open(indexHTML, "r", (err, fd) => {
        if (err) {
            if (err.code === "ENOENT") {
                res.send("Hello");
                return;
            }

            throw err;
        }

        try {
            res.sendFile(indexHTML);
        } finally {
            fs.close(fd, (err) => {
                if (err) throw err;
            });
        }
    });
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
