import { useEffect, useState } from "react";
import "./App.css";
import Quiz from "./components/Quiz/Quiz";
import { jsQuizz } from "./constants";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      const response = await fetch(
        "https://644982a3e7eb3378ca4ba471.mockapi.io/questions"
      );
      const responseQuestions = await response.json();
      setQuestions(responseQuestions);
    } catch (error) {
      console.log(error);
    }
  };

  return questions.length && <Quiz questions={questions} />;
}

export default App;
