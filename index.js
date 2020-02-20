const express = require("express");
const app = express();

const db = require("./coredb");
db.sync().then(() => {
    app.listen(8081, async () => {
        console.log("Listening on Express");
        const a = await db.User.findOne({where:{username: "archie"}});
        const w = await db.User.findOne({where:{username: "will"}});
        //a.addFollower(w);
    });
});

const bodyParser = require("body-parser");
app.use(bodyParser.json({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));

app.use((err, req, res, next) => {
    res.status(500).json({err: "internalError"});
});

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/test", async (req, res) =>  {
    const users = await db.User.findAll({
        include: "followers"
    });
    res.json(users);
});
//app.use("/v1", require("./api/v1/_"));

app.use((req, res) => {
    res.status(404).json({err: "invalidRoute"});
});