const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
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

module.exports = model("ContactModel", contactSchema);
