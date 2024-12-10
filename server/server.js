const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { auth } = require("express-openid-connect");
require("dotenv").config();
require("./config/mongoose.config");

const userRoutes = require("./routes/routes.user");

const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));


// Routes
app.use("/api/users", userRoutes);
const AllMyQuizRoutes = require("./routes/routes.quiz");
AllMyQuizRoutes(app);


// Start Server
app.listen(port, () => console.log(`Listening on port: ${port}`));
