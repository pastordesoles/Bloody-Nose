import { Routes, Route } from "react-router-dom";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import { useAppSelector } from "../../redux/hooks";
import Toast from "../Toast/Toast";

function App() {
  const uiOptions = useAppSelector(({ ui }) => ui);

  return (
    <>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

      {uiOptions.showModal && !uiOptions.isError && (
        <Toast severity="success" message={uiOptions.modalText} />
      )}
      {uiOptions.showModal && uiOptions.isError && (
        <Toast severity="error" message={uiOptions.modalText} />
      )}
    </>
  );
}

export default App;
