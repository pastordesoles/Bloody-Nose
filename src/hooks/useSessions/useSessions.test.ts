import { renderHook } from "@testing-library/react";
import mockSessionsState from "../../mocks/states/mockSessionsState";
import mockInitialStore from "../../mocks/store/mockInitialStore";
import { loadSessionsActionCreator } from "../../redux/features/sessionsSlice/sessionsSlice";
import {
  hideLoadingActionCreator,
  openModalActionCreator,
  showLoadingActionCreator,
} from "../../redux/features/uiSlice/uiSlice";
import ProviderWrapper from "../../test-utils/ProviderWrapper";
import useSessions from "./useSessions";

const dispatchSpy = jest.spyOn(mockInitialStore, "dispatch");

describe("Given the useSessions hook", () => {
  describe("When its method loadAllSessions is invoked and axios rejects it", () => {
    test("Then dispatch should be called three times to show and hide loading and to show the modal with the message 'Error loading all sessions'", async () => {
      const {
        result: {
          current: { loadAllsessions },
        },
      } = renderHook(() => useSessions(), {
        wrapper: ProviderWrapper,
      });

      await loadAllsessions();

      expect(dispatchSpy).toHaveBeenNthCalledWith(
        1,
        showLoadingActionCreator()
      );
      expect(dispatchSpy).toHaveBeenNthCalledWith(
        2,
        hideLoadingActionCreator()
      );
      expect(dispatchSpy).toHaveBeenNthCalledWith(
        3,
        openModalActionCreator({
          isError: true,
          modalText: "Error loading all sessions",
        })
      );
    });
  });

  describe("When its method loadAllSessions is invoked", () => {
    test("Then dispatch should be called three times to show and hide loading and to load the received sessions", async () => {
      const {
        result: {
          current: { loadAllsessions },
        },
      } = renderHook(() => useSessions(), {
        wrapper: ProviderWrapper,
      });

      const { sessions } = mockSessionsState;

      await loadAllsessions();

      expect(dispatchSpy).toHaveBeenNthCalledWith(
        1,
        showLoadingActionCreator()
      );
      expect(dispatchSpy).toHaveBeenNthCalledWith(
        2,
        loadSessionsActionCreator(sessions)
      );
      expect(dispatchSpy).toHaveBeenNthCalledWith(
        3,
        hideLoadingActionCreator()
      );
    });
  });
});
