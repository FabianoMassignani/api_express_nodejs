import { connect } from "mongoose";
import { MONGO_URI, MONGO_URI_TEST } from "./secrets";

const connectDB = async () => {
  try {
    console.log("Modo de execução: ", process.env.NODE_ENV);

    if (process.env.NODE_ENV == "dev") {
      await connect(MONGO_URI);
      console.log("MongoDB conectado com sucesso!");
      return;
    }

    if (process.env.NODE_ENV == "test") {
      await connect(MONGO_URI_TEST);
      return;
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
