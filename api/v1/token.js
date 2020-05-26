const db = require("../../util/db");
const config = require("../../config");
const randomString = require("randomstring").generate;
const uuid = require("uuid/v4");

module.exports = async (req, res) => {
	if (typeof req.body.grant_type !== "string")
		return res.status(400).json({err: "invalidBodyParams"});

	if (req.body.grant_type === "authorization_code") {
		if (
			typeof req.body.code !== "string" ||
			typeof req.body.redirect_uri !== "string"
		)
			return res.status(400).json({err: "invalidBodyParams"});

		// Verify Code
		const code = await db.AuthCode.findOne({
			where: {
				code: req.body.code
			},
			include: ["user"]
		});
		if (!code) return res.status(400).json({err: "codeDoesNotExist"});
		if (code.applicationId !== req.application.id)
			return res.status(400).json({err: "codeNotForApplication"});
		if (
			code.used ||
			new Date().getTime() > code.createdAt.getTime() + config.codeLifespan
		)
			return res.status(400).json({err: "codeExpired"});
		if (code.redirectUri !== req.body.redirect_uri)
			return res.status(400).json({err: "incorrectRedirectUri"});

		// Create Token
		await code.update({used: true});
		const token = await newToken(req.application, code.user, code.scopes);
		res.json({
			access_token: token.access,
			refresh_token: token.refresh,
			token_type: "Bearer",
			scope: token.scopes.join(" "),
			expires_in: config.tokenLifespan / 1000,
			user: token.userId
		});
	} else if (req.body.grant_type === "refresh_token") {
		if (typeof req.body.refresh_token !== "string")
			return res.status(400).json({err: "invalidBodyParams"});

		// Verify old token
		const oldToken = await db.AuthToken.findOne({
			where: {
				refresh: req.body.refresh_token
			},
			include: ["user"]
		});
		if (!oldToken) return res.status(400).json({err: "tokenDoesNotExist"});
		if (oldToken.applicationId !== req.application.id)
			return res.status(400).json({err: "tokenNotForApplication"});
		if (oldToken.expired)
			return res.status(400).json({err: "refreshTokenExpired"});
		if (
			new Date().getTime() <
			oldToken.createdAt.getTime() + config.tokenLifespan
		)
			return res.status(400).json({err: "accessTokenNotExpired"});

		// Create new token
		await oldToken.update({expired: true});
		const token = await newToken(
			req.application,
			oldToken.user,
			oldToken.scopes
		);
		res.json({
			access_token: token.access,
			refresh_token: token.refresh,
			token_type: "Bearer",
			scope: token.scopes.join(" "),
			expires_in: config.tokenLifespan / 1000,
			user: token.userId
		});
	} else return res.status(400).json({err: "invalidGrantType"});
};

const newToken = async (application, user, scopes) => {
	const token = await db.AuthToken.create({
		id: uuid(),
		scopes,
		access: randomString(128),
		refresh: randomString(128)
	});
	token.setUser(user);
	token.setApplication(application);
	return token;
};
