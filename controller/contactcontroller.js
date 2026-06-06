const asynchandler=require("express-async-handler");
const Contact = require("../models/contactmodel");
//@desc get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asynchandler(async (req, res) => {
    const contact= await Contact.find({user_id:req.user.id });

    res.status(200).json(contact);
});

//@desc create new contact
//@route POST /api/contacts
//@access private
const createContact = asynchandler(async(req, res) => {
    console.log("the request body:", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const contacts = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contacts);
});

///@desc update contacts
//@route PUT /api/contacts/:id
//@access private
const updateContact = asynchandler(async(req, res) => {
     const contact= await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user don't have permission to update other user contacts");
    }
    const updatedContact= await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedContact);
});

//@desc delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asynchandler(async(req, res) => {
     const contact= await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user don't have permission to update other user contacts");
    }
    await contact.deleteOne({_id:req.params.id});

    res.status(200).json(contact);
});

//@desc get single contact
//@route GET /api/contacts/:id
//@access private
const mongoose = require("mongoose");

const getContact = asynchandler(async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        throw new Error("Invalid Contact ID");
    }

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    res.status(200).json(contact);
});

module.exports = {getContact, getContacts, createContact, updateContact, deleteContact};