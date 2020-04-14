import express from "express";
import applicationAuth from "../../util/applicationAuth";
import tokenAuth from "../../util/tokenAuth";

const router = express.Router();
router.post("/token", applicationAuth, require("./token").default);
router.get("/token", tokenAuth, require("./tokenInfo").default);
router.get("/me", tokenAuth, require("./me").default);
router.get("/user", applicationAuth, require("./user").default);

export default router;
