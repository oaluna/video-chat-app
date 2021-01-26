const Group = require("../models/Groups");
const User = require("../models/Users");

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

const addNewGroup = async (req, res) => {
  const user = await User.findById(req.body.id);
  const newGroup = new Group({
    name: req.body.name,
    members: [user],
    admins: [user],
  });
  newGroup.save().then((group) => {
    res.json(group);
  });
};

const addNewUserToGroup = async (req, res) => {
  const group=await Group.findById(req.body.group)
  const user = await User.find({ username: req.body.username });
  const result =await group.members.includes(user[0]._id)
  if(result===false){
  Group.findByIdAndUpdate(
    req.body.group,
    { $push: { members: user } },
    { new: true },
    (err, result) => {
      res.json({message:"member added successfully"})
    }
  );
  }else{
    res.json({message:"user already a member"})
  }
};

const getGroupsByUser = (req, res) => {
  Group.find({ members: req.params.id })
    .populate("users")
    .then((groups) => {
      if (Object.values(groups).length !== 0) {
        res.json(groups);
      } else {
        res.json([]);
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
  addNewUserToGroup,
};
