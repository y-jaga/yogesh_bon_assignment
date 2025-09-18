const Bill = require("../models/Bill.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHanlder } = require("../utils/asyncHandler");

const isBillPaidOnTime = (paymentDate, dueDate) => {
  return paymentDate <= dueDate;
};

const getCurrencySymbol = (code) => {
  const symbols = {
    USD: "$",
    INR: "₹",
    EUR: "€",
    GBP: "£",
  };

  return symbols[code] || code;
};

const generateBill = asyncHanlder(async (req, res) => {
  const { userId, billAmount, currency, dueDate } = req.body;

  if (!userId || !billAmount || !currency || !dueDate) {
    throw new ApiError(400, "All fields required.");
  }

  const bill = await Bill.create({
    userId,
    billAmount,
    currency,
    dueDate,
  });

  res
    .status(201)
    .json(new ApiResponse(201, bill, "Bill generated successfully."));
});

const acceptBillPayment = asyncHanlder(async (req, res) => {
  //fetch bill payment data and validate them
  const { billId, transanctionId, amountPaid } = req.body;

  if (!billId || !transanctionId || !amountPaid) {
    throw new ApiError(
      400,
      "All fields are required: billId, transanctionId, amountPaid"
    );
  }

  //find the bill and check whether it is paid on not
  const existingBill = await Bill.findById(billId);

  if (!existingBill || existingBill.status !== "PENDING") {
    throw new ApiError(409, "No unpaid bill found.");
  }

  //prepare payment data to update in bill
  const isBillPaid = isBillPaidOnTime(new Date(), existingBill.dueDate);

  if (isBillPaid) {
    existingBill.status = "PAID";
  }

  if (amountPaid !== existingBill.billAmount) {
    throw new ApiError(
      400,
      `Invalid payment amount. Please pay the exact bill amount of ${getCurrencySymbol(
        existingBill.currency
      )}${existingBill.billAmount}.`
    );
  }

  const paymentData = {
    transanctionId,
    amountPaid: `${getCurrencySymbol(existingBill.currency)}${amountPaid}`,
    paymentDate: new Date(),
    paidOnTime: isBillPaid,
  };

  existingBill.paymentHistory = paymentData;

  const paidBill = await existingBill.save();

  res
    .status(200)
    .json(new ApiResponse(200, paidBill, "Bill paid successfully."));
});

module.exports = { generateBill, acceptBillPayment, getCurrencySymbol };
