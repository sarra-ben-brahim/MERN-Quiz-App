const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');


require('dotenv').config();
require("./config/mongoose.config");
const userRoutes = require("./routes/routes.user");  

const app = express();
const port = process.env.PORT;

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// User router
app.use("/api/users", userRoutes);  

app.listen(port, () => console.log(`Listening on port: ${port}`));
