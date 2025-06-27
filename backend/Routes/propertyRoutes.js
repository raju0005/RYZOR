import express from "express";
import {
  createProperty,
  getAllProperties,
} from "../Controllers/propertyContoller.js";

import { authMiddleware } from "../Middlewares/authMiddleware.js"; // protect create route if needed

const router = express.Router();

router.post("/", createProperty);

router.get("/", getAllProperties);


export default router;
