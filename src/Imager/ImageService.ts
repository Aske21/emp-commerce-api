import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/Imager/images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + "." + file.mimetype.split("/")[1]);
  },
});

export class ImageService {
  private static _baseImageRepo: string = "src/Imager/images/";
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
