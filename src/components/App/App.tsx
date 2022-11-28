import { Routes, Route } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import Toast from "../Toast/Toast";
import Loader from "../Loader/Loader";
import SessionsPage from "../../pages/SessionsPage/SessionsPage";
import useToken from "../../hooks/useToken/useToken";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ExitRoute from "../ExitRoute/ExitRoute";

function App() {
  const uiOptions = useAppSelector(({ ui }) => ui);
  const isLogged = useAppSelector(({ user }) => user.isLogged);

  const { getToken } = useToken();

  useEffect(() => {
    getToken();
  }, [getToken]);

  return (
    <>
      <Suspense fallback={<Loader />} />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isLogged={isLogged}>
              <RegisterPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={
            <ProtectedRoute isLogged={isLogged}>
              <LoginPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sessions"
          element={
            <ExitRoute isLogged={isLogged}>
              <SessionsPage />
            </ExitRoute>
          }
        />
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
