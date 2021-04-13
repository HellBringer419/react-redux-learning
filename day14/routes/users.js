const express = require("express");

const userController = require("../controllers/users");
const validateUser = require("../util/validateUser");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUser);

router.put("/:id", isAuth, validateUser, userController.putUser);

module.exports = router;
