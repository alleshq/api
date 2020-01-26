const db = require("../../util/mongo");

module.exports = async (req, res) => {
    const responseData = {
        id: req.token.user._id
    };

    //Basic Profile Information
    if (req.token.scopes.includes("basic-profile")) {
        responseData.username = req.token.user.username;
        responseData.name = req.token.user.name;
        responseData.nickname = req.token.user.nickname;
    }

    //Team List
    if (req.token.scopes.includes("team-list")) {
        var query = {};
        query[`users.${req.token.user._id}`] = {$exists: true};
        responseData.teams = (
            await db("teams").find(query).toArray()
        ).map(team => ({
            id: team._id,
            teamid: team.teamid,
            name: team.name
        }));
    }

    res.json(responseData);
};