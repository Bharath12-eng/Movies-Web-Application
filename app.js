import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import bookingsRouter from "./routes/booking-routes.js";
import path from "path";
const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;
dotenv.config();
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter);

app.use(express.static(path.join(__dirname, "./movies/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./movies/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

mongoose
  .connect(
    `mongodb://${process.env.MONGODB_NAME}:${process.env.MONGODB_PASSWORD}@ac-c2soaxh-shard-00-00.jp4ys3k.mongodb.net:27017,ac-c2soaxh-shard-00-01.jp4ys3k.mongodb.net:27017,ac-c2soaxh-shard-00-02.jp4ys3k.mongodb.net:27017/?ssl=true&replicaSet=atlas-ubxdq7-shard-0&authSource=admin&retryWrites=true&w=majority`
  )
  .then(() =>
    app.listen(PORT, () =>
      console.log("Connected To Database And Server is running")
    )
  )
  .catch((e) => console.log(e));
