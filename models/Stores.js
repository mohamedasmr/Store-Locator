const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");

const storeSchema = new mongoose.Schema(
  {
    storeId: {
      type: String,
      required: [true, "Please add a store Id"],
      unique: true,
      trim: true,
      maxlength: [10, "Store Id mush me less than 10 chars"],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
    },
  },
  { timestamps: true }
);

// Geocode $ create location
storeSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
  };

  this.address = undefined;
  next();
});

module.exports = mongoose.model("Store", storeSchema);
