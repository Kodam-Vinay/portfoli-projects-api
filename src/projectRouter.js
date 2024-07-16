const express = require("express");
const {
  uploadProject,
  getAllProjects,
  getProject,
  deleteProject,
} = require("./projectController");
const { authorizeUser } = require("./helper");
const router = express.Router();

router.post("/upload", authorizeUser, uploadProject);
router.put("/:id", authorizeUser, uploadProject);
router.get("/all", getAllProjects);
router.get("/:id", getProject);
router.delete("/:id", authorizeUser, deleteProject);

module.exports = {
  projectRouter: router,
};
