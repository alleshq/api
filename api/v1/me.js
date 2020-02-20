const db = require("../../coredb");

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
        responseData.teams = (
            await db("teams").find({
                [`users.${req.token.user._id}`]: {
                    $exists: true
                }
            }).toArray()
        ).map(team => ({
            id: team._id,
            teamid: team.teamid,
            name: team.name
        }));
    }

    res.json(responseData);
};