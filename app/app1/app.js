const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send("www.domain.com app");
});

module.exports = app;