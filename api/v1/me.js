const db = require("../../util/db");

module.exports = async (req, res) => {
    const responseData = {
        id: req.token.user.id
    };

    //Basic Profile Information
    if (req.token.scopes.includes("basic-profile")) {
        responseData.username = req.token.user.username;
        responseData.name = req.token.user.name;
        responseData.nickname = req.token.user.nickname;
    }

    //Team List
    if (req.token.scopes.includes("team-list")) {
        responseData.teams = (await req.token.user.getTeams()).map(team => ({
            id: team.id,
            slug: team.slug,
            name: team.name
        }));
    }

    res.json(responseData);
};