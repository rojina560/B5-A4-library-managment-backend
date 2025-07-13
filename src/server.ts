import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

let server: Server;

const PORT = config.port;

async function main() {
  try {
    await mongoose.connect(config.mongo_uri as string);
    console.log("Connected To Mongodb Using Mongoose!");

    server = app.listen(PORT, () => {
      console.log(`APP IS LISTENING ON PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
