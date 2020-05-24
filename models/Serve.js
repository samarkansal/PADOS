const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  note: {
    type: String,
  },
  fromLocation: {
    name: {
      type: String,
      required: true,
    },
    lat: {
      type: mongoose.Decimal128,
      required: true,
    },
    long: {
      type: mongoose.Decimal128,
      required: true,
    },
  },
  toLocation: {
    name: {
      type: String,
      required: true,
    },
    lat: {
      type: mongoose.Decimal128,
      required: true,
    },
    long: {
      type: mongoose.Decimal128,
      required: true,
    },
  },
  date: {
    type: Date,
    required: true,
  },
  maxWeight: {
    type: mongoose.Decimal128,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("serve", ServeSchema);
