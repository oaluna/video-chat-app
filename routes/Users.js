const express = require("express");
const router = express.Router();

const { getAllUsers,addNewUser,deleteUser,getOneUser,updateUser,checkLoginUser } = require("../controllers/Users.js");

//Defined Routes
router.get("/", getAllUsers);

router.post("/add",addNewUser)

router.delete("/:id",deleteUser)

router.get("/login",checkLoginUser)

router.get("/:id",getOneUser)

router.put("/:id",updateUser)


module.exports = router;

