const express = require("express");
const router = express.Router();
const formidable = require("formidable");
const constants = require("./constant");
const request = require("request");

const Sequelize = require("sequelize");
const token_line = require("./model/token_line");
const fs = require("fs-extra");
const Op = Sequelize.Op;

// Get token
router.get("/token-line", async (req, res) => {
  try {
    let result = await token_line.findAll({
      order: Sequelize.literal("createdAt DESC"),
    });

    res.json(result);
  } catch (error) {
    res.json(error);
  }
});
// delete token
router.delete("/token-line/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let result = await token_line.findOne({ where: { token_line: id } });

    result = await token_line.destroy({ where: { token_line: id } });
    res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
  } catch (error) {
    res.json({ result: constants.kResultNOk, message: "Internal error" });
  }
});
// create-token-line
router.post("/token-line", async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (error, fields, files) => {
      let result = await token_line.create(fields);
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
router.put("/token-line", async (req, res) => {
  try {
    var form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      let result = await token_line.update(fields, {
        where: { token_line: fields.current_token_line },
      });

      res.json({
        result: constants.kResultOk,
        message: JSON.stringify(result),
      });
    });
  } catch (error) {
    res.json({ result: constants.kResultNOk, message: JSON.stringify(error) });
  }
});

// Get Product by Id
router.get("/token-line/:id", async (req, res) => {
  try {
    let result = await token_line.findOne({
      where: { token_line: req.params.id },
    });
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
