const Bill = require("../models/Bill.model");
const Reward = require("../models/Reward.model");
const User = require("../models/User.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHanlder } = require("../utils/asyncHandler");
const { getCurrencySymbol } = require("./bill.controller");

const generateReward = asyncHanlder(async (req, res) => {
  //receive reward data
  const {
    userId,
    title,
    rewardAmount,
    code,
    instructions,
    vaildUntil,
    status,
  } = req.body;

  if (
    !userId ||
    !title ||
    !rewardAmount ||
    !code ||
    !instructions ||
    !vaildUntil
  ) {
    throw new ApiError(400, "All fields are required.");
  }

  //check user
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "No user found.");
  }

  //fetch all user bills sorted in descending order based on dueDate
  const bills = await Bill.find({ userId }).sort({ dueDate: -1 });

  if (bills.length === 0) {
    throw new ApiError(404, "No bills found for user.");
  }

  //fetch last 3 bills and check if not paid on or before due date
  const lastThreeBills = bills.slice(0, 3);

  const doesLastThreeBillNotPaidOnTime = lastThreeBills.some(
    (bill) => bill.paymentHistory?.paidOnTime !== true
  );

  if (doesLastThreeBillNotPaidOnTime) {
    throw new ApiError(
      409,
      "User is not eligible for a reward because the last 3 bills were not paid on time."
    );
  }

  //generate new reward
  const reward = await Reward.create({
    userId,
    title,
    rewardAmount,
    code,
    instructions,
    vaildUntil,
    status,
  });

  const currencySymbol = getCurrencySymbol(bills[0].currency);

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        reward,
        `${currencySymbol}${rewardAmount} ${title} reward generated successfully.`
      )
    );
});

module.exports = { generateReward };
