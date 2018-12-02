const fs = require("fs");
const vhost = require("vhost");
const vhttps = require("vhttps");
const express = require("express");
const app = express();

const appList = [
	{
		domain : "www.domain.com",
		cred : {
			key : fs.readFileSync("./key.pem"),
			cert : fs.readFileSync("./crt.pem")
		},
		app : require("./app/app1/app")
	},
	{
		domain : "www.my-domain.co.kr",
		app : require("./app/app2/app")
	}
];

const server = vhttps.init();
appList.forEach((val) => {
	if(val.cred){
		app.use(vhost(val.domain, (req, res) => {
			res.writeHead(301, {"Location" : "https://" + req.headers["host"] + req.url});
			res.end();
		}));
		server.use(val.domain, val.cred, val.app);
	}else{
		app.use(vhost(val.domain, val.app));
	};
});

app.listen(80, () => {
	console.log("80 server start");
});
server.listen(443, () => {
	console.log("443 server start");
});