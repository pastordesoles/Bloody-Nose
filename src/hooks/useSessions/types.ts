import { Session } from "../../redux/features/sessionsSlice/types";

interface getAllSessionsResponseBody {
  sessions: {
    isPreviousPage: boolean;
    isNextPage: boolean;
    totalPages: number;
    sessions: Session[];
  };
}

export default getAllSessionsResponseBody;
