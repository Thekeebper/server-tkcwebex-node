const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const token_line = sequelize.define(
  "token_line",
  {
    // attributes
    nameChat: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    token_line: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    typeChat: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "GROUP",
    },
  },
  {
    //option
  }
);

(async () => {
  await token_line.sync({ force: false });
})();

module.exports = token_line;
