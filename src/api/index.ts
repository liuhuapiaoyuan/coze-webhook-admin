import swagger from "@elysiajs/swagger";
import { Elysia, ValidationError } from "elysia";
import { endpoints } from "./controllers/endpoints";

const app = new Elysia({ prefix: "/api" });
app.onError({ as: "global" }, ({ code, error }) => {
  if (code === "VALIDATION" && error instanceof ValidationError) {
    return { error: error.all?.map((z) => z.summary).join(","), code };
  }
  return Response.json(
    { error: error.toString(), code },
    {
      status: 500,
    }
  );
});
app.use(endpoints);
app.get("/abc", () => Response.json({ hello: "world" }));
app.use(swagger({ path: "/swagger" }));

export type TElysiaApp = typeof app;

export { app };
