import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies?.JWT;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
};
