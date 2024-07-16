const express = require("express");
const {
  postContactDetails,
  getContactsDetails,
  deleteContactDetails,
} = require("./contactController");
const { authorizeUser } = require("./helper");
const router = express.Router();

router.post("/upload", postContactDetails);
router.get("/all", authorizeUser, getContactsDetails);
router.delete("/:id", authorizeUser, deleteContactDetails);

module.exports = {
  contactRouter: router,
};
