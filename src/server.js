const express = require("express");
require("dotenv").config();
require("./connection");
const { ProjectModel } = require("./model");
const app = express();
app.use(express.json());
const cors = require("cors");
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
    res.status(200).send(getProjects);
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

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
