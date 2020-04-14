import db from "../util/db";
import {Request, NextFunction, Response} from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
	//Get Credentials
	let applicationCredentials: {id: string; secret: string};
	const authHeader = req.headers.authorization;

	//Check that header is string
	if (typeof authHeader !== "string")
		return res.status(401).json({err: "badAuthorization"});

	//Check for authorization in body
	if (
		typeof req.body.client_id === "string" &&
		typeof req.body.client_secret === "string"
	) {
		applicationCredentials = {
			id: req.body.client_id,
			secret: req.body.client_secret
		};
	} else {
		// Get authorization from header
		if (authHeader.split(" ").length !== 2 || !authHeader.startsWith("Basic "))
			return res.status(401).json({err: "badAuthorization"});

		let credentialsString: string[];
		try {
			credentialsString = Buffer.from(authHeader.split(" ")[1], "base64")
				.toString()
				.split(":");
		} catch (err) {
			return res.status(401).json({err: "badAuthorization"});
		}

		if (credentialsString.length !== 2)
			return res.status(401).json({err: "badAuthorization"});

		applicationCredentials = {
			id: credentialsString[0],
			secret: credentialsString[1]
		};
	}

	//Get Application
	const application = await db.Application.findOne({
		where: {id: applicationCredentials.id}
	});

	if (!application || application.secret !== applicationCredentials.secret)
		return res.status(401).json({err: "invalidApplicationCredentials"});

	req.application = application;
	next();
};
