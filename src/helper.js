const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
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

const readHtmlFile = async (saveProjectToDb) => {
  const htmlFile = fs
    .readFileSync(path.join(__dirname, "emailTemplate/index.html"), "utf-8")
    .toString();
  const template = handlebars.compile(htmlFile);
  const replacements = {
    name: saveProjectToDb.name,
    title: saveProjectToDb.title,
    message: saveProjectToDb.message,
    email: saveProjectToDb.email,
  };
  const htmlToSend = template(replacements);

  const info = await transporter.sendMail({
    from: USER_EMAIL,
    to: "vinay.kodam112@gmail.com",
    subject: "test",
    text: "email testing",
    html: htmlToSend,
  });
  console.log("Message sent", info.response);
};

module.exports = readHtmlFile;
