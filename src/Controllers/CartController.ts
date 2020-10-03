import express, { NextFunction, Request, Response, Router } from "express";
import cors from "cors";
import Auth from "../Auth/Auth";
import CartService from "../Services/Cart/CartService";
import { AddToCartDTO } from "../Services/Cart/DTO/AddToCartDTO";

const CartController = express.Router() as Router;

CartController.use(cors());

CartController.get("/content", async (req: Request, res: Response, next: NextFunction) => {
  try {
    let cartContent = await CartService.GetCartContent(332);

    if (cartContent.length === 0) res.status(204);

    res.json(cartContent);
  } catch (err) {
    console.log(err + " OVO JE ERROR");
  }
});

CartController.post("/add", (req: Request, res: Response) => {
  CartService.AddToCart(req.body as AddToCartDTO, 331);
  res.json(200);
});

CartController.delete("/remove/:id", (req: Request, res: Response) => {
  res.json(CartService.RemoveFromCart(Number(req.params.id), 331));
});

export default CartController;
