import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const result = {
    height: height,
    weight: weight,
    bmi: calculateBmi(height, weight)
  };
  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: 'malformatted parameters' });
  } else {
    res.send(result);
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const targetAmount = req.body.target;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const dailyExercises = req.body.daily_exercises;
  if (!targetAmount || !dailyExercises) {
    return res.status(400).json({ error: 'parameters missing' });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  for (let i = 0; i < dailyExercises.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (isNaN(Number(dailyExercises[i]))) {
      return res.status(400).json({ error: 'malformatted parameters' });
    }
  }
  return res.send(calculateExercises(Number(targetAmount), <Array<number>>dailyExercises));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
