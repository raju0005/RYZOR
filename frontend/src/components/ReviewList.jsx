import React from "react";
import StarRating from "./StarRating";

const ReviewList = ({ reviews, currentUserId, onEdit, onDelete }) => {
  return (
    <div className="space-y-4 mt-4">
      {reviews.map((review) => (
        <div key={review._id} className="border-b pb-2">
          <StarRating rating={review.rating} />
          <p>{review.comment}</p>
          <small>By: {review.user?.username || "Anonymous"}</small>
          {currentUserId === review.user?._id && (
            <div className="space-x-2">
              <button onClick={() => onEdit(review)} className="text-blue-600">
                Edit
              </button>
              <button
                onClick={() => onDelete(review._id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
