const db = require("./mongo");

module.exports = async (req, res, next) => {

    //Parse Header
    const authHeader = req.headers.authorization;
    if (typeof authHeader !== "string") return res.status(401).json({err: "badAuthorization"});
    if (authHeader.split(" ").length !== 2 || !authHeader.startsWith("Basic ")) return res.status(401).json({err: "badAuthorization"});
    var applicationCredentials;
    try {
        applicationCredentials = Buffer.from(authHeader.split(" ")[1], "base64").toString().split(":");
    } catch (err) {
        return res.status(401).json({err: "badAuthorization"});
    }
    if (applicationCredentials.length !== 2) return res.status(401).json({err: "badAuthorization"});

    //Get Application
    const application = await db("applications").findOne({_id: applicationCredentials[0]});
    if (!application) return res.status(401).json({err: "invalidApplicationCredentials"});
    if (application.secret !== applicationCredentials[1]) return res.status(401).json({err: "invalidApplicationCredentials"});
    req.application = application;
    next();

};