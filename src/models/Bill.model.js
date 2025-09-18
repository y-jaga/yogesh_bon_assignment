const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentSchema = new Schema({
  transanctionId: {
    type: String,
    required: true,
  },
  amountPaid: {
    type: String,
    required: true,
  },
  paymentDate: {
    type: Date,
  },
  paidOnTime: {
    type: Boolean,
    default: null, //null for unpaid, true/false = on time/delayed
  },
});

const billSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    billAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    currency: {
      type: String,
      enum: ["USD", "INR", "EUR", "GBP"], // allowed values
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: "String",
      enum: ["PENDING", "PAID"],
      default: "PENDING",
    },
    paymentHistory: paymentSchema,
  },
  { timestamps: true }
);

const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;
