import { connect } from "mongoose";
import { MONGO_URI, MONGO_URI_TEST, NODE_ENV } from "./secrets";

const connectDB = async () => {
  try {
    if (NODE_ENV === "test") {
      await connect(MONGO_URI_TEST);
      console.log("MongoDB conectado com sucesso no teste!");
      return;
    }

    if (NODE_ENV === "prod") {
      await connect(MONGO_URI);
      console.log("MongoDB conectado com sucesso no prod!");
      return;
    }

    await connect(MONGO_URI);
    console.log("MongoDB conectado com sucesso no dev!");
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
