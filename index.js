const express = require("express");
const app = express();

const db = require("./util/db");
db.sync({force: true}).then(() => {
    app.listen(8081, async () => {
        console.log("Listening on Express");

        const archie = await db.User.create({
            id: require("uuid/v4")(),
            username: "archie",
            password: "hash",
            name: "Archie Baer",
            nickname: "Archie",
            about: "Hi! I'm Archie."
        });

        const archiebaer = await db.User.create({
            id: require("uuid/v4")(),
            username: "archiebaer",
            password: "hash",
            name: "Archie Baer #2",
            nickname: "Archie",
            about: "Hi! I'm also Archie."
        });

        archiebaer.setPrimary(archie);
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
    res.json(await db.User.findAll({
        include: ["primary", "secondaries"]
    }));
});
//app.use("/v1", require("./api/v1/_"));

app.use((req, res) => {
    res.status(404).json({err: "invalidRoute"});
});