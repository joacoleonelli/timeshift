import { IResult, IWordleBoardResponse, WordleBoard } from "@/classes/wordle";
import { useState } from "react";

const getColor = (result: IResult) => {
  if (!result.exists) {
    return "grey";
  }

  if (!result.position) {
    return "yellow";
  }

  return "green";
};

const WordleGame: React.FC = () => {
  const game = new WordleBoard("andre"); // TEST WORD
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState<IWordleBoardResponse[]>([]);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showGameComplete, setShowGameComplete] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(event.target.value);
  };

  const handleGuess = () => {
    const guessResult = game.makeGuess(guess);
    if (guessResult.remainingGuesses === 0) {
      setShowGameOver(true);
    }
    if (guessResult.feedback === "Correct guess, game complete.") {
      setShowGameComplete(true);
    }
    const currentFeedback = [...feedback];
    currentFeedback.push(guessResult);
    setFeedback(currentFeedback);
    setGuess("");
  };

  return (
    <div>
      <h1>Wordle Game</h1>
      <input
        type="text"
        value={guess}
        onChange={handleInputChange}
        maxLength={5}
        placeholder="Enter your guess"
      />
      <button disabled={showGameOver || guess.length < 5} onClick={handleGuess}>
        Submit Guess
      </button>
      <div>
        {feedback.map((item, index) => {
          return (
            <div key={index}>
              {item.result.map((result, innerIndex) => {
                return (
                  <span key={innerIndex} style={{ color: getColor(result) }}>
                    {result.value.toUpperCase()}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
      {showGameOver && <div>INCORRECT GUESS, GAME OVER</div>}
      {showGameComplete && <div>CORRECT GUESS, GAME COMPLETE</div>}
    </div>
  );
};

export default WordleGame;
