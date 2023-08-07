const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
require("dotenv").config();
const { USER_EMAIL1, PASSWORD1, USER_EMAIL2, PASSWORD2 } = process.env;

const transporter1 = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: USER_EMAIL1,
    pass: PASSWORD1,
  },
});

const transporter2 = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  },
  auth: {
    user: USER_EMAIL2,
    pass: PASSWORD2,
  },
});

const sendToMe = async (saveProjectToDb) => {
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

  const info = await transporter1.sendMail({
    from: USER_EMAIL1,
    to: "vinay.kodam112@gmail.com",
    subject: "contact",
    html: htmlToSend,
  });
  console.log("Message sent to Me");
};

const sendToPerson = async (saveProjectToDb) => {
  const htmlFile = fs
    .readFileSync(
      path.join(__dirname, "emailTemplate/sendToPerson.html"),
      "utf-8"
    )
    .toString();
  const template = handlebars.compile(htmlFile);
  const replacements = {
    name: saveProjectToDb.name,
  };
  const htmlToSend = template(replacements);

  const info = await transporter2.sendMail({
    from: USER_EMAIL2,
    to: saveProjectToDb.email,
    subject: "Thanks for Contacting Us",
    html: htmlToSend,
  });
  console.log("Message sent to person");
};

module.exports = { sendToPerson, sendToMe };
