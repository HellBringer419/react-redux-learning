const express = require("express");

const uploadController = require("../controllers/uploads");

const router = express.Router();

router.post("/", uploadController.postImage);

module.exports = router;
