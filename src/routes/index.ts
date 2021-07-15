import { Router } from "express";
import appointmentsRouter from "./appointments.routes";

const routes = Router();

routes.use("/appointments", appointmentsRouter);

export default routes;

/* import { Router } from "express";

const routes = Router();

routes.get("/", (request, response) => {
  return response.json({ error: "s1234" });
});
export default routes;
 */
