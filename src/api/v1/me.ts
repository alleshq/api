module.exports = async (req, res) => {
	const responseData: any = {
		id: req.user.id,
		username: req.user.username,
		name: req.user.name,
		nickname: req.user.nickname
	};

	//Team List
	if (req.token.scopes.includes("teams")) {
		responseData.teams = (await req.user.getTeams()).map(team => ({
			id: team.id,
			slug: team.slug,
			name: team.name
		}));
	}

	res.json(responseData);
};
