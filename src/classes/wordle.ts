export interface IResult {
  value: string;
  position?: boolean;
  exists: boolean;
}
export interface IWordleBoardResponse {
  feedback: string;
  result: IResult[];
  remainingGuesses?: number;
}

export class WordleBoard {
  secretWord: string;
  maxGuesses: number;
  guesses: string[];

  constructor(secretWord: string, maxGuesses: number = 6) {
    this.secretWord = secretWord.toLowerCase();
    this.maxGuesses = maxGuesses;
    this.guesses = [];
  }

  makeGuess(guess: string): IWordleBoardResponse {
    const guessLowerCase = guess.toLowerCase();
    this.guesses.push(guessLowerCase);

    let result = [];
    if (guessLowerCase === this.secretWord) {
      for (let i = 0; i < 5; i++) {
        result.push({
          value: guessLowerCase[i],
          position: true,
          exists: true,
        });
      }

      return { feedback: "Correct guess, game complete.", result };
    }

    for (let i = 0; i < 5; i++) {
      if (guessLowerCase[i] === this.secretWord[i]) {
        result.push({
          value: guessLowerCase[i],
          position: true,
          exists: true,
        }); // Correct letter in correct position
      } else if (this.secretWord.includes(guessLowerCase[i])) {
        result.push({
          value: guessLowerCase[i],
          position: false,
          exists: true,
        }); // Correct letter incorrect position
      } else {
        result.push({
          value: guessLowerCase[i],
          exists: false,
        }); // Incorrect letter
      }
    }
    --this.maxGuesses;
    return {
      feedback: "Incorrect guess",
      result,
      remainingGuesses: this.maxGuesses,
    };
  }
}
