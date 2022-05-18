const express = await import("express");
const path = await import("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "/dist")));

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "/dist/index.html"));
});

app.listen(PORT);
