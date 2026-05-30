interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyExerciseHours: Array<number>,
  targetDailyHours: number,
): Result => {
  var results: Result = {
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
    case (results.success):
      results.rating = 2;
      results.ratingDescription = "not too bad but could be better";
    default:
      results.rating = 1;
      results.ratingDescription = "room for improvement";
  }
  return results;
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
