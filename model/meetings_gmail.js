const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const meetings_gmail = sequelize.define(
  "meetings_gmail",
  {
    meeting_id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    date: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date_start: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date_end: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    //option
  }
);

(async () => {
  await meetings_gmail.sync({ force: false });
})();

module.exports = meetings_gmail;
