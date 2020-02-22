const express = require("express");
const app = express();

const db = require("./util/db");
db.sync({force: true}).then(() => {
    app.listen(8081, async () => {
        console.log("Listening on Express");

        const alles = await db.Team.create({
            id: require("uuid/v4")(),
            name: "Alles",
            slug: "alles"
        });

        const shootydot = await db.Application.create({
            id: require("uuid/v4")(),
            secret: "test",
            name: "Shootydot",
            description: "Play with your friends or whatever",
            callbackUrls: ["https://shootydot.alles.cx/auth"]
        });

        alles.addApplication(shootydot);
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
    res.json(await db.Application.findAll({
        include: ["team"]
    }));
});
//app.use("/v1", require("./api/v1/_"));

app.use((req, res) => {
    res.status(404).json({err: "invalidRoute"});
});