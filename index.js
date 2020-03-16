const express = require("express");
const app = express();

const db = require("./util/db");
db.sync().then(() => {
	app.listen(8081, async () => {
		console.log("Listening on Express");
	});
});

const bodyParser = require("body-parser");
app.use(bodyParser.json({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));

app.use((err, req, res, next) => {
	res.status(500).json({err: "internalError"});
});

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/v1", require("./api/v1/_"));

app.use((req, res) => {
	res.status(404).json({err: "invalidRoute"});
});
