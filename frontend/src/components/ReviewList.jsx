import React from "react";
import StarRating from "./StarRating";
import { MdDelete, MdOutlineEdit } from "react-icons/md";

const ReviewList = ({ reviews, currentUserId, onEdit, onDelete }) => {
  return (
    <div className="space-y-4 mt-5">
      <h1 className="text-2xl font-bold">Reviews</h1>
      {reviews.map((review) => (
        <div
          key={review._id}
          className="border-b px-2 py-4 flex justify-between items-center "
        >
          <h1 className="text-md">{review.comment}</h1>
          <small>By: {review.user?.username || "Anonymous"}</small>
          <StarRating rating={review.rating} />
          {currentUserId === review.user?._id && (
            <div className="space-x-2">
              <button
                onClick={() => onEdit(review)}
                className="text-blue-600 text-2xl"
              >
                <MdOutlineEdit />
              </button>
              <button
                onClick={() => onDelete(review._id)}
                className="text-red-600 text-2xl"
              >
                <MdDelete />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
