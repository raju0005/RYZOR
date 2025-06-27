import Property from "../Models/propertyModel.js";
import Review from "../Models/ReviewModel.js";
import asyncHandler from "../Middlewares/asyncHandler.js";

export const createProperty = asyncHandler(async (req, res) => {
  const { title, description, address, price, images } = req.body;

  const property = new Property({
    title,
    description,
    address,
    price,
    images,
  });

  await property.save();
  console.log(property);

  res.status(201).json(property);
});

export const getAllProperties = asyncHandler(async (req, res) => {
  const properties = await Property.find();

  const results = await Promise.all(
    properties.map(async (property) => {
      const reviews = await Review.find({ propertyId: property._id }).sort({
        createdAt: -1,
      });

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
