import express from "express";
import config from "config";
import routes from "./routes";
import bodyParser from "body-parser";
import connectToDb from "./database";
import cors from "cors";

const app = express();
const port = config.get("port");

app.use(
  cors({
    origin: config.get("corsOrigin"),
  })
);

//An error handling middleware
app.use(function (
  err: any,
  req: any,
  res: { status: (arg0: number) => void; send: (arg0: string) => void },
  next: any
) {
  res.status(500);
  res.send("Oops, something went wrong.");
  console.log(err);
});

app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`Application listening to http://localhost:${port}`);
  connectToDb();
  routes(app);
});
