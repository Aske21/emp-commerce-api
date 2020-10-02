import express from "express";
import cors from "cors";
import Auth from "../Auth/Auth";

const CartController = express.Router();

CartController.use(cors());

CartController.get("/fetchAll", Auth.Authorize(), (req, res) => {
  //   CartService.FetchAll(req, res);
});

CartController.post("/add", Auth.Authorize(), (req, res) => {
  //   CartService.AddToCart(req, res);
});

CartController.put("/remove/:id", Auth.Authorize(), (req, res) => {
  //   CartService.RemoveFromCart(req, res);
});

export default CartController;
