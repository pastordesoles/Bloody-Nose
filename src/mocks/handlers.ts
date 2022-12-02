import { rest } from "msw";
import { getRandomSession } from "../factories/sessionsFactory";
import sessionsRoutes from "../hooks/useSessions/sessionsRoutes";
import {
  UserCredentials,
  UserRegisterCredentials,
} from "../hooks/useUser/types";
import userRoutes from "../hooks/useUser/userRoutes";
import mockLoadOneSession from "./Responses/mockLoadOneSession";
import mockSessionsState from "./states/mockSessionsState";

const { registerRoute, usersRoute, loginRoute } = userRoutes;
const {
  sessionsRoute,
  listRoute,
  session: sessionEnd,
  add,
  deleteSession,
} = sessionsRoutes;
const apiUrl = process.env.REACT_APP_API_URL;

const randomSession = getRandomSession();

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

  rest.post(`${apiUrl}${usersRoute}${loginRoute}`, async (req, res, ctx) => {
    const user = await req.json<UserCredentials>();

    if (user.password === "12345678") {
      return res(
        ctx.status(401),
        ctx.json({ error: "Incorrect username or password" })
      );
    }

    return res(ctx.status(200), ctx.json({ token: "testtoken" }));
  }),

  rest.get(`${apiUrl}${sessionsRoute}${listRoute}`, (req, res, ctx) => {
    return res.once(
      ctx.status(404),
      ctx.json({ error: "Error loading all sessions" })
    );
  }),

  rest.get(`${apiUrl}${sessionsRoute}${listRoute}`, (req, res, ctx) => {
    return res.once(
      ctx.status(404),
      ctx.json({ error: "Error loading all sessions" })
    );
  }),

  rest.get(`${apiUrl}${sessionsRoute}${listRoute}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        sessions: {
          sessions: mockSessionsState.sessions,
          currentPage: 0,
          totalPages: 0,
        },
      })
    );
  }),

  rest.get(`${apiUrl}${sessionsRoute}${sessionEnd}:id`, (req, res, ctx) => {
    return res.once(ctx.status(500), ctx.json({ error: "Core meltdown" }));
  }),

  rest.get(`${apiUrl}${sessionsRoute}${sessionEnd}:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ session: mockLoadOneSession }));
  }),

  rest.post(`${apiUrl}${sessionsRoute}${add}`, (req, res, ctx) =>
    res.once(
      ctx.status(500),
      ctx.json({ error: "There was an error on the server" })
    )
  ),

  rest.post(`${apiUrl}${sessionsRoute}${add}`, (req, res, ctx) =>
    res(ctx.status(201), ctx.json({ ...randomSession, picture: {} as File }))
  ),

  rest.delete(
    `${apiUrl}${sessionsRoute}${deleteSession}/:id`,
    (req, res, ctx) => {
      return res.once(
        ctx.status(500),
        ctx.json({ error: "Error deleting a session" })
      );
    }
  ),

  rest.delete(
    `${apiUrl}${sessionsRoute}${deleteSession}/:id`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({}));
    }
  ),
];

export default handlers;
