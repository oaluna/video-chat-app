const Group = require("../models/Groups.js");
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

const addNewGroup = (req, res) => {
  const newGroup = new Group({
    name: req.body.name,
    members: [req.body.id],
    admins: [req.body.id],
  });
  newGroup.save().then((group) => {
    res.json(group);
  });
};

const getGroupsByUser = (req, res) => {
  Group.find({ members: req.params.id })
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

module.exports = {
  getAllGroups,
  addNewGroup,
  getGroupsByUser,
};
