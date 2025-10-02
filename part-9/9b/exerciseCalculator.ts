interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Values2 {
  value1: number;
  value2: number[];
}

const parseArguments2 = (args: Array<string>): Values2 => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const value2: number[] = [];
  for (let i = 3; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      value2.push(Number(args[i]));
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }
  if (!isNaN(Number(args[2]))) {
    return {
      value1: Number(args[2]),
      value2: value2
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateExercises = (targetAmount: number, dailyExercises: number[]): Result => {
  const average = dailyExercises.reduce((x, y) => x + y, 0) / dailyExercises.length;
  let rating = 0;
  let ratingDescription = '';
  if (average < 1.5) {
    rating = 1;
    ratingDescription = 'terrible';
  } else if (average < 2.5) {
    rating = 2;
    ratingDescription = 'not great, not terrible';
  } else {
    rating = 3;
    ratingDescription = 'great';
  }
  return {
    periodLength: dailyExercises.length,
    trainingDays: dailyExercises.filter((element) => element > 0).length,
    success: average > targetAmount ? true : false,
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetAmount,
    average: average
  };
};

try {
  const { value1, value2 } = parseArguments2(process.argv);
  console.log(calculateExercises(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
