import { connect } from "mongoose";
import { MONGO_URI } from "../secrets";

const connectDB = async () => {
  try {
    const mongoURI: string = MONGO_URI;
    await connect(mongoURI);
    
    console.log("MongoDB conectado!");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
