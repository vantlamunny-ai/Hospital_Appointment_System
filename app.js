const express = require("express");

const app = express();

const logger = require("./middleware/logger");

const userRoutes = require("./routes/userRoutes");
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const availabilityRoutes = require("./routes/availabilityRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
app.use(express.json());

app.use(logger);

app.use("/users", userRoutes);
app.use("/patients", patientRoutes);
app.use("/doctors", doctorRoutes);
app.use("/hospitals", hospitalRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/availability", availabilityRoutes);
app.use("/notifications", notificationRoutes);
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Hospital Appointment System Backend is running"
    });
});

module.exports = app;