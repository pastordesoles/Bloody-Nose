import { getRandomUser } from "../../factories/userFactory";
import { UserState } from "../../redux/features/userSlice/types";

export const mockUserStateLogged: UserState = {
  ...getRandomUser(),
  isLogged: true,
};

export const mockUserStateNotLogged: UserState = {
  id: "",
  isLogged: false,
  token: "",
  username: "",
};
