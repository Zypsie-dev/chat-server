import express from "express";
import http from "http";
import connectDb from "./utils/connectDb";
import "dotenv/config";
import mainRouter from "./Routes";
import { errorHandlerMiddleware } from "./Middleware/errorHandler";
import cors from "cors";
const allowedOrigins = ["http://localhost:3000"];
const app = express();
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json({ limit: "32kb" }));
// app.use(cookieParser());
app.use(express.urlencoded({ limit: "32kb", extended: true }));
app.use("/api", mainRouter);


app.use(errorHandlerMiddleware);
const PORT = (process.env.PORT as string) || 4000;
const server = http.createServer(app);

connectDb()
  .then(() => {
    server.listen(PORT, () => console.log("server is listening to port 4000"));
  })
  .catch((err) => console.log("error", err));
