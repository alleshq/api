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
            about: "This is a test",
            createdAt: new Date()
        });

        const session = await db.Session.create({
            id: require("uuid/v4")(),
            address: "abc"
        });

        archie.addSession(session);
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
        include: ["sessions"]
    });
    res.json(users);
});
//app.use("/v1", require("./api/v1/_"));

app.use((req, res) => {
    res.status(404).json({err: "invalidRoute"});
});