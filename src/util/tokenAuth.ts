import db from "../util/db";
import {Request, Response, NextFunction} from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
	//Parse Header
	const authHeader = req.headers.authorization;
	if (typeof authHeader !== "string")
		return res.status(401).json({err: "badAuthorization"});
	if (authHeader.split(" ").length !== 2 || !authHeader.startsWith("Bearer "))
		return res.status(401).json({err: "badAuthorization"});

	//Get Token
	const token = await db.AuthToken.findOne({
		where: {
			access: authHeader.split(" ")[1]
		}
	});
	if (!token) return res.status(401).json({err: "invalidToken"});

	req.token = token;
	req.user = await token.getUser();
	next();
};
