import Review from "../Models/ReviewModel.js";

// Get all reviews for a property
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      propertyId: req.params.propertyId,
    }).populate("userId", "name");
    const avgRating = await Review.aggregate([
      {
        $match: {
          propertyId: new mongoose.Types.ObjectId(req.params.propertyId),
        },
      },
      { $group: { _id: null, avg: { $avg: "$rating" } } },
    ]);

    res.json({
      reviews,
      averageRating: avgRating[0]?.avg?.toFixed(1) || "0.0",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new review
export const createReview = async (req, res) => {
  try {
    console.log(req);
    const { rating, comment } = req.body;
    const review = new Review({
      propertyId: req.params.propertyId,
      rating,
      comment,
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update existing review
export const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return res.status(403).json({ error: "No Review" });
    }

    const updateReview = await Review.findByIdAndUpdate(
      req.params.reviewId,
      { $set: req.body },
      { new: true }
    );

    res.json(updateReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete review
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return res.status(403).json({ error: "No Review" });
    }
    await Review.findByIdAndDelete(req.params.reviewId);
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
