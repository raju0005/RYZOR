import express from "express";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
} from "../Controllers/propertyContoller.js";

import { authMiddleware } from "../Middlewares/authMiddleware.js"; // protect create route if needed

const router = express.Router();

router.post("/", createProperty);

router.get("/", getAllProperties);

router.get("/:id", getPropertyById);

export default router;
