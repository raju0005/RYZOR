import Property from "../Models/propertyModel.js";
import Review from "../Models/ReviewModel.js";
import asyncHandler from "../Middlewares/asyncHandler.js";

export const createProperty = asyncHandler(async (req, res) => {
  const { title, description, address, price, images } = req.body;
  console.log(req);

  const property = new Property({
    title,
    description,
    address,
    price,
    images,
  });

  await property.save();
  res.status(201).json(property);
});

export const getPropertyById = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) {
    res.status(404);
    throw new Error("Property not found");
  }

  const reviews = await Review.find({ propertyId: property._id })
    .populate("userId", "name")
    .sort({ createdAt: -1 });

  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  res.json({
    property,
    reviews,
    averageRating: parseFloat(avgRating.toFixed(2)),
  });
});

export const getAllProperties = asyncHandler(async (req, res) => {
  const properties = await Property.find();

  const results = await Promise.all(
    properties.map(async (property) => {
      const reviews = await Review.find({ propertyId: property._id })
      .sort({ createdAt: -1 });

      const avgRating = reviews.length
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

      return {
        ...property.toObject(),
        reviews,
        averageRating: parseFloat(avgRating.toFixed(2)),
      };
    })
  );
  console.log(results);

  res.json(results);
});
