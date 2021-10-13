const express = require("express");
const router = express.Router();
const formidable = require("formidable");
const request = require("request");

// invit-to-line
router.post("/invit-to-line-api", async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (error, fields, files) => {
    let result = await fields;
    var options = request({
      uri: "https://notify-api.line.me/api/notify",
      method: "POST",
      auth: {
        bearer: result.token_line,
      },
      form: {
        message: `Online Meetings - Webex
          \t\t
          Title : ${result.title_data}
          Agenda : ${result.agenda}
          ${result.day}, ${result.day_picker}
          Start : ${result.start_time_picker} ${result.get_time_ampm_start}
          End : ${result.end_time_picker} ${result.get_time_ampm_end}
          --------------
          \t\t
          More ways to join :
          \t\t
          Join from the meeting link 
          ${result.meetingLink}
          --------------
          \t\t
          Join by meeting number 
          Meeting number (access code) : ${result.meetingNumber}
          --------------
          \t\t
          Join from a video system or application 
          Dial : ${result.sipAddress}
          --------------
          \t\t
          Need help? Go to https://help.webex.com
        `,
      },
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
