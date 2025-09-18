const mongoose = require("mongoose");
const { Schema } = mongoose;

const rewardSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String, //e.g Amazon gift card
      required: true,
    },
    rewardAmount: {
      type: Number,
      required: true,
    },
    code: {
      //unique code to claim reward
      type: String,
      required: true,
    },
    instructions: {
      //how to use reward
      type: String,
      required: true,
    },
    vaildUntil: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Reward = mongoose.model("Reward", rewardSchema);

module.exports = Reward;
