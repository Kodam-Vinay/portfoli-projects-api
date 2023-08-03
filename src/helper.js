const nodemailer = require("nodemailer");
const fs = require("fs");
const handlebars = require("handlebars");
require("dotenv").config();
const { USER_EMAIL, PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: USER_EMAIL,
    pass: PASSWORD,
  },
});

const sendMail = () => {
  const info = transporter.sendMail({
    from: USER_EMAIL,
    to: "vinay.kodam112@gmail.com",
    subject: "random",
    text: "nothing",
    html: "hello",
  });
};

var readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      callback(err);
    } else {
      callback(null, html);
    }
  });
};

readHTMLFile(__dirname + "/emailTemplate/index.html", function (err, html) {
  if (err) {
    console.log("error reading file", err);
    return;
  }
  var template = handlebars.compile(html);
  var replacements = {
    username: "John Doe",
  };
  var htmlToSend = template(replacements);
  const info = transporter.sendMail({
    from: USER_EMAIL,
    to: "vinay.kodam112@gmail.com",
    subject: "random",
    text: "nothing",
    html: htmlToSend,
  });
});
module.exports = { readHTMLFile };
