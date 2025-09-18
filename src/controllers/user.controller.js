const User = require("../models/User.model");
const { ApiError } = require("../utils/ApiError.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const { asyncHanlder } = require("../utils/asyncHandler.js");

const createUser = asyncHanlder(async (req, res) => {
  const { username, fullName, email } = req.body;

  if (!username || !fullName || !email) {
    throw new ApiError(400, "All fields are required.");
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, "User with same username or email already exists.");
  }

  const user = new User({ username, fullName, email });
  await user.save();

  res
    .status(201)
    .json(new ApiResponse(201, user, "User created successfully."));
});

module.exports = { createUser };
