import React, { useState, useEffect } from "react";
import StarRating from "./StarRating";

const ReviewForm = ({ onSubmit, initialRating = 0, initialComment = "" }) => {
  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState(initialComment);

  useEffect(() => {
    setRating(initialRating);
    setComment(initialComment);
  }, [initialRating, initialComment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please provide a rating.");
      return;
    }
    onSubmit({ rating, comment });
    setRating(0);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col justify-around items-start gap-4">
      <div className="flex items-center space-x-2">
        <label className="block font-medium mb-1">Give your Rating:</label>
        <StarRating
          rating={rating}
          onRatingChange={setRating}
          editable={true}
        />
      </div>

      <label className="block mt-4 font-medium mb-1">Your Comment:</label>
      <textarea
        className="w-full border rounded p-2"
        rows="3"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
      />

      <button
        type="submit"
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 "
      >
        {initialComment ? "Update Review" : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
