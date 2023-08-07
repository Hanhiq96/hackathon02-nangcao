const express = require("express");
const app = express();

const userRoutes = require("./routes/users.routes");

const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(express.static("public"));

app.use("/api/v1/users", userRoutes);

app.listen(3000, () => {
  console.log("Server is listening on http://localhost:3000");
});
