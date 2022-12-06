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
import UpdatePage from "../../pages/UpdateSession/UpdatePage";
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
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <ProtectedRoute isLogged={isLogged}>
                <RegisterPage />
              </ProtectedRoute>
            </Suspense>
          }
        />

        <Route
          path="/login"
          element={
            <Suspense fallback={<Loader />}>
              <ProtectedRoute isLogged={isLogged}>
                <LoginPage />
              </ProtectedRoute>
            </Suspense>
          }
        />

        <Route
          path="/sessions"
          element={
            <Suspense fallback={<Loader />}>
              <ExitRoute isLogged={isLogged}>
                <SessionsPage />
              </ExitRoute>
            </Suspense>
          }
        />

        <Route
          path="/session/:id"
          element={
            isLogged && (
              <Suspense fallback={<Loader />}>
                <ExitRoute isLogged={isLogged}>
                  <SessionDetailPage />
                </ExitRoute>
              </Suspense>
            )
          }
        />
        <Route
          path="/create"
          element={
            isLogged && (
              <ExitRoute isLogged={isLogged}>
                <CreateSessionPage />
              </ExitRoute>
            )
          }
        />

        <Route
          path="/edit/:id"
          element={
            isLogged && (
              <ExitRoute isLogged={isLogged}>
                <UpdatePage />
              </ExitRoute>
            )
          }
        />

        <Route
          path="*"
          element={
            <Suspense fallback={<Loader />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Routes>

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
