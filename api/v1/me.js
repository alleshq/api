module.exports = async (req, res) => {
	const responseData = {
		id: req.token.user.id,
		username: req.token.username,
		name: req.token.name,
		nickname: req.token.nickname
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
