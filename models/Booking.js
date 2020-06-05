const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  serve: {
    type: Schema.Types.ObjectId,
    ref: "serves",
  },
  requestedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  pickUp: {
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
  dropOff: {
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
  note: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    default: "requested",
  },
  rating: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Booking = mongoose.model("booking", BookingSchema);
