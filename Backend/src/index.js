import 'dotenv/config';
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import admissionRoutes from "./routes/admissionRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import schoolRoutes from "./routes/schoolRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";

connectDB(); // connect database

const app = express();

const allowedOrigins = [
    process.env.FRONTEND_URL?.trim(),
    "http://localhost:5173",
    "https://npssdemo.axonovatechnologies.com",
    "https://shivalik-heights-hr-sec-school-demo.vercel.app",
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Static folder for file uploads
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/school", schoolRoutes);
app.use("/api/gallery", galleryRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.get("/health", (req, res) => {
    res.status(200).json({ 
        status: "UP", 
        timestamp: new Date().toISOString(),
        db: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Error Handler
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    console.error(`[Error] ${err.message}`);
    res.status(statusCode).json({
        success: false,
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// hot reload 1
