import { Router } from "express";
const mainRouter = Router();

mainRouter.get("/", (req, res) => {
  res.send("hello world!");
});

export default mainRouter;
