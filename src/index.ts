/// <reference path="./index.d.ts" />
import express from "express";
import bodyParser from "body-parser";
import db from "./util/db";

const app = express();

db.sync().then(() => {
	app.listen(8081, async () => {
		console.log("Listening on Express");
	});
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((err, req, res, next) => {
	res.status(500).json({err: "internalError"});
});

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/v1", require("./api/v1/_"));

app.use((req, res) => {
	res.status(404).json({err: "invalidRoute"});
});
