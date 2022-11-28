import { getRandomSessionsList } from "../../factories/sessionsFactory";
import {
  Session,
  SessionsState,
} from "../../redux/features/sessionsSlice/types";

const mockSessionsState: SessionsState = {
  sessions: getRandomSessionsList(10),
  session: {} as Session,
};

export default mockSessionsState;
