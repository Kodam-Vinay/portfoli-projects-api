const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
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
    cloudinary_image_id: {
      required: true,
      type: String,
      default: null,
    },
    github_url: {
      required: true,
      type: String,
      default: null,
    },
    website_url: {
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
module.exports = model("ProjectModel", projectSchema);
