const express = require("express");
const cors = require("cors"); // import the cors middleware
const app = express();
const recordsRoutes = require("./routes/records");

app.use(cors()); // enable CORS for all routes
app.use(express.json());
app.use("/api", recordsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
