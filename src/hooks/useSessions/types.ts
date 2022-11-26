import { Session } from "../../redux/features/sessionsSlice/types";

interface GetAllSessionsResponseBody {
  sessions: {
    isPreviousPage: boolean;
    isNextPage: boolean;
    totalPages: number;
    sessions: Session[];
  };
}

export default GetAllSessionsResponseBody;
