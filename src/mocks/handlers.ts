import { rest } from "msw";
import { UserRegisterCredentials } from "../hooks/useUser/types";
import userRoutes from "../hooks/useUser/userRoutes";

const { registerRoute, usersRoute } = userRoutes;
const apiUrl = process.env.REACT_APP_API_URL;

const handlers = [
  rest.post(`${apiUrl}${usersRoute}${registerRoute}`, async (req, res, ctx) => {
    const user = await req.json<UserRegisterCredentials>();

    if (user.email === "xa@vi.com") {
      return res(
        ctx.status(409),
        ctx.json({ error: "User already in the database" })
      );
    }

    return res(ctx.status(201), ctx.json({}));
  }),
];

export default handlers;
