import { getRandomSessionsList } from "../../factories/sessionsFactory";
import { SessionsState } from "../../redux/features/sessionsSlice/types";

const mockSessionsState: SessionsState = {
  sessions: getRandomSessionsList(10),
};

export default mockSessionsState;
