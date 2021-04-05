const express = require("express");

const userController = require("../controllers/users");
const validateUser = require("../util/validateUser");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.post("/", validateUser, userController.postUser);
router.put("/:id", isAuth, userController.putUser);
router.delete("/:id", isAuth, userController.deleteUser);

module.exports = router;
