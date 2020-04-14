import db from "../util/db"

module.exports = async (req, res, next) => {
	//Get Credentials
	var applicationCredentials;
	const authHeader = req.headers.authorization;
	if (typeof authHeader === "string") {
		var credentialsString;
		if (authHeader.split(" ").length !== 2 || !authHeader.startsWith("Basic "))
			return res.status(401).json({err: "badAuthorization"});
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
	} else if (
		typeof req.body.client_id === "string" &&
		typeof req.body.client_secret === "string"
	) {
		applicationCredentials = {
			id: req.body.client_id,
			secret: req.body.client_secret
		};
	} else return res.status(401).json({err: "badAuthorization"});

	//Get Application
	const application = await db.Application.findOne({
		where: {
			id: applicationCredentials.id
		}
	});
	if (!application)
		return res.status(401).json({err: "invalidApplicationCredentials"});
	if (application.secret !== applicationCredentials.secret)
		return res.status(401).json({err: "invalidApplicationCredentials"});
	req.application = application;
	next();
};
