import { renderHook } from "@testing-library/react";
import mockLocalStorage from "../../mocks/localStorage/mockLocalStorage";
import mockInitialStore from "../../mocks/store/mockInitialStore";
import { User } from "../../redux/features/userSlice/types";
import { loginUserActionCreator } from "../../redux/features/userSlice/userSlice";
import ProviderWrapper from "../../test-utils/ProviderWrapper";
import { CustomTokenPayload } from "../useUser/types";
import useToken from "./useToken";

beforeEach(() => {
  jest.clearAllMocks();
});

const mockUser: User = {
  username: "xavi",
  id: "testid",
  token: "faketoken",
};

jest.mock("jwt-decode", () => {
  return () =>
    ({ id: mockUser.id, username: mockUser.username } as CustomTokenPayload);
});

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

beforeAll(() => {
  mockLocalStorage.setItem("token", "faketoken");
});

afterAll(() => {
  mockLocalStorage.clear();
});

const dispatchSpy = jest.spyOn(mockInitialStore, "dispatch");

describe("Given a useToken custom hook", () => {
  describe("When its method getToken is invoked and there is the token 'faketoken' in local storage", () => {
    test("Then it should call dispatch with a login user action", () => {
      const {
        result: {
          current: { getToken },
        },
      } = renderHook(() => useToken(), {
        wrapper: ProviderWrapper,
      });

      getToken();

      expect(dispatchSpy).toHaveBeenCalledWith(
        loginUserActionCreator(mockUser)
      );
    });
  });

  describe("When its method is onvoked and there is no token in the local storage", () => {
    test("Then it should not call dispatch", () => {
      const {
        result: {
          current: { getToken },
        },
      } = renderHook(() => useToken(), {
        wrapper: ProviderWrapper,
      });

      mockLocalStorage.removeItem("token");
      getToken();

      expect(dispatchSpy).not.toHaveBeenCalled();
    });
  });
});
