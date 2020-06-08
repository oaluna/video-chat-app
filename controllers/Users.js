//Importing Model
const User = require("../models/Users.js");

//Database functions
const getAllUsers = (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then((users) => {
      if (Object.values(users).length !== 0) {
        res.json(users);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.log({ message: `${err} in getting users` });
      res.sendStatus(500);
    });
};

const addNewUser = (req, res) => {
  const newUser = new User({
    name: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    },
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    dark_theme: req.body.dark_theme,
    is_admin: req.body.is_admin,
  });

  newUser.save().then((user) => {
    res.json(user);
  });
};

const deleteUser = (req, res) => {
  User.findById(req.params.id).then((user) => {
    user
      .remove()
      .then(() => res.json({ success: true }))
      .catch((err) => res.status(404).json({ success: false }));
  });
};

const updateUser = (req, res) => {
  let { body } = req;
  console.log(body);
  User.findOneAndUpdate({ _id: req.params.id }, body).then(() =>
    res.json({ success: true })
  );
};

const getOneUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.status(404).message("User not found"));
};

module.exports = {
  getAllUsers,
  addNewUser,
  deleteUser,
  updateUser,
  getOneUser,
};
