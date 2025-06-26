import express from "express";
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../Controllers/reviewContoller.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:propertyId", getReviews);
router.post("/:propertyId", createReview);
router.put("/:reviewId", updateReview);
router.delete("/:reviewId", deleteReview);

export default router;
