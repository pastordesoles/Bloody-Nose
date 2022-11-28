import { getRandomSession } from "../../factories/sessionsFactory";
import { Session } from "../../redux/features/sessionsSlice/types";

const mockLoadOneSession: Session = {
  ...getRandomSession(),
  id: "1234",
};

export default mockLoadOneSession;
