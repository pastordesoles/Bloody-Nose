import { closeModalActionCreator } from "../../redux/features/uiSlice/uiSlice";
import { useAppDispatch } from "../../redux/hooks";
import ToastStyled from "./ToastStyled";

interface ToastProps {
  message: string;
  severity: "success" | "error";
}

const Toast = ({ message, severity }: ToastProps): JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <ToastStyled
      onClose={() => {
        dispatch(closeModalActionCreator());
      }}
      severity={severity}
    >
      {message}
    </ToastStyled>
  );
};

export default Toast;
