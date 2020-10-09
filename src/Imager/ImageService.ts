import crypto from "crypto";
import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Images/");
  },
  filename: (req, file, cb) => {
    cb(null, crypto.randomBytes(20).toString("hex") + "." + file.mimetype.split("/")[1]);
  },
});

export class ImageService {
  private static _baseImageRepo: string = "./Images";
  private static _baseAuthUrl: string = process.env.BASE_AUTH_URL;

  public static GenerateImageURL = (name: string) => {
    return ImageService._baseAuthUrl + "/images/" + name;
  };

  public static Upload = multer({ storage: storage });

  public static RemoveImage = (imageName: string) => {
    try {
      fs.unlinkSync(ImageService._baseImageRepo + imageName);
    } catch (err) {}
  };
}
