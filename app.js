const express = require('express');
const recordsRouter = require('./routes/records');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/records', recordsRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
