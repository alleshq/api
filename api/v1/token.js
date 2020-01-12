const db = require("../../util/mongo");
const config = require("../../config");
const randomString = require("randomstring").generate;
const uuid = require("uuid/v4");

module.exports = async (req, res) => {
    if (typeof req.body.grant_type !== "string") return res.status(400).json({err: "invalidBodyParams"});

    if (req.body.grant_type === "authorization_code") {
        if (typeof req.body.code !== "string" || typeof req.body.redirect_uri !== "string") return res.status(400).json({err: "invalidBodyParams"});

        //Verify Code
        const code = await db("authCodes").findOne({code: req.body.code});
        if (!code) return res.status(400).json({err: "codeDoesNotExist"});
        if (code.application !== req.application._id) return res.status(400).json({err: "codeNotForApplication"});
        if (code.used || new Date().getTime() > code.createdAt.getTime() + config.codeLifespan) return res.status(400).json({err: "codeExpired"});
        if (code.redirectUri !== req.body.redirect_uri) return res.status(400).json({err: "incorrectRedirectUri"});

        //Create Token
        await db("authCodes").updateOne({_id: code._id}, {$set: {used: true}});
        const token = await newToken(code.application, code.user, code.scopes);
        res.json({
            access_token: token.access,
            refresh_token: token.refresh,
            token_type: "Bearer",
            scope: token.scopes.join(" "),
            expires_in: config.tokenLifespan / 1000,
            user: token.user
        });

    } else if (req.body.grant_type === "refresh_token") {
        if (typeof req.body.refresh_token !== "string") return res.status(400).json({err: "invalidBodyParams"});

        //Verify old token
        const oldToken = await db("authTokens").findOne({refresh: req.body.refresh_token});
        if (!oldToken) return res.status(400).json({err: "tokenDoesNotExist"});
        if (oldToken.application !== req.application._id) return res.status(400).json({err: "tokenNotForApplication"});
        if (oldToken.expired) return res.status(400).json({err: "refreshTokenExpired"});
        if (new Date().getTime() < oldToken.createdAt.getTime() + config.tokenLifespan) return res.status(400).json({err: "accessTokenNotExpired"});

        //Create new token
        await db("authTokens").updateOne({_id: oldToken._id}, {$set: {expired: true}});
        const token = await newToken(oldToken.application, oldToken.user, oldToken.scopes);
        res.json({
            access_token: token.access,
            refresh_token: token.refresh,
            token_type: "Bearer",
            scope: token.scopes.join(" "),
            expires_in: config.tokenLifespan / 1000,
            user: token.user
        });
    } else return res.status(400).json({err: "invalidGrantType"});
};

const newToken = async (application, user, scopes) => {
    const token = {
        _id: uuid(),
        user,
        application,
        scopes,
        createdAt: new Date(),
        expired: false,
        access: randomString(128),
        refresh: randomString(128)
    };
    await db("authTokens").insertOne(token);
    return token;
}