import { useEffect } from "react";
import { closeModalActionCreator } from "../../redux/features/uiSlice/uiSlice";
import { useAppDispatch } from "../../redux/hooks";
import ToastStyled from "./ToastStyled";

interface ToastProps {
  message: string;
  severity: "success" | "error";
  isOpen: boolean;
}

const Toast = ({ message, severity, isOpen }: ToastProps): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        dispatch(closeModalActionCreator());
      }, 4000);
    }
  }, [dispatch, isOpen]);
  return <ToastStyled severity={severity}>{message}</ToastStyled>;
};

export default Toast;
