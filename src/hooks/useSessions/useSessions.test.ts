import { renderHook } from "@testing-library/react";
import mockLoadOneSession from "../../mocks/Responses/mockLoadOneSession";
import mockSessionsState from "../../mocks/states/mockSessionsState";
import mockUiState from "../../mocks/states/mockUiState";
import mockInitialStore from "../../mocks/store/mockInitialStore";
import {
  addSessionsActionCreator,
  loadOneSessionActionCreator,
  loadSessionsActionCreator,
} from "../../redux/features/sessionsSlice/sessionsSlice";
import {
  hideLoadingActionCreator,
  loadPagesActionCreator,
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

  describe("When its method loadMoreSessions is invoked and axios rejects it", () => {
    test("Then dispatch should be called three times to show and hide loading and to show the modal with the message 'Error loading all sessions'", async () => {
      const {
        result: {
          current: { loadMoresessions },
        },
      } = renderHook(() => useSessions(), {
        wrapper: ProviderWrapper,
      });

      await loadMoresessions();

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
      const { pagination } = mockUiState;

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
        loadPagesActionCreator(pagination)
      );

      expect(dispatchSpy).toHaveBeenNthCalledWith(
        4,
        hideLoadingActionCreator()
      );
    });
  });

  describe("When its method loadMoreSessions is invoked", () => {
    test("Then dispatch should be called three times to show and hide loading and to load the received sessions", async () => {
      const {
        result: {
          current: { loadMoresessions },
        },
      } = renderHook(() => useSessions(), {
        wrapper: ProviderWrapper,
      });

      const { sessions } = mockSessionsState;
      const { pagination } = mockUiState;

      await loadMoresessions();

      expect(dispatchSpy).toHaveBeenNthCalledWith(
        1,
        showLoadingActionCreator()
      );

      expect(dispatchSpy).toHaveBeenNthCalledWith(
        2,
        addSessionsActionCreator(sessions)
      );

      expect(dispatchSpy).toHaveBeenNthCalledWith(
        3,
        loadPagesActionCreator(pagination)
      );

      expect(dispatchSpy).toHaveBeenNthCalledWith(
        4,
        hideLoadingActionCreator()
      );
    });
  });

  describe("When its method loadOneSessions is invoked and axios rejects it", () => {
    test("Then dispatch should be called three times to show and hide loading and to show 'Error loading a session' message", async () => {
      const {
        result: {
          current: { loadOneSession },
        },
      } = renderHook(() => useSessions(), {
        wrapper: ProviderWrapper,
      });

      const sessionId = "1234";

      await loadOneSession(sessionId);

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
          modalText: "Error loading a sessions",
        })
      );
    });
  });

  describe("When its method loadOneSessions is invoked", () => {
    test("Then dispatch should be called three times to show and hide loading and to load the received session", async () => {
      const {
        result: {
          current: { loadOneSession },
        },
      } = renderHook(() => useSessions(), {
        wrapper: ProviderWrapper,
      });

      const sessionId = "1234";
      const session = mockLoadOneSession;

      await loadOneSession(sessionId);

      expect(dispatchSpy).toHaveBeenNthCalledWith(
        1,
        showLoadingActionCreator()
      );

      expect(dispatchSpy).toHaveBeenNthCalledWith(
        2,
        loadOneSessionActionCreator(session)
      );

      expect(dispatchSpy).toHaveBeenNthCalledWith(
        3,
        hideLoadingActionCreator()
      );
    });
  });
});
