import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import Toast from "../Toast/Toast";
import Loader from "../Loader/Loader";
import useToken from "../../hooks/useToken/useToken";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ExitRoute from "../ExitRoute/ExitRoute";
import SessionDetailPage from "../../pages/SessionDetailPage/SessionDetailPage";
import CreateSessionPage from "../../pages/CreateSessionPage/CreateSessionPage";

const SessionsPage = lazy(
  () => import("../../pages/SessionsPage/SessionsPage")
);

const NotFoundPage = lazy(
  () => import("../../pages/NotFoundPage/NotFoundPage")
);

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

        <Route
          path="/session/:id"
          element={
            isLogged && (
              <ExitRoute isLogged={isLogged}>
                <SessionDetailPage />
              </ExitRoute>
            )
          }
        />
        <Route path="/create" element={<CreateSessionPage />} />
        <Route path="*" element={<NotFoundPage />} />
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
