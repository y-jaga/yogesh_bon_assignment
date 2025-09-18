const express = require("express");
const router = express.Router();
const {
  generateBill,
  acceptBillPayment,
} = require("../controllers/bill.controller.js");

router.route("/").post(generateBill);
router.route("/pay").post(acceptBillPayment);

module.exports = router;
