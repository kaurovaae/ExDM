import express                          from "express";
import bodyParser                       from "body-parser";
import favicon							from "serve-favicon";
import cookieParser 					from "cookie-parser";
import db                               from "./api/db";
import api                              from "./api/routers";
import path 							from "path";
import {AddressInfo} 					from "net";

const app = express();
const apiPort = 3005;

app.use(bodyParser.json());

app.use(cookieParser);
app.use(favicon(path.resolve(__dirname, '../static/favicon.ico')));

app.use(`/static`, express.static('../static'));

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/api", api);

app.use("/", function(req, res) {
	res.sendFile(path.resolve(__dirname, "../build/index.html"));
});

const server = app.listen(apiPort, () => {
	const address = server.address() as AddressInfo;
	// eslint-disable-next-line
	console.log("Listening on http://", address?.address + ":" + address?.port);
});