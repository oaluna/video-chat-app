const GroupMessages = require("../models/GroupMessages.js");
const Group = require("../models/Groups.js");
const User = require("../models/Users.js");

const addNewMessage = async (data) => {
  const sender = await User.findById(data.sender);
  const group = await Group.findById(data.group);
  const newMessage = new GroupMessages({
    sender: sender,
    group: group,
    message: data.message,
    sendername: data.sender,
  });

  newMessage.save().then((message) => {
    // res.json(message);
    return true;
  });
};

const getAllGroupMessages=(req,res)=>{
  GroupMessages.find()
    .sort({ date: -1 })
    .then((messages) => {
      if (Object.values(messages).length !== 0) {
        res.json(messages);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.log({ message: `${err} in getting messages` });
      res.sendStatus(500);
    });

}
const getMessagesByGroup = async (req, res) => {
  const groupId=req.params.id
  GroupMessages.find({group:groupId})
  .sort({ date: -1 }).limit(2)
  .then((messages) => {
    if (Object.values(messages).length !== 0) {
      res.json(messages);
    } else {
      res.sendStatus(204);
    }
  })
  .catch((err) => {
    console.log({ message: `${err} in getting messages` });
    res.sendStatus(500);
  });
};

module.exports = { addNewMessage, getMessagesByGroup,getAllGroupMessages };