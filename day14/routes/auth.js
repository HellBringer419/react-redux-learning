const express = require("express");

const authController = require("../controllers/auth");
const User = require("../models/user");
const validateUser = require("../util/validateUser");

const router = express.Router();

router.post("/login", authController.postLogin);

router.post("/signup", validateUser, authController.postSignup);

router.post("/logout", authController.postLogout);

router.post("/reset", authController.postReset);

module.exports = router;
