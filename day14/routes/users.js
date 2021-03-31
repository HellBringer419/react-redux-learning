const express = require("express");

const userController = require("../controllers/users");

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.post("/", userController.postUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
