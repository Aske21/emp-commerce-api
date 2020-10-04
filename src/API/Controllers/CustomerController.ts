import express from "express";
import cors from "cors";
import { classToPlain } from "class-transformer";
import { createQueryBuilder } from "typeorm";
import { Customer } from "../../Models/Entities";

const CustomerController = express.Router();

CustomerController.use(cors());

CustomerController.get("/login", async (req, res) => {
  let usersDataResponse = classToPlain(await createQueryBuilder(Customer).getMany()) as any;

  res.json(usersDataResponse);
});

export default CustomerController;
