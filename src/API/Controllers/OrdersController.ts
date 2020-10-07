import cors from "cors";
import express, { Router, Request, Response } from "express";
import Auth from "../../Auth/Auth";

import { HandleAPIError } from "../../Common/Error/HandleAPIError";
import { Order } from "../../Models/Entities/Order";
import OrdersServiceProvider from "../../Services/Orders/OrdersServiceProvider";
import { PlaceOrderDTO } from "./../../Services/Orders/DTO";

const OrderController: Router = express.Router();

const OrdersService = new OrdersServiceProvider() as OrdersServiceProvider;

OrderController.use(cors());

OrderController.get(
  "/",
  Auth.Authorize(),
  Auth.UsePermissions(),
  async (req: Request, res: Response) => {
    try {
      let orders: Order[] = await OrdersService.GetAllOrders();

      if (orders.length === 0) res.status(204);

      res.json(orders);
    } catch (err) {
      HandleAPIError(err, res);
    }
  }
);

OrderController.get(
  "/archive",
  Auth.Authorize(),
  Auth.UsePermissions(),
  async (req: Request, res: Response) => {
    try {
      let archive: Order[] = await OrdersService.GetArchive();

      if (archive.length === 0) res.status(204);

      res.json(archive);
    } catch (err) {
      HandleAPIError(err, res);
    }
  }
);

OrderController.get(
  "/:id",
  Auth.Authorize(),
  Auth.UsePermissions(),
  async (req: Request, res: Response) => {
    try {
      res.json(await OrdersService.GetOrder(Number(req.params.id)));
    } catch (err) {
      HandleAPIError(err, res);
    }
  }
);

OrderController.post(
  "/",
  Auth.Authorize(),
  Auth.UsePermissions(),
  async (req: Request, res: Response) => {
    try {
      res.status(201);
      res.json(
        await OrdersService.PlaceOrder(req.body as PlaceOrderDTO, Number(req.currentCustomer.id))
      );
    } catch (err) {
      HandleAPIError(err, res);
    }
  }
);

OrderController.put(
  "/addCart",
  Auth.Authorize(),
  Auth.UsePermissions(),
  (req: Request, res: Response) => {
    //   OrderService.AddCart(req:Request, res:Response);
  }
);

OrderController.delete(
  "/:id",
  Auth.Authorize(),
  Auth.UsePermissions(),
  async (req: Request, res: Response) => {
    try {
      res.json(await OrdersService.RemoveOrder(Number(req.params.id)));
    } catch (err) {
      HandleAPIError(err, res);
    }
  }
);

export default OrderController;
