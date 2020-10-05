import jwt from "jsonwebtoken";
import { APIError } from "../Common/Error/APIError";
import { Request, Response, NextFunction } from "express";
import responseMessages from "../../responseMessages.config.json";
import { HandleAPIError } from "../Common/Error/HandleAPIError";

require("dotenv").config();

class Auth {
  public Authorize = (credentials = [] as string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers["x-token"];

      if (typeof credentials === "string") credentials = [credentials];

      if (token) {
        const tokenBody = token.slice(7);

        jwt.verify(tokenBody, process.env.JWT_ACCESS_SECRET, (err, decodedToken) => {
          if (err) {
            HandleAPIError(
              APIError.AuthorizationError(responseMessages.authorization.invalidToken),
              res
            );
            return;
          }

          req.currentCustomer = decodedToken.currentCustomer;
          next();
        });
      } else {
        HandleAPIError(
          APIError.AuthorizationError(responseMessages.authorization.invalidToken),
          res
        );
        return;
      }
    };
  };

  public UsePermissions = () => {
    return (req: Request, res: Response, next: NextFunction) => {
      if (req.currentCustomer.role === 1) next();
      else
        HandleAPIError(APIError.PermissionError(responseMessages.authorization.noPermission), res);
    };
  };
}

export default new Auth();
