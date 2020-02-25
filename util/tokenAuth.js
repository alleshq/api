const db = require("../util/db");

module.exports = async (req, res, next) => {

    //Parse Header
    const authHeader = req.headers.authorization;
    if (typeof authHeader !== "string") return res.status(401).json({err: "badAuthorization"});
    if (authHeader.split(" ").length !== 2 || !authHeader.startsWith("Bearer ")) return res.status(401).json({err: "badAuthorization"});

    //Get Token
    const token = await db("authTokens").findOne({access: authHeader.split(" ")[1]});
    if (!token) return res.status(401).json({err: "invalidToken"});

    //Get User
    const user = await db("accounts").findOne({_id: token.user});
    if (!user) return res.status(401).json({err: "invalidToken"});

    token.user = user;
    req.token = token;
    next();

};