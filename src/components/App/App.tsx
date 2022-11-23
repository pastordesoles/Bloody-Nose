import { Routes, Route } from "react-router-dom";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegisterPage />} />

      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
