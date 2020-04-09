module.exports = async (req, res) => {
	const responseData = {
		id: req.token.user.id,
		username: req.token.user.username,
		name: req.token.user.name,
		nickname: req.token.user.nickname
	};

	//Team List
	if (req.token.scopes.includes("teams")) {
		responseData.teams = (await req.token.user.getTeams()).map(team => ({
			id: team.id,
			slug: team.slug,
			name: team.name
		}));
	}

	res.json(responseData);
};
