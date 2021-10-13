const express = require("express");
const router = express.Router();
const formidable = require("formidable");
const constants = require("./constant");
const request = require("request");

const Sequelize = require("sequelize");
const gmail = require("./model/gmail");
const fs = require("fs-extra");
const Op = Sequelize.Op;

// Get gmail
router.get("/gmail", async (req, res) => {
  try {
    let result = await gmail.findAll({
      order: Sequelize.literal("createdAt DESC"),
    });

    res.json(result);
  } catch (error) {
    res.json(error);
  }
});
// delete token
router.delete("/gmail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let result = await gmail.findOne({ where: { gmail: id } });

    result = await gmail.destroy({ where: { gmail: id } });
    res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
  } catch (error) {
    res.json({ result: constants.kResultNOk, message: "Internal error" });
  }
});
// create-token-line
router.post("/gmail", async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (error, fields, files) => {
      let result = await gmail.create(fields);
      res.json({
        result: constants.kResultOk,
        message: JSON.stringify(result),
      });
    });
  } catch (error) {
    res.json({ result: constants.kResultNOk, message: JSON.stringify(error) });
  }
});

// Update Product
router.put("/gmail", async (req, res) => {
  try {
    var form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      let result = await gmail.update(fields, {
        where: { gmail: fields.current_gmail },
      });

      res.json({
        result: constants.kResultOk,
        message: JSON.stringify(result),
      });
    });
  } catch (err) {
    res.json({ result: constants.kResultNOk, message: JSON.stringify(err) });
  }
});

module.exports = router;
