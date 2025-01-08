import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Connected to database: ${conn.connection.host}`);
  } catch (error) {
    console.log("error in connecting to database: ", error.message);
  }
};

export default connectDB;
