/// <reference path="./index.d.ts" />
import express, { Response, NextFunction, Request } from "express";
import bodyParser from "body-parser";
import db from "./util/db";
import v1 from "./api/v1"

const app = express();

db.sync().then(() => {
	app.listen(8081, async () => {
		console.log("Listening on Express");
	});
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((err, req: Request, res: Response, next: NextFunction) => {
	res.status(500).json({err: "internalError"});
});

app.get("/", (_, res: Response) => res.send("Hello World!"));
app.use("/v1", v1);

app.use((req: Request, res: Response) => {
	res.status(404).json({err: "invalidRoute"});
});
