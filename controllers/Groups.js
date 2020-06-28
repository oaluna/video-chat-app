const Group = require("../models/Groups.js");
const User=require("../models/Users.js")
const mongoose = require("mongoose");

const getAllGroups = (req, res) => {
  Group.find()
    .sort({ date: -1 })
    .then((groups) => {
      if (Object.values(groups).length !== 0) {
        res.json(groups);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.log({ message: `${err} in getting groups` });
      res.sendStatus(500);
    });
};

const addNewGroup = async(req, res) => {
const user=await  User.findById(req.body.id)
  const newGroup = new Group({
    name: req.body.name,
    members:[user],
    admins:[user]
  });
  newGroup.save()
  .then((group) => {
    res.json(group);
  });
};

const getGroupsByUser = (req, res) => {
  Group.find({ members: req.params.id }).populate("users")
    .then((groups) => {
      if (Object.values(groups).length !== 0) {
        res.json(groups);
      } else {
        res.json([])
      }
    })
    .catch((err) => {
      console.log({ message: `${err} in getting groups` });
      res.sendStatus(500);
    });
};

module.exports = {
  getAllGroups,
  addNewGroup,
  getGroupsByUser,
};
