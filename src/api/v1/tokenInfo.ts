import config from "../../../config.json";
import {Request, Response} from "express";

export default (req: Request, res: Response) => {
	res.json({
		user: req.user.id,
		application: req.token.application,
		scopes: req.token.scopes,
		createdAt: req.token.createdAt,
		expiresAt: new Date(req.token.createdAt.getTime() + config.tokenLifespan)
	});
};
