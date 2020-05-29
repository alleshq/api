module.exports = async (req, res) => {
	// Base data
	const user = {
		id: req.user.id,
		username: req.user.username,
		name: req.user.name,
		nickname: req.user.nickname,
		plus: req.user.plus
	};

	// Primary Account
	if (req.token.scopes.includes("primary")) {
		const primary = await req.user.getPrimary();
		user.primary = primary
			? {
					id: primary.id,
					name: primary.name,
					username: primary.username
			  }
			: null;
	}

	// Response
	res.json(user);
};
