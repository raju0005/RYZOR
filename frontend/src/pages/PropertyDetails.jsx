import React, { useEffect, useState } from "react";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";
import StarRating from "../components/StarRating";
import axios from "axios";
import propImage from "../assets/download.jpeg";
import { MdOutlineReviews } from "react-icons/md";
import { FaWindowClose } from "react-icons/fa";
import { toast } from "react-toastify";

const PropertyDetails = ({ currentUser }) => {
  const [properties, setProperties] = useState([]);
  const [editingReviewMap, setEditingReviewMap] = useState({});
  const [visibleReviewMap, setVisibleReviewMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/property/");
      setProperties(res.data);
    } catch (err) {
      setError("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (data, propertyId) => {
    try {
      const editingReview = editingReviewMap[propertyId];
      if (editingReview) {
        await axios.put(
          `http://localhost:5000/api/reviews/${editingReview._id}`,
          data,
          { withCredentials: true }
        );
        setEditingReviewMap((prev) => ({ ...prev, [propertyId]: null }));
        toast.success("Review updated!");
      } else {
        await axios.post(
          `http://localhost:5000/api/reviews/${propertyId}`,
          data,
          { withCredentials: true }
        );
        toast.success("Review submitted!");
      }
      fetchProperties();
    } catch (err) {
      console.error("Failed to submit review", err);
      toast.error("Failed to submit review.");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:5000/api/reviews/${reviewId}`, {
        withCredentials: true,
      });
      toast.success("Review deleted!");
      fetchProperties();
    } catch (err) {
      console.error("Failed to delete review", err);
      toast.error("Failed to delete review.");
    }
  };

  const toggleReviews = (propertyId) => {
    setVisibleReviewMap((prev) => ({
      ...prev,
      [propertyId]: !prev[propertyId],
    }));
  };

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 ">
      {properties.map((property) => (
        <div
          key={property._id}
          className=" px-10 py-7 rounded-lg mb-8 box-shadow"
        >
          <h1 className="text-2xl font-bold mb-1">{property.title}</h1>
          <p className="mb-4">{property.description}</p>
          <StarRating rating={parseFloat(property.averageRating) || 0} />

          <div className="w-full h-100 p-5 flex justify-center items-center">
            <img src={propImage} className="object-fit h-80" alt="" />
          </div>

          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => toggleReviews(property._id)}
          >
            {visibleReviewMap[property._id] ? (
              <FaWindowClose />
            ) : (
              <MdOutlineReviews />
            )}
          </button>

          {visibleReviewMap[property._id] && (
            <div className="mt-4">
              <ReviewForm
                onSubmit={(data) => handleSubmitReview(data, property._id)}
                initialRating={editingReviewMap[property._id]?.rating}
                initialComment={editingReviewMap[property._id]?.comment}
              />

              {property.reviews && property.reviews.length > 0 && (
                <ReviewList
                  reviews={property.reviews}
                  currentUserId={currentUser?._id}
                  onEdit={(review) =>
                    setEditingReviewMap((prev) => ({
                      ...prev,
                      [property._id]: review,
                    }))
                  }
                  onDelete={handleDeleteReview}
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PropertyDetails;
