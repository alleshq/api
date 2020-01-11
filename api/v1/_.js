const express = require("express");
const applicationAuth = require("../../util/applicationAuth");
const tokenAuth = require("../../util/tokenAuth");

const router = express.Router();
router.post("/token", applicationAuth, require("./token"));
router.get("/token", tokenAuth, require("./tokenInfo"));
router.get("/me", tokenAuth, require("./me"));

module.exports = router;