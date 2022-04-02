import { Express, Request, Response } from "express";
import {
  createShortUrl,
  getAnalytics,
  handleRedirect,
} from "../controllers/shortUrlController";
import validateResource from "../middleware/validateResource";
import shortUrlSchema from "../schemas/createShortUrl.schema";
import getAnalyticsSchema from "../schemas/getAnalytics.schema";
function routes(app: Express) {
  app.get("/health", (req: Request, res: Response) => {
    return res.send("Healthy"); // todo: delete this
  });

  app.post("/api/url", validateResource(shortUrlSchema), createShortUrl);

  app.get("/:shortId", handleRedirect);
  app.get(
    "/api/analytics/:shortUrlId",
    validateResource(getAnalyticsSchema),
    getAnalytics
  );
}
export default routes;
