import express from "express";
import config from "config";
import routes from "./routes";
import bodyParser from "body-parser";
import connectToDb from "./database";

const app = express();
const port = config.get("port");

app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`Application listening to http://localhost:${port}`);
  connectToDb();
  routes(app);
});
