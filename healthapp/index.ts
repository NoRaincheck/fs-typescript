import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";
const app = express();

app.use(express.json());

app.get("/ping/", (_req, res) => {
  res.send("pong");
});

app.get("/hello/", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);
  const bmi: string = calculateBmi(height, weight);
  res.send({
    height: height,
    weight: weight,
    bmi: bmi,
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).send({ error: "parameters missing" });
  }

  if (!Array.isArray(daily_exercises)) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  const dailyExercise = daily_exercises.map((el) => Number(el));
  if (dailyExercise.some((val) => isNaN(val))) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  if (isNaN(Number(target))) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  const result = calculateExercises(dailyExercise, Number(target));
  return res.send({ result });
});
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
