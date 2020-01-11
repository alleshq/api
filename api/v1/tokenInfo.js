const config = require("../../config");

module.exports = (req, res) => {
    res.json({
        user: req.token.user,
        application: req.token.application,
        scopes: req.token.scopes,
        createdAt: req.token.createdAt,
        expiresAt: new Date(req.token.createdAt.getTime() + config.tokenLifespan)
    });
};