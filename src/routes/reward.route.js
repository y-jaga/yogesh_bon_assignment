const express = require("express");
const router = express.Router();
const { generateReward } = require("../controllers/reward.controller");

router.route("/").post(generateReward);

module.exports = router;
