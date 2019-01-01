import path from 'path';
import express from 'express';
import expressStatusMonitor from 'express-status-monitor';

import router from './routes';

const app = express();
const { PORT = 3000 } = process.env;

app.use(expressStatusMonitor());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());
app.use('/api/v1', router);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
