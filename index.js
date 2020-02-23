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

        const shootydot = await db.Application.create({
            id: require("uuid/v4")(),
            secret: "test",
            name: "Shootydot",
            description: "pew pew"
        });

        const code = await db.AuthCode.create({
            id: require("uuid/v4")(),
            code: "abc",
            redirectUri: "https://abaer.dev"
        });

        const token = await db.AuthToken.create({
            id: require("uuid/v4")(),
            access: "def",
            refresh: "hij"
        });

        code.setUser(archie);
        code.setApplication(shootydot);
        token.setUser(archie);
        token.setApplication(shootydot);
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
    res.json(await db.AuthToken.findAll({
        include: ["user", "application"]
    }));
});
//app.use("/v1", require("./api/v1/_"));

app.use((req, res) => {
    res.status(404).json({err: "invalidRoute"});
});