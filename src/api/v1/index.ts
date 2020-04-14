import express from "express"
import applicationAuth from "../../util/applicationAuth"
import tokenAuth from "../../util/tokenAuth"

const router = express.Router();
router.post("/token", applicationAuth, require("./token"));
router.get("/token", tokenAuth, require("./tokenInfo"));
router.get("/me", tokenAuth, require("./me"));
router.get("/user", applicationAuth, require("./user"));

export default router;
