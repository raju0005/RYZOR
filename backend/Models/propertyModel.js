import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  reviews:[],
  address: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Property = mongoose.model("Property", propertySchema);

export default Property;
