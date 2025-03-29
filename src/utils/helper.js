const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { USER_EMAIL1, PASSWORD1, USER_EMAIL2, PASSWORD2, RECIEVER_EMAIL } =
  process.env;

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
    .readFileSync(path.join(__dirname, "../emailTemplate/index.html"), "utf-8")
    .toString();
  const template = handlebars.compile(htmlFile);
  const replacements = {
    name: saveProjectToDb.name,
    title: saveProjectToDb.title,
    message: saveProjectToDb.message,
    email: saveProjectToDb.email,
  };
  const htmlToSend = template(replacements);

  await transporter1.sendMail({
    from: USER_EMAIL1,
    to: RECIEVER_EMAIL,
    subject: "contact",
    html: htmlToSend,
  });
};

const sendToPerson = async (saveProjectToDb) => {
  const htmlFile = fs
    .readFileSync(path.join(__dirname, "../emailTemplate/index.html"), "utf-8")
    .toString();
  const template = handlebars.compile(htmlFile);
  const replacements = {
    name: saveProjectToDb.name,
  };
  const htmlToSend = template(replacements);

  await transporter2.sendMail({
    from: USER_EMAIL2,
    to: saveProjectToDb.email,
    subject: "Thanks for Contacting Us",
    html: htmlToSend,
  });
};

const authorizeUser = async (req, res, next) => {
  const authHeader = req?.headers["authorization"];
  if (authHeader) {
    const token = authHeader?.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: "Unauthorized User" });
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).send({ message: "Unauthorized User" });
  }
};

const authorizeUserForProjects = async (req, res, next) => {
  const authHeader = req?.headers["authorization"];
  if (authHeader) {
    const token = authHeader?.split(" ")[1];
    if (token !== process.env.PROJECT_ACCESS_TOKEN) {
      return res.status(401).send({ message: "Unauthorized User" });
    }
    next();
  } else {
    res.status(401).send({ message: "Unauthorized User" });
  }
};

module.exports = {
  sendToPerson,
  sendToMe,
  authorizeUser,
  authorizeUserForProjects,
};
