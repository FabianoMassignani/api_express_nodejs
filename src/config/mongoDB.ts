import { connect } from "mongoose";
import { MONGO_URI, MONGO_URI_TEST } from "./secrets";

const connectDB = async () => {
  try {
    
      await connect(MONGO_URI);
      console.log("MongoDB conectado com sucesso no dev!");
      return;
   

    if (process.env.NODE_ENV == "test") {
      await connect(MONGO_URI_TEST);
      console.log("MongoDB conectado com sucesso no teste!");
      return;
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
