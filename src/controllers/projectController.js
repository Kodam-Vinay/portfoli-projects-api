const ProjectModel = require("../db/models/projectModel");

const uploadProject = async (req, res) => {
  try {
    const {
      name,
      description,
      cloudinary_image_id,
      github_url,
      website_url,
      technolgies,
    } = req.body;
    if (
      !name ||
      !description ||
      !cloudinary_image_id ||
      !github_url ||
      !website_url ||
      !technolgies
    ) {
      return res
        .status(400)
        .send({ status: false, message: "Please fill in all fields" });
    }

    const newProject = req.body;
    const projectSave = new ProjectModel(newProject);
    await projectSave.save();
    res
      .status(201)
      .send({ status: true, message: "Project Added Successfully" });
  } catch (error) {
    res.status(400).send({ status: false, message: "Something went wrong" });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(404)
        .send({ status: false, message: "Project Id Not Found" });
    }

    const findProject = await ProjectModel.findOne({ _id: id });
    if (!findProject) {
      return res
        .status(404)
        .send({ status: false, message: "Project Not Found" });
    }

    await ProjectModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res
      .status(202)
      .send({ status: true, message: "Project Updated Successfully" });
  } catch (error) {
    res.status(400).send({ status: false, message: "Something went wrong" });
  }
};

const deleteProject = async (req, res) => {
  try {
    const id = req.params?.id;
    if (!id) {
      return res
        .status(404)
        .send({ status: false, message: "Project Id Not Found" });
    }
    const findProject = await ProjectModel.findOne({ _id: id });
    if (!findProject) {
      return res
        .status(404)
        .send({ status: false, message: "Project Not Found" });
    }
    await ProjectModel.findByIdAndDelete(req.params.id);
    return res
      .status(201)
      .send({ status: true, message: "Project Deleted Successfully" });
  } catch (error) {
    res.status(400).send({ status: false, message: "Something went wrong" });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const getProjects = await ProjectModel.find().sort({ createdAt: -1 });
    const filterPojectDetails = getProjects.map((eachProject) => {
      return {
        _id: eachProject._id,
        name: eachProject.name,
        description: eachProject.description,
        cloudinary_image_id: eachProject.cloudinary_image_id,
        github_url: eachProject.github_url,
        website_url: eachProject.website_url,
        technolgies: eachProject.technolgies,
      };
    });
    const result = res.status(201).send({
      status: true,
      message: "Projects Retrieved Successfully",
      data: filterPojectDetails,
    });
  } catch (error) {
    res.status(400).send({ status: false, message: "Something went wrong" });
  }
};

const getProject = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res
        .status(404)
        .send({ status: false, message: "Project Id Not Found" });
    }
    const getProject = await ProjectModel.findById({ _id: id });
    if (!getProject) {
      res.status(404).send({ message: "no projects found" });
    }
    res.status(201).send({
      status: true,
      message: "Project Retrieved Successfully",
      data: getProject,
    });
  } catch (error) {
    res.status(400).send({ status: false, message: "Something went wrong" });
  }
};

module.exports = {
  uploadProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getProject,
};
