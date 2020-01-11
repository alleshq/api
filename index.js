const express = require("express");
const app = express();
app.listen(8081, () => {
    console.log("Listening on Express");
});

const bodyParser = require("body-parser");
app.use(bodyParser.json({extended: false}));

app.use((err, req, res, next) => {
    res.status(500).json({err: "internalError"});
});

app.use((req, res, next) => {
    if (connected) return next();
    res.status(502).json({err: "notReady"});
});

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/v1", require("./api/v1/_"));

app.use((req, res) => {
    res.status(404).json({err: "invalidRoute"});
});

const {connect} = require("./util/mongo");
var connected = false;
connect((err) => {
    if (err) throw err;
    connected = true;
    console.log("Connected to MongoDB");
});