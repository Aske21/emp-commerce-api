import "reflect-metadata";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

import { createConnection } from "typeorm";
import UserController from "./Controllers/UsersController";
import CartController from "./Controllers/CartController";
import CategoryController from "./Controllers/CategoriesController";

createConnection()
  .then(async (connection) => {
    const app = express();
    let port = process.env.PORT || 5000;

    require("dotenv").config();

    app.use(bodyParser.json());
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use("/customer", UserController);
    app.use("/cart", CartController);
    app.use("/category", CategoryController);

    app.listen(port, async () => {
      console.log("Successfully loaded Database table: " + connection.entityMetadatas[0].schema);

      if (connection.migrations.length > 0)
        console.log(
          "Last migration: " + connection.migrations[connection.migrations.length - 1].name
        );
      console.log("Server is running on port: " + port);
    });
  })
  .catch((error) => console.log(error));
