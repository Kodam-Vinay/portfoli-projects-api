const express = require("express");
const {
  uploadProject,
  getAllProjects,
  getProject,
  deleteProject,
  updateProject,
} = require("../controllers/projectController");
const { authorizeUser, authorizeUserForProjects } = require("../utils/helper");
const router = express.Router();

router.post("/upload", authorizeUser, uploadProject);
router.put("/:id", authorizeUser, updateProject);
router.get("/all", authorizeUserForProjects, getAllProjects);
router.get("/:id", authorizeUserForProjects, getProject);
router.delete("/:id", authorizeUser, deleteProject);

module.exports = router;
