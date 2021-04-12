const express = require("express");

const authController = require("../controllers/auth");
const userController = require("../controllers/users");
const isAuth = require("../middleware/isAuth");
const validateUser = require("../util/validateUser");

const router = express.Router();

router.post("/login", authController.postLogin);

router.post("/logout", authController.postLogout);

router.post("/users/", isAuth, validateUser, userController.postUser);

router.delete("/users/:id", isAuth, userController.deleteUser);

module.exports = router;
