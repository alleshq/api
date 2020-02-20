const credentials = require("../credentials");
const Sequelize = require("sequelize");

//Create Instance
const sequelize = new Sequelize(credentials.db.name, credentials.db.username, credentials.db.password, {
    host: credentials.db.host,
    dialect: "mariadb"
});
module.exports = sequelize;

//User
const User = sequelize.define("user", {
    id: {
        primaryKey: true,
        type: Sequelize.UUID
    },
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    usesLegacyPassword: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    name: {
        type: Sequelize.STRING
    },
    nickname: {
        type: Sequelize.STRING
    },
    reputation: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    rubies: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    private: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    about: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    }
}, {
    timestamps: false
});

//Follower Relations
const FollowerRelation = sequelize.define("followerRelation", {
    followerId: {
        type: Sequelize.UUID,
        references: {
            model: User,
            key: "id"
        }
    },
    followingId: {
        type: Sequelize.UUID,
        references: {
            model: User,
            key: "id"
        }
    }
}, {
    timestamps: false
});

User.belongsToMany(User, {
    as: "followers",
    through: FollowerRelation,
    foreignKey: "followingId",
    otherKey: "followerId"
});
User.belongsToMany(User, {
    as: "following",
    through: FollowerRelation,
    foreignKey: "followerId",
    otherKey: "followingId"
});

//Export Stuff
Object.assign(sequelize, {
    User
});