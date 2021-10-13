const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const gmail = sequelize.define(
  "gmail",
  {
    // attributes
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    gmail: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    //option
  }
);

(async () => {
  await gmail.sync({ force: false });
})();

module.exports = gmail;
