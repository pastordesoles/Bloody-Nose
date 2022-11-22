import { renderHook } from "@testing-library/react";
import { openModalActionCreator } from "../../redux/features/uiSlice/uiSlice";
import ProviderWrapper from "../../test-utils/ProviderWrapper";
import { UserRegisterCredentials } from "../../hooks/useUser/types";
import useUser from "./useUser";
import mockInitialStore from "../../mocks/store/mockInitialStore";

beforeEach(() => {
  jest.clearAllMocks();
});

const dispatchSpy = jest.spyOn(mockInitialStore, "dispatch");

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
        isError: false,
        modalText: "User already in the database",
      };

      await registerUser(registeredUser);

      expect(dispatchSpy).toHaveBeenCalledWith(
        openModalActionCreator(actionPayload)
      );
    });
  });
});
