import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { useAppSelector } from "../../redux/hooks";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import Toast from "../Toast/Toast";
import Loader from "../Loader/Loader";
import SessionsPage from "../../pages/SessionsPage/SessionsPage";

function App() {
  const uiOptions = useAppSelector(({ ui }) => ui);

  return (
    <>
      <Suspense fallback={<Loader />} />

      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sessions" element={<SessionsPage />} />
      </Routes>
      <Suspense />
      {uiOptions.showModal && !uiOptions.isError && (
        <Toast
          severity="success"
          message={uiOptions.modalText}
          isOpen={uiOptions.showModal}
        />
      )}
      {uiOptions.showModal && uiOptions.isError && (
        <Toast
          severity="error"
          message={uiOptions.modalText}
          isOpen={uiOptions.showModal}
        />
      )}
    </>
  );
}

export default App;
