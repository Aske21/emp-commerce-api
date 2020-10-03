import cors from "cors";
import Auth from "../../Auth/Auth";
import { Cart } from "../../Models/Entities";
import CartService from "../../Services/Cart/CartService";
import express, { Request, Response, Router } from "express";
import { AddToCartDTO } from "../../Services/Cart/DTO/AddToCartDTO";
import { HandleAPIError } from "../../Common/Error/HandleAPIError";

const CartController: Router = express.Router();

CartController.use(cors());

CartController.get("/", Auth.Authorize(), async (req: Request, res: Response) => {
  try {
    let cart: Cart[] = await CartService.GetCartContent(req.currentUser.id);

    if (cart.length === 0) res.status(204);

    res.json(cart);
  } catch (err) {
    HandleAPIError(err, res);
  }
});

CartController.post("/", Auth.Authorize(), async (req: Request, res: Response) => {
  try {
    res.json(await CartService.AddToCart(req.body as AddToCartDTO, req.currentUser.id));
  } catch (err) {
    HandleAPIError(err, res);
  }
});

CartController.delete("/:id", Auth.Authorize(), async (req: Request, res: Response) => {
  try {
    res.json(await CartService.RemoveFromCart(Number(req.params.id), req.currentUser.id));
  } catch (err) {
    HandleAPIError(err, res);
  }
});

export default CartController;
