const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      type: String,
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

module.exports = model("ContactModel", contactSchema);
