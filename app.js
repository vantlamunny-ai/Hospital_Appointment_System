const express = require("express");

const app = express();

const logger = require("./middleware/logger");

const userRoutes = require("./routes/userRoutes");
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
app.use(express.json());

app.use(logger);

app.use("/users", userRoutes);
app.use("/patients", patientRoutes);
app.use("/doctors", doctorRoutes);
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Hospital Appointment System Backend is running"
    });
});

module.exports = app;