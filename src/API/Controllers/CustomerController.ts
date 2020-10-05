import cors from "cors";
import express, { Router, Request, Response } from "express";
import { HandleAPIError } from "../../Common/Error/HandleAPIError";
import CustomerService from "../../Services/Customer/CustomerService";
import { RefreshTokenDTO, RegisterDTO } from "./../../Services/Customer/DTO";

const CustomerController: Router = express.Router();

CustomerController.use(cors());

CustomerController.post("/register", async (req: Request, res: Response) => {
  try {
    res.status(201);
    res.json(await CustomerService.Register(req.body as RegisterDTO));
  } catch (err) {
    HandleAPIError(err, res);
  }
});

CustomerController.post("/login", async (req: Request, res: Response) => {
  try {
    res.json(await CustomerService.Login(req.body as RegisterDTO));
  } catch (err) {
    HandleAPIError(err, res);
  }
});

CustomerController.post("/refreshToken", async (req: Request, res: Response) => {
  try {
    res.json(await CustomerService.RefreshToken(req.body as RefreshTokenDTO));
  } catch (err) {
    HandleAPIError(err, res);
  }
});

export default CustomerController;
