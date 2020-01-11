const db = require("../../util/mongo");

module.exports = async (req, res) => {
    const responseData = {
        id: req.token.user._id
    };

    //Basic Profile Information
    if (req.token.scopes.includes("basicProfile")) {
        responseData.username = req.token.user.username;
        responseData.name = req.token.user.name;
        responseData.nickname = req.token.user.nickname;
    }

    res.json(responseData);
};