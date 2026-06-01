interface ExerciseValues {
  dailyExerciseHours: Array<number>;
  targetDailyHours: number;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) {
    throw new Error(
      "Expecting at least 2 arguments, incorrect number of arguments supplied",
    );
  }
  return {
    targetDailyHours: Number(args[2]),
    dailyExerciseHours: args.slice(3).map((el) => Number(el)),
  };
};

export const calculateExercises = (
  dailyExerciseHours: Array<number>,
  targetDailyHours: number,
): Result => {
  const results: Result = {
    periodLength: dailyExerciseHours.length,
    trainingDays:
      dailyExerciseHours.filter((dailyTime) => dailyTime > 0).length,
    target: targetDailyHours,
    // init the remaining
    average: 0,
    success: false,
    rating: 0,
    ratingDescription: "",
  };
  results.average = dailyExerciseHours.reduce((el, a) => el + a, 0) /
    results.periodLength;
  results.success = results.average >= targetDailyHours;
  switch (true) {
    case ((results.average - targetDailyHours) > 1):
      results.rating = 3;
      results.ratingDescription = "you're doing great! Keep it up";
      break;
    case (results.success):
      results.rating = 2;
      results.ratingDescription = "not too bad but could be better";
      break;
    default:
      results.rating = 1;
      results.ratingDescription = "room for improvement";
  }
  return results;
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { dailyExerciseHours, targetDailyHours } = parseExerciseArguments(
      process.argv,
    );
    console.log(calculateExercises(dailyExerciseHours, targetDailyHours));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Something went wrong");
    }
  }
}
