import express, { Router, Request, Response } from "express";
import { ImageService } from "./ImageService";

const ImageController: Router = express.Router();

ImageController.post(
  "/",
  ImageService.Upload.single("productImage"),
  (req: Request, res: Response) => {
    res.json(200);
  }
);

ImageController.get(
  "/",
  ImageService.Upload.single("productImage"),
  (req: Request, res: Response) => {
    res.json(200);
  }
);

export default ImageController;
