import multer from "multer";
import express, { Router, Request, Response } from "express";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const ImageController: Router = express.Router();

ImageController.post("/", upload.single("productImage"), (req: Request, res: Response) => {
  console.log(req.file);
  res.json(200);
});

export default ImageController;
