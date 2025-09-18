const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/user.controller.js");

router.route("/").post(createUser);

module.exports = router;
