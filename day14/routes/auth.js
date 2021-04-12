const express = require("express");

const authController = require("../controllers/auth");
const validateUser = require("../util/validateUser");

const router = express.Router();

router.post("/login", authController.postLogin);

router.post("/signup", validateUser, authController.postSignup);

router.post("/logout", authController.postLogout);

module.exports = router;
