import express from 'express';
import data from './data/diagnoses.ts';
const app = express();
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
  res.send(data);
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

