import mongoose, { ConnectOptions } from "mongoose";
import config from "config";

async function connectToDb() {
  const dbUri = config.get<string>("mongoDbConnection");
  console.log(dbUri);
  try {
    console.log("Connecting to mongoDb...");
    await mongoose
      .connect(dbUri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        autoIndex: true,
      } as ConnectOptions)
      .then(() => {
        console.log(`Connected to ${dbUri}`);
      });
  } catch (e) {
    console.error(e);
  }
}
export default connectToDb;
