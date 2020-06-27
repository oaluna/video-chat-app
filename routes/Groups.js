const express = require("express");
const router = express.Router();

const { getAllGroups, addNewGroup, getGroupsByUser } = require("../controllers/Groups.js");

router.get("/", getAllGroups);

router.get("/:id",getGroupsByUser)

router.post("/add", addNewGroup);

module.exports = router;
