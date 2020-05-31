import Sequelize from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
  logging: false,
});

// define table
const User = sequelize.define("User", {
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
});

export default { Sequelize, sequelize, User };
