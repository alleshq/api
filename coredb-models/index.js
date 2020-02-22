module.exports = db => {
    //Define Models
    require("./User")(db);
    require("./Session")(db);
    require("./FollowerRelation")(db);
    require("./Team")(db);
    require("./TeamMember")(db);

    return db;
};