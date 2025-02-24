const express = require("express");
const app = express();
const recordsRoutes = require("./routes/records");

app.use(express.json());
app.use("/api", recordsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
