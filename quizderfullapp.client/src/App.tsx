import QuestionsDisplay from "./pages/QuestionsDisplay";
import Welcome from "./pages/Welcome";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Feedback from "./pages/Feedback";
import RiddlesPage from "./pages/RiddlesPage";
import AuthPage from "./pages/AuthPage";
import AdminLogin from "./pages/AdminLogin";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/questions" element={<QuestionsDisplay />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/riddles" element={<RiddlesPage />} />
          <Route path="/" element={<AuthPage />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
