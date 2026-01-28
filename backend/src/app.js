import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import authRoute from "./routes/auth.routes.js";
import usersRoute from "./routes/users.routes.js";
import hostelsRoute from "./routes/hostels.routes.js";
import flatsRoute from "./routes/flats.routes.js";
import pgsRoute from "./routes/pgs.routes.js";
import favouritesRoute from "./routes/favourites.routes.js";
import contactsRoute from "./routes/contact.routes.js";
import reviewsRoute from "./routes/reviews.routes.js";
import savedSearchesRoute from "./routes/savedSearches.routes.js";
import notificationPreferencesRoute from "./routes/notificationPreferences.routes.js";
import { ApiResponse } from "./utils/ApiResponse.js";
import logger, { requestLogger } from "./utils/logger.js";

const app = express();

// Security middleware - helmet for HTTP headers
app.use(helmet());

// Compression middleware
app.use(compression());

// Rate limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: { success: false, message: "Too many requests, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Stricter limit for auth endpoints
  message: { success: false, message: "Too many authentication attempts, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting
app.use("/api/v1", generalLimiter);
app.use("/api/v1/auth", authLimiter);

// CORS configuration - use environment variable
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173", "http://localhost:8000"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors());

// Body parsing with size limits
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Request logging
app.use(requestLogger);

// Health check endpoint for Render/monitoring services
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/flats", flatsRoute);
app.use("/api/v1/hostels", hostelsRoute);
app.use("/api/v1/pgs", pgsRoute);
app.use("/api/v1/favourites", favouritesRoute);
app.use("/api/v1/contact", contactsRoute);
app.use("/api/v1/reviews", reviewsRoute);
app.use("/api/v1/saved-searches", savedSearchesRoute);
app.use("/api/v1/notification-preferences", notificationPreferencesRoute);

// 404 handler for undefined routes
app.use("*", (req, res) => {
  res.status(404).json(new ApiResponse(404, null, "Route not found"));
});

// Global error handler
app.use((err, req, res, _next) => {
  const errorStatus = err.statusCode || err.status || 500;
  const errorMessage = err.message || "Something Went Wrong!";

  // Log error
  logger.error("Error occurred", {
    status: errorStatus,
    message: errorMessage,
    url: req.originalUrl,
    method: req.method,
    stack: err.stack,
  });

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    // Only include stack trace in development
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

export { app };
