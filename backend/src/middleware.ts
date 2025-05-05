/* import { Hono } from "hono";
const app = new Hono();

app.use("api/v1/blog/*", async (c, next) => {
  const token = c.req.header.authorization;
  if(!token){
    return c.json({
        msg:"Token not provided";
    })
  }

});
*/
//@ts-ignore
export function initMiddleware(app) {
  //@ts-ignore
  app.use("/api/v1/blog/*", async (c, next) => {
    const header = c.req.header("authorization") || "";
    // Bearer token => ["Bearer", "token"];
    const token = header.split(" ")[1];

    // @ts-ignore
    const response = await verify(token, c.env.JWT_SECRET);
    if (response.id) {
      next();
    } else {
      c.status(403);
      return c.json({ error: "unauthorized" });
    }
  });
}
