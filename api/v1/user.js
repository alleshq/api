const db = require("../../util/db");

module.exports = async (req, res) => {
	var searchWithUsername;
	if (typeof req.query.id === "string") {
		searchWithUsername = false;
	} else if (typeof req.query.username === "string") {
		searchWithUsername = true;
	} else {
		return res.status(400).json({err: "invalidQueryParameters"});
	}

	// Get User
	const user = await db.User.findOne({
		where: {
			[searchWithUsername ? "username" : "id"]: searchWithUsername
				? req.query.username
				: req.query.id
		}
	});
	if (!user) return res.status(400).json({err: "invalidUser"});

	// Response
	res.json({
		id: user.id,
		username: user.username,
		name: user.name,
		nickname: user.nickname,
		plus: user.plus
	});
};
