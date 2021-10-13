const express = require("express");
const router = express.Router();
const formidable = require("formidable");
const request = require("request");

// invit-to-line
router.post("/invit-to-gmail-api", async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (error, fields, files) => {
    let result = await fields;
    var options = request({
      uri: "https://webexapis.com/v1/meetings",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: result.token_gmail,
      },
      body: JSON.stringify({
        title: result.title,
        agenda: result.agenda,
        start: result.day_picker + " " + result.start_time_picker,
        end: result.day_picker + " " + result.end_time_picker,
        timezone: "Asia/Bangkok",
        sendEmail: true,
        invitees: result.gmail_group,
        enabledAutoRecordMeeting: true,
        reminderTime: 10,
      }),
    });
    request(options, function (error, response) {
      if (error) throw new Error(error);
      res.json({
        statusCode: response.statusCode,
      });
    });
  });
  res.json({
    statusCode: response.statusCode,
  });
});

module.exports = router;
