const getBmi = (height: number, weight: number): number => {
  // BMI calculator, where height is in cm and weight is in kg
  const heightInMetres = height / 100.0;
  return weight / (heightInMetres ** 2);
};

const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0 || weight <= 0) {
    throw "Invalid parameters, height and weight must be positive and numeric";
  }
  const bmi = getBmi(height, weight);
  switch (true) {
    case (bmi < 18.5):
      return "Underweight";
    case (bmi < 25.0):
      return "Normal range";
    case (bmi < 30.0):
      return "Overweight";
    default:
      return "Obese";
  }
};

console.log(calculateBmi(180, 74));
