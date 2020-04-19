module.exports = async (req, res) => {
	const responseData = {
		id: req.user.id,
		username: req.user.username,
		name: req.user.name,
		nickname: req.user.nickname
	};

	res.json(responseData);
};
