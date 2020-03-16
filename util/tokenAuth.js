const db = require("../util/db");

module.exports = async (req, res, next) => {
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
		},
		include: ["user"]
	});
	if (!token) return res.status(401).json({err: "invalidToken"});

	req.token = token;
	next();
};
