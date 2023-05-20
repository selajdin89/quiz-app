import React, { useEffect, useState } from "react";
import "./Result.scss";

const Result = ({ totalQuestions, result, onTryAgain }) => {
  const [name, setName] = useState("");
  const [highscores, setHighscores] = useState([]);
  const [showScores, setShowScores] = useState(false);

  const handleSave = () => {
    const score = {
      name,
      score: result.score,
    };

    const newHighScores = [...highscores, score].sort(
      (a, b) => b.score - a.score
    );
    setHighscores(newHighScores);
    setShowScores(true);
    localStorage.setItem("highScores", JSON.stringify(newHighScores));
  };

  useEffect(() => {
    setHighscores(JSON.parse(localStorage.getItem("highScores")) || []);
  }, []);

  const handleTryAgain = () => {
    setShowScores(false);
    setHighscores([]);
    onTryAgain();
  };
  return (
    <div className="result">
      <h3>Result</h3>
      <p>
        Total Questions: <span>{totalQuestions}</span>
      </p>
      <p>
        Total Score: <span>{result.score}</span>
      </p>
      <p>
        Correct Answers: <span>{result.correctAnswers}</span>
      </p>
      <p>
        Wrong Answers: <span>{result.wrongAnswers}</span>
      </p>
      <button onClick={handleTryAgain}>Try again</button>
      {!showScores ? (
        <>
          <h3>
            Enter your name bellow <br /> to save your score
          </h3>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Ranking</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {highscores.map((highscore, i) => (
                <tr key={`${highscore.score}${highscore.name}${i}`}>
                  <td>{i + 1}</td>
                  <td>{highscore.name}</td>
                  <td>{highscore.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Result;
