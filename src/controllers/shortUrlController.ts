import { Request, Response } from "express";
import shortUrl from "../models/shortUrl.model";
import analytics from "../models/analytics.model";

export async function createShortUrl(request: Request, response: Response) {
  const { destination } = request.body;
  const shortenedUrl = await shortUrl.findOneAndUpdate(
    { destination },
    {},
    { upsert: true }
  );
  return response.send(shortenedUrl);
}

export async function handleRedirect(request: Request, response: Response) {
  const { shortId } = request.params;
  const short = await shortUrl.findOne({ shortId }).lean();

  if (!short) {
    return response.sendStatus(404);
  }

  analytics.create({ shortUrlId: short._id });

  return response.redirect(short.destination);
}

export async function getAnalytics(request: Request, response: Response) {
  const id = request.url.split("/").at(-1);
  const data = await analytics.find({ shortUrlId: id }).lean();
  if (data) return response.send(data);
  return response.sendStatus(404);
}
