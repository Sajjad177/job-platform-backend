import mongoose from "mongoose";
import config from "./config";
import app from "./app";
import createAdmin from "./DB";

async function main() {
  try {
    await mongoose.connect(config.mongoUrl as string);

    // create admin
    createAdmin();

    app.listen(config.port, () => {
      console.log(`Server is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
