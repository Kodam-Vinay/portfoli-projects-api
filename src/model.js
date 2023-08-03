const mongoose = require("mongoose");
const validator = require("validator");

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

const ProjectModel = new mongoose.model("ProjectModel", projectSchema);

const contactSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      type: String,
      validate: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid");
        }
      },
    },
    title: {
      required: true,
      type: String,
    },
    message: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

const ContactModel = new mongoose.model("ContactModel", contactSchema);

module.exports = { ProjectModel, ContactModel };
