import express from 'express';
import path from 'path';

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.static(path.resolve(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
