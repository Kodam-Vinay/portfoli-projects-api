const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    imageUrl: {
      required: true,
      type: String,
    },
    gitHubUrl: {
      required: true,
      type: String,
    },
    websiteUrl: {
      required: true,
      type: String,
    },
    technolgies: {
      required: true,
      type: Array,
    },
  },
  { timestamps: true }
);

const ProjectModel = new mongoose.model("ProjectModel", projectSchema);

module.exports = { ProjectModel };
