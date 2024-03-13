import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.routes.js";
import usersRoute from "./routes/users.routes.js";
import hostelsRoute from "./routes/hostels.routes.js";
import flatsRoute from "./routes/flats.routes.js";
import pgsRoute from "./routes/pgs.routes.js";

const app = express();

// middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser());

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/flats", flatsRoute);
app.use("/api/v1/hostels", hostelsRoute);
app.use("/api/v1/pgs", pgsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something Went Wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

export { app };
