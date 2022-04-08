require("dotenv/config");
require("./db");
const express = require("express");
const app = express();
require("./config")(app);

const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);
const authRoutes = require("./routes/auth.routes");
app.use("/api", authRoutes);
const stuRoutes = require("./routes/student.routes");
app.use("/api", stuRoutes);
const teaRoutes = require("./routes/teacher.routes");
app.use("/api", teaRoutes);
// app.use(require("../routes/auth.routes"));
// app.use(require("./routes/student.routes"));
// app.use(require("./routes/teacher.routes"));

require("./error-handling")(app);

module.exports = app;

