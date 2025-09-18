const Bill = require("../models/Bill.model");
const Reward = require("../models/Reward.model");
const { ApiResponse } = require("../utils/ApiResponse");

const generateReward = asyncHanlder(async (req, res) => {
  //receive reward data
  const { userId, title, rewardAmount, code, instructions, vaildUntil } =
    req.body;

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

  //fetch all user bill sorted in descending order based on dueDate
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
      "User can't be rewared, since last 3 bills were not paid on or before the due date"
    );
  }

  const reward = await Reward.create({
    userId,
    title,
    rewardAmount,
    code,
    instructions,
    vaildUntil,
  });

  res
    .status(201)
    .json(new ApiResponse(201, reward, "Reward generated successfully."));
});

module.exports = { generateReward };
