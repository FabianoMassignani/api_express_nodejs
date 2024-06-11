import { connect } from "mongoose";
import { MONGO_URI, MONGO_URI_TEST } from "./secrets";

const connectDB = async () => {
  try {
    await connect(MONGO_URI_TEST);

    if (process.env.NODE_ENV === "dev") {
      await connect(MONGO_URI);

      console.log("MongoDB conectado com sucesso!");
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
