const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const recordsRoutes = require("./routes/records");

app.use(cors());
app.use(express.json());
app.use("/api", recordsRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
