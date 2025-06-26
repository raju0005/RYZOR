import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating = 0, onRatingChange, editable = false }) => {
  const [hover, setHover] = useState(null);

  const handleClick = (value) => {
    if (editable && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={24}
          onClick={() => handleClick(star)}
          onMouseEnter={() => editable && setHover(star)}
          onMouseLeave={() => editable && setHover(null)}
          className={`cursor-${
            editable ? "pointer" : "default"
          } transition-colors duration-200 ${
            (hover || rating) >= star ? "text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default StarRating;
