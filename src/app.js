require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
require("./connection");
const cors = require("cors");
const { projectRouter } = require("./projectRouter");
const { contactRouter } = require("./contactRouter");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);
const port = process.env.PORT || 8001;

app.use("/api/projects", projectRouter);
app.use("/api/contact", contactRouter);

app.post("/api/users/login", async (req, res) => {
  try {
    const userDetails = req.body;
    const { user_name, password } = userDetails;
    if (
      user_name === process.env.USER_NAME &&
      password === process.env.PASSWORD
    ) {
      const jwtToken = await jwt.sign(userDetails, process.env.SECRET_KEY);
      res.status(200).send({
        status: true,
        message: "Login SuccessFul",
        data: { token: jwtToken },
      });
    } else {
      res.status(404).send({
        status: false,
        message: "Only Admins Can Access to this Section",
      });
    }
  } catch (error) {
    res.status(500).send({ status: false, message: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
