import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
const app = express();

app.get("/ping/", (_req, res) => {
  res.send("pong");
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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
