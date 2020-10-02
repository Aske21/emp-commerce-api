import express from "express";
import cors from "cors";
import { classToPlain } from "class-transformer";
import { createQueryBuilder } from "typeorm";

const UserController = express.Router();

UserController.use(cors());

UserController.get("/login", async (req, res) => {
  let usersDataResponse = classToPlain(
    await createQueryBuilder("User").getMany()
  ) as any;

  res.json(usersDataResponse);
});

export default UserController;
