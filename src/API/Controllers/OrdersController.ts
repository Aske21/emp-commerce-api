import cors from "cors";
import express, { Router, Request, Response } from "express";
import Auth from "../../Auth/Auth";
import { HandleAPIError } from "../../Common/Error/HandleAPIError";
import { Order } from "../../Models/Entities/Order";
import OrdersService from "../../Services/Orders/OrdersService";

const OrderController: Router = express.Router();

OrderController.use(cors());

OrderController.get("/", async (req: Request, res: Response) => {
  try {
    let order: Order[] = await OrdersService.GetAllOrders();

    if (order.length === 0) res.status(204);

    res.json(order);
  } catch (err) {
    HandleAPIError(err, res);
  }
});

OrderController.get("/archive", async (req: Request, res: Response) => {
  try {
    let archive: Order[] = await OrdersService.GetArchive();

    if (archive.length === 0) res.status(204);

    res.json(archive);
  } catch (err) {
    HandleAPIError(err, res);
  }
});

OrderController.get("/:id", async (req: Request, res: Response) => {
  try {
    let order: Order = await OrdersService.GetOrder(Number(req.params.id));

    res.json(order);
  } catch (err) {
    HandleAPIError(err, res);
  }
});

OrderController.post("/", async (req: Request, res: Response) => {
  try {
    res.json(await OrdersService.PlaceOrder(req.body));
  } catch (err) {
    HandleAPIError(err, res);
  }
});

OrderController.put("/addCart", (req: Request, res: Response) => {
  //   OrderService.AddCart(req:Request, res:Response);
});

OrderController.delete("/:id", async (req: Request, res: Response) => {
  try {
    res.json(await OrdersService.RemoveOrder(Number(req.params.id)));
  } catch (err) {
    HandleAPIError(err, res);
  }
});

export default OrderController;
