import cors from "cors";
import express, { Router, Request, Response } from "express";
import Auth from "../../Auth/Auth";
import { HandleAPIError } from "../../Common/Error/HandleAPIError";
import CustomerServiceProvider from "../../Services/Customer/CustomerServiceProvider";
import { RefreshTokenDTO, RegisterDTO } from "./../../Services/Customer/DTO";

const CustomerController: Router = express.Router();

const CustomerService = new CustomerServiceProvider() as CustomerServiceProvider;

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

CustomerController.post("/refreshToken", Auth.Authorize(), async (req: Request, res: Response) => {
  try {
    res.json(await CustomerService.RefreshToken(req.body as RefreshTokenDTO));
  } catch (err) {
    HandleAPIError(err, res);
  }
});

export default CustomerController;
