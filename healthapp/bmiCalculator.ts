interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length != 4) {
    throw new Error(
      "Expecting 2 arguments, incorrect number of arguments supplied",
    );
  }

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const getBmi = (height: number, weight: number): number => {
  // BMI calculator, where height is in cm and weight is in kg
  const heightInMetres = height / 100.0;
  return weight / (heightInMetres ** 2);
};

const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0 || weight <= 0) {
    throw new Error(
      "Invalid parameters, height and weight must be positive and numeric",
    );
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

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log("Something went wrong")
  }
}
