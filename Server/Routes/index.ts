import { Router } from "express";
import userRouter from "./user.routes";
const mainRouter = Router();

mainRouter.get("/", (req, res) => {
  res.send("hello world!");
});
mainRouter.use("/user", userRouter);
export default mainRouter;