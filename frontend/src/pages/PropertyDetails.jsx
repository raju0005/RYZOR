import React, { useEffect, useState } from "react";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";
import StarRating from "../components/StarRating";
import axios from "axios";

const PropertyDetails = ({ currentUser }) => {
  const [properties, setProperties] = useState([]);
  const [editingReviewMap, setEditingReviewMap] = useState({});
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
      } else {
        await axios.post(
          `http://localhost:5000/api/reviews/${propertyId}`,
          data,
          { withCredentials: true }
        );
      }
      fetchProperties();
    } catch (err) {
      console.error("Failed to submit review", err);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:5000/api/reviews/${reviewId}`, {
        withCredentials: true,
      });
      fetchProperties();
    } catch (err) {
      console.error("Failed to delete review", err);
    }
  };

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {properties.map((property) => (
        <div
          key={property._id}
          className="p-6 border rounded-lg mb-8 shadow-md"
        >
          <h1 className="text-2xl font-bold mb-1">{property.title}</h1>
          <StarRating rating={parseFloat(property.averageRating) || 0} />
          <p className="mb-4">{property.description}</p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Reviews</h2>

          <ReviewForm
            onSubmit={(data) => handleSubmitReview(data, property._id)}
            initialRating={editingReviewMap[property._id]?.rating}
            initialComment={editingReviewMap[property._id]?.comment}
          />

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
        </div>
      ))}
    </div>
  );
};

export default PropertyDetails;
