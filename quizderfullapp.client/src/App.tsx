import QuestionsDisplay from "./pages/QuestionsDisplay";
import Welcome from "./pages/Welcome";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Feedback from "./pages/Feedback";
import RiddlesPage from "./pages/RiddlesPage";

export default function App() {
  function randomNum() {
    const arr: number[] = [];
    while (arr.length < 5) {
      var r = Math.floor(Math.random() * 20);
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  }

  const randomArr = randomNum();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/questions"
            element={<QuestionsDisplay randomNumbers={randomArr} />}
          />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/riddles" element={<RiddlesPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
