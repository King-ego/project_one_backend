import { Router } from "express";
import appointmentsRouter from "./appointments.routes";
import usersRouter from "./users.routes";

const routes = Router();

routes.use("/appointments", appointmentsRouter);
routes.use("/users", usersRouter);

export default routes;

/* import { Router } from "express";

const routes = Router();

routes.get("/", (request, response) => {
  return response.json({ error: "s1234" });
});
export default routes;
 */
