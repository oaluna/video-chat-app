const express = require("express");
const router = express.Router();

const { getAllUsers } = require("../controllers/Users.js");

//Defined Routes
router.get("/", getAllUsers);

module.exports = router;
