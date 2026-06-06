const express = require("express");
const router = express.Router();
const {getContact,getContacts,createContact,updateContact,deleteContact}=require("../controller/contactcontroller");
const validateToken = require("../middleware/validatetoken");
router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").put(updateContact).delete(deleteContact).get(getContact);
module.exports=router;