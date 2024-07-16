const { sendToPerson, sendToMe } = require("./helper");
const { ContactModel } = require("./model");

const postContactDetails = async (req, res) => {
  try {
    const addContactDetails = new ContactModel(req.body);
    const saveProjectToDb = await addContactDetails.save();
    await sendToPerson(saveProjectToDb);
    await sendToMe(saveProjectToDb);
    res
      .status(201)
      .send({ status: true, message: "Successfully Sent a Message" });
  } catch (error) {
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
