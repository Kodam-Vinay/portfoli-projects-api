const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      default: null,
    },
    description: {
      required: true,
      type: String,
      default: null,
    },
    cloudinaryImageId: {
      required: true,
      type: String,
      default: null,
    },
    gitHubUrl: {
      required: true,
      type: String,
      default: null,
    },
    websiteUrl: {
      required: true,
      type: String,
      default: null,
    },
    technolgies: {
      required: true,
      type: Array,
      default: null,
    },
  },
  { timestamps: true }
);

const ProjectModel = new mongoose.model("ProjectModel", projectSchema);

module.exports = { ProjectModel };
