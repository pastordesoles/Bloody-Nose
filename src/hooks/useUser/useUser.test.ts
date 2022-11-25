import { renderHook } from "@testing-library/react";
import { openModalActionCreator } from "../../redux/features/uiSlice/uiSlice";
import ProviderWrapper from "../../test-utils/ProviderWrapper";
import {
  CustomTokenPayload,
  UserCredentials,
  UserRegisterCredentials,
} from "../../hooks/useUser/types";
import useUser from "./useUser";
import mockInitialStore from "../../mocks/store/mockInitialStore";
import { User } from "../../redux/features/userSlice/types";
import mockLocalStorage from "../../mocks/localStorage/mockLocalStorage";
import { logoutUserActionCreator } from "../../redux/features/userSlice/userSlice";

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock("jwt-decode", () => {
  return () => ({ id: "testid", username: "xavi" } as CustomTokenPayload);
});

const mockRemoveToken = jest.fn();

jest.mock("../useToken/useToken", () => {
  return () => ({
    removeToken: mockRemoveToken,
  });
});

const dispatchSpy = jest.spyOn(mockInitialStore, "dispatch");

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

afterAll(() => {
  mockLocalStorage.clear();
});

describe("Given the custom hook useUser", () => {
  describe("When registerUser is invoked with username 'Xavi', password '12345' and email 'xav@i.com", () => {
    test("Then dispatch should be called with openModalActionCreator", async () => {
      const {
        result: {
          current: { registerUser },
        },
      } = renderHook(() => useUser(), {
        wrapper: ProviderWrapper,
      });
      const newUser: UserRegisterCredentials = {
        username: "Xavi",
        password: "12345",
        email: "xav@i.com",
      };

      const actionPayload = {
        isError: false,
        modalText: "User succesfully registered",
      };

      await registerUser(newUser);

      expect(dispatchSpy).toHaveBeenCalledWith(
        openModalActionCreator(actionPayload)
      );
    });
  });

  describe("When its method registerUser is invoked with with with username 'Xavi', password '12345' and email 'xav@i.com", () => {
    test("Then dispatch should be called with openModalActionCreator and show the modal with an error message", async () => {
      const {
        result: {
          current: { registerUser },
        },
      } = renderHook(() => useUser(), {
        wrapper: ProviderWrapper,
      });
      const registeredUser: UserRegisterCredentials = {
        username: "Xavi",
        password: "12345",
        email: "xa@vi.com",
      };

      const actionPayload = {
        isError: true,
        modalText: "Register error",
      };

      await registerUser(registeredUser);

      expect(dispatchSpy).toHaveBeenCalledWith(
        openModalActionCreator(actionPayload)
      );
    });
  });

  describe("When its method loginUser is invoked with username 'xavi' and incorrect password '12345678'", () => {
    test("Then dispatch should be called with openModalActionCreator and show the modal with an error message", async () => {
      const {
        result: {
          current: { loginUser },
        },
      } = renderHook(() => useUser(), {
        wrapper: ProviderWrapper,
      });

      const user: UserCredentials = {
        username: "xavi",
        password: "12345678",
      };

      const actionPayload = {
        isError: true,
        modalText: "Login error",
      };

      await loginUser(user);

      expect(dispatchSpy).toHaveBeenCalledWith(
        openModalActionCreator(actionPayload)
      );
    });
  });

  describe("When its method loginUser is invoked with username 'xavi' and correct password 'admin123", () => {
    test("Then dispatch should be called with openModalActionCreator and the token should be stored in local storage", async () => {
      const {
        result: {
          current: { loginUser },
        },
      } = renderHook(() => useUser(), {
        wrapper: ProviderWrapper,
      });

      const user: UserCredentials = {
        username: "xavi",
        password: "admin123",
      };

      const actionPayload: User = {
        username: "xavi",
        id: "testid",
        token: "testtoken",
      };

      await loginUser(user);

      expect(mockLocalStorage.getItem("token")).toBe(actionPayload.token);
    });
  });

  describe("When its method logoutUser is invoked", () => {
    test("Then logout user action should be called", () => {
      const {
        result: {
          current: { logoutUser },
        },
      } = renderHook(() => useUser(), {
        wrapper: ProviderWrapper,
      });

      logoutUser();

      expect(dispatchSpy).toHaveBeenCalledWith(logoutUserActionCreator());
    });
  });
});
