import { Session, SessionsState } from "./types";
import {
  loadOneSessionActionCreator,
  loadSessionsActionCreator,
  sessionsReducer,
} from "./sessionsSlice";
import {
  getRandomSessionsList,
  getRandomSession,
} from "../../../factories/sessionsFactory";
import mockSessionsState from "../../../mocks/states/mockSessionsState";

describe("Given a sessionsReducer", () => {
  describe("When it receives the current state and an unknown action", () => {
    test("Then it should return a copy of the state with no changes", () => {
      const currentState: SessionsState = mockSessionsState;
      const unknownAction = {
        type: "sessions/unknownAction",
      };

      const newState = sessionsReducer(currentState, unknownAction);

      expect(newState).toStrictEqual(currentState);
    });
  });

  describe("When it receives a state with an empty sessions list and a load sessions action with 10 sessions", () => {
    test("Then it should return a copy of the state with 10 sessions", () => {
      const currentState: SessionsState = {
        sessions: [],
        session: {} as Session,
      };
      const actionPayload: Session[] = getRandomSessionsList(10);
      const expectedState: SessionsState = {
        sessions: actionPayload,
        session: {} as Session,
      };

      const newState = sessionsReducer(
        currentState,
        loadSessionsActionCreator(actionPayload)
      );

      expect(newState).toStrictEqual(expectedState);
    });
  });

  describe("When it receives a session", () => {
    test("Then it should return a copy of the state with that session", () => {
      const currentState: SessionsState = {
        sessions: [],
        session: {} as Session,
      };

      const sessionPayload: Session = getRandomSession();
      const expectedState: SessionsState = {
        sessions: [],
        session: sessionPayload,
      };

      const newState = sessionsReducer(
        currentState,
        loadOneSessionActionCreator(sessionPayload)
      );

      expect(newState).toStrictEqual(expectedState);
    });
  });
});
