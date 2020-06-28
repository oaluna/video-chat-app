const express = require("express");
const router = express.Router();

const {getMessagesByGroup,getAllGroupMessages} =require("../controllers/GroupMessages.js");

router.get('/',getAllGroupMessages)

router.get('/:id',getMessagesByGroup)

module.exports = router;