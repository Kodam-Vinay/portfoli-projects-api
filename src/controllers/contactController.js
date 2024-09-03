const { sendToPerson, sendToMe } = require("../utils/helper");
const ContactModel = require("../db/models/contactModel");
const validator = require("validator");

const postContactDetails = async (req, res) => {
  try {
    const { name, email, title, message } = req.body;

    if (!name || !email || !title || !message) {
      return res
        .status(400)
        .send({ status: false, message: "Please fill in all fields" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Please Enter a Valid Email" });
    }

    const newContactDetails = new ContactModel({
      name: name,
      message: message,
      title: title,
      email: email,
    });
    const saveProjectToDb = await newContactDetails.save();
    await sendToPerson(saveProjectToDb);
    await sendToMe(saveProjectToDb);
    res
      .status(201)
      .send({ status: true, message: "Successfully Sent a Message" });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ status: false, message: "Something went wrong" });
  }
};

const getContactsDetails = async (req, res) => {
  try {
    const getDetails = await ContactModel.find();
    res.status(201).send({
      status: true,
      message: "Cotact Details Retrieved Successfully",
      data: getDetails,
    });
  } catch (error) {
    res.status(400).send({ status: false, message: "Something went wrong" });
  }
};

const deleteContactDetails = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res
        .status(404)
        .send({ status: false, message: "Contact Id Not Found" });
    }
    const findContactDetails = await ContactModel.findOne({ _id: id });
    if (!findContactDetails) {
      return res
        .status(404)
        .send({ status: false, message: "Contact Details Not Found" });
    }
    await ContactModel.findByIdAndDelete({ _id: id });
    return res
      .status(201)
      .send({ status: true, message: "Contact Deleted Successfully" });
  } catch (error) {
    res.status(400).send({ status: false, message: "Something went wrong" });
  }
};

module.exports = {
  postContactDetails,
  getContactsDetails,
  deleteContactDetails,
};
