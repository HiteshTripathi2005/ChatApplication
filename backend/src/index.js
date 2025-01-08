import { server } from "./utils/socket.js";
import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";

dotenv.config();

const PORT = process.env.PORT;

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on PORT:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("error in connecting to database: ", error.message);
  });
