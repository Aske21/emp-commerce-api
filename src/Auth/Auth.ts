import jwt from "jsonwebtoken";

require("dotenv").config();

class Auth {
  public Authorize(credentials = []) {
    return (req, res, next) => {
      const token = req.headers["x-token"];

      if (typeof credentials === "string") {
        credentials = [credentials];
      }

      if (token) {
        const tokenBody = token.slice(7);

        jwt.verify(tokenBody, process.env.JWT_SECRET, (err, decodedToken) => {
          if (!err) {
            req.customer = decodedToken.customer;
            next();
          } else {
            console.log(`JWT Error 1: ${err}`);
            return res.status(401).send("Error: Access denied! Please provide a valid token.");
          }
        });
      } else {
        console.log(`JWT Error 2`);
        return res.status(401).send("Error: Access denied! Please provide a valid token.");
      }
    };
  }
}

export default new Auth();
