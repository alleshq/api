import {Request, Response} from "express";
import {TOKEN_LIFESPAN} from "../../const";

export default (req: Request, res: Response) => {
	res.json({
		user: req.user.id,
		application: req.token.application,
		scopes: req.token.scopes,
		createdAt: req.token.createdAt,
		expiresAt: new Date(req.token.createdAt.getTime() + TOKEN_LIFESPAN)
	});
};
