const express = require("express");
const router = express.Router();

const { getAllGroups, addNewGroup, getGroupsByUser,addNewUserToGroup } = require("../controllers/Groups.js");

router.get("/", getAllGroups);

router.get("/:id",getGroupsByUser)

router.post("/add", addNewGroup);

router.post("/adduser",addNewUserToGroup)

module.exports = router;
