import cors from "cors";
import express from "express";
import Auth from "../Auth/Auth";

const OrderController = express.Router();

OrderController.use(cors());

OrderController.get("/fetchAll", Auth.Authorize(), (req, res) => {
  //   OrderService.FetchAllOrders(req, res);
});

OrderController.get("/fetch/:id", Auth.Authorize(), (req, res) => {
  //   OrderService.FetchOrder(req.params.id, res);
});

OrderController.put("/add", Auth.Authorize(), (req, res) => {
  //   OrderService.AddOrder(req, res);
});

OrderController.put("/addCart", Auth.Authorize(), (req, res) => {
  //   OrderService.AddCart(req, res);
});

OrderController.put("/remove/:id", Auth.Authorize(), (req, res) => {
  //   OrderService.RemoveOrder(req, res);
});

export default OrderController;
