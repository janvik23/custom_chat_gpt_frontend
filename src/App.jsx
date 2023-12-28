import { useState } from "react";
import axios from "axios";
import "./App.css";
import QuizForm from "./QuizForm";

function App() {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState(undefined);

  const sendPrompt = async (event, data) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/ask", { ...data });
      if (res.status !== 200) {
        throw new Error("Something went wrong");
      }

      const { message } = await res.data;
      setAnswer(message);
    } catch (err) {
      console.error(err, "err");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="app-container">
        <div className="spotlight__wrapper">
          <h2> Generate Quiz</h2>
          <QuizForm
            onSubmit={(e, data) => {
              sendPrompt(e, data);
            }}
            loading={loading}
          />
          <div className="spotlight__answer">
            <pre className="scrollable-pre">
              {answer && <p>{answer}</p>}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
