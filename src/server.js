const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config();
require("./connection");
const { ProjectModel, ContactModel } = require("./model");
const cors = require("cors");
const { sendToPerson, sendToMe } = require("./helper");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);
const port = process.env.PORT || 8000;

app.post("/projects-upload", async (req, res) => {
  try {
    const newProject = req.body;
    const projectSave = new ProjectModel(newProject);
    const result = await projectSave.save();

    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.put("/projects/:id", async (req, res) => {
  try {
    const updateProject = await ProjectModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(202).send(updateProject);
    if (!updateProject) {
      res.status(404).send("Id Not Found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/projects", async (req, res) => {
  try {
    const getProjects = await ProjectModel.find();
    const result = getProjects.reverse();
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
});

app.get("/projects/:id", async (req, res) => {
  try {
    const getProject = await ProjectModel.findById(req.params.id);
    if (!getProject) {
      res.status(404).send({ message: "no projects found" });
    }
    res.status(200).send(getProject);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/projects/:id", async (req, res) => {
  try {
    const getProject = await ProjectModel.findByIdAndDelete(req.params.id);
    if (!getProject) {
      res.status(404).send({ message: "no projects found" });
    }
    res.status(200).send(getProject);
  } catch (error) {
    res.status(500).send(error);
  }
});

//contact apis
app.post("/contact-details", async (req, res) => {
  try {
    const addContactDetails = new ContactModel(req.body);
    const saveProjectToDb = await addContactDetails.save();
    sendToPerson(saveProjectToDb);
    sendToMe(saveProjectToDb);
    res.status(201).send({ message: "Email Sent", saveProjectToDb });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/contact-details", async (req, res) => {
  try {
    const getDetails = await ContactModel.find();
    res.status(200).send(getDetails);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/contact-details/:id", async (req, res) => {
  try {
    const deleteDetails = await ContactModel.findByIdAndDelete(req.params.id);
    if (!deleteDetails) {
      res.status(404).send("Not Found");
    }
    res.status(200).send(deleteDetails);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/secret-login", async (req, res) => {
  try {
    const userDetails = req.body;
    const { userName, password } = userDetails;
    if (
      userName === process.env.USER_NAME &&
      password === process.env.PASSWORD
    ) {
      const jwtToken = jwt.sign(userDetails, process.env.SECRET_KEY);
      res.status(200).send({ message: "Login SuccessFul", jwt: jwtToken });
    } else {
      res
        .status(404)
        .send({ message: "Only Admins Can Access to this Section" });
    }
  } catch (error) {
    res.status(500).send("Internal Error");
  }
});

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
