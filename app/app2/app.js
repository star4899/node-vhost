const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send("www.my-domain.co.kr");
});

module.exports = app;