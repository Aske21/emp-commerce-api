import { Response } from "express";
import { APIError } from "./APIError";

export const HandleAPIError = (err: APIError | Error, res: Response) => {
  if (err instanceof APIError) {
    res.status(err.code);
    res.json(err.message);
  } else {
    console.log(err);
    res.status(500);
    res.json(err.message);
  }
};
