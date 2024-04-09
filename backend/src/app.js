import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.routes.js";
import usersRoute from "./routes/users.routes.js";
import hostelsRoute from "./routes/hostels.routes.js";
import flatsRoute from "./routes/flats.routes.js";
import pgsRoute from "./routes/pgs.routes.js";
import favouritesRoute from "./routes/favourites.routes.js";
import contactsRoute from "./routes/contact.routes.js";

const app = express();

//middleware
// Specify the allowed origin(s)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:8000"
];

// Enable CORS for all routes
app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the origin is in the allowed list, or if it's a same-origin request (null)
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

// Your routes and other middleware
// ...

// Handle preflight requests
app.options("*", cors());


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
app.use("/api/v1/favourites", favouritesRoute);
app.use("/api/v1/contact", contactsRoute)

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
