const express = require("express");
const {
  uploadProject,
  getAllProjects,
  getProject,
  deleteProject,
  updateProject,
} = require("../controllers/projectController");
const { authorizeUser } = require("../utils/helper");
const router = express.Router();

router.post("/upload", authorizeUser, uploadProject);
router.put("/:id", authorizeUser, updateProject);
router.get("/all", getAllProjects);
router.get("/:id", getProject);
router.delete("/:id", authorizeUser, deleteProject);

module.exports = router;
