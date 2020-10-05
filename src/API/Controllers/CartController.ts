import cors from "cors";
import Auth from "../../Auth/Auth";
import { Cart } from "../../Models/Entities";
import CartService from "../../Services/Cart/CartService";
import express, { Request, Response, Router } from "express";
import { HandleAPIError } from "../../Common/Error/HandleAPIError";
import { AddToCartDTO } from "../../Services/Cart/DTO";

const CartController: Router = express.Router();

CartController.use(cors());

CartController.get("/", Auth.Authorize(), async (req: Request, res: Response) => {
  try {
    let cart: Cart[] = await CartService.GetCart(req.currentCustomer.id);

    if (cart.length === 0) res.status(204);

    res.json(cart);
  } catch (err) {
    HandleAPIError(err, res);
  }
});

CartController.post("/", Auth.Authorize(), async (req: Request, res: Response) => {
  try {
    res.status(201);
    res.json(await CartService.AddToCart(req.body as AddToCartDTO, req.currentCustomer.id));
  } catch (err) {
    HandleAPIError(err, res);
  }
});

CartController.delete("/:id", Auth.Authorize(), async (req: Request, res: Response) => {
  try {
    res.json(await CartService.RemoveFromCart(Number(req.params.id), req.currentCustomer.id));
  } catch (err) {
    HandleAPIError(err, res);
  }
});

export default CartController;
