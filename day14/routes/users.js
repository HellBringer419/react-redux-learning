const express = require("express");

const userController = require("../controllers/users");
const validateUser = require("../util/validateUser");

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.post("/", validateUser, userController.postUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
