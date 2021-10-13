const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 8085;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/uploaded"));
app.use(cors());

app.use("/api/v1/invit/", require("./api_invitation_line"));
app.use("/api/v1/token/", require("./api_tokenLine"));

app.use("/api/v1/invit/", require("./api_invitation_gmail"));
app.use("/api/v1/gmail/", require("./api_gmail"));

app.listen(PORT, () => {
  console.log("Backend is running..");
});
