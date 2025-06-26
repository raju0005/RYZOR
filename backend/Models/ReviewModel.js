import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
   
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
